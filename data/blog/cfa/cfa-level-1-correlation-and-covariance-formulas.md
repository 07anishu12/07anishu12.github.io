---
title: "Correlation and Covariance: Formulas, Examples and CFA Questions"
seoTitle: "Correlation and Covariance: Formulas, Examples and CFA Questions — CFA Level I"
slug: cfa-level-1-correlation-and-covariance-formulas
description: "Master correlation and covariance cfa for Level I (Quantitative Methods). Includes verified CFA formulas, 2 step-by-step solved numerical examples, compariso."
category: cfa
tags:
  - "CFA"
  - "Level I"
  - "Quantitative Methods"
  - "correlation and covariance cfa"
  - "correlation and covariance cfa formula"
author: Aniket Thakur
datePublished: "2026-11-08"
dateModified: "2026-11-08"
coverImage: /assets/images/blog/cfa-level-1-correlation-and-covariance-formulas/cover.svg
coverImageAlt: "Illustrative guide to Correlation and Covariance: Formulas, Examples and CFA Questions"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for Correlation and Covariance: Formulas, Examples and CFA Questions."
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
  question: "Correlation and Covariance: Formulas, Examples and CFA Questions: Key Summary & Verdict"
  answer: "Correlation and Covariance: Formulas, Examples and CFA Questions is a core Level I Quantitative Methods topic (LM 3 & LM 10: Sample covariance, sample correlation, correlation t-test, and simple linear regression slope/R-squared) focusing on sample covariance."
  facts:
    - label: "CFA Level"
      value: "Level I"
    - label: "Curriculum Subject"
      value: "Quantitative Methods"
    - label: "Topic Focus"
      value: "correlation and covariance cfa"
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
  - question: "What is the primary formula for correlation and covariance cfa in Level I Quantitative Methods?"
    answer: "The primary equations for Correlation and Covariance: Formulas, Examples and CFA Questions govern Quantitative Methods calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is correlation and covariance cfa tested on the CFA Level I exam?"
    answer: "On the CFA exam, Correlation and Covariance: Formulas, Examples and CFA Questions is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
  - question: "How does Sample Covariance & Sample Correlation Coefficient connect to related topics in Quantitative Methods?"
    answer: "Within Quantitative Methods, Sample Covariance & Sample Correlation Coefficient links directly to Hypothesis Testing in CFA Level 1: How to within the standard CFA Quantitative Methods curriculum framework."
---

## Introduction

Correlation and Covariance: Formulas, Examples and CFA Questions is a core Level I Quantitative Methods topic (LM 3 & LM 10: Sample covariance, sample correlation, correlation t-test, and simple linear regression slope/R-squared) focusing on sample covariance vs standardized correlation coefficient, significance testing of correlation, and connection to OLS regression slope. This guide covers the governing equations (Sample Covariance & Sample Correlation Coefficient and Correlation Significance t-Test & Regression Slope Link), two verified numerical examples, a comparison table, and three original CFA-style practice questions.

## Concept Explanation & Institutional Framework

From first principles, sample covariance vs standardized correlation coefficient, significance testing of correlation, and connection to OLS regression slope links theoretical valuation and risk mechanics to practical decisions in Quantitative Methods. Sample Covariance & Sample Correlation Coefficient (s_XY = [∑ (X_i − X_bar)(Y_i − Y_bar)] / (n − 1) ; r_XY = s_XY / (s_X × s_Y)) establishes the primary relationship (s_XY measures unbounded joint co-movement in squared return units; r_XY standardizes linear association onto [−1.0, +1.0].), while Correlation Significance t-Test & Regression Slope Link (t = [r × √(n − 2)] / √(1 − r^2) (df = n − 2) ; b_1 = s_XY / s_X^2 = r_XY × (s_Y / s_X)) governs Tests H_0: ρ = 0 using n − 2 degrees of freedom and links correlation directly to simple linear regression slope b_1.

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: Sample Covariance & Sample Correlation Coefficient

