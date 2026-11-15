---
title: "How to Calculate Portfolio Return and Portfolio Risk"
seoTitle: "How to Calculate Portfolio Return and Portfolio Risk — CFA Level I"
slug: cfa-level-1-calculate-portfolio-return-and-portfolio-risk
description: "Master How to Calculate Portfolio Return and Portfolio Risk for CFA Level I (Portfolio Management). Includes verified curriculum formulas, worked numerical examples, and exam review notes."
category: cfa
tags:
  - "CFA"
  - "Level I"
  - "Portfolio Management"
  - "how to calculate portfolio risk and return"
  - "how to calculate portfolio risk and return formula"
author: Aniket Thakur
datePublished: "2026-11-10"
dateModified: "2026-11-10"
coverImage: /assets/images/blog/cfa-level-1-calculate-portfolio-return-and-portfolio-risk/cover.svg
coverImageAlt: "Illustrative guide to How to Calculate Portfolio Return and Portfolio Risk"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for How to Calculate Portfolio Return and Portfolio Risk."
draft: false
featured: false
sources:
  - title: "CFA Institute 2026–2027 Program Curriculum: Portfolio Management"
    url: https://www.cfainstitute.org/en/programs/cfa/curriculum
  - title: "CFA Institute Candidate Study Resources & Topic Outlines"
    url: https://www.cfainstitute.org/en/programs/cfa/candidate
showSources: true
enquiry: false
quickAnswer:
  question: "How to Calculate Portfolio Return and Portfolio Risk: Key Summary & Verdict"
  answer: "How to Calculate Portfolio Return and Portfolio Risk is a core Level I Portfolio Management topic (LM 4: Portfolio Risk and Return: Part I — Two-asset portfolio expected return, variance, and standard deviation using covariance and correlation) focusing on."
  facts:
    - label: "CFA Level"
      value: "Level I"
    - label: "Curriculum Subject"
      value: "Portfolio Management"
    - label: "Topic Focus"
      value: "how to calculate portfolio risk and"
    - label: "Syllabus Standard"
      value: "2026–2027 Curriculum"
  goodFor:
    - "Candidates preparing for CFA Level I (Portfolio Management) exam questions."
    - "Financial analysts requiring verified formulas and worked calculations."
  watchFor:
    - "Verify compounding periodicity, sign conventions, and calculator mode (BGN vs END)."
    - "Review boundary conditions and common exam distractor traps."
  note: "2026–2027 CFA Program Curriculum Series · Aniket Thakur"
faqItems:
  - question: "What is the primary formula for how to calculate portfolio risk and return in Level I Portfolio Management?"
    answer: "The primary equations for How to Calculate Portfolio Return and Portfolio Risk govern Portfolio Management calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is how to calculate portfolio risk and return tested on the CFA Level I exam?"
    answer: "On the CFA exam, How to Calculate Portfolio Return and Portfolio Risk is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
  - question: "How does Two-Asset Portfolio Expected Return connect to related topics in Portfolio Management?"
    answer: "Within Portfolio Management, Two-Asset Portfolio Expected Return links directly to CFA Portfolio Management: Complete Notes and Important Fo within the standard CFA Portfolio Management curriculum framework."
---

## Introduction

How to Calculate Portfolio Return and Portfolio Risk is a core Level I Portfolio Management topic (LM 4: Portfolio Risk and Return: Part I — Two-asset portfolio expected return, variance, and standard deviation using covariance and correlation) focusing on calculating weighted-average portfolio expected return and non-linear two-asset portfolio variance and standard deviation across correlation regimes. This guide covers the governing equations (Two-Asset Portfolio Expected Return and Two-Asset Portfolio Variance & Standard Deviation), two verified numerical examples, a comparison table, and three original CFA-style practice questions.

## Concept Explanation & Institutional Framework

From first principles, calculating weighted-average portfolio expected return and non-linear two-asset portfolio variance and standard deviation across correlation regimes links theoretical valuation and risk mechanics to practical decisions in Portfolio Management. Two-Asset Portfolio Expected Return (E(R_P) = (w_1 × E(R_1)) + (w_2 × E(R_2)) where w_1 + w_2 = 1) establishes the primary relationship (Portfolio expected return is a simple linear weighted average of asset expected returns, completely independent of correlation ρ_12.), while Two-Asset Portfolio Variance & Standard Deviation (σ_P^2 = w_1^2 σ_1^2 + w_2^2 σ_2^2 + 2 w_1 w_2 Cov(1,2) = w_1^2 σ_1^2 + w_2^2 σ_2^2 + 2 w_1 w_2 ρ_{12} σ_1 σ_2) governs Portfolio standard deviation is strictly less than the weighted average of asset standard deviations whenever correlation ρ_12 < +1.0.

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: Two-Asset Portfolio Expected Return

