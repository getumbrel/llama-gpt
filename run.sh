#!/bin/bash

# Check if docker compose is installed
if ! command -v docker &> /dev/null
then
    echo "Docker could not be found. Please install Docker and try again."
    exit
fi

# Parse command line arguments for model value and check for --with-cuda flag
with_cuda=0
while [[ "$#" -gt 0 ]]; do
    case $1 in
        --model) model="$2"; shift ;;
        --with-cuda) with_cuda=1 ;;
        *) echo "Unknown parameter passed: $1"; exit 1 ;;
    esac
    shift
done

# Check if model value is provided
if [ -z "$model" ]
then
    echo "No model value provided. Defaulting to 7b. If you want to change the model, exit the script and use --model to provide the model value."
    echo "Supported models are 7b, 13b, 70b, code-7b, code-13b, code-34b."
    model="7b"
fi

model_type="gguf"

# Export the model value as an environment variable
case $model in
    7b)
        export MODEL_NAME="llama-2-7b-chat.bin"
        export MODEL_DOWNLOAD_URL="https://huggingface.co/TheBloke/Nous-Hermes-Llama-2-7B-GGML/resolve/main/nous-hermes-llama-2-7b.ggmlv3.q4_0.bin"
        export WAIT_TIMEOUT=3600
        export N_GQA=1
        model_type="ggml"
        ;;
    13b)
        export MODEL_NAME="llama-2-13b-chat.bin"
        export MODEL_DOWNLOAD_URL="https://huggingface.co/TheBloke/Nous-Hermes-Llama2-GGML/resolve/main/nous-hermes-llama2-13b.ggmlv3.q4_0.bin"
        export WAIT_TIMEOUT=10800
        export N_GQA=1
        model_type="ggml"
        ;;
    70b)
        export MODEL_NAME="llama-2-70b-chat.bin"
        export MODEL_DOWNLOAD_URL="https://huggingface.co/TheBloke/Nous-Hermes-Llama2-70B-GGML/resolve/main/nous-hermes-llama2-70b.ggmlv3.Q4_0.bin"
        export WAIT_TIMEOUT=21600
        # Llama 2 70B's grouping factor is 8 compared to 7B and 13B's 1. Currently,
        # it's not possible to change this using --n_gqa with llama-cpp-python in
        # run.sh, so we expose it as an environment variable.
        # See: https://github.com/abetlen/llama-cpp-python/issues/528
        # and: https://github.com/facebookresearch/llama/issues/407
        export N_GQA=8
        model_type="ggml"
        ;;
    code-7b)
        export MODEL_NAME="code-llama-7b-chat.gguf"
        export MODEL_DOWNLOAD_URL="https://huggingface.co/TheBloke/CodeLlama-7B-Instruct-GGUF/resolve/main/codellama-7b-instruct.Q4_K_M.gguf"
        export WAIT_TIMEOUT=3600
        export DEFAULT_SYSTEM_PROMPT="You are a helpful coding assistant. Use markdown when responding with code."
        export N_GQA=1
        ;;
    code-13b)
        export MODEL_NAME="code-llama-13b-chat.gguf"
        export MODEL_DOWNLOAD_URL="https://huggingface.co/TheBloke/CodeLlama-13B-Instruct-GGUF/resolve/main/codellama-13b-instruct.Q4_K_M.gguf"
        export DEFAULT_SYSTEM_PROMPT="You are a helpful coding assistant. Use markdown when responding with code."
        export WAIT_TIMEOUT=10800
        export N_GQA=1
        ;;
    code-34b)
        export MODEL_NAME="code-llama-34b-chat.gguf"
        export MODEL_DOWNLOAD_URL="https://huggingface.co/TheBloke/Phind-CodeLlama-34B-v1-GGUF/resolve/main/phind-codellama-34b-v1.Q4_K_M.gguf"
        export DEFAULT_SYSTEM_PROMPT="You are a helpful coding assistant. Use markdown when responding with code."
        export WAIT_TIMEOUT=21600
        # Code Llama 34B's grouping factor is 8 compared to 7B and 13B's 1. Currently,
        # it's not possible to change this using --n_gqa with llama-cpp-python in
        # run.sh, so we expose it as an environment variable.
        # See: https://github.com/abetlen/llama-cpp-python/issues/528
        export N_GQA=8
        ;;
    *)
        echo "Invalid model value provided. Supported models are 7b, 13b, 70b, code-7b, code-13b, code-34b."
        exit 1
        ;;
esac

# Run docker compose with docker-compose-ggml.yml or docker-compose-gguf.yml

if [ "$with_cuda" -eq 1 ]
then
    if [ "$model_type" = "ggml" ]
    then
        docker compose -f docker-compose-cuda-ggml.yml up --build
    else
        docker compose -f docker-compose-cuda-gguf.yml up --build
    fi
else
    if [ "$model_type" = "ggml" ]
    then
        docker compose -f docker-compose.yml up --build
    else
        docker compose -f docker-compose-gguf.yml up --build
    fi
fi