```formula
s_XY = [∑ (X_i − X_bar)(Y_i − Y_bar)] / (n − 1)

r_XY = s_XY / (s_X × s_Y)
```

**Institutional Context & Variable Breakdown:**

- s_XY measures unbounded joint co-movement in squared return units.

- r_XY standardizes linear association onto [−1.0, +1.0].

### Formula 2: Correlation Significance t-Test & Regression Slope Link

```formula
t = [r × √(n − 2)] / √(1 − r^2) (df = n − 2)

b_1 = s_XY / s_X^2 = r_XY × (s_Y / s_X)
```

**Institutional Context & Variable Breakdown:** Tests H_0: ρ = 0 using n − 2 degrees of freedom and links correlation directly to simple linear regression slope b_1.

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Calculating Sample Covariance, Correlation, and Regression Slope

**Problem & Given Scenario:**
Across n = 27 monthly observations, Asset X has s_X = 4.0%, Asset Y has s_Y = 6.0%, and the sum of cross-products ∑(X_i − X_bar)(Y_i − Y_bar) = +390.0 (%^2).

```formula
s_XY = [∑ (X_i − X_bar)(Y_i − Y_bar)] / (n − 1)

r_XY = s_XY / (s_X × s_Y)
```

**Step-by-Step Substitution & Calculation:**

Step 1: Sample Covariance s_XY = 390.0 / (27 − 1) = 390.0 / 26 = +15.0 (%^2). Step 2: Correlation r_XY = 15.0 / (4.0 × 6.0) = 15.0 / 24.0 = +0.6250. Step 3: Slope of regressing Y on X: b_1 = 15.0 / (4.0^2) = 15.0 / 16.0 = 0.9375, and R^2 = r_XY^2 = (0.625)^2 = 0.3906 (39.06%).

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> A +0.625 correlation indicates that 39.06% of the variance in Asset Y is linearly explained by Asset X.

### Worked Example 2: Testing Whether a Sample Correlation Is Statistically Different from Zero

**Problem & Given Scenario:**
Using r = +0.6250 from n = 27 observations, test H_0: ρ = 0 vs. H_a: ρ ≠ 0 at α = 5% (critical t_0.025,25 = ±2.060).

```formula
t = [r × √(n − 2)] / √(1 − r^2) (df = n − 2)

b_1 = s_XY / s_X^2 = r_XY × (s_Y / s_X)
```

**Step-by-Step Substitution & Calculation:**

t = [0.625 × √(27 − 2)] / √(1 − 0.625^2) = (0.625 × 5.0) / √(1 − 0.390625) = 3.125 / √0.609375 = 3.125 / 0.780625 = +4.003. Since 4.003 > 2.060, reject H_0.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> With 25 degrees of freedom (n − 2), a sample correlation of +0.625 is highly statistically significant (t = 4.00).

## Comparison & Reference Analysis

| Metric | Range of Values | Units of Measurement | Sensitivity to Scale |
|---|---|---|---|
| Sample Covariance (s_XY) | (−∞, +∞) | Unit(X) × Unit(Y) (e.g., %^2) | Changes if units scale (e.g. % to bps) |
| Pearson Correlation (r_XY) | [−1.0, +1.0] | Dimensionless (pure number) | Scale-invariant |
| Spearman Rank Correlation | [−1.0, +1.0] | Dimensionless (ranked order) | Robust to outliers & monotonic non-linear |
| Coefficient of Determination (R^2) | [0.0, 1.0] | Proportion of variance explained | Equals r_XY^2 in simple linear regression |

## Real-World Financial Applications

In institutional Quantitative Methods practice, analysts apply Sample Covariance & Sample Correlation Coefficient and Correlation Significance t-Test & Regression Slope Link to value securities, audit financial statements, and manage portfolio risk.

## CFA Examination Perspective & Testing Patterns

