---
title: "Hypothesis Testing in CFA Level 1: How to Solve Numerical Questions"
seoTitle: "Hypothesis Testing in CFA Level 1: How to Solve Numerical Questions — CFA Level I"
slug: cfa-level-1-hypothesis-testing-numerical-questions
description: "Master hypothesis testing cfa level 1 for Level I (Quantitative Methods). Includes verified CFA formulas, 2 step-by-step solved numerical examples, compariso."
category: cfa
tags:
  - "CFA"
  - "Level I"
  - "Quantitative Methods"
  - "hypothesis testing cfa level 1"
  - "hypothesis testing cfa level 1 formula"
author: Aniket Thakur
datePublished: "2026-11-08"
dateModified: "2026-11-08"
coverImage: /assets/images/blog/cfa-level-1-hypothesis-testing-numerical-questions/cover.svg
coverImageAlt: "Illustrative guide to Hypothesis Testing in CFA Level 1: How to Solve Numerical Questions"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for Hypothesis Testing in CFA Level 1: How to Solve Numerical Questions."
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
  question: "Hypothesis Testing in CFA Level 1: How to Solve Numerical Questions: Key Summary & Verdict"
  answer: "Hypothesis Testing in CFA Level 1: How to Solve Numerical Questions is a core Level I Quantitative Methods topic (LM 8 & LM 9: Estimation and Inference & Hypothesis Testing — Null/alternative hypotheses, Type I and Type II errors, p-values, t-tests."
  facts:
    - label: "CFA Level"
      value: "Level I"
    - label: "Curriculum Subject"
      value: "Quantitative Methods"
    - label: "Topic Focus"
      value: "hypothesis testing cfa level 1"
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
  - question: "What is the primary formula for hypothesis testing cfa level 1 in Level I Quantitative Methods?"
    answer: "The primary equations for Hypothesis Testing in CFA Level 1: How to Solve Numerical Questions govern Quantitative Methods calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is hypothesis testing cfa level 1 tested on the CFA Level I exam?"
    answer: "On the CFA exam, Hypothesis Testing in CFA Level 1: How to Solve Numerical Questions is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
  - question: "How does Standard Error & One-Sample t-Statistic connect to related topics in Quantitative Methods?"
    answer: "Within Quantitative Methods, Standard Error & One-Sample t-Statistic links directly to Normal Distribution in CFA: Formula, Examples and Pra within the standard CFA Quantitative Methods curriculum framework."
---

## Introduction

Hypothesis Testing in CFA Level 1: How to Solve Numerical Questions is a core Level I Quantitative Methods topic (LM 8 & LM 9: Estimation and Inference & Hypothesis Testing — Null/alternative hypotheses, Type I and Type II errors, p-values, t-tests, chi-square, and F-tests) focusing on formulating null and alternative hypotheses, standard error of the sample mean, t-statistics, p-value rules, and Type I vs Type II error trade-offs. This guide covers the governing equations (Standard Error & One-Sample t-Statistic and Chi-Square Variance Test & F-Test for Equality of Variances), two verified numerical examples, a comparison table, and three original CFA-style practice questions.

## Concept Explanation & Institutional Framework

From first principles, formulating null and alternative hypotheses, standard error of the sample mean, t-statistics, p-value rules, and Type I vs Type II error trade-offs links theoretical valuation and risk mechanics to practical decisions in Quantitative Methods. Standard Error & One-Sample t-Statistic (SE = s / √n ; t = (X_bar − μ_0) / (s / √n) with df = n − 1) establishes the primary relationship (Tests whether a sample mean X_bar differs significantly from hypothesized population mean μ_0.), while Chi-Square Variance Test & F-Test for Equality of Variances (χ^2 = (n − 1)s^2 / σ_0^2 ; F = s_1^2 / s_2^2 (with s_1^2 > s_2^2)) governs Chi-square tests a single population variance against σ_0^2; F-test compares two independent sample variances.

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: Standard Error & One-Sample t-Statistic

```formula
SE = s / √n

t = (X_bar − μ_0) / (s / √n) with df = n − 1
```

