---
title: "Arithmetic Mean vs Geometric Mean: How to Calculate in CFA"
seoTitle: "Arithmetic Mean vs Geometric Mean: How to Calculate in CFA — CFA Level I"
slug: cfa-level-1-arithmetic-mean-vs-geometric-mean
description: "Master arithmetic mean vs geometric mean cfa for Level I (Quantitative Methods). Includes verified CFA formulas, 2 step-by-step solved numerical examples, co."
category: cfa
tags:
  - "CFA"
  - "Level I"
  - "Quantitative Methods"
  - "arithmetic mean vs geometric mean cfa"
  - "arithmetic mean vs geometric mean cfa formula"
author: Aniket Thakur
datePublished: "2026-11-08"
dateModified: "2026-11-08"
coverImage: /assets/images/blog/cfa-level-1-arithmetic-mean-vs-geometric-mean/cover.svg
coverImageAlt: "Illustrative guide to Arithmetic Mean vs Geometric Mean: How to Calculate in CFA"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for Arithmetic Mean vs Geometric Mean: How to Calculate in CFA."
draft: false
featured: false
sources:
  - title: "CFA Institute 2026–2027 Program Curriculum: Quantitative Methods"
    url: https://www.cfainstitute.org/en/programs/cfa/curriculum
  - title: "CFA Institute Candidate Study Resources & Topic Outlines"
    url: https://www.cfainstitute.org/en/programs/cfa/candidate
showSources: true
enquiry: false
quickAnswer:
  question: "Arithmetic Mean vs Geometric Mean: How to Calculate in CFA: Key Summary & Verdict"
  answer: "Arithmetic Mean vs Geometric Mean: How to Calculate in CFA is a core Level I Quantitative Methods topic (LM 1 & LM 3: Arithmetic mean, geometric mean, harmonic mean, trimmed and winsorized means) focusing on multi-period compounding via geometric mean."
  facts:
    - label: "CFA Level"
      value: "Level I"
    - label: "Curriculum Subject"
      value: "Quantitative Methods"
    - label: "Topic Focus"
      value: "arithmetic mean vs geometric mean c"
    - label: "Syllabus Standard"
      value: "2026–2027 Curriculum"
  goodFor:
    - "Candidates preparing for CFA Level I (Quantitative Methods) exam questions."
    - "Financial analysts requiring verified formulas and worked calculations."
  watchFor:
    - "Verify compounding periodicity, sign conventions, and calculator mode (BGN vs END)."
    - "Review boundary conditions and common exam distractor traps."
  note: "2026–2027 CFA Program Curriculum Series · Aniket Thakur"
faqItems:
  - question: "What is the primary formula for arithmetic mean vs geometric mean cfa in Level I Quantitative Methods?"
    answer: "The primary equations for Arithmetic Mean vs Geometric Mean: How to Calculate in CFA govern Quantitative Methods calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is arithmetic mean vs geometric mean cfa tested on the CFA Level I exam?"
    answer: "On the CFA exam, Arithmetic Mean vs Geometric Mean: How to Calculate in CFA is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
  - question: "How does Arithmetic & Geometric Mean Returns connect to related topics in Quantitative Methods?"
    answer: "Within Quantitative Methods, Arithmetic & Geometric Mean Returns links directly to Money Weighted vs Time Weighted Rate of Return: Examples within the standard CFA Quantitative Methods curriculum framework."
---

## Introduction

Arithmetic Mean vs Geometric Mean: How to Calculate in CFA is a core Level I Quantitative Methods topic (LM 1 & LM 3: Arithmetic mean, geometric mean, harmonic mean, trimmed and winsorized means) focusing on multi-period compounding via geometric mean, single-period expectation via arithmetic mean, harmonic mean for cost averaging, and Jensen's inequality. This guide covers the governing equations (Arithmetic & Geometric Mean Returns and Variance Drag Approximation & Harmonic Mean), two verified numerical examples, a comparison table, and three original CFA-style practice questions.

## Concept Explanation & Institutional Framework

