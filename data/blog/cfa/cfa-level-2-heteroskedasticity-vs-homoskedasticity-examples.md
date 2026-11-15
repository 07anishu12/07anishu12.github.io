---
title: "Heteroskedasticity vs Homoskedasticity: CFA Examples and Questions"
seoTitle: "Heteroskedasticity vs Homoskedasticity: CFA Examples and Questions — CFA Level II"
slug: cfa-level-2-heteroskedasticity-vs-homoskedasticity-examples
description: "Master heteroskedasticity vs homoskedasticity cfa for Level II (Quantitative Methods). Includes verified CFA formulas, 2 step-by-step solved numerical exampl."
category: cfa
tags:
  - "CFA"
  - "Level II"
  - "Quantitative Methods"
  - "heteroskedasticity vs homoskedasticity cfa"
  - "heteroskedasticity vs homoskedasticity cfa formula"
author: Aniket Thakur
datePublished: "2026-11-12"
dateModified: "2026-11-12"
coverImage: /assets/images/blog/cfa-level-2-heteroskedasticity-vs-homoskedasticity-examples/cover.svg
coverImageAlt: "Illustrative guide to Heteroskedasticity vs Homoskedasticity: CFA Examples and Questions"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for Heteroskedasticity vs Homoskedasticity: CFA Examples and Questions."
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
  question: "Heteroskedasticity vs Homoskedasticity: CFA Examples and Questions: Key Summary & Verdict"
  answer: "Heteroskedasticity vs Homoskedasticity: CFA Examples and Questions is a core Level II Quantitative Methods topic (LM 3: Model Misspecification — Homoskedasticity vs unconditional and conditional heteroskedasticity, effect on OLS estimators and standard."
  facts:
    - label: "CFA Level"
      value: "Level II"
    - label: "Curriculum Subject"
      value: "Quantitative Methods"
    - label: "Topic Focus"
      value: "heteroskedasticity vs homoskedastic"
    - label: "Syllabus Standard"
      value: "2026–2027 Curriculum"
  goodFor:
    - "Candidates preparing for CFA Level II (Quantitative Methods) exam questions."
    - "Financial analysts requiring verified formulas and worked calculations."
  watchFor:
    - "Verify compounding periodicity, sign conventions, and calculator mode (BGN vs END)."
    - "Review boundary conditions and common exam distractor traps."
  note: "2026–2027 CFA Program Curriculum Series · Aniket Thakur"
faqItems:
  - question: "What is the primary formula for heteroskedasticity vs homoskedasticity cfa in Level II Quantitative Methods?"
    answer: "The primary equations for Heteroskedasticity vs Homoskedasticity: CFA Examples and Questions govern Quantitative Methods calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is heteroskedasticity vs homoskedasticity cfa tested on the CFA Level II exam?"
    answer: "On the CFA exam, Heteroskedasticity vs Homoskedasticity: CFA Examples and Questions is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
  - question: "How does Breusch-Pagan Chi-Square Test for Conditional Heteroskedasticity connect to related topics in Quantitative Methods?"
    answer: "Within Quantitative Methods, Breusch-Pagan Chi-Square Test for Conditional Heteroskedasticity links directly to How to Interpret Regression within the standard CFA Quantitative Methods curriculum framework."
---

## Introduction

