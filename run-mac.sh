#!/bin/bash
set -e

# Check if node_modules are installed in ./model-manager-service
if [ ! -d "./model-manager-service/node_modules" ]; then
    echo "Node modules not found in model-manager-service. Installing them..."
    (cd model-manager-service && npm install)
fi

# Run the service in the background and store its PID
node ./model-manager-service/index.js &

MODEL_MANAGER_PID=$!

# Run the UI
source run-mac-ui.sh &

# Get the PID of the UI script
UI_PID=$!

# Define a function to stop the API and UI scripts
stop_scripts() {
    echo "Stopping scripts..."
    # kill -SIGINT $API_PID
    kill -SIGINT $UI_PID
    kill -SIGINT $MODEL_MANAGER_PID
}

# Set a trap to catch SIGINT and stop the scripts
trap stop_scripts SIGINT

# Wait for both scripts to finish
# wait $API_PID
wait $UI_PID
wait $MODEL_MANAGER_PID