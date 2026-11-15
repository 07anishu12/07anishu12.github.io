---
title: "Dividend Discount Model Explained With Solved Numerical Examples"
seoTitle: "Dividend Discount Model Explained With Solved Numerical Examples — CFA Level I"
slug: cfa-level-1-dividend-discount-model-explained-examples
description: "Master dividend discount model cfa for Level I (Equity Investments). Includes verified CFA formulas, 2 step-by-step solved numerical examples, comparison tab."
category: cfa
tags:
  - "CFA"
  - "Level I"
  - "Equity Investments"
  - "dividend discount model cfa"
  - "dividend discount model cfa formula"
author: Aniket Thakur
datePublished: "2026-11-09"
dateModified: "2026-11-09"
coverImage: /assets/images/blog/cfa-level-1-dividend-discount-model-explained-examples/cover.svg
coverImageAlt: "Illustrative guide to Dividend Discount Model Explained With Solved Numerical Examples"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for Dividend Discount Model Explained With Solved Numerical Examples."
draft: false
featured: false
sources:
  - title: "CFA Institute 2026–2027 Program Curriculum: Equity Investments"
    url: https://www.cfainstitute.org/en/programs/cfa/curriculum
  - title: "CFA Institute Candidate Study Resources & Topic Outlines"
    url: https://www.cfainstitute.org/en/programs/cfa/candidate
showSources: true
enquiry: false
quickAnswer:
  question: "Dividend Discount Model Explained With Solved Numerical Examples: Key Summary & Verdict"
  answer: "Dividend Discount Model Explained With Solved Numerical Examples is a core Level I Equity Investments topic (LM 8: Equity Valuation: Concepts and Basic Tools — Multi-period DDM, two-stage DDM, terminal value discounting, preferred stock valuation) focusing on."
  facts:
    - label: "CFA Level"
      value: "Level I"
    - label: "Curriculum Subject"
      value: "Equity Investments"
    - label: "Topic Focus"
      value: "dividend discount model cfa"
    - label: "Syllabus Standard"
      value: "2026–2027 Curriculum"
  goodFor:
    - "Candidates preparing for CFA Level I (Equity Investments) exam questions."
    - "Financial analysts requiring verified formulas and worked calculations."
  watchFor:
    - "Verify compounding periodicity, sign conventions, and calculator mode (BGN vs END)."
    - "Review boundary conditions and common exam distractor traps."
  note: "2026–2027 CFA Program Curriculum Series · Aniket Thakur"
faqItems:
  - question: "What is the primary formula for dividend discount model cfa in Level I Equity Investments?"
    answer: "The primary equations for Dividend Discount Model Explained With Solved Numerical Examples govern Equity Investments calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is dividend discount model cfa tested on the CFA Level I exam?"
    answer: "On the CFA exam, Dividend Discount Model Explained With Solved Numerical Examples is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
  - question: "How does Two-Stage Dividend Discount Model (DDM) connect to related topics in Equity Investments?"
    answer: "Within Equity Investments, Two-Stage Dividend Discount Model (DDM) links directly to What Is Intrinsic Value of a Stock? How to Calculate It within the standard CFA Equity Investments curriculum framework."
---

## Introduction

Dividend Discount Model Explained With Solved Numerical Examples is a core Level I Equity Investments topic (LM 8: Equity Valuation: Concepts and Basic Tools — Multi-period DDM, two-stage DDM, terminal value discounting, preferred stock valuation) focusing on general multi-period Dividend Discount Model (DDM), two-stage supernormal growth DDM, terminal value date indexing, and preferred stock valuation. This guide covers the governing equations (Two-Stage Dividend Discount Model (DDM) and Non-Callable & Callable/Retractable Preferred Stock Valuation), two verified numerical examples, a comparison table, and three original CFA-style practice questions.

## Concept Explanation & Institutional Framework

From first principles, general multi-period Dividend Discount Model (DDM), two-stage supernormal growth DDM, terminal value date indexing, and preferred stock valuation links theoretical valuation and risk mechanics to practical decisions in Equity Investments. Two-Stage Dividend Discount Model (DDM) (V_0 = ∑_{t=1}^n [D_0 × (1 + g_S)^t / (1 + r)^t] + [V_n / (1 + r)^n] where V_n = D_{n+1} / (r − g_L)) establishes the primary relationship (Discounts n years of high supernormal dividend growth g_S plus the horizon terminal value V_n anchored at year n.), while Non-Callable & Callable/Retractable Preferred Stock Valuation (V_Pref = D / r ; V_Fixed_Term_Pref = ∑ [D / (1 + r)^t] + [Par / (1 + r)^N]) governs Values perpetual preferred shares as a perpetuity and finite-maturity preferred shares like a fixed-rate bond.

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: Two-Stage Dividend Discount Model (DDM)

