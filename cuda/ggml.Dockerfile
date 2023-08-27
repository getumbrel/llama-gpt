ARG CUDA_IMAGE="12.1.1-devel-ubuntu22.04"
FROM nvidia/cuda:${CUDA_IMAGE}

# We need to set the host to 0.0.0.0 to allow outside access
ENV HOST 0.0.0.0

RUN apt-get update && apt-get upgrade -y \
    && apt-get install -y git build-essential \
    python3 python3-pip gcc wget \
    ocl-icd-opencl-dev opencl-headers clinfo \
    libclblast-dev libopenblas-dev \
    && mkdir -p /etc/OpenCL/vendors && echo "libnvidia-opencl.so.1" > /etc/OpenCL/vendors/nvidia.icd

COPY . .

# setting build related env vars
ENV CUDA_DOCKER_ARCH=all
ENV LLAMA_CUBLAS=1

# Install depencencies
RUN python3 -m pip install --upgrade pip pytest cmake scikit-build setuptools fastapi uvicorn sse-starlette pydantic-settings

# Install llama-cpp-python 0.1.78 which has GGML support (build with cuda)
RUN CMAKE_ARGS="-DLLAMA_CUBLAS=on" FORCE_CMAKE=1 pip install llama-cpp-python==0.1.78

# Run the server
CMD python3 -m llama_cpp.server
