<p align="center">
  <a href="https://apps.umbrel.com/app/llama-gpt">
    <img width="150" height="150" src="https://i.imgur.com/LI59cui.png" alt="LlamaGPT" width="200" />
  </a>
</p>
<p align="center">
  <h1 align="center">LlamaGPT</h1>
  <p align="center">
    A self-hosted, offline, ChatGPT-like chatbot, powered by Llama 2. 100% private, with no data leaving your device.
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
   - [Anywhere else with Docker (CPU only)](#install-llamagpt-anywhere-else-with-docker-cpu-only)
   - [Kubernetes](#install-llamagpt-with-kubernetes)
4. [OpenAI-compatible API](#openai-compatible-api)
5. [Benchmarks](#benchmarks)
6. [Roadmap and contributing](#roadmap-and-contributing)
7. [Acknowledgements](#acknowledgements)

## Demo

https://github.com/getumbrel/llama-gpt/assets/10330103/5d1a76b8-ed03-4a51-90bd-12ebfaf1e6cd

## Supported models

Currently, LlamaGPT supports the following models. Support for running custom models is on the roadmap.

| Model name                               | Model size | Model download size | RAM required |
| ---------------------------------------- | ---------- | ------------------- | ------------ |
| Nous Hermes Llama 2 7B Chat (GGML q4_0)  | 7B         | 3.79GB              | 6.29GB       |
| Nous Hermes Llama 2 13B Chat (GGML q4_0) | 13B        | 7.32GB              | 9.82GB       |
| Meta Llama 2 70B Chat (GGML q4_0)        | 70B        | 38.87GB             | 41.37GB      |

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

To run 13B or 70B models, replace `7b` with `13b` or `70b` respectively.

To stop LlamaGPT, do `Ctrl + C` in Terminal.

### Install LlamaGPT anywhere else with Docker (CPU only)

You can run LlamaGPT on any x86 or arm64 system. Make sure you have Docker installed.

Then, clone this repo and `cd` into it:

```
git clone https://github.com/getumbrel/llama-gpt.git
cd llama-gpt
```

To run the 7B model, run:

```
docker compose up
```

To run the 13B model, run:

```
docker compose -f docker-compose-13b.yml up
```

To run the 70B model, run:

```
docker compose -f docker-compose-70b.yml up
```

> Note: On the first run, it may take a while for the model to be downloaded to the `/models` directory. You may see lots of output like for a few minutes, which is normal:
>
> ```
> llama-gpt-llama-gpt-ui-1       | [INFO  wait] Host [llama-gpt-api-13b:8000] not yet available...
> ```
> 
> After the model has been downloaded and loaded, and the API server is running, you'll see an output like:
> 
> ```
> llama-gpt-llama-gpt-api-13b-1  | INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
> ```
> 
> You can then access LlamaGPT at `http://localhost:3000`.

To stop LlamaGPT, either do `Ctrl + C` or run:

```
docker compose down
```

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

#### Nous Hermes Llama 2 7B (GGML q4_0)

| Device                                            | Generation speed |
| ------------------------------------------------- | ---------------- |
| M1 Max MacBook Pro (64GB RAM) with `./run-mac.sh` | 54 tokens/sec    |
| M1 Max MacBook Pro (64GB RAM) with Docker         | 8.2 tokens/sec   |
| Umbrel Home (16GB RAM)                            | 2.7 tokens/sec   |
| Raspberry Pi 4 (8GB RAM)                          | 0.9 tokens/sec   |

#### Nous Hermes Llama 2 13B (GGML q4_0)

| Device                                            | Generation speed |
| ------------------------------------------------- | ---------------- |
| M1 Max MacBook Pro (64GB RAM) with `./run-mac.sh` | 20 tokens/sec    |
| M1 Max MacBook Pro (64GB RAM) with Docker         | 3.7 tokens/sec   |
| Umbrel Home (16GB RAM)                            | 1.5 tokens/sec   |

#### Meta Llama 2 70B Chat (GGML q4_0)

| Device                                            | Generation speed |
| ------------------------------------------------- | ---------------- |
| M1 Max MacBook Pro (64GB RAM) with `./run-mac.sh` | 4.8 tokens/sec   |
| GCP e2-standard-16 vCPU (64 GB RAM)               | 1.75 tokens/sec  |
| M2 Max MacBook Pro (96GB RAM) with Docker         | 0.69 tokens/sec  |

## Roadmap and contributing

We're looking to add more features to LlamaGPT. You can see the roadmap [here](https://github.com/getumbrel/llama-gpt/issues/8#issuecomment-1681321145). The highest priorities are:

- [x] Moving the model out of the Docker image and into a separate volume.
- [x] Add Metal support for M1/M2 Macs.
- [ ] Add CUDA support for NVIDIA GPUs (work in progress).
- [ ] Add ability to load custom models.
- [ ] Allow users to switch between models.
- [ ] Making it easy to run custom models.

If you're a developer who'd like to help with any of these, please open an issue to discuss the best way to tackle the challenge. If you're looking to help but not sure where to begin, check out [these issues](https://github.com/getumbrel/llama-gpt/labels/good%20first%20issue) that have specifically been marked as being friendly to new contributors.

## Acknowledgements

A massive thank you to the following developers and teams for making LlamaGPT possible:

- [Mckay Wrigley](https://github.com/mckaywrigley) for building [Chatbot UI](https://github.com/mckaywrigley).
- [Georgi Gerganov](https://github.com/ggerganov) for implementing [llama.cpp](https://github.com/ggerganov/llama.cpp).
- [Andrei](https://github.com/abetlen) for building the [Python bindings for llama.cpp](https://github.com/abetlen/llama-cpp-python).
- [NousResearch](https://nousresearch.com) for [fine-tuning the Llama 2 7B and 13B models](https://huggingface.co/NousResearch).
- [Tom Jobbins](https://huggingface.co/TheBloke) for [quantizing the Llama 2 models](https://huggingface.co/TheBloke/Nous-Hermes-Llama-2-7B-GGML).
- [Meta](https://ai.meta.com/llama) for releasing Llama 2 under a permissive license.

---

[![License](https://img.shields.io/github/license/getumbrel/llama-gpt?color=%235351FB)](https://github.com/getumbrel/llama-gpt/blob/master/LICENSE.md)

[umbrel.com](https://umbrel.com)
