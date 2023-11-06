#!/bin/bash
set -e

# Check if node_modules are installed in ./model-manager-service
if [ ! -d "./model-manager-service/node_modules" ]; then
    echo "Node modules not found in model-manager-service. Installing them..."
    (cd model-manager-service && npm install)
fi

# Run the service in the background and store its PID
with_cuda=0
non_mac=1
with_rocm=0
while [[ "$#" -gt 0 ]]; do
    case $1 in
        --with-cuda) with_cuda=1 ;;
        --with-rocm) with_rocm=1 ;;
        *) echo "Unknown parameter passed: $1"; exit 1 ;;
    esac
    shift
done

node ./model-manager-service/index.js --with-cuda $with_cuda --non-mac $non_mac &

MODEL_MANAGER_PID=$!

# Run the UI
source run-ui.sh &

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

if [ "$with_cuda" -eq 1 ]
then
    if [ "$model_type" = "ggml" ]
    then
        docker compose -f docker-compose-cuda-ggml.yml up --build
    else
        docker compose -f docker-compose-cuda-gguf.yml up --build
    fi
elif [ "$with_rocm" -eq 1 ]
then
    if [ "$model_type" = "ggml" ]
    then
        docker compose -f docker-compose-rocm-ggml.yml up --build
    else
        docker compose -f docker-compose-rocm-gguf.yml up --build
    fi
else
    if [ "$model_type" = "ggml" ]
    then
        docker compose -f docker-compose.yml up --build
    else
        docker compose -f docker-compose-gguf.yml up --build
    fi
fi