**Institutional Context & Variable Breakdown:** Tests whether a sample mean X_bar differs significantly from hypothesized population mean μ_0.

### Formula 2: Chi-Square Variance Test & F-Test for Equality of Variances

```formula
χ^2 = (n − 1)s^2 / σ_0^2

F = s_1^2 / s_2^2 (with s_1^2 > s_2^2)
```

**Institutional Context & Variable Breakdown:**

- Chi-square tests a single population variance against σ_0^2.

- F-test compares two independent sample variances.

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Two-Tailed t-Test on Quantitative Strategy Monthly Alpha

**Problem & Given Scenario:**
Across n = 36 months, a quant strategy produces a sample mean monthly excess return of X_bar = +0.45% with a sample standard deviation of s = 1.20%. Test whether the true population mean excess return differs from μ_0 = 0.0% at the α = 5% significance level (two-tailed critical t_0.025,35 = ±2.030).

```formula
SE = s / √n

t = (X_bar − μ_0) / (s / √n) with df = n − 1
```

**Step-by-Step Substitution & Calculation:**

- **Step 1: Hypotheses: H_0: μ = 0 vs. H_a: μ ≠**

- **Step 0. Step 2: Standard Error SE = s / √n = 1.20% / √36 = 1.20% / 6 = 0.20%. Step 3: Test statistic t = (0.45% − 0.0%) / 0.20% = +2.250. Step 4: Since |t| = 2.250 > 2.030, reject H_0.**

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> At the 5% significance level, the strategy's +0.45% monthly alpha is statistically significantly different from zero.

### Worked Example 2: One-Tailed Hypothesis Test on Portfolio Tracking Error Volatility

**Problem & Given Scenario:**
A fund claims its annual variance of returns does not exceed σ_0^2 = 16.0 (%^2, i.e., σ_0 = 4.0%). Across n = 21 years, observed sample standard deviation is s = 5.0% (s^2 = 25.0). Test H_0: σ^2 ≤ 16.0 vs. H_a: σ^2 > 16.0 at α = 5% (critical χ^2_0.05,20 = 31.410).

```formula
χ^2 = (n − 1)s^2 / σ_0^2

F = s_1^2 / s_2^2 (with s_1^2 > s_2^2)
```

**Step-by-Step Substitution & Calculation:**

χ^2 = (n − 1) × s^2 / σ_0^2 = (21 − 1) × 25.0 / 16.0 = 500 / 16.0 = 31.250. Since 31.250 < 31.410, fail to reject H_0 at α = 5%.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Although sample volatility (5.0%) exceeds 4.0%, the chi-square statistic (31.25) falls just shy of the 5% critical value (31.41).

## Comparison & Reference Analysis

| Hypothesis Test Type | Test Statistic Formula | Degrees of Freedom | Target Population Parameter |
|---|---|---|---|
| One-Sample t-Test | t = (X_bar − μ_0) / (s / √n) | n − 1 | Single population mean μ |
| Paired Comparisons t-Test | t = (d_bar − μ_d0) / (s_d / √n) | n − 1 | Mean difference of dependent pairs |
| Chi-Square Variance Test | χ^2 = (n − 1)s^2 / σ_0^2 | n − 1 | Single population variance σ^2 |
| F-Test of Variances | F = s_1^2 / s_2^2 | df_1 = n_1 − 1, df_2 = n_2 − 1 | Equality of two independent variances |

## Real-World Financial Applications

In institutional Quantitative Methods practice, analysts apply Standard Error & One-Sample t-Statistic and Chi-Square Variance Test & F-Test for Equality of Variances to value securities, audit financial statements, and manage portfolio risk.

## CFA Examination Perspective & Testing Patterns

On the CFA Level I exam (LM 8 & LM 9: Estimation and Inference & Hypothesis Testing — Null/alternative hypotheses, Type I and Type II errors, p-values, t-tests, chi-square, and F-tests), hypothesis testing cfa level 1 is tested via standalone 90-second MCQs combining Standard Error & One-Sample t-Statistic calculations with economic interpretation.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** An analyst wants to prove that a fund's mean monthly return exceeds 1.0%. Which hypothesis formulation is correct?

