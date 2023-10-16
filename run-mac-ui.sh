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