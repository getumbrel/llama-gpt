FROM rocm/dev-ubuntu-22.04

# We need to set the host to 0.0.0.0 to allow outside access
ENV HOST 0.0.0.0

RUN apt-get update && apt-get upgrade -y \
    && apt-get install -y git build-essential \
    python3 python3-pip gcc wget \
    rocm-dev rocm-libs rocblas hipblas \
    && mkdir -p /etc/OpenCL/vendors && echo "libamdocl64.so" > /etc/OpenCL/vendors/amd.icd

COPY . .

# setting build related env vars
ENV ROCM_DOCKER_ARCH=all
ENV LLAMA_HIPBLAS=1

# Install dependencies
RUN python3 -m pip install --upgrade pip pytest cmake scikit-build setuptools fastapi uvicorn sse-starlette pydantic-settings

# Install llama-cpp-python 0.1.78 which has GGML support (build with rocm)
RUN CMAKE_ARGS="-DLLAMA_HIPBLAS=on" FORCE_CMAKE=1 pip install llama-cpp-python==0.1.78

# Run the server
CMD python3 -m llama_cpp.server