From first principles, multi-period compounding via geometric mean, single-period expectation via arithmetic mean, harmonic mean for cost averaging, and Jensen's inequality links theoretical valuation and risk mechanics to practical decisions in Quantitative Methods. Arithmetic & Geometric Mean Returns (R_A = (1/T) ∑ R_t ; R_G = [(1 + R_1)(1 + R_2)...(1 + R_T)]^(1/T) − 1) establishes the primary relationship (R_A is the simple average of periodic returns; R_G is the compound annual growth rate over T periods.), while Variance Drag Approximation & Harmonic Mean (R_G ≈ R_A − (σ^2 / 2) ; X_H = n / [∑ (1 / X_i)]) governs R_G is always ≤ R_A with equality only when return volatility σ = 0; harmonic mean X_H weights small values heavily (used for equal-dollar P/E or share purchases).

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: Arithmetic & Geometric Mean Returns

```formula
R_A = (1/T) ∑ R_t

R_G = [(1 + R_1)(1 + R_2)...(1 + R_T)]^(1/T) − 1
```

**Institutional Context & Variable Breakdown:**

- R_A is the simple average of periodic returns.

- R_G is the compound annual growth rate over T periods.

### Formula 2: Variance Drag Approximation & Harmonic Mean

```formula
R_G ≈ R_A − (σ^2 / 2)

X_H = n / [∑ (1 / X_i)]
```

**Institutional Context & Variable Breakdown:**

- R_G is always ≤ R_A with equality only when return volatility σ = 0.

- harmonic mean X_H weights small values heavily (used for equal-dollar P/E or share purchases).

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Comparing Arithmetic and Geometric Returns Across a Volatile 3-Year Cycle

**Problem & Given Scenario:**
Fund returns over 3 years: Year 1 = +50.0%, Year 2 = −40.0%, Year 3 = +20.0% on a $1,000 initial investment.

```formula
R_A = (1/T) ∑ R_t

R_G = [(1 + R_1)(1 + R_2)...(1 + R_T)]^(1/T) − 1
```

**Step-by-Step Substitution & Calculation:**

Arithmetic Mean R_A = (50% − 40% + 20%) / 3 = +10.00%. Geometric Mean R_G = [(1.50)(0.60)(1.20)]^(1/3) − 1 = (1.08)^(1/3) − 1 = +2.60%. Ending wealth = $1,000 × 1.08 = $1,080.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Volatility drag reduces the realized compound return (+2.60%) by 740 bps below the simple arithmetic mean (+10.00%).

### Worked Example 2: Harmonic Mean for Dollar-Cost Averaging and Portfolio P/E Ratio

**Problem & Given Scenario:**
An investor invests $10,000 per month in a stock at prices of $20, $25, and $40 over 3 months.

```formula
R_G ≈ R_A − (σ^2 / 2)

X_H = n / [∑ (1 / X_i)]
```

**Step-by-Step Substitution & Calculation:**

Arithmetic mean price = (20 + 25 + 40)/3 = $28.33. Harmonic mean price X_H = 3 / (1/20 + 1/25 + 1/40) = 3 / (0.05 + 0.04 + 0.025) = 3 / 0.115 = $26.087 ≈ $26.09 per share (verified: 500 + 400 + 250 = 1,150 shares for $30,000; $30,000 / 1,150 = $26.087).

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> When equal dollar amounts are invested each period, the true average cost per share is the harmonic mean ($26.09), strictly obeying X_H < X_G < X_A.

## Comparison & Reference Analysis

| Mean Metric | Mathematical Formula | Magnitude Ordering | Correct CFA Use Case |
|---|---|---|---|
| Arithmetic Mean (R_A) | (∑ R_t) / n | Largest (X_A ≥ X_G ≥ X_H) | Expected return for a single future period |
| Geometric Mean (R_G) | [∏(1 + R_t)]^(1/n) − 1 | Middle (≈ R_A − σ^2 / 2) | Historical multi-period compound performance |
| Harmonic Mean (X_H) | n / ∑(1 / X_i) | Smallest (for positive dispersed data) | Dollar-cost averaging & index P/E ratio |
| Trimmed / Winsorized | Drop or cap k% tail outliers | Robust to extreme skewness | Cross-sectional equity multiple screening |

## Real-World Financial Applications

In institutional Quantitative Methods practice, analysts apply Arithmetic & Geometric Mean Returns and Variance Drag Approximation & Harmonic Mean to value securities, audit financial statements, and manage portfolio risk.

