---
title: "Q4 vs Q5 vs FP16: How Model Quantisation Changes Memory and Quality"
seoTitle: "Q4 vs Q5 vs FP16: Model Quantisation Explained"
slug: q4-vs-q5-vs-fp16-model-quantisation-explained
description: Compare idealised weight storage, runtime support and task-specific
  quality trade-offs.
category: technology
tags:
  - Q4 vs Q5 vs FP16
  - model quantisation
  - LLM memory
  - quantised weights
author: Aniket Thakur
datePublished: 2026-10-22
dateModified: 2026-10-22
coverImage: /assets/images/blog/q4-vs-q5-vs-fp16-model-quantisation-explained/cover.svg
coverImageAlt: Diagram explaining Q4 vs Q5 vs FP16
imageCaption: Original explanatory diagram showing Q4 vs Q5 vs FP16 and its main
  decision points.
draft: false
featured: false
sources:
  - title: Transformers quantisation overview
    url: https://huggingface.co/docs/transformers/main/en/quantization/overview
  - title: llama.cpp official repository
    url: https://github.com/ggml-org/llama.cpp
showSources: true
enquiry: false
quickAnswer:
  question: "Q4 vs Q5 vs FP16: How Model Quantisation Changes Memory and Quality:
    Key Verdict & Summary"
  answer: Q4 and Q5 commonly describe low-bit weight quantisations, while FP16 is
    a 16-bit floating-point representation.
  facts:
    - label: Category & Focus
      value: Local AI and hardware
    - label: Verified Word Count
      value: 768 words
  goodFor:
    - Readers evaluating Q4 vs Q5 vs FP16.
    - Practitioners needing verified benchmarks and calculations.
  watchFor:
    - Verify dated prices and regional specifications before committing.
    - Review primary source disclosures and product documentation.
  note: 2026 Reference Edition · Verified Secondary Research
---

Q4 and Q5 commonly describe low-bit weight quantisations, while FP16 is a 16-bit floating-point representation. Lower-bit weights can reduce model storage and memory demand, but labels do not establish universal quality or speed. Compare the same original checkpoint, conversion method and runtime before choosing the smallest file.

## Read the label without overinterpreting it

Quantisation represents numbers using fewer bits or a more constrained numeric scheme. The [Transformers quantisation overview](https://huggingface.co/docs/transformers/main/en/quantization/overview) documents multiple methods rather than one interchangeable four-bit format. Hardware and engine support differ across methods.

A name such as Q4 can conceal details about block sizes, scaling information, mixed precision and calibration. Two four-bit files need not have identical memory usage or accuracy. Keep the complete filename, method and converter provenance in your experiment record.

FP16 is not automatically the original training precision or an error-free reference. It is one representation with its own numerical properties. For a fair comparison, establish what source weights each artefact came from and whether anything besides quantisation changed.

The [llama.cpp repository](https://github.com/ggml-org/llama.cpp) lists several supported quantisation levels. Its support should be checked against the exact model architecture and release. A filename that another engine accepts may still be incompatible with your chosen tool.

## Estimate storage, then budget runtime memory

For a hypothetical dense model with one billion parameters, idealised weight storage is parameter count multiplied by bits divided by eight. This rough comparison ignores metadata and implementation overhead:

| Representation | Idealised bytes per parameter | Idealised storage for 1B parameters |
|---|---:|---:|
| Four bits | 0.5 | 0.5 billion bytes |
| Five bits | 0.625 | 0.625 billion bytes |
| FP16 | 2 | 2 billion bytes |

These are arithmetic illustrations, not measured download sizes. Real formats contain scales, headers, alignment and sometimes tensors retained at higher precision. Use the actual artefact size when planning disk space.

Runtime demand adds attention caches, buffers, application overhead and any simultaneously loaded components. A four-bit weight file does not imply every part of generation uses four-bit arithmetic. Long context can raise memory usage even when model weights stay fixed.

Leave capacity for the operating system and ordinary work. If a Q5 version almost exhausts memory while Q4 leaves comfortable headroom, the lower-bit option may deliver a better experience. That remains conditional on acceptable answer quality.

## Compare accuracy where your application is sensitive

Use one checkpoint and a fixed set of prompts. Keep input formatting, generation settings and output limits constant. Otherwise a change in template or sampling can be mistaken for a quantisation effect.

Include demanding examples. For code, test precise API usage and small logic changes. For extraction, check exact fields and missing values. For multilingual tasks, include the scripts and terminology you need. A general English conversation can miss important degradation.

Measure correctness before speed. Then record first-token delay, output throughput, full completion time and peak memory. Distinguish cold loading from warm generation and report failed requests. No benchmark was conducted for this guide, so it supplies no accuracy-loss percentage or speed multiplier.

Do not select a larger, more aggressively compressed model merely because its parameter count sounds better. Compare it against a smaller model at gentler precision. The winner can change with the task and memory budget.

Choose the least expensive configuration that clears a defined quality threshold and remains stable at your intended context length. Preserve the selected artefact and its licence information so later updates can be evaluated against a reproducible baseline.

## Quick questions, clear answers

### Is Q5 always better than Q4?

It can retain more numeric information under a comparable method, but that does not guarantee a meaningful improvement on your task. Different conversion settings and source checkpoints complicate the comparison. Test the actual files under equal conditions and include memory pressure in the decision.

### Does quantisation guarantee faster generation?

No. Speed depends on available kernels, hardware, memory traffic and runtime implementation. A smaller file may load more easily without generating faster on a particular device. Measure the operation you care about rather than assuming compression translates directly into a fixed performance gain.

### Can I quantise an already quantised model again?

Repeated lossy conversion can introduce additional errors and may not be supported sensibly. Prefer a documented conversion from an appropriate source checkpoint. Keep provenance clear, and avoid distributing a re-converted artefact without checking both its licence and quality against the intended original.

## About this guide

Aniket Thakur prepared this guide from secondary research checked on 22 October 2026. No first-hand software testing or performance benchmarking was conducted. Examples are instructional and require validation in your environment.
