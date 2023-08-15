# Define the image argument and provide a default value
ARG IMAGE=ghcr.io/abetlen/llama-cpp-python:latest

# Define the model file name and download url
ARG MODEL_FILE=llama-2-7b-chat.bin
ARG MODEL_DOWNLOAD_URL=https://huggingface.co/TheBloke/Nous-Hermes-Llama-2-7B-GGML/resolve/main/nous-hermes-llama-2-7b.ggmlv3.q4_0.bin

FROM ${IMAGE}

ARG MODEL_FILE
ARG MODEL_DOWNLOAD_URL

# Download the model file
RUN apt-get update -y && \
    apt-get install --yes curl && \
    mkdir -p /models && \
    curl -L -o /models/${MODEL_FILE} ${MODEL_DOWNLOAD_URL}

WORKDIR /app

COPY . .

EXPOSE 8000

# Run the server start script
CMD ["/bin/sh", "/app/run.sh"]