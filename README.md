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

## Demo

https://github.com/getumbrel/llama-gpt/assets/10330103/5d1a76b8-ed03-4a51-90bd-12ebfaf1e6cd

## How to install

### Install LlamaGPT on your umbrelOS home server

Running LlamaGPT on an [umbrelOS](https://umbrel.com) home server is one click. Simply install it from the [Umbrel App Store](https://apps.umbrel.com/app/llama-gpt).

[![LlamaGPT on Umbrel App Store](https://apps.umbrel.com/app/llama-gpt/badge-light.svg)](https://apps.umbrel.com/app/llama-gpt)

---

### Install LlamaGPT anywhere else with Docker

You can run LlamaGPT on any x86 or arm64 system. Make sure you have Docker installed.

Then, clone this repo and `cd` into it:

```
git clone https://github.com/getumbrel/llama-gpt.git
cd llama-gpt
```

You can now run LlamaGPT with any of the following models depending upon your hardware:

| Model size | Model used                          | Minimum RAM required | How to start LlamaGPT                            |
| ---------- | ----------------------------------- | -------------------- | ------------------------------------------------ |
| 7B         | Nous Hermes Llama 2 7B (GGML q4_0)  | 8GB                  | `docker compose up -d`                           |
| 13B        | Nous Hermes Llama 2 13B (GGML q4_0) | 16GB                 | `docker compose -f docker-compose-13b.yml up -d` |
| 70B        | Meta Llama 2 70B Chat (GGML q4_0)   | 48GB                 | `docker compose -f docker-compose-70b.yml up -d` |

You can access LlamaGPT at `http://localhost:3000`.

To stop LlamaGPT, run:

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

## Benchmarks

We've tested LlamaGPT models on the following hardware with the default system prompt, and user prompt: "How does the universe expand?" at temperature 0 to guarantee deterministic results. Generation speed is averaged over the first 10 generations.

Feel free to add your own benchmarks to this table by opening a pull request.

### Nous Hermes Llama 2 7B (GGML q4_0)

| Device                           | Generation speed |
| -------------------------------- | ---------------- |
| M1 Max MacBook Pro (10 64GB RAM) | 8.2 tokens/sec   |
| Umbrel Home (16GB RAM)           | 2.7 tokens/sec   |
| Raspberry Pi 4 (8GB RAM)         | 0.9 tokens/sec   |

### Nous Hermes Llama 2 13B (GGML q4_0)

| Device                        | Generation speed |
| ----------------------------- | ---------------- |
| M1 Max MacBook Pro (64GB RAM) | 3.7 tokens/sec   |
| Umbrel Home (16GB RAM)        | 1.5 tokens/sec   |

### Meta Llama 2 70B Chat (GGML q4_0)

| Device                              | Generation speed |
| ----------------------------------- | ---------------- |
| M2 Max MacBook Pro (96GB RAM)       | 0.69 tokens/sec  |
| GCP e2-standard-16 vCPU (64 GB RAM) | 1.75 tokens/sec  |

## Roadmap and contributing

We're looking to add more features to LlamaGPT. You can see the roadmap [here](https://github.com/getumbrel/llama-gpt/issues/8#issuecomment-1681321145). The highest priorities are:

- Add CUDA and Metal support (work in progress).
- Moving the model out of the Docker image and into a separate volume (work in progress).
- Updating the front-end to show model download progress, and to allow users to switch between models.
- Making it easy to run custom models.

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