## CFA Examination Perspective & Testing Patterns

On the CFA Level I exam (LM 1 & LM 3: Arithmetic mean, geometric mean, harmonic mean, trimmed and winsorized means), arithmetic mean vs geometric mean cfa is tested via standalone 90-second MCQs combining Arithmetic & Geometric Mean Returns calculations with economic interpretation.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** A mutual fund posts annual returns of +25%, −12%, and +10% over three years. Its geometric mean annual return is closest to:

- **[A]** 6.56%

- **[B]** 7.67%

- **[C]** 8.12%

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** R_G = [(1.25)(0.88)(1.10)]^(1/3) − 1 = (1.21)^(1/3) − 1 = 1.065602 − 1 = 6.56%. (7.67% is the arithmetic mean).

### Practice Question 2

**Question:** An equal-weighted portfolio holds two stocks: Stock A trades at a P/E of 10x and Stock B trades at a P/E of 30x. The portfolio's weighted average P/E ratio is closest to:

- **[A]** 15.0x

- **[B]** 17.3x

- **[C]** 20.0x

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** Because P/E has price in the numerator, an equal-dollar portfolio P/E equals the harmonic mean: 2 / (1/10 + 1/30) = 2 / (4/30) = 60 / 4 = 15.0x.

### Practice Question 3

**Question:** For a portfolio with a sample arithmetic mean return of 10.0% and sample standard deviation of 20.0%, the approximated geometric mean return is closest to:

- **[A]** 6.0%

- **[B]** 8.0%

- **[C]** 9.0%

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** Using R_G ≈ R_A − (σ^2 / 2) = 0.10 − (0.20^2 / 2) = 0.10 − (0.04 / 2) = 0.10 − 0.02 = 8.0%.

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in Arithmetic & Geometric Mean Returns.**

- **Timing Errors: Mixing beginning and ending balances in Variance Drag Approximation & Harmonic Mean.**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Curriculum Scope: LM 1 & LM 3: Arithmetic mean, geometric mean, harmonic mean, trimmed and winsorized means (Level I · Quantitative Methods).**

- **Takeaway 2: Primary Formula (Arithmetic & Geometric Mean Returns): R_A = (1/T) ∑ R_t ; R_G = [(1 + R_1)(1 + R_2)...(1 + R_T)]^(1/T) − 1.**

- **Takeaway 3: Secondary Formula (Variance Drag Approximation & Harmonic Mean): R_G ≈ R_A − (σ^2 / 2) ; X_H = n / [∑ (1 / X_i)].**

- **Takeaway 4: Key Insight 1: Volatility drag reduces the realized compound return (+2.60%) by 740 bps below the simple arithmetic mean (+10.00%).**

- **Takeaway 5: Key Insight 2: When equal dollar amounts are invested each period, the true average cost per share is the harmonic mean ($26.09), strictly obeying X_H < X_.**

## Frequently Asked Questions (FAQs)

### What is the primary formula for arithmetic mean vs geometric mean cfa in Level I Quantitative Methods?

The primary equations for Arithmetic Mean vs Geometric Mean: How to Calculate in CFA govern Quantitative Methods calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is arithmetic mean vs geometric mean cfa tested on the CFA Level I exam?

On the CFA exam, Arithmetic Mean vs Geometric Mean: How to Calculate in CFA is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

### How does Arithmetic & Geometric Mean Returns connect to related topics in Quantitative Methods?

Within Quantitative Methods, Arithmetic & Geometric Mean Returns links directly to Money Weighted vs Time Weighted Rate of Return: Examples within the standard CFA Quantitative Methods curriculum framework.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level I · Quantitative Methods).

### Related CFA Study Guides

- [Money Weighted vs Time Weighted Rate of Return: Examples and Questions](/blog/cfa/cfa-level-1-money-weighted-vs-time-weighted-return/)

- [How to Calculate Standard Deviation and Variance in CFA](/blog/cfa/cfa-level-1-how-to-calculate-standard-deviation-variance/)

- [How to Solve Annuity and Perpetuity Questions in CFA Level 1](/blog/cfa/cfa-level-1-annuity-and-perpetuity-questions/)

