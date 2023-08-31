<p align="center">
  <a href="https://apps.umbrel.com/app/llama-gpt">
    <img width="150" height="150" src="https://i.imgur.com/LI59cui.png" alt="LlamaGPT" width="200" />
  </a>
</p>
<p align="center">
  <h1 align="center">LlamaGPT</h1>
  <p align="center">
    A self-hosted, offline, ChatGPT-like chatbot, powered by Llama 2. 100% private, with no data leaving your device.
    <br/>
    <strong>New: Support for Code Llama models and Nvidia GPUs.</strong>
    <br />
    <br />
    <a href="https://umbrel.com"><strong>umbrel.com (we're hiring) »</strong></a>
    <br />
    <br />
    <a href="https://twitter.com/umbrel">
      <img src="https://img.shields.io/twitter/follow/umbrel?style=social" />
    </a>
    <a href="https://t.me/getumbrel">
      <img src="https://img.shields.io/badge/community-chat-%235351FB">
    </a>
    <a href="https://reddit.com/r/getumbrel">
      <img src="https://img.shields.io/reddit/subreddit-subscribers/getumbrel?style=social">
    </a>
    <a href="https://community.umbrel.com">
      <img src="https://img.shields.io/badge/community-forum-%235351FB">
    </a>
  </p>
</p>
<p align="center">
  <a href="https://umbrel.com/#start">
    <img src="https://i.imgur.com/sj5vqEG.jpg" width="100%" />
  </a>
</p>

## Contents

1. [Demo](#demo)
2. [Supported Models](#supported-models)
3. [How to install](#how-to-install)
   - [On umbrelOS home server](#install-llamagpt-on-your-umbrelos-home-server)
   - [On M1/M2 Mac](#install-llamagpt-on-m1m2-mac)
   - [Anywhere else with Docker](#install-llamagpt-anywhere-else-with-docker)
   - [Kubernetes](#install-llamagpt-with-kubernetes)
4. [OpenAI-compatible API](#openai-compatible-api)
5. [Benchmarks](#benchmarks)
6. [Roadmap and contributing](#roadmap-and-contributing)
7. [Acknowledgements](#acknowledgements)

## Demo

https://github.com/getumbrel/llama-gpt/assets/10330103/5d1a76b8-ed03-4a51-90bd-12ebfaf1e6cd

## Supported models

Currently, LlamaGPT supports the following models. Support for running custom models is on the roadmap.

| Model name                               | Model size | Model download size | Memory required |
| ---------------------------------------- | ---------- | ------------------- | --------------- |
| Nous Hermes Llama 2 7B Chat (GGML q4_0)  | 7B         | 3.79GB              | 6.29GB          |
| Nous Hermes Llama 2 13B Chat (GGML q4_0) | 13B        | 7.32GB              | 9.82GB          |
| Nous Hermes Llama 2 70B Chat (GGML q4_0) | 70B        | 38.87GB             | 41.37GB         |
| Code Llama 7B Chat (GGUF Q4_K_M)         | 7B         | 4.24GB              | 6.74GB          |
| Code Llama 13B Chat (GGUF Q4_K_M)        | 13B        | 8.06GB              | 10.56GB         |
| Phind Code Llama 34B Chat (GGUF Q4_K_M)  | 34B        | 20.22GB             | 22.72GB         |

## How to install

### Install LlamaGPT on your umbrelOS home server

Running LlamaGPT on an [umbrelOS](https://umbrel.com) home server is one click. Simply install it from the [Umbrel App Store](https://apps.umbrel.com/app/llama-gpt).

[![LlamaGPT on Umbrel App Store](https://apps.umbrel.com/app/llama-gpt/badge-light.svg)](https://apps.umbrel.com/app/llama-gpt)

### Install LlamaGPT on M1/M2 Mac

Make sure your have Docker and Xcode installed.

Then, clone this repo and `cd` into it:

```
git clone https://github.com/getumbrel/llama-gpt.git
cd llama-gpt
```

Run LlamaGPT with the following command:

```
./run-mac.sh --model 7b
```

You can access LlamaGPT at http://localhost:3000.

> To run 13B or 70B chat models, replace `7b` with `13b` or `70b` respectively.
> To run 7B, 13B or 34B Code Llama models, replace `7b` with `code-7b`, `code-13b` or `code-34b` respectively.

To stop LlamaGPT, do `Ctrl + C` in Terminal.

### Install LlamaGPT anywhere else with Docker

You can run LlamaGPT on any x86 or arm64 system. Make sure you have Docker installed.

Then, clone this repo and `cd` into it:

```
git clone https://github.com/getumbrel/llama-gpt.git
cd llama-gpt
```

Run LlamaGPT with the following command:

```
./run.sh --model 7b
```

Or if you have an Nvidia GPU, you can run LlamaGPT with CUDA support using the `--with-cuda` flag, like:

```
./run.sh --model 7b --with-cuda
```

You can access LlamaGPT at `http://localhost:3000`.

> To run 13B or 70B chat models, replace `7b` with `13b` or `70b` respectively.
> To run Code Llama 7B, 13B or 34B models, replace `7b` with `code-7b`, `code-13b` or `code-34b` respectively.

To stop LlamaGPT, do `Ctrl + C` in Terminal.

> Note: On the first run, it may take a while for the model to be downloaded to the `/models` directory. You may also see lots of output like this for a few minutes, which is normal:
>
> ```
> llama-gpt-llama-gpt-ui-1       | [INFO  wait] Host [llama-gpt-api-13b:8000] not yet available...
> ```
>
> After the model has been automatically downloaded and loaded, and the API server is running, you'll see an output like:
>
> ```
> llama-gpt-ui_1   | ready - started server on 0.0.0.0:3000, url: http://localhost:3000
> ```
>
> You can then access LlamaGPT at http://localhost:3000.

---

### Install LlamaGPT with Kubernetes

First, make sure you have a running Kubernetes cluster and `kubectl` is configured to interact with it.

Then, clone this repo and `cd` into it.

To deploy to Kubernetes first create a namespace:

```bash
kubectl create ns llama
```

Then apply the manifests under the `/deploy/kubernetes` directory with

```bash
kubectl apply -k deploy/kubernetes/. -n llama
```

Expose your service however you would normally do that.

## OpenAI compatible API

Thanks to llama-cpp-python, a drop-in replacement for OpenAI API is available at `http://localhost:3001`. Open http://localhost:3001/docs to see the API documentation.

## Benchmarks

We've tested LlamaGPT models on the following hardware with the default system prompt, and user prompt: "How does the universe expand?" at temperature 0 to guarantee deterministic results. Generation speed is averaged over the first 10 generations.

Feel free to add your own benchmarks to this table by opening a pull request.

#### Nous Hermes Llama 2 7B Chat (GGML q4_0)

| Device                              | Generation speed |
| ----------------------------------- | ---------------- |
| M1 Max MacBook Pro (64GB RAM)       | 54 tokens/sec    |
| GCP c2-standard-16 vCPU (64 GB RAM) | 16.7 tokens/sec  |
| Ryzen 5700G 4.4GHz 4c (16 GB RAM)   | 11.50 tokens/sec |
| GCP c2-standard-4 vCPU (16 GB RAM)  | 4.3 tokens/sec   |
| Umbrel Home (16GB RAM)              | 2.7 tokens/sec   |
| Raspberry Pi 4 (8GB RAM)            | 0.9 tokens/sec   |

#### Nous Hermes Llama 2 13B Chat (GGML q4_0)

| Device                              | Generation speed |
| ----------------------------------- | ---------------- |
| M1 Max MacBook Pro (64GB RAM)       | 20 tokens/sec    |
| GCP c2-standard-16 vCPU (64 GB RAM) | 8.6 tokens/sec   |
| GCP c2-standard-4 vCPU (16 GB RAM)  | 2.2 tokens/sec   |
| Umbrel Home (16GB RAM)              | 1.5 tokens/sec   |

#### Nous Hermes Llama 2 70B Chat (GGML q4_0)

| Device                              | Generation speed |
| ----------------------------------- | ---------------- |
| M1 Max MacBook Pro (64GB RAM)       | 4.8 tokens/sec   |
| GCP e2-standard-16 vCPU (64 GB RAM) | 1.75 tokens/sec  |
| GCP c2-standard-16 vCPU (64 GB RAM) | 1.62 tokens/sec  |

#### Code Llama 7B Chat (GGUF Q4_K_M)

| Device                        | Generation speed |
| ----------------------------- | ---------------- |
| M1 Max MacBook Pro (64GB RAM) | 41 tokens/sec    |

#### Code Llama 13B Chat (GGUF Q4_K_M)

| Device                        | Generation speed |
| ----------------------------- | ---------------- |
| M1 Max MacBook Pro (64GB RAM) | 25 tokens/sec    |

#### Phind Code Llama 34B Chat (GGUF Q4_K_M)

| Device                        | Generation speed |
| ----------------------------- | ---------------- |
| M1 Max MacBook Pro (64GB RAM) | 10.26 tokens/sec |

## Roadmap and contributing

We're looking to add more features to LlamaGPT. You can see the roadmap [here](https://github.com/getumbrel/llama-gpt/issues/8#issuecomment-1681321145). The highest priorities are:

- [x] Moving the model out of the Docker image and into a separate volume.
- [x] Add Metal support for M1/M2 Macs.
- [x] Add support for Code Llama models.
- [x] Add CUDA support for NVIDIA GPUs.
- [ ] Add ability to load custom models.
- [ ] Allow users to switch between models.

If you're a developer who'd like to help with any of these, please open an issue to discuss the best way to tackle the challenge. If you're looking to help but not sure where to begin, check out [these issues](https://github.com/getumbrel/llama-gpt/labels/good%20first%20issue) that have specifically been marked as being friendly to new contributors.

## Acknowledgements

A massive thank you to the following developers and teams for making LlamaGPT possible:

- [Mckay Wrigley](https://github.com/mckaywrigley) for building [Chatbot UI](https://github.com/mckaywrigley).
- [Georgi Gerganov](https://github.com/ggerganov) for implementing [llama.cpp](https://github.com/ggerganov/llama.cpp).
- [Andrei](https://github.com/abetlen) for building the [Python bindings for llama.cpp](https://github.com/abetlen/llama-cpp-python).
- [NousResearch](https://nousresearch.com) for [fine-tuning the Llama 2 7B and 13B models](https://huggingface.co/NousResearch).
- [Phind](https://www.phind.com/) for [fine-tuning the Code Llama 34B model](https://www.phind.com/blog/code-llama-beats-gpt4).
- [Tom Jobbins](https://huggingface.co/TheBloke) for [quantizing the Llama 2 models](https://huggingface.co/TheBloke/Nous-Hermes-Llama-2-7B-GGML).
- [Meta](https://ai.meta.com/llama) for releasing Llama 2 and Code Llama under a permissive license.

---

[![License](https://img.shields.io/github/license/getumbrel/llama-gpt?color=%235351FB)](https://github.com/getumbrel/llama-gpt/blob/master/LICENSE.md)

[umbrel.com](https://umbrel.com)
