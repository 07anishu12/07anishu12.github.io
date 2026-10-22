---
title: Which LLM Can Run on 8 GB RAM and a 4 GB GPU?
seoTitle: Local LLMs on 8 GB RAM and a 4 GB GPU
slug: local-llms-on-8-gb-ram-and-a-4-gb-gpu
description: Estimate a realistic memory budget and test a small model before
  upgrading hardware.
category: technology
tags:
  - LLM on 8 GB RAM
  - 4 GB GPU LLM
  - small language models
  - quantisation
author: Aniket Thakur
datePublished: 2026-10-22
dateModified: 2026-10-22
coverImage: /assets/images/blog/local-llms-on-8-gb-ram-and-a-4-gb-gpu/cover.svg
coverImageAlt: Diagram explaining LLM on 8 GB RAM
imageCaption: Original explanatory diagram showing LLM on 8 GB RAM and its main
  decision points.
draft: false
featured: false
sources:
  - title: Transformers cache strategies
    url: https://huggingface.co/docs/transformers/main/en/kv_cache
  - title: llama.cpp official repository
    url: https://github.com/ggml-org/llama.cpp
showSources: true
enquiry: false
quickAnswer:
  question: Which LLM Can Run on 8 GB RAM and a 4 GB GPU?
  answer: With 8 GB system RAM and a 4 GB discrete GPU, start by testing a small
    quantised model, short context and one request at a time.
  facts:
    - label: Category & Focus
      value: Local AI and hardware
    - label: Verified Word Count
      value: 826 words
  goodFor:
    - Readers evaluating LLM on 8 GB RAM.
    - Practitioners needing verified benchmarks and calculations.
  watchFor:
    - Verify dated prices and regional specifications before committing.
    - Review primary source disclosures and product documentation.
  note: 2026 Reference Edition · Verified Secondary Research
---

With 8 GB system RAM and a 4 GB discrete GPU, start by testing a small quantised model, short context and one request at a time. Some configurations may work well for limited tasks, but no parameter count guarantees a comfortable fit. Account for operating-system use, GPU overhead and context memory before choosing weights.

## Count memory pools correctly

A discrete GPU's 4 GB VRAM and the computer's 8 GB RAM are separate pools. An inference engine may distribute work between them, but that does not make them a single fast 12 GB allocation. Transfers and CPU computation can change response time considerably.

An integrated or unified-memory system behaves differently. Check what hardware you actually own before applying advice intended for a separate graphics card. The same “8 GB” label can describe very different constraints.

Use a simple storage estimate to reject obviously oversized choices. Idealised weight bytes equal parameters multiplied by bits per parameter divided by eight. A hypothetical two-billion-parameter model at four bits requires about one billion bytes for weights alone. Conversion metadata, unquantised tensors and alignment add overhead.

Inference also needs working buffers and a cache for processing the conversation. The [Transformers cache documentation](https://huggingface.co/docs/transformers/main/en/kv_cache) explains cache strategies and their memory trade-offs. A model can load successfully yet fail when the prompt becomes longer.

## Choose a narrow starting workload

Begin with a small instruction model whose architecture and quantisation are supported by your runtime. Inspect the original model card and licence, and trace any community conversion back to its source. Avoid treating a popular filename as evidence of safety or capability.

Define a limited task: explaining a short code snippet, rewriting a paragraph or extracting fields from a small document. These are easier starting points than an entire codebase or long research report. Smaller inputs reduce memory pressure and make answers easier to check.

Set a short context and capped output for the first test. Close memory-heavy applications and watch both RAM and VRAM. Record the model revision, quantisation, runtime and settings so a successful run can be reproduced.

The [llama.cpp repository](https://github.com/ggml-org/llama.cpp) documents CPU and mixed CPU/GPU inference paths. Such support provides options, not a guaranteed speed result. Verify whether your particular GPU and installed backend are compatible before planning around offloading.

Do not use a large reasoning output budget simply because the model accepts it. Extra generated tokens consume time and may extend the cache. Judge whether the final answer improves enough to justify the delay.

## Test capacity and usefulness separately

First establish whether the model loads and completes a short prompt without memory errors. Then evaluate whether the answer is useful. A tiny model can be perfectly stable while failing the reasoning or language requirements of your project.

Increase input length in small steps. Monitor whether the machine starts swapping, becomes unresponsive or produces failures. Stop when the configuration undermines normal computer use; a technically completed request may still be an unsuitable daily workflow.

Measure initial loading separately from warmed generation. For each task, note first-token delay, total time and correctness. Keep the same output limit when comparing a smaller model with a more compressed larger one.

If you encounter failures, reduce context first and model size next. Avoid changing many advanced settings simultaneously. A clear baseline is more useful than a collection of unexplained flags from different hardware guides.

Compare the cost of upgrading with the actual workload. Occasional non-sensitive tasks may fit a hosted service, while offline or confidential work may justify more local capacity. This is a deployment decision, not a statement that one option is universally cheaper or safer.

Your next step is a modest pilot with two small candidates and ten representative prompts. Choose based on measured adequacy and comfortable system behaviour. Do not buy hardware merely to satisfy an unsupported model-size recommendation.

## Quick questions, clear answers

### Can a seven-billion-parameter model fit?

Possibly under particular quantisation, offloading and context settings, but a blanket promise would be misleading. Weight size is only one component of memory demand. Check the exact artefact and runtime, then test the longest input you expect rather than a single short greeting.

### Will adding system RAM fix a small GPU?

It can help CPU inference or offloading capacity, but it does not enlarge discrete VRAM. The performance effect depends on how the engine places weights and computation. Diagnose the actual bottleneck before purchasing an upgrade so increased capacity addresses the problem you observed.

### What is a sensible first model size?

Choose a small supported instruction checkpoint with generous memory headroom, then evaluate its answers. There is no universal threshold independent of architecture and context. A candidate that leaves the computer responsive and meets your narrow task is preferable to a larger unstable configuration.

## About this guide

Aniket Thakur prepared this guide from secondary research checked on 22 October 2026. No first-hand software testing or performance benchmarking was conducted. Examples are instructional and require validation in your environment.