```formula
E(R_P) = (w_1 × E(R_1)) + (w_2 × E(R_2)) where w_1 + w_2 = 1
```

**Institutional Context & Variable Breakdown:** Portfolio expected return is a simple linear weighted average of asset expected returns, completely independent of correlation ρ_12.

### Formula 2: Two-Asset Portfolio Variance & Standard Deviation

```formula
σ_P^2 = w_1^2 σ_1^2 + w_2^2 σ_2^2 + 2 w_1 w_2 Cov(1,2) = w_1^2 σ_1^2 + w_2^2 σ_2^2 + 2 w_1 w_2 ρ_{12} σ_1 σ_2
```

**Institutional Context & Variable Breakdown:** Portfolio standard deviation is strictly less than the weighted average of asset standard deviations whenever correlation ρ_12 < +1.0.

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Step-by-Step Two-Asset Portfolio Return and Standard Deviation Calculation

**Problem & Given Scenario:**
A portfolio allocates w_1 = 60% to Equities (E(R_1) = 12.0%, σ_1 = 20.0%) and w_2 = 40% to Bonds (E(R_2) = 5.0%, σ_2 = 10.0%). The correlation between Equities and Bonds is ρ_12 = +0.25.

```formula
E(R_P) = (w_1 × E(R_1)) + (w_2 × E(R_2)) where w_1 + w_2 = 1
```

**Step-by-Step Substitution & Calculation:**

Step 1 (Expected Return): E(R_P) = (0.60 × 12.0%) + (0.40 × 5.0%) = 7.20% + 2.00% = 9.20%. Step 2 (Portfolio Variance in %^2): σ_P^2 = (0.60^2 × 20^2) + (0.40^2 × 10^2) + [2 × 0.60 × 0.40 × 0.25 × 20 × 10] = (0.36 × 400) + (0.16 × 100) + (0.48 × 50) = 144.0 + 16.0 + 24.0 = 184.0 (%^2). Step 3 (Portfolio Standard Deviation): σ_P = √184.0 = 13.5647% ≈ 13.56%.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Compared to the weighted average volatility of 0.60(20%) + 0.40(10%) = 16.00%, diversification at ρ = +0.25 cuts portfolio volatility by 244 bps down to 13.56%.

### Worked Example 2: Sensitivity of Portfolio Volatility Across Correlation Regimes (+1.0, 0.0, −1.0)

**Problem & Given Scenario:**
Using the same 60% Equity (σ_1 = 20%) / 40% Bond (σ_2 = 10%) weights, compute σ_P when ρ_12 equals +1.0, 0.0, and −1.0.

```formula
σ_P^2 = w_1^2 σ_1^2 + w_2^2 σ_2^2 + 2 w_1 w_2 Cov(1,2) = w_1^2 σ_1^2 + w_2^2 σ_2^2 + 2 w_1 w_2 ρ_{12} σ_1 σ_2
```

**Step-by-Step Substitution & Calculation:**

- **Step 1. At ρ = +1.0 (Perfect positive correlation): σ_P = w_1 σ_1 + w_2 σ_2 = 12.0% + 4.0% = 16.00% (zero diversification benefit).**

- **Step 2. At ρ = 0.0 (Uncorrelated): σ_P = √(144 + 16 + 0) = √160 = 12.65%.**

- **Step 3. At ρ = −1.0 (Perfect negative correlation): σ_P = |w_1 σ_1 − w_2 σ_2| = |12.0% − 4.0%| = 8.00% (and setting w_1 = 10/(20+10) = 33.33% drives σ_P to 0.00%!).**

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Notice that Diversification Benefit already begins as soon as ρ < +1.0—assets do NOT need negative correlation to reduce portfolio risk.

## Comparison & Reference Analysis

| Correlation Value (ρ_12) | Portfolio Standard Deviation Formula | 60/40 Example σ_P | Diversification Benefit |
|---|---|---|---|
| ρ_12 = +1.00 | w_1 σ_1 + w_2 σ_2 (linear maximum) | 16.00% | None (0 bps reduction) |
| ρ_12 = +0.25 | √(w_1^2 σ_1^2 + w_2^2 σ_2^2 + 0.5 w_1 w_2 σ_1 σ_2) | 13.56% | Moderate (−244 bps reduction) |
| ρ_12 = 0.00 | √(w_1^2 σ_1^2 + w_2^2 σ_2^2) | 12.65% | Substantial (−335 bps reduction) |
| ρ_12 = −1.00 | \|w_1 σ_1 − w_2 σ_2\| (can reach 0%) | 8.00% (0% at 1/3 weight) | Maximum (complete risk elimination) |

## Real-World Financial Applications

In institutional Portfolio Management practice, analysts apply Two-Asset Portfolio Expected Return and Two-Asset Portfolio Variance & Standard Deviation to value securities, audit financial statements, and manage portfolio risk.

