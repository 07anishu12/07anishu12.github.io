---
title: "Best Chunking Strategies for RAG: Fixed Size, Overlapping and Semantic
  Chunking"
seoTitle: "RAG Chunking: Fixed Size, Overlap and Semantic Splits"
slug: rag-chunking-fixed-size-overlap-and-semantic-splits
description: Choose document boundaries using retrieval tests rather than a
  universal chunk-size rule.
category: technology
tags:
  - RAG chunking strategies
  - fixed size chunking
  - semantic chunking
  - chunk overlap
author: Aniket Thakur
datePublished: 2026-10-22
dateModified: 2026-10-22
coverImage: /assets/images/blog/rag-chunking-fixed-size-overlap-and-semantic-splits/cover.svg
coverImageAlt: Diagram explaining RAG chunking strategies
imageCaption: Original explanatory diagram showing RAG chunking strategies and
  its main decision points.
draft: false
featured: false
sources:
  - title: LangChain retrieval documentation
    url: https://docs.langchain.com/oss/python/langchain/retrieval
showSources: true
enquiry: false
quickAnswer:
  question: "Best Chunking Strategies for RAG: Fixed Size, Overlapping and
    Semantic Chunking: Key Verdict & Summary"
  answer: The best chunking strategy is the one that preserves answer-bearing
    context while retrieving precise evidence for your queries.
  facts:
    - label: Category & Focus
      value: RAG, vector databases and document chatbots
    - label: Verified Word Count
      value: 834 words
  goodFor:
    - Readers evaluating RAG chunking strategies.
    - Practitioners needing verified benchmarks and calculations.
  watchFor:
    - Verify dated prices and regional specifications before committing.
    - Review primary source disclosures and product documentation.
  note: 2026 Reference Edition · Verified Secondary Research
---

The best chunking strategy is the one that preserves answer-bearing context while retrieving precise evidence for your queries. Fixed-size, overlapping and semantic methods each have trade-offs. Start with a simple baseline, evaluate actual questions and change boundaries only when the error pattern shows why a different approach would help.

## Understand what a chunk must preserve

A chunk is a unit your retrieval system can index and return. Too little context may separate a statement from its condition or heading. Too much can mix several topics, making relevant evidence harder to rank and increasing the text sent to the generator.

Think about document structure first. A policy exception belongs with the rule it modifies; a table row needs headers; a code block may need its function signature. Blindly dividing a PDF by characters can destroy these relationships.

The [LangChain retrieval guide](https://docs.langchain.com/oss/python/langchain/retrieval) describes splitting as one component in a broader retrieval workflow. Chunking does not operate independently of extraction, embeddings, ranking and generation. A bad PDF reading order cannot be repaired simply by choosing a larger overlap.

Preserve document identifier, section, page and version with every chunk. Store offsets where useful so you can show the original context. Without provenance, a retrieved fragment can be difficult to cite, update or delete reliably.

## Compare the main approaches

Fixed-size splitting uses a chosen character, word or token budget. It is simple and reproducible, making it a useful baseline. Token-based counts align more closely with a particular model's budget, while character counts are easier to implement but vary substantially across languages.

Overlap repeats a portion of neighbouring chunks. It can preserve information near boundaries, but increases storage and may retrieve near-duplicates. More overlap is not free accuracy: repeated text can occupy the evidence budget without adding information.

Semantic or structure-aware splitting uses signals such as headings, paragraphs or embedding changes. It may preserve topic coherence better for some material, but requires extra logic or computation and can create uneven sizes. A short section may still need surrounding context.

For a hypothetical corpus, compare a plain fixed-size baseline with a heading-aware method. Keep the embedding model and retrieval limit fixed. Label any selected sizes as experiment settings, not recommended universal constants.

For tables, consider units that retain headers and relevant rows. For contracts, keep clause numbering and cross-references. For code, prefer meaningful symbols and neighbouring definitions where practical. These are design hypotheses to evaluate on the actual documents.

## Use evidence questions to decide

Create questions with expected answer passages. Include boundary cases where the evidence spans adjacent paragraphs, exact identifiers, multi-section questions and absent information. Use a held-out set when tuning so you do not optimise only for familiar examples.

Inspect retrieved chunks before evaluating generated answers. Record whether the needed evidence appears within the chosen top-k results and whether distracting duplicates displace useful passages. A large chunk can contain the answer while still being difficult for the generator to interpret accurately.

Measure retrieval quality, generation support, latency and index size. Separate gains from chunking from gains caused by a changed embedding model or reranker. Change one major component at a time to make the result explainable.

A useful improvement loop is to classify failures: extraction error, missing boundary context, weak query matching, stale source or unsupported generation. Only some of these call for different chunking. This prevents endless parameter changes that never address the real problem.

Re-index deliberately when boundaries change. Keep the chunking version with the corpus so old and new fragments are not silently mixed. Update deletion and access rules together with the index, especially for shared document collections.

Your next step is a small comparison with preserved questions and source evidence. Choose the simplest method that passes the important cases, then revisit it when document types or user questions change. There is no reliable magic chunk size that substitutes for this evaluation.

## Quick questions, clear answers

### Is a smaller chunk always more precise?

It can isolate a topic, but may omit the qualification needed to answer correctly. Precision also depends on ranking and query representation. Inspect whether a fragment remains understandable on its own and whether the application can retrieve neighbouring context when the answer requires it.

### How much overlap should I use?

Treat overlap as a tunable setting, not a fixed percentage everyone should copy. Begin with a modest baseline and test boundary-spanning questions. Monitor duplicated retrieval and storage growth. Keep additional overlap only when it improves useful evidence coverage enough to justify those costs.

### Can semantic chunking eliminate hallucinations?

No. It changes how evidence is organised and retrieved. The source may still be wrong, relevant passages may still be missed, and a generator may still invent unsupported details. Evaluate citation support and unanswerable questions separately from the quality of the split boundaries.

## About this guide

Aniket Thakur prepared this guide from secondary research checked on 22 October 2026. No first-hand software testing or performance benchmarking was conducted. Examples are instructional and require validation in your environment.
