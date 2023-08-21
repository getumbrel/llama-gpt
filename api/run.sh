#!/bin/bash

if [ -z "$MODEL" ]
then
    echo "Please set the MODEL_FILE environment variable"
    exit 1
fi

if [ -z "$MODEL_DOWNLOAD_URL" ]
then
    echo "Please set the MODEL_DOWNLOAD_URL environment variable"
    exit 1
fi

# check if curl is installed

if ! [ -x "$(command -v curl)" ]; then
    echo "curl is not installed. Installing..."
    apt-get update --yes --quiet
    apt-get install --yes --quiet curl
fi


if [ ! -f $MODEL ]; then
    echo "Model file not found. Downloading..."
    curl -L -o $MODEL $MODEL_DOWNLOAD_URL
else
    echo "$MODEL model found."
fi

make build
# Get the number of available threads on the system
n_threads=$(grep -c ^processor /proc/cpuinfo)

# Define context window
n_ctx=4096

# Offload everything to CPU
n_gpu_layers=0

# Define batch size
n_batch=2096
# If total RAM is less than 8GB, set batch size to 1024
total_ram=$(cat /proc/meminfo | grep MemTotal | awk '{print $2}')
if [ $total_ram -lt 8000000 ]; then
    n_batch=1024
fi

echo "Initializing server with:"
echo "Batch size: $n_batch"
echo "Number of CPU threads: $n_threads"
echo "Number of GPU layers: $n_gpu_layers"
echo "Context window: $n_ctx"

exec python3 -m llama_cpp.server --n_ctx $n_ctx --n_threads $n_threads --n_gpu_layers $n_gpu_layers --n_batch $n_batch
