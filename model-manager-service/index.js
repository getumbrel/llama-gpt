import express from 'express';
import { spawn } from 'child_process';
import axios from 'axios';
import { fileURLToPath } from 'url';
import path from 'path';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let withCuda = false;
let nonMac = false;

process.argv.forEach((val, index) => {
  if (val === '--with-cuda') {
    withCuda = process.argv[index + 1] === '1';
  } else if (val === '--non-mac') {
    nonMac = process.argv[index + 1] === '1';
  }
});

const app = express();

app.use(cors({
  origin: '*',
}));

app.use(express.json());
const port = 3002;

let runningModelProcess = null;
let isModelStopping = false;
let pollServerInterval = null;

const pollServer = async (res, model, pollServerInterval) => {
  if (isModelStopping) {
    return;
  }
  try {
    const response = await axios.get('http://localhost:3001/docs');
    if (response.status === 200) {
      clearInterval(pollServerInterval);
      res.send(JSON.stringify({
        message: `Model ${model} started successfully.`,
        status: 200,
      }));
    }
  } catch (err) {
    console.log("Server isn't up yet, waiting 1 second...");
  }
};

async function startModel(model, res) {
  clearInterval(pollServerInterval);

  if (runningModelProcess) {
    isModelStopping = true;
    runningModelProcess.kill('SIGINT');
  }

  // Specify the Zsh shell explicitly
  const shellCommand = 'zsh';

  // Set the parent directory as the current working directory
  const parentDirectory = path.resolve(__dirname, '..');

  // Have some inputs or Environment variables on which the script depends
  let scriptPath;
  let scriptArgs;

  if (nonMac) {
    scriptPath = path.join(parentDirectory, 'run.sh');
    scriptArgs = withCuda ? ['--with-cuda', '--model', model] : ['--model', model];
  } else {
    scriptPath = path.join(parentDirectory, 'run-mac-api.sh');
    scriptArgs = ['--model', model];
  }

  // Start the new model
  runningModelProcess = spawn(shellCommand, [scriptPath, ...scriptArgs], {
    cwd: parentDirectory,
  });

  // Stream the output and errors to the console
  runningModelProcess.stdout.on('data', (data) => {
    process.stdout.write(data);
  });

  runningModelProcess.stderr.on('data', (data) => {
    process.stderr.write(data);
  });

  // Handle the exit of the child process
  runningModelProcess.on('close', (code) => {
    isModelStopping = false;
    if (code === 0) {
      console.log('Model completed successfully.');
    } else {
      clearInterval(pollServerInterval);
      res.send(JSON.stringify({
        error: `Model exited with code ${code}`,
        status: 500,
      }));
      console.error(`Model exited with code ${code}`);
    }
  });

  // Handle errors in starting the child process
  runningModelProcess.on('error', (err) => {
    clearInterval(pollServerInterval);
    res.send(JSON.stringify({
      error: `Error starting the model: ${err}`,
      status: 500,
    }));
    console.error('Error starting the model:', err);
  });

  pollServerInterval = setInterval(() => pollServer(res, model, pollServerInterval), 1000);
}

// Function to handle SIGINT signal
function handleSIGINT() {
  if (runningModelProcess) {
    isModelStopping = true;
    // Send a SIGINT signal to the child process
    runningModelProcess.kill('SIGINT');
  }
  // Exit the main process gracefully
  process.exit(0);
}

// Listen for the SIGINT signal and call the handler
process.on('SIGINT', handleSIGINT);

// Endpoint to start a model
app.post('/start-model', (req, res) => {
  const { model } = req.body;
  if (model) {
    startModel(model, res);
  } else {
    res.status(500).send(JSON.stringify({
      message: 'No model specified.',
      status: 500,
    }));
  }
});

// Endpoint to stop the currently running model
app.post('/stop-model', (req, res) => {
  if (runningModelProcess) {
    runningModelProcess.kill('SIGINT');
    res.send((JSON.stringify({
      message: 'Model stopped successfully.',
      status: 200,
    })));
  } else {
    res.send((JSON.stringify({
      message: 'No model is currently running.',
      status: 200,
    })));
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