On the CFA Level I exam (LM 3 & LM 10: Sample covariance, sample correlation, correlation t-test, and simple linear regression slope/R-squared), correlation and covariance cfa is tested via standalone 90-second MCQs combining Sample Covariance & Sample Correlation Coefficient calculations with economic interpretation.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** If the sample covariance between two equities is −18.0 (%^2) and their sample standard deviations are 5.0% and 6.0%, their sample correlation coefficient is closest to:

- **[A]** −0.60

- **[B]** −0.30

- **[C]** +0.60

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** r_XY = s_XY / (s_X × s_Y) = −18.0 / (5.0 × 6.0) = −18.0 / 30.0 = −0.60.

### Practice Question 2

**Question:** Across n = 38 quarterly observations, the sample correlation between GDP growth and corporate defaults is r = −0.50. The t-statistic for testing H_0: ρ = 0 is closest to:

- **[A]** −3.00

- **[B]** −3.46

- **[C]** −4.00

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** t = [r × √(n − 2)] / √(1 − r^2) = [−0.50 × √36] / √(1 − 0.25) = −3.00 / √0.75 = −3.00 / 0.866025 = −3.464 ≈ −3.46.

### Practice Question 3

**Question:** In a simple linear regression of Asset Y on Asset X, if the correlation coefficient is +0.80, the percentage of total variation in Asset Y explained by Asset X (R-squared) is:

- **[A]** 64.0%

- **[B]** 80.0%

- **[C]** 89.4%

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** In a simple linear regression (one independent variable), R^2 equals the square of the correlation coefficient: (+0.80)^2 = 0.64 = 64.0%.

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in Sample Covariance & Sample Correlation Coefficient.**

- **Timing Errors: Mixing beginning and ending balances in Correlation Significance t-Test & Regression Slope Link.**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Curriculum Scope: LM 3 & LM 10: Sample covariance, sample correlation, correlation t-test, and simple linear regression slope/R-squared (Level I · Quantitative Methods).**

- **Takeaway 2: Primary Formula (Sample Covariance & Sample Correlation Coefficient): s_XY = [∑ (X_i − X_bar)(Y_i − Y_bar)] / (n − 1) ; r_XY = s_XY / (s_X × s_Y).**

- **Takeaway 3: Secondary Formula (Correlation Significance t-Test & Regression Slope Link): t = [r × √(n − 2)] / √(1 − r^2) (df = n − 2) ; b_1 = s_XY / s_X^2 = r_XY × (s_Y / s_X).**

- **Takeaway 4: Key Insight 1: A +0.625 correlation indicates that 39.06% of the variance in Asset Y is linearly explained by Asset X.**

- **Takeaway 5: Key Insight 2: With 25 degrees of freedom (n − 2), a sample correlation of +0.625 is highly statistically significant (t = 4.00).**

## Frequently Asked Questions (FAQs)

### What is the primary formula for correlation and covariance cfa in Level I Quantitative Methods?

The primary equations for Correlation and Covariance: Formulas, Examples and CFA Questions govern Quantitative Methods calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is correlation and covariance cfa tested on the CFA Level I exam?

On the CFA exam, Correlation and Covariance: Formulas, Examples and CFA Questions is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

### How does Sample Covariance & Sample Correlation Coefficient connect to related topics in Quantitative Methods?

Within Quantitative Methods, Sample Covariance & Sample Correlation Coefficient links directly to Hypothesis Testing in CFA Level 1: How to within the standard CFA Quantitative Methods curriculum framework.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level I · Quantitative Methods).

### Related CFA Study Guides

- [Hypothesis Testing in CFA Level 1: How to Solve Numerical Questions](/blog/cfa/cfa-level-1-hypothesis-testing-numerical-questions/)

- [Normal Distribution in CFA: Formula, Examples and Practice Questions](/blog/cfa/cfa-level-1-normal-distribution-formula-examples/)

- [Bayes' Theorem CFA Questions: How to Solve Conditional Probability](/blog/cfa/cfa-level-1-bayes-theorem-conditional-probability/)

