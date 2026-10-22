---
title: "Haystack Tutorial: Build a Retrieval Pipeline for an AI Application"
seoTitle: "Haystack Tutorial: Build a Small Retrieval Pipeline"
slug: haystack-tutorial-build-a-small-retrieval-pipeline
description: Index synthetic documents and inspect a simple BM25 retrieval
  pipeline before adding generation.
category: technology
tags:
  - Haystack tutorial
  - BM25 retrieval
  - Haystack pipeline
  - document store
author: Aniket Thakur
datePublished: 2026-10-22
dateModified: 2026-10-22
coverImage: /assets/images/blog/haystack-tutorial-build-a-small-retrieval-pipeline/cover.svg
coverImageAlt: Diagram explaining Haystack tutorial
imageCaption: Original explanatory diagram showing Haystack tutorial and its
  main decision points.
draft: false
featured: false
sources:
  - title: Haystack official repository
    url: https://github.com/deepset-ai/haystack
  - title: Haystack BM25 retriever documentation
    url: https://docs.haystack.deepset.ai/docs/inmemorybm25retriever
  - title: deepset-ai/haystack official release metadata
    url: https://api.github.com/repos/deepset-ai/haystack/releases/latest
showSources: true
enquiry: false
quickAnswer:
  question: "Haystack Tutorial: Build a Retrieval Pipeline for an AI Application:
    Key Verdict & Summary"
  answer: Haystack lets you compose AI application components into explicit pipelines.
  facts:
    - label: Category & Focus
      value: RAG, vector databases and document chatbots
    - label: Verified Word Count
      value: 784 words
  goodFor:
    - Readers evaluating Haystack tutorial.
    - Practitioners needing verified benchmarks and calculations.
  watchFor:
    - Verify dated prices and regional specifications before committing.
    - Review primary source disclosures and product documentation.
  note: 2026 Reference Edition · Verified Secondary Research
---

Haystack lets you compose AI application components into explicit pipelines. Begin with document storage and retrieval before adding a generator. A small BM25 example is useful because you can inspect which passages are returned without confusing retrieval failures with language-model behaviour.

## Install the documented package

The [official Haystack repository](https://github.com/deepset-ai/haystack) identifies the package as `haystack-ai`. Install it in an isolated, compatible Python environment rather than an unrelated package with a similar name:

```text
python -m pip install haystack-ai
```

Record the version after installation and use matching documentation. The documentation site exposes multiple version tracks, so a code sample from an unstable track may differ from the release installed by your package manager.

This article's code follows the documented component names in the [InMemoryBM25Retriever guide](https://docs.haystack.deepset.ai/docs/inmemorybm25retriever). It is instructional and was not executed. Confirm the example against the exact installed release before building a larger application.

Use synthetic data initially. That removes the need to expose private documents while learning how document objects, stores and pipeline inputs fit together. Label the example facts so they are never mistaken for real campus information.

## Index documents and retrieve them

Save a minimal script using the documented in-memory store and retriever:

```python
from haystack import Document, Pipeline
from haystack.document_stores.in_memory import InMemoryDocumentStore
from haystack.components.retrievers.in_memory import InMemoryBM25Retriever

store = InMemoryDocumentStore()
store.write_documents([
    Document(content="Synthetic example: library closes at 6 pm."),
    Document(content="Synthetic example: fee questions go to accounts."),
])
retriever = InMemoryBM25Retriever(document_store=store)
pipeline = Pipeline()
pipeline.add_component("retriever", retriever)
result = pipeline.run({"retriever": {"query": "library closing time"}})
for document in result["retriever"]["documents"]:
    print(document.content)
```

The code deliberately retrieves text rather than generating an answer. Inspect the returned documents and their order. With two tiny records, this demonstrates interfaces, not a meaningful search-quality benchmark.

BM25 is a lexical retrieval approach, so word choice matters. Try a query sharing clear document terms, then a paraphrase that avoids them. The difference helps explain when semantic retrieval or hybrid search might be useful.

Add metadata such as source identifier, version and access group when moving beyond the demonstration. A passage without provenance can be hard to cite or update. Preserve the source relationship during splitting and indexing.

## Expand the pipeline one measured step at a time

Create a small collection with questions and expected evidence. Include an exact identifier, an ordinary paraphrase and an unanswerable question. Check retrieval quality before adding a generator, reranker or agent.

For semantic retrieval, choose a compatible embedding model and corresponding retriever/store integration. Keep embedding versions and vector dimensions consistent. Changing the model generally requires an explicit re-embedding plan; equal vector length does not guarantee compatible meaning.

When adding generation, pass retrieved passages through a documented prompt-building component and ask for evidence-linked answers. Keep missing evidence visible. A model can produce a convincing response even when the retrieved text contains no answer.

Connect components using their declared inputs and outputs, then inspect the final rendered prompt. A correctly named pipeline does not prove the intended documents reached generation. Log enough structure to debug without unnecessarily retaining sensitive text.

In-memory storage suits a small demonstration, but production needs persistence, access control, backups and resource planning. Check the specific document-store integration's capabilities and licence rather than assuming all stores behave identically.

Measure failures independently: parsing, indexing, retrieval, provider availability and answer support. This makes improvement targeted. Replacing the generator will not repair a missing document, and adding more retrieved passages can increase noise as well as recall.

Your next step is a reproducible retrieval test over a modest corpus with stable document identifiers. Add generation only after you can explain why relevant passages appear and how the application handles absent or unauthorised evidence.

## Quick questions, clear answers

### Is BM25 outdated because embeddings exist?

No. Lexical search is useful for exact names, technical terms and identifiers. Semantic methods help with paraphrases, while hybrid approaches can combine strengths. Choose using your query set rather than assuming one representation always retrieves the best evidence.

### Why start without an LLM?

It isolates retrieval behaviour. You can see whether the correct passage was found before evaluating how a generator interprets it. This separation prevents spending time on prompts or model changes when the underlying problem is missing, badly parsed or poorly ranked evidence.

### Is the in-memory store a production database?

It is useful for learning and small controlled experiments, but production requirements need separate assessment. Check durability, indexing, access filters, concurrency and backup behaviour. Do not assume a successful tutorial run establishes that a store can support a larger shared application reliably.

## About this guide

Aniket Thakur prepared this guide from secondary research checked on 22 October 2026. No first-hand software testing or performance benchmarking was conducted. Examples are instructional and require validation in your environment.
