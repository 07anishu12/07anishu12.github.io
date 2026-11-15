---
title: "Sharpe Ratio vs Treynor Ratio vs Jensen's Alpha"
seoTitle: "Sharpe Ratio vs Treynor Ratio vs Jensen's Alpha — CFA Level I"
slug: cfa-level-1-sharpe-ratio-vs-treynor-ratio-vs-jensens-alpha
description: "Master sharpe ratio vs treynor ratio vs jensens alpha for Level I (Portfolio Management). Includes verified CFA formulas, 2 step-by-step solved numerical exa."
category: cfa
tags:
  - "CFA"
  - "Level I"
  - "Portfolio Management"
  - "sharpe ratio vs treynor ratio vs jensens alpha"
  - "sharpe ratio vs treynor ratio vs jensens alpha formula"
author: Aniket Thakur
datePublished: "2026-11-11"
dateModified: "2026-11-11"
coverImage: /assets/images/blog/cfa-level-1-sharpe-ratio-vs-treynor-ratio-vs-jensens-alpha/cover.svg
coverImageAlt: "Illustrative guide to Sharpe Ratio vs Treynor Ratio vs Jensen's Alpha"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for Sharpe Ratio vs Treynor Ratio vs Jensen's Alpha."
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
  question: "Sharpe Ratio vs Treynor Ratio vs Jensen's Alpha: Key Summary & Verdict"
  answer: "Sharpe Ratio vs Treynor Ratio vs Jensen's Alpha is a core Level I Portfolio Management topic (LM 5: Portfolio Risk and Return: Part II — Sharpe Ratio, M-Squared (M^2), Treynor Ratio, Jensen's Alpha, total risk vs systematic risk performance evaluation)."
  facts:
    - label: "CFA Level"
      value: "Level I"
    - label: "Curriculum Subject"
      value: "Portfolio Management"
    - label: "Topic Focus"
      value: "sharpe ratio vs treynor ratio vs je"
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
  - question: "What is the primary formula for sharpe ratio vs treynor ratio vs jensens alpha in Level I Portfolio Management?"
    answer: "The primary equations for Sharpe Ratio vs Treynor Ratio vs Jensen's Alpha govern Portfolio Management calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is sharpe ratio vs treynor ratio vs jensens alpha tested on the CFA Level I exam?"
    answer: "On the CFA exam, Sharpe Ratio vs Treynor Ratio vs Jensen's Alpha is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
  - question: "How does Total-Risk Metrics: Sharpe Ratio & M-Squared (M^2) connect to related topics in Portfolio Management?"
    answer: "Within Portfolio Management, Total-Risk Metrics: Sharpe Ratio & M-Squared (M^2) links directly to CAPM Explained: How to Calculate Expected within the standard CFA Portfolio Management curriculum framework."
---

## Introduction

Sharpe Ratio vs Treynor Ratio vs Jensen's Alpha is a core Level I Portfolio Management topic (LM 5: Portfolio Risk and Return: Part II — Sharpe Ratio, M-Squared (M^2), Treynor Ratio, Jensen's Alpha, total risk vs systematic risk performance evaluation) focusing on comparing total-risk metrics (Sharpe Ratio and M-Squared M^2) against systematic-risk metrics (Treynor Ratio and Jensen's Alpha), plus Information Ratio and Sortino Ratio. This guide covers the governing equations (Total-Risk Metrics: Sharpe Ratio & M-Squared (M^2) and Systematic-Risk Metrics: Treynor Ratio & Jensen's Alpha), two verified numerical examples, a comparison table, and three original CFA-style practice questions.

## Concept Explanation & Institutional Framework

From first principles, comparing total-risk metrics (Sharpe Ratio and M-Squared M^2) against systematic-risk metrics (Treynor Ratio and Jensen's Alpha), plus Information Ratio and Sortino Ratio links theoretical valuation and risk mechanics to practical decisions in Portfolio Management. Total-Risk Metrics: Sharpe Ratio & M-Squared (M^2) (Sharpe = (R_P − R_F) / σ_P ; M^2 = R_F + [(R_P − R_F) / σ_P] × σ_M = R_F + (Sharpe_P × σ_M)) establishes the primary relationship (Evaluates excess return per unit of TOTAL risk (σ_P); M^2 scales portfolio P to the market's volatility σ_M (M^2 Alpha = M^2 − R_M).), while Systematic-Risk Metrics: Treynor Ratio & Jensen's Alpha (Treynor = (R_P − R_F) / β_P ; Jensen's α_P = R_P − [R_F + β_P × (R_M − R_F)]) governs Evaluates excess return relative to SYSTEMATIC risk (β_P) only; appropriate when portfolio P is just one sub-sleeve inside a fully diversified fund.

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: Total-Risk Metrics: Sharpe Ratio & M-Squared (M^2)

```formula
Sharpe = (R_P − R_F) / σ_P

M^2 = R_F + [(R_P − R_F) / σ_P] × σ_M = R_F + (Sharpe_P × σ_M)
```

**Institutional Context & Variable Breakdown:**

