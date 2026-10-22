---
title: How to Use PostgreSQL and pgvector for Semantic Search
seoTitle: "PostgreSQL and pgvector: Build Semantic Search"
slug: postgresql-and-pgvector-build-semantic-search
description: Create vector storage, run a distance query and plan a real embedding pipeline.
category: technology
tags:
  - PostgreSQL pgvector tutorial
  - semantic search SQL
  - vector extension
  - HNSW index
author: Aniket Thakur
datePublished: 2026-10-22
dateModified: 2026-10-22
coverImage: /assets/images/blog/postgresql-and-pgvector-build-semantic-search/cover.svg
coverImageAlt: Diagram explaining PostgreSQL pgvector tutorial
imageCaption: Original explanatory diagram showing PostgreSQL pgvector tutorial
  and its main decision points.
draft: false
featured: false
sources:
  - title: pgvector official repository
    url: https://github.com/pgvector/pgvector
showSources: true
enquiry: false
quickAnswer:
  question: "How to Use PostgreSQL and pgvector for Semantic Search: Key Verdict &
    Summary"
  answer: PostgreSQL with pgvector stores embedding vectors beside ordinary
    relational data and lets SQL retrieve nearby vectors.
  facts:
    - label: Category & Focus
      value: RAG, vector databases and document chatbots
    - label: Verified Word Count
      value: 789 words
  goodFor:
    - Readers evaluating PostgreSQL pgvector tutorial.
    - Practitioners needing verified benchmarks and calculations.
  watchFor:
    - Verify dated prices and regional specifications before committing.
    - Review primary source disclosures and product documentation.
  note: 2026 Reference Edition · Verified Secondary Research
---

PostgreSQL with pgvector stores embedding vectors beside ordinary relational data and lets SQL retrieve nearby vectors. A working semantic-search application also needs a compatible embedding model, source metadata and access filters. Start with a tiny synthetic SQL example, then replace illustrative vectors with embeddings generated consistently from your real documents.

## Enable the extension in a prepared database

Follow the [official pgvector repository](https://github.com/pgvector/pgvector) to install the extension for your PostgreSQL version and operating environment. A managed database may require enabling an available extension rather than compiling it yourself. Check provider support before changing a production database.

Once the extension is installed on the server, enable it in a development database:

```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

Use a role with the required privileges for setup, then a narrower application role for ordinary queries. Do not give a chatbot administrative database access merely because the installation step needed elevated permissions.

Create a demonstration table:

```sql
CREATE TABLE demo_passages (
    id bigserial PRIMARY KEY,
    source text NOT NULL,
    content text NOT NULL,
    embedding vector(3) NOT NULL
);
```

The three dimensions are for an explicitly synthetic demonstration. Real embedding models produce their own dimensions, which must match your schema. These SQL examples were not executed for this guide.

## Insert synthetic vectors and query distance

Add two illustrative records:

```sql
INSERT INTO demo_passages (source, content, embedding) VALUES
('synthetic-a', 'Synthetic library opening note', '[1,0,0]'),
('synthetic-b', 'Synthetic accounts contact note', '[0,1,0]');

SELECT id, source, content
FROM demo_passages
ORDER BY embedding <-> '[0.9,0.1,0]'
LIMIT 2;
```

The documented `<->` operator measures L2 distance. Smaller distance means nearer under that metric. These hand-written vectors demonstrate SQL mechanics only; they were not generated from the text and must not be presented as meaningful semantic embeddings.

For real search, use one embedding model to encode each passage and user query according to its documented conventions. Preserve model revision, normalisation and preprocessing settings. Equal vector length does not make representations from unrelated models interchangeable.

Parameterise queries through your database client instead of building SQL with untrusted string concatenation. Store source identifiers, document version and relevant access attributes alongside the passage. Apply authorisation filters before retrieved text reaches a language model.

Choose the distance metric expected by the embedding model. Cosine, inner product and L2 are different operations; similar-looking rankings under one test do not justify switching them casually. Match index operator classes to the query metric.

## Add indexing only after establishing correctness

The default small-table experiment is useful for learning exact search. Measure query time and retrieval quality before adding approximate indexing. More infrastructure is unnecessary when the simple route already meets your requirement.

For L2 queries, the repository documents an HNSW index pattern:

```sql
CREATE INDEX ON demo_passages
USING hnsw (embedding vector_l2_ops);
```

Approximate indexes trade search work against recall and use additional memory and storage. Compare results with an exact baseline and include filtered queries. The relevant trade-offs depend on index settings, dataset and selected release.

Inspect query plans with PostgreSQL tools and realistic data rather than assuming an index is always selected. A tiny table, restrictive filter or different query expression can change the planner's choice. Avoid forcing settings based on an unrelated benchmark.

Plan document updates and re-embedding. A changed paragraph can require replacement vectors, while an embedding-model migration may require a parallel table or index and a tested switch. Keep ingestion idempotent so retries do not create duplicate passages.

Before shared use, test backup, restore, deletion and tenant isolation. Semantic relevance is only one requirement. The useful production outcome is authorised, current evidence retrieved reliably under the database workload your team can maintain.

## Quick questions, clear answers

### Does pgvector generate embeddings?

Its central role is storing and searching vectors in PostgreSQL. Your application normally obtains embeddings from a selected model or service. Check that provider's licence, privacy and preprocessing requirements, then keep its output compatible with the table and query representation.

### Why is the three-dimensional example not semantic search?

The numbers were chosen by hand to make the SQL easy to follow. They do not encode the passages through a trained embedding model. Real semantic retrieval requires a documented representation process and evaluation showing that relevant questions retrieve the correct evidence.

### Can I store every customer's vectors together?

That is a design choice requiring explicit isolation and filtering tests. Authorisation must constrain retrieval before generation. Review indexing and multitenancy guidance, then use synthetic tenants to check that a query cannot reveal another customer's document, even when it is the closest vector.

## About this guide

Aniket Thakur prepared this guide from secondary research checked on 22 October 2026. No first-hand software testing or performance benchmarking was conducted. Examples are instructional and require validation in your environment.