```formula
V_0 = ∑_{t=1}^n [D_0 × (1 + g_S)^t / (1 + r)^t] + [V_n / (1 + r)^n] where V_n = D_{n+1} / (r − g_L)
```

**Institutional Context & Variable Breakdown:** Discounts n years of high supernormal dividend growth g_S plus the horizon terminal value V_n anchored at year n.

### Formula 2: Non-Callable & Callable/Retractable Preferred Stock Valuation

```formula
V_Pref = D / r

V_Fixed_Term_Pref = ∑ [D / (1 + r)^t] + [Par / (1 + r)^N]
```

**Institutional Context & Variable Breakdown:** Values perpetual preferred shares as a perpetuity and finite-maturity preferred shares like a fixed-rate bond.

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Solving a Two-Stage Supernormal Growth DDM Valuation

**Problem & Given Scenario:**
A company just paid an annual dividend of D_0 = $2.00. An analyst forecasts dividend growth of g_S = 15.0% per year for the next 3 years (Years 1, 2, and 3), followed by a mature perpetual growth rate of g_L = 4.0% from Year 4 onward. The required return on equity is r = 10.0%.

```formula
V_0 = ∑_{t=1}^n [D_0 × (1 + g_S)^t / (1 + r)^t] + [V_n / (1 + r)^n] where V_n = D_{n+1} / (r − g_L)
```

**Step-by-Step Substitution & Calculation:**

Step 1: Project explicit dividends: D_1 = $2.00 × 1.15 = $2.30; D_2 = $2.30 × 1.15 = $2.645; D_3 = $2.645 × 1.15 = $3.04175; D_4 = $3.04175 × 1.04 = $3.16342. Step 2: Compute Terminal Value at t = 3: V_3 = D_4 / (r − g_L) = $3.16342 / (0.10 − 0.04) = $52.7237. Step 3: Discount all flows to t = 0 at 10.0%: PV(D_1) = $2.30 / 1.10 = $2.0909; PV(D_2) = $2.645 / 1.10^2 = $2.1860; PV(D_3 + V_3) = ($3.04175 + $52.7237) / 1.10^3 = $55.76545 / 1.331 = $41.8974. Step 4: Total Intrinsic Value V_0 = $2.0909 + $2.1860 + $41.8974 = $46.1743 ≈ $46.17.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Remember that V_3 = D_4 / (r − g_L) is valued at t = 3 (not t = 4!), so V_3 is discounted back by (1 + r)^3 along with D_3.

### Worked Example 2: Valuing a Company That Initiates Dividends in Year 3

**Problem & Given Scenario:**
A growth tech firm currently pays no dividend (D_0 = D_1 = D_2 = $0). It will pay its first dividend of D_3 = $1.50 at the end of Year 3, after which dividends will grow at 5.0% forever. Required return r = 11.0%.

```formula
V_Pref = D / r

V_Fixed_Term_Pref = ∑ [D / (1 + r)^t] + [Par / (1 + r)^N]
```

**Step-by-Step Substitution & Calculation:**

Step 1: Since constant growth starts immediately after D_3, value the perpetuity at t = 2 (one period before D_3): V_2 = D_3 / (r − g) = $1.50 / (0.11 − 0.05) = $25.00. Step 2: Discount V_2 back 2 years to t = 0: V_0 = $25.00 / (1.11)^2 = $25.00 / 1.2321 = $20.29.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Alternatively, V_3 = D_4/(r−g) = $1.575/0.06 = $26.25, and ($1.50 + $26.25) / 1.11^3 = $27.75 / 1.367631 = $20.29—both methods yield the exact same price!

## Comparison & Reference Analysis

| DDM Variant | Growth Assumption | Terminal Value Anchor Date | Discounting Period for Terminal Value |
|---|---|---|---|
| Zero-Growth (Preferred) | g = 0% forever | t = 0 | V_0 = D / r (no further discounting) |
| Constant Growth (Gordon) | Constant g < r forever | t = 0 (using D_1) | V_0 = D_1 / (r − g) |
| Two-Stage (n high-growth yrs) | g_S for n yrs, then g_L | t = n (using D_{n+1}) | Discount V_n by (1 + r)^n |
| Delayed Dividend (starts t=K) | $0 until D_K, then g | t = K − 1 (using D_K) | Discount V_{K−1} by (1 + r)^(K−1) |

## Real-World Financial Applications

