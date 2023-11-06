#!/bin/bash

 # Check if the MODEL environment variable is set
 if [ -z "$MODEL" ]
 then
     echo "Please set the MODEL_FILE environment variable"
     exit 1
 fi

 # Check if the MODEL_DOWNLOAD_URL environment variable is set
 if [ -z "$MODEL_DOWNLOAD_URL" ]
 then
     echo "Please set the MODEL_DOWNLOAD_URL environment variable"
     exit 1
 fi

 # Check if the model file exists
 if [ ! -f $MODEL ]; then
     echo "Model file not found. Downloading..."
     # Check if curl is installed
     if ! [ -x "$(command -v curl)" ]; then
         echo "curl is not installed. Installing..."
         apt-get update --yes --quiet
         apt-get install --yes --quiet curl
     fi
     # Download the model file
     curl -L -o $MODEL $MODEL_DOWNLOAD_URL
     if [ $? -ne 0 ]; then
         echo "Download failed. Trying with TLS 1.2..."
         curl -L --tlsv1.2 -o $MODEL $MODEL_DOWNLOAD_URL
     fi
 else
     echo "$MODEL model found."
 fi

# Build the project
make build

# Get the number of available CPU threads
n_threads=$(grep -c ^processor /proc/cpuinfo)

# Define context window
n_ctx=4096

# Offload layers to GPU
n_gpu_layers=10

# Define batch size based on total RAM
total_ram=$(cat /proc/meminfo | grep MemTotal | awk '{print $2}')
n_batch=2096
if [ $total_ram -lt 8000000 ]; then
    n_batch=1024
fi

# Display configuration information
echo "Initializing server with:"
echo "Batch size: $n_batch"
echo "Number of CPU threads: $n_threads"
echo "Number of GPU layers: $n_gpu_layers"
echo "Context window: $n_ctx"

# Run the server
exec python3 -m llama_cpp.server --n_ctx $n_ctx --n_threads $n_threads --n_gpu_layers $n_gpu_layers --n_batch $n_batch
