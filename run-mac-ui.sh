#!/bin/bash
set -e

# Define a function to refresh the source of .zshrc or .bashrc
source_shell_rc() {
    # Source .zshrc or .bashrc
    if [ -f ~/.zshrc ]; then
        source ~/.zshrc
    elif [ -f ~/.bashrc ]; then
        source ~/.bashrc
    else
        echo "No .bashrc or .zshrc file found."
    fi
}

# Define grouping factor
N_GQA=1

# Set values for MODEL and MODEL_DOWNLOAD_URL based on the model passed
case $MODEL in
    7b) 
        MODEL="./models/llama-2-7b-chat.bin"
        ;;
    13b) 
        MODEL="./models/llama-2-13b-chat.bin"
        ;;
    70b) 
        MODEL="./models/llama-2-70b-chat.bin"
        # Llama 2 70B's grouping factor is 8 compared to 7B and 13B's 1.
        N_GQA=8
        ;;
    code-7b)
        MODEL="./models/code-llama-7b-chat.gguf"
        DEFAULT_SYSTEM_PROMPT="You are a helpful coding assistant. Use markdown when responding with code."
        ;;
    code-13b)
        MODEL="./models/code-llama-13b-chat.gguf"
        DEFAULT_SYSTEM_PROMPT="You are a helpful coding assistant. Use markdown when responding with code."
        ;;
    code-34b)
        MODEL="./models/code-llama-34b-chat.gguf"
        DEFAULT_SYSTEM_PROMPT="You are a helpful coding assistant. Use markdown when responding with code."
        # Code Llama 34B's grouping factor is 8 compared to 7B and 13B's 1.
        N_GQA=8
        ;;
    *) 
        echo "Invalid model passed: $MODEL"; exit 1 
        ;;
esac

# Export environment variables
export MODEL
export N_GQA
export DEFAULT_SYSTEM_PROMPT

# Run docker-compose with the macOS yml file
docker compose -f ./docker-compose-mac.yml up --remove-orphans --build &

# Define a function to stop docker-compose and the python3 command
stop_commands() {
    echo "Stopping docker-compose..."
    docker compose -f ./docker-compose-mac.yml down
}

# Set a trap to catch SIGINT and stop the commands
trap stop_commands SIGINT

# Wait for both commands to finish
wait $DOCKER_COMPOSE_PID