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

# Define a function to install conda with Miniforge3
install_conda() {
    # Download Miniforge3
    curl -L -o /tmp/Miniforge3.sh https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-MacOSX-arm64.sh
    bash /tmp/Miniforge3.sh
    source_shell_rc
}

# Define a function to install a specific version of llama-cpp-python
install_llama_cpp_python() {
    local model_type=$1
    local version=$2
    local installed_version=$(pip3 show llama-cpp-python | grep -i version | awk '{print $2}')

    if [[ "$installed_version" != "$version" ]]; then
        echo "llama-cpp-python version is not $version. Installing $version version for $model_type support..."
        pip3 uninstall llama-cpp-python -y
        CMAKE_ARGS="-DLLAMA_METAL=on" FORCE_CMAKE=1 pip3 install llama-cpp-python==$version --no-cache-dir
        pip3 install 'llama-cpp-python[server]'
    else
        echo "llama-cpp-python version is $version."
    fi
}

source_shell_rc

# Check if the platform is MacOS and the architecture is arm64
if [[ "$(uname)" != "Darwin" ]] || [[ "$(uname -m)" != "arm64" ]]; then
    echo "This script is intended to be run on MacOS with M1/M2 chips. Exiting..."
    exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Docker is not installed. Exiting..."
    exit 1
fi

# Check if python3 is installed
if ! command -v python3 &> /dev/null; then
    echo "Python3 is not installed. Exiting..."
    exit 1
fi

# Check if Xcode is installed
xcode_path=$(xcode-select -p 2>/dev/null)
if [ -z "$xcode_path" ]; then
    echo "Xcode is not installed. Installing (this may take a long time)..."
    xcode-select --install
else
    echo "Xcode is installed at $xcode_path"
fi

# Check if conda is installed
if ! command -v conda &> /dev/null; then
    echo "Conda is not installed. Installing Miniforge3 which includes conda..."
    install_conda
else
    echo "Conda is installed."
    # TODO: Check if the conda version for MacOS that supports Metal GPU is installed
    # conda_version=$(conda --version)
    # if [[ $conda_version != *"Miniforge3"* ]]; then
    #     echo "Conda version that supports Metal GPU is not installed. Installing..."
    #     install_conda
    # else
    #     echo "Conda version that supports M1/M2 is installed."
    # fi
fi


# Check if the conda environment 'llama-gpt' exists
if conda env list | grep -q 'llama-gpt'; then
    echo "Conda environment 'llama-gpt' already exists."
else
    echo "Creating a conda environment called 'llama-gpt'..."
    conda create -n llama-gpt python=$(python3 --version | cut -d ' ' -f 2)
fi

# Check if the conda environment 'llama-gpt' is active
if [[ "$(conda info --envs | grep '*' | awk '{print $1}')" != "llama-gpt" ]]; then
    echo "Activating the conda environment 'llama-gpt'..."
    conda activate llama-gpt
else
    echo "Conda environment 'llama-gpt' is already active."
fi

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

# Get the number of available CPU cores and subtract 2
n_threads=$(($(sysctl -n hw.logicalcpu) - 2))

# Define context window
n_ctx=4096

# Define batch size
n_batch=2096

# Define number of GPU layers
n_gpu_layers=1

# Define grouping factor
N_GQA=1

model_type="gguf"

