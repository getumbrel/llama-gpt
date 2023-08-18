# Define the image argument and provide a default value
ARG IMAGE=ghcr.io/abetlen/llama-cpp-python:latest

FROM ${IMAGE}

# Download the model file
RUN apt-get update -y && \
    apt-get install --yes curl && \
    mkdir -p /models

WORKDIR /app

COPY . .

EXPOSE 8000

# Run the server start script
CMD ["/bin/sh", "/app/run.sh"]