In institutional Equity Investments practice, analysts apply Two-Stage Dividend Discount Model (DDM) and Non-Callable & Callable/Retractable Preferred Stock Valuation to value securities, audit financial statements, and manage portfolio risk.

## CFA Examination Perspective & Testing Patterns

On the CFA Level I exam (LM 8: Equity Valuation: Concepts and Basic Tools — Multi-period DDM, two-stage DDM, terminal value discounting, preferred stock valuation), dividend discount model cfa is tested via standalone 90-second MCQs combining Two-Stage Dividend Discount Model (DDM) calculations with economic interpretation.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** A company just paid a dividend of D_0 = $1.20. Dividends are expected to grow at 20% per year for 2 years and 5% per year thereafter. At a required return of 11.0%, the stock's intrinsic value today is closest to:

- **[A]** $24.16

- **[B]** $27.24

- **[C]** $28.80

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** D_1 = $1.20 × 1.20 = $1.44; D_2 = $1.44 × 1.20 = $1.728; D_3 = $1.728 × 1.05 = $1.8144. Terminal value at t = 2 is V_2 = $1.8144 / (0.11 − 0.05) = $30.24. Discounting to t = 0: V_0 = $1.44 / 1.11 + ($1.728 + $30.24) / 1.11^2 = $1.30 + $25.95 = $27.24.

### Practice Question 2

**Question:** In a two-stage dividend discount model where supernormal growth lasts for n = 4 years and constant perpetual growth begins in Year 5, the terminal value V_4 = D_5 / (r − g_L) must be discounted back to t = 0 by dividing by:

- **[A]** (1 + r)^3

- **[B]** (1 + r)^4

- **[C]** (1 + r)^5

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** Because the Gordon Growth formula values a perpetuity one period before its first cash flow (D_5), V_4 stands at t = 4 and is discounted by (1 + r)^4.

### Practice Question 3

**Question:** A non-callable perpetual preferred stock with a par value of $100 and a stated annual dividend rate of 6.5% trades in a market requiring an 8.0% return. Its intrinsic value is:

- **[A]** $81.25

- **[B]** $100.00

- **[C]** $123.08

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** V_0 = D / r = $6.50 / 0.08 = $81.25.

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in Two-Stage Dividend Discount Model (DDM).**

- **Timing Errors: Mixing beginning and ending balances in Non-Callable & Callable/Retractable Preferred Stock Valuation.**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Curriculum Scope: LM 8: Equity Valuation: Concepts and Basic Tools — Multi-period DDM, two-stage DDM, terminal value discounting, preferred stock valuation (Level I · Equity Investments).**

- **Takeaway 2: Primary Formula (Two-Stage Dividend Discount Model (DDM)): V_0 = ∑_{t=1}^n [D_0 × (1 + g_S)^t / (1 + r)^t] + [V_n / (1 + r)^n] where V_n = D_{n+1} / (r − g_L).**

- **Takeaway 3: Secondary Formula (Non-Callable & Callable/Retractable Preferred Stock Valuation): V_Pref = D / r ; V_Fixed_Term_Pref = ∑ [D / (1 + r)^t] + [Par / (1 + r)^N].**

- **Takeaway 4: Key Insight 1: Remember that V_3 = D_4 / (r − g_L) is valued at t = 3 (not t = 4!), so V_3 is discounted back by (1 + r)^3 along with D_3.**

- **Takeaway 5: Key Insight 2: Alternatively, V_3 = D_4/(r−g) = $1.575/0.06 = $26.25, and ($1.50 + $26.25) / 1.11^3 = $27.75 / 1.367631 = $20.29—both methods yield the.**

## Frequently Asked Questions (FAQs)

### What is the primary formula for dividend discount model cfa in Level I Equity Investments?

The primary equations for Dividend Discount Model Explained With Solved Numerical Examples govern Equity Investments calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is dividend discount model cfa tested on the CFA Level I exam?

On the CFA exam, Dividend Discount Model Explained With Solved Numerical Examples is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

### How does Two-Stage Dividend Discount Model (DDM) connect to related topics in Equity Investments?

Within Equity Investments, Two-Stage Dividend Discount Model (DDM) links directly to What Is Intrinsic Value of a Stock? How to Calculate It within the standard CFA Equity Investments curriculum framework.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level I · Equity Investments).

### Related CFA Study Guides

- [What Is Intrinsic Value of a Stock? How to Calculate It](/blog/cfa/cfa-level-1-what-is-intrinsic-value-of-a-stock/)

- [Gordon Growth Model: Formula, Examples and CFA Questions](/blog/cfa/cfa-level-1-gordon-growth-model-formula-examples/)

