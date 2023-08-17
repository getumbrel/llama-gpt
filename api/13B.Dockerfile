# Define the image argument and provide a default value
ARG IMAGE=ghcr.io/abetlen/llama-cpp-python:latest

# Define the model file name and download url
ARG MODEL_FILE=llama-2-13b-chat.bin
ARG MODEL_DOWNLOAD_URL=https://huggingface.co/TheBloke/Nous-Hermes-Llama2-GGML/resolve/main/nous-hermes-llama2-13b.ggmlv3.q4_0.bin

FROM ${IMAGE}

ARG MODEL_FILE
ARG MODEL_DOWNLOAD_URL

WORKDIR /app

COPY . .

EXPOSE 8000

# Run the server start script
CMD ["/bin/sh", "/app/run.sh"]