## CFA Examination Perspective & Testing Patterns

On the CFA Level I exam (LM 4: Portfolio Risk and Return: Part I — Two-asset portfolio expected return, variance, and standard deviation using covariance and correlation), how to calculate portfolio risk and return is tested via standalone 90-second MCQs combining Two-Asset Portfolio Expected Return calculations with economic interpretation.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** An investor invests 50% in Asset X (σ_X = 16%) and 50% in Asset Y (σ_Y = 24%). If the correlation between Asset X and Asset Y is −0.50, the portfolio's standard deviation is closest to:

- **[A]** 10.58%

- **[B]** 14.42%

- **[C]** 20.00%

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** σ_P^2 = (0.50^2 × 16^2) + (0.50^2 × 24^2) + [2 × 0.50 × 0.50 × (−0.50) × 16 × 24] = 64 + 144 − 96 = 112 (%^2). Taking the square root gives σ_P = √112 = 10.58%.

### Practice Question 2

**Question:** If the correlation coefficient between two risky assets increases from −0.20 to +0.60 while their weights and individual expected returns remain constant, what happens to the portfolio's Expected Return and Standard Deviation?

- **[A]** Both Expected Return and Standard Deviation increase

- **[B]** Expected Return remains unchanged and Standard Deviation increases

- **[C]** Expected Return decreases and Standard Deviation increases

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** Portfolio expected return E(R_P) = w_1 E(R_1) + w_2 E(R_2) does not contain correlation ρ_12, so it is completely unaffected, whereas higher ρ_12 increases portfolio variance and standard deviation.

### Practice Question 3

**Question:** Two risky assets have standard deviations of σ_1 = 12% and σ_2 = 24% and are perfectly negatively correlated (ρ_12 = −1.0). What weight in Asset 1 (w_1) produces a zero-variance (completely riskless) portfolio?

- **[A]** 33.33%

- **[B]** 50.00%

- **[C]** 66.67%

> [!TIP]
> **Correct Answer: Option C.**
>
> **Explanation:** When ρ = −1.0, zero variance occurs where w_1 σ_1 = w_2 σ_2 => w_1 = σ_2 / (σ_1 + σ_2) = 24% / (12% + 24%) = 24 / 36 = 66.67%.

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in Two-Asset Portfolio Expected Return.**

- **Timing Errors: Mixing beginning and ending balances in Two-Asset Portfolio Variance & Standard Deviation.**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Curriculum Scope: LM 4: Portfolio Risk and Return: Part I — Two-asset portfolio expected return, variance, and standard deviation using covariance and correlation (Level I · Portfolio Management).**

- **Takeaway 2: Primary Formula (Two-Asset Portfolio Expected Return): E(R_P) = (w_1 × E(R_1)) + (w_2 × E(R_2)) where w_1 + w_2 = 1.**

- **Takeaway 3: Secondary Formula (Two-Asset Portfolio Variance & Standard Deviation): σ_P^2 = w_1^2 σ_1^2 + w_2^2 σ_2^2 + 2 w_1 w_2 Cov(1,2) = w_1^2 σ_1^2 + w_2^2 σ_2^2 + 2 w_1 w_2 ρ_{12} σ_1 σ_2.**

- **Takeaway 4: Key Insight 1: Compared to the weighted average volatility of 0.60(20%) + 0.40(10%) = 16.00%, diversification at ρ = +0.25 cuts portfolio volatility by 244.**

- **Takeaway 5: Key Insight 2: Notice that Diversification Benefit already begins as soon as ρ < +1.0—assets do NOT need negative correlation to reduce portfolio risk.**

## Frequently Asked Questions (FAQs)

### What is the primary formula for how to calculate portfolio risk and return in Level I Portfolio Management?

The primary equations for How to Calculate Portfolio Return and Portfolio Risk govern Portfolio Management calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is how to calculate portfolio risk and return tested on the CFA Level I exam?

On the CFA exam, How to Calculate Portfolio Return and Portfolio Risk is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

### How does Two-Asset Portfolio Expected Return connect to related topics in Portfolio Management?

Within Portfolio Management, Two-Asset Portfolio Expected Return links directly to CFA Portfolio Management: Complete Notes and Important Fo within the standard CFA Portfolio Management curriculum framework.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level I · Portfolio Management).

### Related CFA Study Guides

- [CFA Portfolio Management: Complete Notes and Important Formulas](/blog/cfa/cfa-level-1-portfolio-management-notes-important-formulas/)

- [Systematic vs Unsystematic Risk: Examples and CFA Questions](/blog/cfa/cfa-level-1-systematic-vs-unsystematic-risk-examples/)

- [How Does Portfolio Diversification Reduce Investment Risk?](/blog/cfa/cfa-level-1-how-portfolio-diversification-reduces-risk/)