- **[A]** H_0: μ > 1.0% vs. H_a: μ ≤ 1.0%

- **[B]** H_0: μ ≤ 1.0% vs. H_a: μ > 1.0%

- **[C]** H_0: X_bar ≤ 1.0% vs. H_a: X_bar > 1.0%

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** The condition the researcher seeks to prove (μ > 1.0%) is always placed in the alternative hypothesis H_a, while the equality sign resides in H_0 (formulated on population parameter μ, never sample statistic X_bar).

### Practice Question 2

**Question:** In hypothesis testing, decreasing the significance level α from 5% to 1% while holding sample size constant will:

- **[A]** Decrease the probability of a Type I error and increase the probability of a Type II error (reducing statistical power)

- **[B]** Decrease both Type I and Type II error probabilities

- **[C]** Increase the statistical power of the test (1 − β)

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** Lowering α raises the critical value hurdle, making it harder to reject H_0. This reduces Type I error (α) but increases Type II error (β, failing to reject a false null), thereby reducing power (1 − β).

### Practice Question 3

**Question:** A sample of 49 observations yields a sample mean of 14.2 and sample standard deviation of 3.5. The t-statistic for testing H_0: μ = 13.0 is closest to:

- **[A]** 0.34

- **[B]** 2.40

- **[C]** 3.40

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** Standard error SE = 3.5 / √49 = 3.5 / 7 = 0.50. t-statistic = (14.2 − 13.0) / 0.50 = 1.2 / 0.50 = 2.40.

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in Standard Error & One-Sample t-Statistic.**

- **Timing Errors: Mixing beginning and ending balances in Chi-Square Variance Test & F-Test for Equality of Variances.**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Curriculum Scope: LM 8 & LM 9: Estimation and Inference & Hypothesis Testing — Null/alternative hypotheses, Type I and Type II errors, p-values, t-tests, chi-square, and F-tests (Level I · Quantitative Methods).**

- **Takeaway 2: Primary Formula (Standard Error & One-Sample t-Statistic): SE = s / √n ; t = (X_bar − μ_0) / (s / √n) with df = n − 1.**

- **Takeaway 3: Secondary Formula (Chi-Square Variance Test & F-Test for Equality of Variances): χ^2 = (n − 1)s^2 / σ_0^2 ; F = s_1^2 / s_2^2 (with s_1^2 > s_2^2).**

- **Takeaway 4: Key Insight 1: At the 5% significance level, the strategy's +0.45% monthly alpha is statistically significantly different from zero.**

- **Takeaway 5: Key Insight 2: Although sample volatility (5.0%) exceeds 4.0%, the chi-square statistic (31.25) falls just shy of the 5% critical value (31.41).**

## Frequently Asked Questions (FAQs)

### What is the primary formula for hypothesis testing cfa level 1 in Level I Quantitative Methods?

The primary equations for Hypothesis Testing in CFA Level 1: How to Solve Numerical Questions govern Quantitative Methods calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is hypothesis testing cfa level 1 tested on the CFA Level I exam?

On the CFA exam, Hypothesis Testing in CFA Level 1: How to Solve Numerical Questions is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

### How does Standard Error & One-Sample t-Statistic connect to related topics in Quantitative Methods?

Within Quantitative Methods, Standard Error & One-Sample t-Statistic links directly to Normal Distribution in CFA: Formula, Examples and Pra within the standard CFA Quantitative Methods curriculum framework.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level I · Quantitative Methods).

### Related CFA Study Guides

- [Normal Distribution in CFA: Formula, Examples and Practice Questions](/blog/cfa/cfa-level-1-normal-distribution-formula-examples/)

- [Correlation and Covariance: Formulas, Examples and CFA Questions](/blog/cfa/cfa-level-1-correlation-and-covariance-formulas/)

- [Bayes' Theorem CFA Questions: How to Solve Conditional Probability](/blog/cfa/cfa-level-1-bayes-theorem-conditional-probability/)

