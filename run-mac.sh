#!/bin/bash
set -e

# Parse command line arguments for --model
while [[ "$#" -gt 0 ]]; do
    case $1 in
        --model) MODEL="$2"; shift ;;
        *) echo "Unknown parameter passed: $1"; exit 1 ;;
    esac
    shift
done

# If no model is passed, default to 7b model
if [[ -z "$MODEL" ]]; then
    echo "No model value provided. Defaulting to 7b. If you want to change the model, exit the script and use --model to provide the model value."
    echo "Supported models are 7b, 13b, 70b, code-7b, code-13b, code-34b."
    MODEL="7b"
fi

# Export the model
export MODEL

# Run the API
source run-mac-api.sh &

# Get the PID of the API script
API_PID=$!

# Run the UI
source run-mac-ui.sh &

# Get the PID of the UI script
UI_PID=$!

# Define a function to stop the API and UI scripts
stop_scripts() {
    echo "Stopping scripts..."
    kill -SIGINT $API_PID
    kill -SIGINT $UI_PID
}

# Set a trap to catch SIGINT and stop the scripts
trap stop_scripts SIGINT

# Wait for both scripts to finish
wait $API_PID
wait $UI_PID