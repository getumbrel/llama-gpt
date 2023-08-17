# Define the image argument and provide a default value
# ARG IMAGE=ghcr.io/abetlen/llama-cpp-python:latest
ARG IMAGE=nvidia/cuda:12.2.0-devel-ubuntu22.04

# Define the model file name and download url
ARG MODEL_FILE=llama-2-70b-chat.bin
ARG MODEL_DOWNLOAD_URL=https://huggingface.co/TheBloke/Llama-2-70B-Chat-GGML/resolve/main/llama-2-70b-chat.ggmlv3.q4_0.bin

FROM ${IMAGE}
ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=America/Seattle
RUN apt-get update && apt-get install -y --no-install-recommends python3 python3-pip git cmake
RUN CMAKE_ARGS="-DLLAMA_CUBLAS=on" FORCE_CMAKE=1 pip install llama-cpp-python
RUN pip install numpy diskcache uvicorn fastapi sse-starlette pydantic-settings
ENV HOST=0.0.0.0
ENV PORT=8000

# Get llama-cpp-python
WORKDIR /app

COPY . .

EXPOSE 8000

# Run the server start script
CMD ["/bin/sh", "/app/run.sh"]