- Evaluates excess return per unit of TOTAL risk (σ_P).

- M^2 scales portfolio P to the market's volatility σ_M (M^2 Alpha = M^2 − R_M).

### Formula 2: Systematic-Risk Metrics: Treynor Ratio & Jensen's Alpha

```formula
Treynor = (R_P − R_F) / β_P

Jensen's α_P = R_P − [R_F + β_P × (R_M − R_F)]
```

**Institutional Context & Variable Breakdown:**

- Evaluates excess return relative to SYSTEMATIC risk (β_P) only.

- appropriate when portfolio P is just one sub-sleeve inside a fully diversified fund.

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Calculating Sharpe, M-Squared, Treynor, and Jensen's Alpha for Two Fund Managers

**Problem & Given Scenario:**
Risk-Free Rate R_F = 4.0%; Market Portfolio M has Return R_M = 10.0%, Volatility σ_M = 15.0%, and β_M = 1.00. Manager X (Concentrated Biotech Fund): R_X = 14.0%, σ_X = 25.0%, β_X = 1.25. Manager Y (Diversified Core Fund): R_Y = 11.7%, σ_Y = 14.0%, β_Y = 1.10.

```formula
Sharpe = (R_P − R_F) / σ_P

M^2 = R_F + [(R_P − R_F) / σ_P] × σ_M = R_F + (Sharpe_P × σ_M)
```

**Step-by-Step Substitution & Calculation:**

- **Step 1. Sharpe Ratios (Total Risk): Sharpe_M = (10−4)/15 = 0.400; Sharpe_X = (14−4)/25 = 0.400; Sharpe_Y = (11.7−4)/14 = 0.550 (Manager Y wins on Total Risk!).**

- **Step 2. M-Squared (M^2): M^2_X = 4.0% + 0.400(15.0%) = 10.00% (M^2 Alpha = 0.00%); M^2_Y = 4.0% + 0.550(15.0%) = 12.25% (M^2 Alpha = +2.25%).**

- **Step 3. Treynor Ratios (Systematic Risk): Treynor_M = 6.0%; Treynor_X = (14−4)/1.25 = 8.00% (Manager X wins on Systematic Risk!); Treynor_Y = (11.7−4)/1.10 = 7.00%.**

- **Step 4. Jensen's Alpha: α_X = 14.0% − [4.0% + 1.25(6.0%)] = +2.50%; α_Y = 11.7% − [4.0% + 1.10(6.0%)] = +1.10%.**

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Why did Manager X beat Manager Y on Treynor (8.0% vs 7.0%) and Jensen's Alpha (+2.50% vs +1.10%), yet lose on Sharpe (0.40 vs 0.55)? Because Manager X took large unsystematic risk (σ_X = 25% vs β_X σ_M = 18.75%), which penalizes Sharpe and M^2 but is ignored by Treynor and Jensen's Alpha!

### Worked Example 2: Information Ratio for Active Benchmark-Relative Evaluation

**Problem & Given Scenario:**
Manager Z generates an active return (R_P − R_Benchmark) of +1.80% with an active tracking risk (standard deviation of active returns, σ_{P−B}) of 3.60%.

```formula
Treynor = (R_P − R_F) / β_P

Jensen's α_P = R_P − [R_F + β_P × (R_M − R_F)]
```

**Step-by-Step Substitution & Calculation:**

Information Ratio (IR) = (R_P − R_B) / σ_{P−B} = +1.80% / 3.60% = 0.50.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Unlike the Sharpe ratio (which benchmarks against R_F), the Information Ratio measures consistency of active outperformance relative to a style benchmark.

## Comparison & Reference Analysis

| Performance Metric | Formula | Risk Denominator / Benchmark | Correct Application Context |
|---|---|---|---|
| Sharpe Ratio | (R_P − R_F) / σ_P | Total Volatility (σ_P) | Investor's entire standalone portfolio |
| M-Squared (M^2) | R_F + Sharpe_P × σ_M | Total Volatility scaled to σ_M | Expresses Sharpe ranking in % units |
| Treynor Ratio | (R_P − R_F) / β_P | Systematic Risk (Beta β_P) | Sub-portfolio inside diversified fund |
| Jensen's Alpha (α_P) | R_P − [R_F + β_P(R_M − R_F)] | CAPM Benchmark Return | Dollar/percentage alpha above SML |
| Information Ratio (IR) | (R_P − R_B) / Tracking Error | Active Tracking Risk σ(R_P − R_B) | Active manager vs style index |

## Real-World Financial Applications

In institutional Portfolio Management practice, analysts apply Total-Risk Metrics: Sharpe Ratio & M-Squared (M^2) and Systematic-Risk Metrics: Treynor Ratio & Jensen's Alpha to value securities, audit financial statements, and manage portfolio risk.

## CFA Examination Perspective & Testing Patterns