Heteroskedasticity vs Homoskedasticity: CFA Examples and Questions is a core Level II Quantitative Methods topic (LM 3: Model Misspecification — Homoskedasticity vs unconditional and conditional heteroskedasticity, effect on OLS estimators and standard errors, Breusch-Pagan test, White's robust standard errors) focusing on comparing homoskedasticity and conditional heteroskedasticity, why OLS coefficients remain unbiased while standard errors become unreliable (inflating Type I errors), the Breusch-Pagan χ^2 test, and White's correction. This guide covers the governing equations (Breusch-Pagan Chi-Square Test for Conditional Heteroskedasticity and Impact of Conditional Heteroskedasticity on OLS Inference), two verified numerical examples, a comparison table, and three original CFA-style practice questions.

## Concept Explanation & Institutional Framework

From first principles, comparing homoskedasticity and conditional heteroskedasticity, why OLS coefficients remain unbiased while standard errors become unreliable (inflating Type I errors), the Breusch-Pagan χ^2 test, and White's correction links theoretical valuation and risk mechanics to practical decisions in Quantitative Methods. Breusch-Pagan Chi-Square Test for Conditional Heteroskedasticity (BP Test Statistic = n × R^2_residuals ~ χ^2 (with df = k independent variables)) establishes the primary relationship (Regresses the squared OLS residuals (e_i^2) on the original k independent variables; if BP = n × R^2_resid > critical χ^2_k, reject homoskedasticity.), while Impact of Conditional Heteroskedasticity on OLS Inference (b_j remains Unbiased & Consistent ; s_{b_j} is Biased (usually Understated) => t-stats Overstated => Too Many Type I Errors!) governs Conditional heteroskedasticity does NOT bias the slope coefficients b_j, but it invalidates standard errors, t-tests, and F-tests unless White's robust standard errors are used.

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: Breusch-Pagan Chi-Square Test for Conditional Heteroskedasticity

```formula
BP Test Statistic = n × R^2_residuals ~ χ^2 (with df = k independent variables)
```

**Institutional Context & Variable Breakdown:**

- Regresses the squared OLS residuals (e_i^2) on the original k independent variables.

- if BP = n × R^2_resid > critical χ^2_k, reject homoskedasticity.

### Formula 2: Impact of Conditional Heteroskedasticity on OLS Inference

```formula
b_j remains Unbiased & Consistent

s_{b_j} is Biased (usually Understated) => t-stats Overstated => Too Many Type I Errors!
```

**Institutional Context & Variable Breakdown:** Conditional heteroskedasticity does NOT bias the slope coefficients b_j, but it invalidates standard errors, t-tests, and F-tests unless White's robust standard errors are used.

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Executing the Breusch-Pagan Test for Conditional Heteroskedasticity

**Problem & Given Scenario:**
An analyst estimates a 3-factor regression (k = 3) across n = 120 firms. To test for conditional heteroskedasticity, the analyst regresses the squared residuals (e_i^2) on the 3 independent variables and obtains an auxiliary R^2_resid = 0.085. Test H_0: Homoskedasticity at α = 5% (one-tailed critical χ^2_0.05,df=3 = 7.815).

```formula
BP Test Statistic = n × R^2_residuals ~ χ^2 (with df = k independent variables)
```

**Step-by-Step Substitution & Calculation:**

Step 1: Compute Breusch-Pagan test statistic: BP = n × R^2_resid = 120 × 0.085 = 10.20. Step 2: Compare against critical χ^2 with df = k = 3 (7.815): Since 10.20 > 7.815, reject H_0! Conditional heteroskedasticity is statistically significant at the 5% level. Step 3: Corrective Action: Re-compute t-statistics using White's heteroskedasticity-consistent (robust) standard errors.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Note that the Breusch-Pagan test is always a one-tailed right-tail chi-square test with degrees of freedom equal to k (excluding the intercept).

### Worked Example 2: Comparing OLS Standard Errors vs. White's Robust Standard Errors

**Problem & Given Scenario:**
In the regression above, Factor 2 has an estimated slope of b_2 = 0.42. The standard OLS output reports s_{b2} = 0.18 (OLS t-stat = 2.33, significant at 5%), whereas White's heteroskedasticity-consistent standard error is s_{b2_White} = 0.24.

```formula
b_j remains Unbiased & Consistent

s_{b_j} is Biased (usually Understated) => t-stats Overstated => Too Many Type I Errors!
```

**Step-by-Step Substitution & Calculation:**

White's Robust t-statistic = 0.42 / 0.24 = +1.75 (< 1.98 critical value -> NOT significant at 5%!).

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Without White's correction, understated OLS standard errors (0.18 vs 0.24) created an illusion of significance (a Type I error—falsely rejecting a true null hypothesis).

## Comparison & Reference Analysis

| Variance Regime | Definition of Error Variance Var(ε_i) | Effect on OLS Slopes & t-Tests | Required Remedy |
|---|---|---|---|
| Homoskedasticity | Var(ε_i) = σ^2 (constant across all i) | BLUE (Unbiased, minimum variance, valid t) | None required |
| Unconditional Heteroskedasticity | Var(ε_i) varies, but UNCORRELATED with X | No major problem for statistical inference | None required in practice |
| Conditional Heteroskedasticity | Var(ε_i) is a function of X_i (correlated) | Slopes unbiased, but SEs biased -> Type I errors | White's robust standard errors / GLS |
| ARCH(1) in Time Series | Var(ε_t) = a_0 + a_1 ε_{t−1}^2 (a_1 ≠ 0) | Volatility clustering in financial returns | Generalized Least Squares / GARCH |

## Real-World Financial Applications

In institutional Quantitative Methods practice, analysts apply Breusch-Pagan Chi-Square Test for Conditional Heteroskedasticity and Impact of Conditional Heteroskedasticity on OLS Inference to value securities, audit financial statements, and manage portfolio risk.

## CFA Examination Perspective & Testing Patterns

On the CFA Level II exam (LM 3: Model Misspecification — Homoskedasticity vs unconditional and conditional heteroskedasticity, effect on OLS estimators and standard errors, Breusch-Pagan test, White's robust standard errors), heteroskedasticity vs homoskedasticity cfa is tested via 4-question vignette item sets combining Breusch-Pagan Chi-Square Test for Conditional Heteroskedasticity calculations with economic interpretation.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** Which type of heteroskedasticity poses the most severe problem for hypothesis testing (t-tests and F-tests) in ordinary least squares (OLS) regression?

- **[A]** Unconditional heteroskedasticity, where error variance is uncorrelated with the independent variables

- **[B]** Conditional heteroskedasticity, where error variance is correlated with the values of the independent variables

- **[C]** Homoskedasticity

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** Conditional heteroskedasticity (where error variance depends on the level of X) biases the OLS standard errors—typically downward—leading to inflated t-statistics and excessive Type I errors.

### Practice Question 2

**Question:** An analyst runs a regression with n = 200 observations and k = 4 independent variables. To test for conditional heteroskedasticity, she regresses the squared residuals on the 4 independent variables and finds an R-squared of 0.060. The Breusch-Pagan test statistic and its degrees of freedom are:

- **[A]** 12.00 with 4 degrees of freedom

- **[B]** 12.00 with 195 degrees of freedom

- **[C]** 3.00 with 4 degrees of freedom

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** BP = n × R^2_resid = 200 × 0.060 = 12.00, distributed as chi-square with k = 4 degrees of freedom.

### Practice Question 3

**Question:** How does the presence of conditional heteroskedasticity affect the OLS point estimates of the regression slope coefficients (b_1, b_2, ..., b_k)?

- **[A]** The slope coefficients become biased upward

- **[B]** The slope coefficients remain unbiased and consistent, but they are no longer minimum-variance (efficient) estimators and their standard errors are unreliable

- **[C]** The slope coefficients become zero

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** Heteroskedasticity does not affect the unbiasedness or consistency of the OLS point estimates b_j; it only corrupts the variance-covariance matrix of the estimators (standard errors).

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in Breusch-Pagan Chi-Square Test for Conditional Heteroskedasticity.**

- **Timing Errors: Mixing beginning and ending balances in Impact of Conditional Heteroskedasticity on OLS Inference.**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Curriculum Scope: LM 3: Model Misspecification — Homoskedasticity vs unconditional and conditional heteroskedasticity, effect on OLS estimators and standard errors, Breusch-Pagan test, White's robust standard errors (Level II · Quantitative Methods).**

- **Takeaway 2: Primary Formula (Breusch-Pagan Chi-Square Test for Conditional Heteroskedasticity): BP Test Statistic = n × R^2_residuals ~ χ^2 (with df = k independent variables).**

- **Takeaway 3: Secondary Formula (Impact of Conditional Heteroskedasticity on OLS Inference): b_j remains Unbiased & Consistent ; s_{b_j} is Biased (usually Understated) => t-stats Overstated => Too Many Type I Errors!.**

- **Takeaway 4: Key Insight 1: Note that the Breusch-Pagan test is always a one-tailed right-tail chi-square test with degrees of freedom equal to k (excluding the interce.**

- **Takeaway 5: Key Insight 2: Without White's correction, understated OLS standard errors (0.18 vs 0.24) created an illusion of significance (a Type I error—falsely rejec.**

## Frequently Asked Questions (FAQs)

### What is the primary formula for heteroskedasticity vs homoskedasticity cfa in Level II Quantitative Methods?

The primary equations for Heteroskedasticity vs Homoskedasticity: CFA Examples and Questions govern Quantitative Methods calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is heteroskedasticity vs homoskedasticity cfa tested on the CFA Level II exam?

On the CFA exam, Heteroskedasticity vs Homoskedasticity: CFA Examples and Questions is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

### How does Breusch-Pagan Chi-Square Test for Conditional Heteroskedasticity connect to related topics in Quantitative Methods?

Within Quantitative Methods, Breusch-Pagan Chi-Square Test for Conditional Heteroskedasticity links directly to How to Interpret Regression within the standard CFA Quantitative Methods curriculum framework.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level II · Quantitative Methods).

### Related CFA Study Guides

- [How to Interpret Regression Coefficients, R-Squared and P-Values](/blog/cfa/cfa-level-2-interpret-regression-coefficients-r-squared-p-values/)

- [Multicollinearity and Autocorrelation: How to Identify Regression Problems](/blog/cfa/cfa-level-2-multicollinearity-and-autocorrelation-regression/)

- [Multiple Regression Analysis: How to Interpret CFA Questions](/blog/cfa/cfa-level-2-multiple-regression-analysis-interpret-questions/)

