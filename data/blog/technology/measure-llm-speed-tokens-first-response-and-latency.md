---
title: "How to Measure LLM Speed: Tokens per Second, Time to First Token and Latency"
seoTitle: "Measure LLM Speed: Tokens, First Response and Latency"
slug: measure-llm-speed-tokens-first-response-and-latency
description: Create a repeatable speed test that also records answer quality and failures.
category: technology
tags:
  - LLM speed test
  - tokens per second
  - time to first token
  - inference latency
author: Aniket Thakur
datePublished: 2026-10-22
dateModified: 2026-10-22
coverImage: /assets/images/blog/measure-llm-speed-tokens-first-response-and-latency/cover.svg
coverImageAlt: Diagram explaining LLM speed test
imageCaption: Original explanatory diagram showing LLM speed test and its main
  decision points.
draft: false
featured: false
sources:
  - title: vLLM quickstart
    url: https://docs.vllm.ai/en/latest/getting_started/quickstart/
  - title: Inspect official repository
    url: https://github.com/UKGovernmentBEIS/inspect_ai
showSources: true
enquiry: false
quickAnswer:
  question: "How to Measure LLM Speed: Tokens per Second, Time to First Token and
    Latency: Key Verdict & Summary"
  answer: "Measure LLM speed with several numbers: time to first token,
    output-generation rate and complete request latency."
  facts:
    - label: Category & Focus
      value: Local AI and hardware
    - label: Verified Word Count
      value: 804 words
  goodFor:
    - Readers evaluating LLM speed test.
    - Practitioners needing verified benchmarks and calculations.
  watchFor:
    - Verify dated prices and regional specifications before committing.
    - Review primary source disclosures and product documentation.
  note: 2026 Reference Edition · Verified Secondary Research
---

Measure LLM speed with several numbers: time to first token, output-generation rate and complete request latency. Keep the model, hardware, prompts and generation settings fixed, and record quality alongside timing. A high tokens-per-second result does not prove a better experience if users wait a long time for generation to begin.

## Define the measurements before testing

Time to first token measures the delay between sending a request and receiving the first generated token, using a clearly stated measurement boundary. A client-side measurement can include network and queueing; a server-side measurement may not. State which one you report.

End-to-end latency measures the full request through completion. It includes stages such as prompt processing and generation, plus network or application overhead depending on the boundary. For a user-facing product, client-observed time is usually important even if it is harder to diagnose.

Output rate divides generated token count by the measured generation interval. A hypothetical response producing 100 tokens over five seconds after generation begins has an illustrative rate of 20 tokens per second. That says nothing about any delay before those five seconds.

Tokens depend on the tokenizer. Different models can encode the same sentence differently, so cross-model tokens-per-second comparisons need care. Record character or task completion information when it helps explain the practical result.

## Build a small repeatable workload

Create a fixed prompt set representing expected use: short questions, long inputs and outputs of differing lengths. Include difficult or malformed requests. Avoid testing only a repeated greeting that benefits unusually from caching.

Record model identifier and revision, precision, runtime version, hardware, context configuration, sampling settings and maximum output. Keep a copy of the actual request. Without those details, another person cannot reproduce the result or explain a later change.

The [vLLM quickstart](https://docs.vllm.ai/en/latest/getting_started/quickstart/) documents a serving workflow useful for controlled requests. Regardless of engine, use its documented timing or usage fields where available and distinguish those from client timers. Do not mix nanoseconds, milliseconds and seconds.

Test cold startup separately from warm operation. If the model loads during the first request, that result reflects startup as well as inference. Report both when startup matters to the application; do not quietly discard it because the number looks worse.

Run repeated trials, keeping the number of trials and aggregation method explicit. A small number can reveal obvious differences but cannot support precise reliability claims. Retain individual observations rather than only the best run.

## Add concurrency, quality and resource limits

After establishing a single-request baseline, introduce the expected concurrent workload. Watch queueing, peak memory, cancellations and failures. Overall throughput can improve while some users experience longer waits.

Report latency percentiles when the sample is large enough to interpret them meaningfully. Include timeout and error rates. A service completing only easy requests can produce an attractive average while failing the work users care about.

Check whether every timed answer satisfies the task. For coding, run meaningful tests; for extraction, compare fields with expected values; for summaries, inspect omissions. An incomplete answer stopped by a small output limit should not count as an equally useful faster completion.

The [Inspect evaluation framework](https://github.com/UKGovernmentBEIS/inspect_ai) provides a structured route for model evaluations. A lightweight spreadsheet can also work for an early pilot. The requirement is an inspectable protocol and preserved results, not a particular tool.

When comparing local and hosted models, include the complete application path. Network delay, retrieval and validation can dominate the model's own timing. For production planning, test realistic documents and tool calls rather than isolated generation alone.

Your next step is a written benchmark protocol before changing hardware or runtimes. Define success as useful work completed within a stated delay and resource budget. Publish measured results with conditions, not a universal speed claim detached from the actual task.

## Quick questions, clear answers

### Should I include prompt-processing time?

Yes, when reporting the user's complete wait. You can also report generation-only speed for diagnosis, but label it clearly. Long-input applications may spend significant time before the first output, so a generation rate alone can misrepresent their responsiveness.

### Can I compare different tokenizers directly?

Only with an explanation of what the comparison means. Tokens are not a uniform quantity of text across models or languages. Pair token rates with task completion time and output quality, and avoid interpreting the same numerical rate as identical reading speed or useful work.

### Does one fast run prove a configuration is better?

No. Startup, caching, background load and sampling can affect observations. Repeat under controlled conditions and preserve failures. A stronger conclusion needs a representative workload and enough observations to distinguish a consistent difference from ordinary variation.

## About this guide

Aniket Thakur prepared this guide from secondary research checked on 22 October 2026. No first-hand software testing or performance benchmarking was conducted. Examples are instructional and require validation in your environment.