# Set values for MODEL and MODEL_DOWNLOAD_URL based on the model passed
case $MODEL in
    7b) 
        MODEL="./models/llama-2-7b-chat.bin"
        MODEL_DOWNLOAD_URL="https://huggingface.co/TheBloke/Nous-Hermes-Llama-2-7B-GGML/resolve/main/nous-hermes-llama-2-7b.ggmlv3.q4_0.bin"
        model_type="ggml"
        ;;
    13b) 
        MODEL="./models/llama-2-13b-chat.bin"
        MODEL_DOWNLOAD_URL="https://huggingface.co/TheBloke/Nous-Hermes-Llama2-GGML/resolve/main/nous-hermes-llama2-13b.ggmlv3.q4_0.bin"
        model_type="ggml"
        n_gpu_layers=2
        ;;
    70b) 
        MODEL="./models/llama-2-70b-chat.bin"
        MODEL_DOWNLOAD_URL="https://huggingface.co/TheBloke/Llama-2-70B-Chat-GGML/resolve/main/llama-2-70b-chat.ggmlv3.q4_0.bin"
        model_type="ggml"
        n_gpu_layers=3
        # Llama 2 70B's grouping factor is 8 compared to 7B and 13B's 1.
        N_GQA=8
        ;;
    code-7b)
        MODEL="./models/code-llama-7b-chat.gguf"
        MODEL_DOWNLOAD_URL="https://huggingface.co/TheBloke/CodeLlama-7B-Instruct-GGUF/resolve/main/codellama-7b-instruct.Q4_K_M.gguf"
        DEFAULT_SYSTEM_PROMPT="You are a helpful coding assistant. Use markdown when responding with code."
        n_gpu_layers=1
        n_ctx=8192
        ;;
    code-13b)
        MODEL="./models/code-llama-13b-chat.gguf"
        MODEL_DOWNLOAD_URL="https://huggingface.co/TheBloke/CodeLlama-13B-Instruct-GGUF/resolve/main/codellama-13b-instruct.Q4_K_M.gguf"
        DEFAULT_SYSTEM_PROMPT="You are a helpful coding assistant. Use markdown when responding with code."
        n_gpu_layers=2
        n_ctx=8192
        ;;
    code-34b)
        MODEL="./models/code-llama-34b-chat.gguf"
        MODEL_DOWNLOAD_URL="https://huggingface.co/TheBloke/Phind-CodeLlama-34B-v1-GGUF/resolve/main/phind-codellama-34b-v1.Q4_K_M.gguf"
        DEFAULT_SYSTEM_PROMPT="You are a helpful coding assistant. Use markdown when responding with code."
        n_gpu_layers=3
        n_ctx=8192
        # Code Llama 34B's grouping factor is 8 compared to 7B and 13B's 1.
        N_GQA=8
        ;;
    *) 
        echo "Invalid model passed: $MODEL"; exit 1 
        ;;
esac

# Check if llama-cpp-python is already installed
llama_cpp_python_installed=$(pip3 list | grep -q llama-cpp-python && echo "installed" || echo "not installed")
if [[ "$llama_cpp_python_installed" == "not installed" ]]; then
    echo "llama-cpp-python is not installed. Installing..."
    if [[ "$model_type" == "ggml" ]]; then
        install_llama_cpp_python "GGML" "0.1.78"
    else
        install_llama_cpp_python "GGUF" "0.1.80"
    fi
else
    echo "llama-cpp-python is installed."
    if [[ "$model_type" == "ggml" ]]; then
        install_llama_cpp_python "GGML" "0.1.78"
    else
        install_llama_cpp_python "GGUF" "0.1.80"
    fi
fi


# Check if the model file exists
if [ ! -f $MODEL ]; then
    echo "Model file not found. Downloading..."
    # Download the model file with a custom progress bar showing percentage, download speed, downloaded, total size, and estimated time remaining
    curl -L -o $MODEL $MODEL_DOWNLOAD_URL
    if [ $? -ne 0 ]; then
        echo "Download failed. Trying with TLS 1.2..."
        curl -L --tlsv1.2 -o $MODEL $MODEL_DOWNLOAD_URL
    fi
else
    echo "$MODEL model found."
fi

# Display configuration information
echo "Initializing server with:"
echo "Batch size: $n_batch"
echo "Number of CPU threads: $n_threads"
echo "Number of GPU layers: $n_gpu_layers"
echo "Context window: $n_ctx"
echo "GQA: $n_gqa"

# Export environment variables
export MODEL
export N_GQA
export DEFAULT_SYSTEM_PROMPT

# Run docker-compose with the macOS yml file
docker compose -f ./docker-compose-mac.yml up --remove-orphans --build &

# Run the server
python3 -m llama_cpp.server --n_ctx $n_ctx --n_threads $n_threads --n_gpu_layers $n_gpu_layers --n_batch $n_batch --model $MODEL --port 3001 &

# Define a function to stop docker-compose and the python3 command
stop_commands() {
    echo "Stopping docker-compose..."
    docker compose -f ./docker-compose-mac.yml down
    echo "Stopping python server..."
    pkill -f "python3 -m llama_cpp.server"
    echo "Deactivating conda environment..."
    conda deactivate
    echo "All processes stopped."
}

# Set a trap to catch SIGINT and stop the commands
trap stop_commands SIGINT

# Wait for both commands to finish
wait $DOCKER_COMPOSE_PID
wait $PYTHON_PID


