---
title: "How to Evaluate a RAG System: Retrieval Quality, Faithfulness and
  Citation Accuracy"
seoTitle: "Evaluate RAG: Retrieval, Faithfulness and Citations"
slug: evaluate-rag-retrieval-faithfulness-and-citations
description: Build a test set that separates missing evidence from unsupported
  generated answers.
category: technology
tags:
  - RAG evaluation
  - retrieval quality
  - answer faithfulness
  - citation accuracy
author: Aniket Thakur
datePublished: 2026-10-22
dateModified: 2026-10-22
coverImage: /assets/images/blog/evaluate-rag-retrieval-faithfulness-and-citations/cover.svg
coverImageAlt: Diagram explaining RAG evaluation
imageCaption: Original explanatory diagram showing RAG evaluation and its main
  decision points.
draft: false
featured: false
sources:
  - title: LlamaIndex evaluation guide
    url: https://developers.llamaindex.ai/python/framework/module_guides/evaluating/
  - title: Inspect evaluation framework
    url: https://github.com/UKGovernmentBEIS/inspect_ai
showSources: true
enquiry: false
quickAnswer:
  question: "How to Evaluate a RAG System: Retrieval Quality, Faithfulness and
    Citation Accuracy: Key Verdict & Summary"
  answer: "Evaluate a RAG system in stages: whether it retrieves the right
    authorised evidence, whether the answer follows that evidence and whether
    citations support individual claims."
  facts:
    - label: Category & Focus
      value: RAG, vector databases and document chatbots
    - label: Verified Word Count
      value: 822 words
  goodFor:
    - Readers evaluating RAG evaluation.
    - Practitioners needing verified benchmarks and calculations.
  watchFor:
    - Verify dated prices and regional specifications before committing.
    - Review primary source disclosures and product documentation.
  note: 2026 Reference Edition · Verified Secondary Research
---

Evaluate a RAG system in stages: whether it retrieves the right authorised evidence, whether the answer follows that evidence and whether citations support individual claims. A single overall “accuracy” score hides useful failure information. Begin with a small inspectable question set and expected sources before adding automated judging or complex metrics.

## Create questions with known evidence

Choose representative documents and write questions that users might actually ask. Include direct facts, paraphrases, questions requiring several passages, conflicting versions and questions with no answer in the collection. Keep expected source locations alongside each question.

Avoid making every test a simple copied phrase from the document. That overstates performance for users who describe the same need differently. Include exact identifiers too, because semantic similarity alone may miss a policy number or error code.

The [LlamaIndex evaluation guide](https://developers.llamaindex.ai/python/framework/module_guides/evaluating/) distinguishes evaluation concerns in data-connected applications. Use that separation to organise your own checks rather than assuming a framework automatically validates the application's final answers.

Keep a held-out set for decisions after tuning. When developers repeatedly inspect and optimise the same examples, those examples become less informative about new user questions. Preserve a versioned record of documents, questions and expected evidence.

Use synthetic records for privacy and access tests, explicitly marked as invented. Real customer information is unnecessary for establishing whether one user's query can retrieve another user's restricted document.

## Measure retrieval independently

For each question, inspect the top-k retrieved results. Recall at k measures how much of the labelled relevant evidence appears within those results. Precision at k measures how much of the returned set is relevant, under your chosen labelling rules.

A hypothetical query with four labelled relevant passages and three retrieved among the top five has recall of three divided by four and precision of three divided by five. This is an arithmetic illustration, not a measured system result. Document what counts as relevant because reasonable reviewers may disagree.

Ranking matters when the generator receives only a limited evidence budget. Track whether essential passages are near the top and whether duplicates crowd out complementary information. A retrieval metric can look acceptable while missing the one exception needed for a safe answer.

Compare with an exact-search baseline where practical if approximate vector indexing is involved. Otherwise a missing result might be attributed incorrectly to embeddings or chunking. Also verify filters before generation; relevant but unauthorised evidence is a serious failure.

## Check answers and citations claim by claim

Separate correctness from faithfulness. An answer may repeat a false source faithfully, or state a true fact that is unsupported by the supplied evidence. Decide what your product promises and record both dimensions when they matter.

Break important answers into claims and inspect their supporting passages. Check quantities, dates, exceptions and source versions. A citation to the right document does not establish that a particular sentence is supported by it.

Test abstention explicitly. For unanswerable questions, reward an appropriate acknowledgement of missing evidence rather than a confident guess. Also check over-abstention: refusing an answer that the collection clearly supports reduces usefulness.

Automated model judges can help triage large sets, but their outputs need calibration against human review. The [Inspect framework](https://github.com/UKGovernmentBEIS/inspect_ai) offers an evaluation structure; it does not make the chosen scoring rubric infallible. Preserve judge prompts, model versions and disagreements.

Record latency, cost inputs where measured, failures and user correction effort alongside quality. Avoid adopting a configuration that improves one metric by returning excessive irrelevant text or timing out on difficult questions.

Your next step is a failure table with specific causes: extraction, retrieval, permissions, prompt construction, generation or citation mismatch. Fix the stage responsible and rerun the relevant evaluation plus regression cases. That gives a clearer improvement story than repeatedly changing the model and reporting one headline number.

## Quick questions, clear answers

### Can an LLM judge replace human review?

It can assist, but may share model biases or misread evidence. Compare a sample of its decisions with careful human labels and inspect disagreements. For consequential claims, retain a review path grounded in the original source rather than trusting a second fluent response.

### How large should the test set be?

Start with enough examples to cover important question types and failures, then grow it from real usage with appropriate privacy controls. There is no universal count proving reliability. A small diverse set can expose problems, while strong statistical claims require a suitable sampling design.

### What if retrieval is good but answers are wrong?

Inspect how evidence is passed to generation, whether the prompt requests unsupported extrapolation and whether the model handles conflicts correctly. Keep retrieval fixed while testing those changes. Otherwise you cannot tell whether improvement came from better evidence or different use of the same passages.

## About this guide

Aniket Thakur prepared this guide from secondary research checked on 22 October 2026. No first-hand software testing or performance benchmarking was conducted. Examples are instructional and require validation in your environment.
