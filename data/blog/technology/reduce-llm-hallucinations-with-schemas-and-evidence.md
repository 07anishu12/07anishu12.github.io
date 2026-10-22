---
title: How to Reduce LLM Hallucinations Using Structured Outputs and Evidence Checks
seoTitle: Reduce LLM Hallucinations with Schemas and Evidence
slug: reduce-llm-hallucinations-with-schemas-and-evidence
description: Validate response structure, facts and references as separate
  application checks.
category: technology
tags:
  - reduce LLM hallucinations
  - structured outputs
  - JSON Schema
  - evidence validation
author: Aniket Thakur
datePublished: 2026-10-22
dateModified: 2026-10-22
coverImage: /assets/images/blog/reduce-llm-hallucinations-with-schemas-and-evidence/cover.svg
coverImageAlt: Diagram explaining reduce LLM hallucinations
imageCaption: Original explanatory diagram showing reduce LLM hallucinations and
  its main decision points.
draft: false
featured: false
sources:
  - title: JSON Schema object reference
    url: https://json-schema.org/understanding-json-schema/reference/object
  - title: Ollama structured outputs
    url: https://docs.ollama.com/capabilities/structured-outputs
showSources: true
enquiry: false
quickAnswer:
  question: "How to Reduce LLM Hallucinations Using Structured Outputs and
    Evidence Checks: Key Verdict & Summary"
  answer: Structured outputs can reduce formatting failures, while evidence checks
    can reduce unsupported factual claims.
  facts:
    - label: Category & Focus
      value: AI agents, developer tools and automation
    - label: Verified Word Count
      value: 804 words
  goodFor:
    - Readers evaluating reduce LLM hallucinations.
    - Practitioners needing verified benchmarks and calculations.
  watchFor:
    - Verify dated prices and regional specifications before committing.
    - Review primary source disclosures and product documentation.
  note: 2026 Reference Edition · Verified Secondary Research
---

Structured outputs can reduce formatting failures, while evidence checks can reduce unsupported factual claims. They solve different problems. A response matching a JSON schema may still contain invented values, and a genuine source link may still fail to support the answer. Build separate validation layers and make uncertainty an allowed outcome.

## Define the output contract clearly

Start with the information your application actually needs. For an extraction task, specify fields, types, allowed values and how missing information is represented. Avoid requiring a guessed value simply because a field is marked mandatory.

The [JSON Schema object reference](https://json-schema.org/understanding-json-schema/reference/object) explains structural controls such as properties, required fields and additional-property handling. These are useful for rejecting malformed or unexpected data, not for verifying the truth of a field's contents.

An illustrative contract could require a document identifier, a nullable due date and supporting passage identifiers. A missing due date should remain missing if the source does not state it. Clearly label any demonstration records as synthetic.

Model APIs differ in how they support schemas. The [Ollama structured-output guide](https://docs.ollama.com/capabilities/structured-outputs) documents a schema-oriented route for supported use. Match features and limitations to the selected endpoint and release rather than assuming every provider implements identical constraints.

## Separate parsing from factual validation

First parse the response and validate the schema in deterministic code. Reject unknown keys where appropriate, enforce allowed values and handle incomplete responses. Keep retries bounded and retain the reason for failure.

Next check business rules. A valid date string may refer to an impossible transaction timeline; a positive amount may exceed the source total; a valid category may be inappropriate for the request. Define these checks explicitly outside model narration.

Then verify source support. If the model returns an evidence identifier, confirm it exists in the retrieved set and is authorised for the user. Compare the claim with the actual passage, preserving qualifications and source version.

For arithmetic, use a calculator or application code and check units. For current policy, use an authoritative source checked for the relevant date. Do not ask a model to certify its own fact-checking as though confidence were evidence.

A hypothetical invoice extractor might return syntactically correct fields yet confuse tax-inclusive and tax-exclusive amounts. Schema validation catches neither mistake automatically. An independent total reconciliation and a review of the labelled source fields provide more useful checks.

## Build an abstention and review workflow

Allow answers such as unknown, conflicting evidence or needs review when the task requires them. A system forced to choose a confident value for every field can turn missing information into fabricated certainty.

Use a small evaluation set with complete, incomplete, contradictory and poorly scanned inputs. Score field correctness separately from JSON validity. Include cases where the correct action is to leave a value empty or request clarification.

For RAG answers, evaluate retrieval before generation. If the source passage was never retrieved, changing output format will not supply it. If evidence is present but misread, inspect prompts, model suitability and validation rules.

Treat external content as untrusted. A document can include instructions to change the schema, invent a reference or reveal private context. The application should enforce its output contract and tool permissions regardless of that text.

Use automated model judges cautiously for semantic support. They can help prioritise review but may repeat the same reasoning errors. Calibrate against human checks and preserve disagreement cases rather than hiding them inside one score.

Your next step is a narrow application contract plus a validation report that distinguishes structure, business rules, evidence and unresolved questions. Improve the layer responsible for failures. This produces a more useful reliability story than claiming that a schema or a second prompt has eliminated hallucinations.

## Quick questions, clear answers

### Does valid JSON mean the facts are correct?

No. JSON validity means the response follows a syntax, and schema validity adds structural requirements. Neither proves that an amount, name or explanation came from the source. Validate factual content separately and keep missing information distinguishable from a model-generated guess.

### Should I retry until the model gives a valid answer?

Use bounded retries for recoverable formatting issues, but do not confuse repeated generation with factual verification. If evidence is missing or contradictory, another fluent attempt may simply invent a different answer. Route persistent failures to clarification or review with a clear reason.

### Can source links be validated automatically?

You can check that identifiers resolve to trusted stored sources and that the user may access them. Semantic support is harder: a live page can still be irrelevant or misquoted. Combine mechanical reference checks with claim-level evidence review appropriate to the consequence.

## About this guide

Aniket Thakur prepared this guide from secondary research checked on 22 October 2026. No first-hand software testing or performance benchmarking was conducted. Examples are instructional and require validation in your environment.