On the CFA Level I exam (LM 5: Portfolio Risk and Return: Part II — Sharpe Ratio, M-Squared (M^2), Treynor Ratio, Jensen's Alpha, total risk vs systematic risk performance evaluation), sharpe ratio vs treynor ratio vs jensens alpha is tested via standalone 90-second MCQs combining Total-Risk Metrics: Sharpe Ratio & M-Squared (M^2) calculations with economic interpretation.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** Portfolio P achieved an annual return of 13.0% with a standard deviation of 18.0% and a beta of 1.20. During the same period, the market index returned 10.0% with a standard deviation of 14.0%, and the risk-free rate was 4.0%. Portfolio P's M-Squared (M^2) is closest to:

- **[A]** 10.50%

- **[B]** 11.00%

- **[C]** 11.80%

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** First compute Portfolio P's Sharpe ratio: Sharpe_P = (13.0% − 4.0%) / 18.0% = 9.0% / 18.0% = 0.50. Then compute M^2 = R_F + (Sharpe_P × σ_M) = 4.0% + (0.50 × 14.0%) = 4.0% + 7.0% = 11.00% (so M^2 alpha = 11.0% − 10.0% = +1.00%).

### Practice Question 2

**Question:** When a portfolio has a higher Treynor Ratio and a positive Jensen's Alpha relative to the market index, but a LOWER Sharpe Ratio than the market index, what is the explanation?

- **[A]** The portfolio has negative beta

- **[B]** The portfolio is poorly diversified and carries substantial unsystematic (idiosyncratic) risk, which inflates total standard deviation σ_P in the Sharpe denominator

- **[C]** The risk-free rate exceeded the market return

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** Treynor and Jensen's Alpha look only at systematic risk (β_P), whereas Sharpe penalizes total risk (σ_P). A concentrated portfolio with high unsystematic risk will score poorly on Sharpe despite beating on Treynor/Alpha.

### Practice Question 3

**Question:** Which two risk-adjusted performance measures will ALWAYS rank a set of positive-beta portfolios in the exact same order relative to the market portfolio?

- **[A]** Sharpe Ratio and M-Squared (M^2)

- **[B]** Sharpe Ratio and Treynor Ratio

- **[C]** M-Squared and Jensen's Alpha

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** Because M^2 = R_F + Sharpe_P × σ_M is a positive linear transformation of the Sharpe Ratio (with constant R_F and σ_M), Sharpe Ratio and M^2 always produce identical rankings.

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in Total-Risk Metrics: Sharpe Ratio & M-Squared (M^2).**

- **Timing Errors: Mixing beginning and ending balances in Systematic-Risk Metrics: Treynor Ratio & Jensen's Alpha.**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Curriculum Scope: LM 5: Portfolio Risk and Return: Part II — Sharpe Ratio, M-Squared (M^2), Treynor Ratio, Jensen's Alpha, total risk vs systematic risk performance evaluation (Level I · Portfolio Management).**

- **Takeaway 2: Primary Formula (Total-Risk Metrics: Sharpe Ratio & M-Squared (M^2)): Sharpe = (R_P − R_F) / σ_P ; M^2 = R_F + [(R_P − R_F) / σ_P] × σ_M = R_F + (Sharpe_P × σ_M).**

- **Takeaway 3: Secondary Formula (Systematic-Risk Metrics: Treynor Ratio & Jensen's Alpha): Treynor = (R_P − R_F) / β_P ; Jensen's α_P = R_P − [R_F + β_P × (R_M − R_F)].**

- **Takeaway 4: Key Insight 1: Why did Manager X beat Manager Y on Treynor (8.0% vs 7.0%) and Jensen's Alpha (+2.50% vs +1.10%), yet lose on Sharpe (0.40 vs 0.55)? Because.**

- **Takeaway 5: Key Insight 2: Unlike the Sharpe ratio (which benchmarks against R_F), the Information Ratio measures consistency of active outperformance relative to a.**

## Frequently Asked Questions (FAQs)

### What is the primary formula for sharpe ratio vs treynor ratio vs jensens alpha in Level I Portfolio Management?

The primary equations for Sharpe Ratio vs Treynor Ratio vs Jensen's Alpha govern Portfolio Management calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is sharpe ratio vs treynor ratio vs jensens alpha tested on the CFA Level I exam?

On the CFA exam, Sharpe Ratio vs Treynor Ratio vs Jensen's Alpha is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

### How does Total-Risk Metrics: Sharpe Ratio & M-Squared (M^2) connect to related topics in Portfolio Management?

Within Portfolio Management, Total-Risk Metrics: Sharpe Ratio & M-Squared (M^2) links directly to CAPM Explained: How to Calculate Expected within the standard CFA Portfolio Management curriculum framework.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level I · Portfolio Management).

### Related CFA Study Guides

- [CAPM Explained: How to Calculate Expected Return Using Beta](/blog/cfa/cfa-level-1-capm-calculate-expected-return-using-beta/)

- [How to Calculate Portfolio Beta and Interpret Market Risk](/blog/cfa/cfa-level-1-calculate-portfolio-beta-interpret-market-risk/)

- [Efficient Frontier Explained: How to Calculate Optimal Portfolio Weights](/blog/cfa/cfa-level-1-efficient-frontier-calculate-optimal-portfolio-weights/)

