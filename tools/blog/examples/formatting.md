---
title: "Local formatting example"
slug: "formatting-example"
description: "A synthetic local preview of the supported article formatting. This is not a published article."
category: "technology"
tags: ["Formatting", "Markdown", "Local Preview"]
author: "Aniket Thakur"
datePublished: "2026-01-01"
dateModified: ""
coverImage: "/assets/images/blog/formatting-example/cover.svg"
coverImageAlt: "Synthetic sample cover with the words Local formatting preview on a blue and ivory background."
imageCaption: "Synthetic illustration for local formatting checks only."
imageCredit: ""
imageSourceUrl: ""
draft: true
featured: false
sources:
  - title: "Markdown-it safety documentation"
    url: "https://github.com/markdown-it/markdown-it/blob/master/docs/safety.md"
---

## Readable paragraphs

This is **synthetic demonstration content**, kept out of the public artifact. Write ordinary paragraphs with **bold**, *italic*, ***bold italic***, and ~~strikethrough~~ text. Topic tags above describe the article; headings below organise its body.

**Introductory label:** This bold label inside a paragraph is the supported “sub-bold” style. No custom HTML is needed.

### Lists and nested ideas

- **First label:** Explain a point.
  - A nested detail uses two spaces beneath a bullet.
  - Another detail can include *emphasis*.
- **Second label:** Explain another point.

1. Choose the question your article answers.
2. Check the evidence.
   1. Record the source and date.
   2. Distinguish analysis from sourced claims.
3. Publish after reviewing the generated page.

#### A smaller heading

H4 is available for a subsection. The page title supplies the only H1. The table of contents uses H2 and H3.

## A comparison table

The entries below describe this publishing system, not product specifications or prices.

| Surface | Content | Purpose |
| --- | --- | --- |
| Article page | Full body and one main image | Read the complete article |
| Blog card | Same cover, title, excerpt, date, reading time | Discover an article |
| Draft preview | Unpublished Markdown and this synthetic example | Review locally |

> A standard blockquote can highlight a quotation or an idea. Attribute any real quotation accurately.

> [!NOTE]
> Notes provide supporting context without requiring raw HTML.

> [!TIP]
> Use descriptive link labels so the destination makes sense out of context.

> [!IMPORTANT]
> All figures, comparisons, and claims in real articles need evidence and honest limitations.

## Links, code, and references

Read the [Markdown-it safety documentation](https://github.com/markdown-it/markdown-it/blob/master/docs/safety.md). Inline code looks like `coverImage`. Fenced code includes a language label:

```javascript
// Synthetic snippet demonstrating a fenced block, not an external API.
const publication = { draft: true };
console.log(publication.draft);
```

---

A footnote can carry a short explanation.[^example]

[^example]: This is a synthetic footnote for local layout verification. Source links supplied in front matter appear separately below the body.

### Repeated heading

Heading anchors remain unique when the same heading appears again.

### Repeated heading

Choose a flexible structure suited to your topic; this example simply shows the supported formatting.
