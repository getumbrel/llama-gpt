<p align="center">
  <a href="https://apps.umbrel.com/app/llama-gpt">
    <img width="150" height="150" src="https://i.imgur.com/F0h1k80.png" alt="LlamaGPT" width="200" />
  </a>
</p>
<p align="center">
  <h1 align="center">LlamaGPT</h1>
  <p align="center">
    A self-hosted, offline, ChatGPT-like chatbot, powered by Llama 2. 100% private, with no data leaving your device.
    <br />
    <a href="https://umbrel.com"><strong>umbrel.com »</strong></a>
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

https://github.com/getumbrel/llama-gpt/assets/10330103/71521963-6df2-4ffb-8fe1-f079e80d6a8b

## How to install

### Install LlamaGPT on your umbrelOS home server

Running LlamaGPT on an [umbrelOS](https://umbrel.com) home server is one click. Simply install it from the [Umbrel App Store](https://apps.umbrel.com/app/llama-gpt).

<!-- Todo: update badge link after launch  -->

[![LlamaGPT on Umbrel App Store](https://apps.umbrel.com/app/nostr-relay/badge-dark.svg)](https://apps.umbrel.com/app/llama-gpt)

### Install LlamaGPT anywhere else

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

## Acknowledgements

A massive thank you to the following developers and teams for making LlamaGPT possible:

- [Mckay Wrigley](https://github.com/mckaywrigley) for building [Chatbot UI](https://github.com/mckaywrigley).
- [Andrei](https://github.com/abetlen) for building the [Python bindings for llama.cpp](https://github.com/abetlen/llama-cpp-python).
- [NousResearch](https://nousresearch.com) for [fine-tuning the Llama 2 7B and 13B models](https://huggingface.co/NousResearch).
- [Tom Jobbins](https://huggingface.co/TheBloke) for [quantizing the Llama 2 models](https://huggingface.co/TheBloke/Nous-Hermes-Llama-2-7B-GGML).
- [Meta](https://ai.meta.com/llama) for releasing Llama 2 under a permissive license.

---

[![License](https://img.shields.io/github/license/getumbrel/llama-gpt?color=%235351FB)](https://github.com/getumbrel/llama-gpt/blob/master/LICENSE.md)

[umbrel.com](https://umbrel.com)
