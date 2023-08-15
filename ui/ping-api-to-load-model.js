const http = require('http');

const apiHost = process.env.OPENAI_API_HOST ? process.env.OPENAI_API_HOST.split("//")[1].split(":")[0] : 'localhost';
const apiPort = process.env.OPENAI_API_HOST ? process.env.OPENAI_API_HOST.split("//")[1].split(":")[1] : 9999;
const apiKey = process.env.OPENAI_API_KEY || 'sk-XXXXXXXXXXXXXXXXXXXX';
const apiPath = '/v1/completions';

const payload = JSON.stringify({
  prompt: "\n\n### Reply with \"69\"\n\n### Response:\n",
  stop: ["\n", "###"],
  temperature: 0,
});

const options = {
  hostname: apiHost,
  port: apiPort,
  path: apiPath,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': payload.length,
    'Authorization': `Bearer ${apiKey}`,
  },
};

function handleRequest() {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';

      // Handle data chunks
      res.on('data', (chunk) => {
        data += chunk;
      });

      // Resolve the promise when the response is complete
      res.on('end', () => {
        resolve(JSON.parse(data));
      });
    });

    // Handle request errors
    req.on('error', (error) => {
      reject(error);
    });

    // Write the payload to the request
    req.write(payload);

    // End the request
    req.end();
  });
}

// Call the API and exit on result/error
handleRequest()
  .then((result) => {
    console.log('API response:', result);
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error:', error);
    process.exit(1);
  });