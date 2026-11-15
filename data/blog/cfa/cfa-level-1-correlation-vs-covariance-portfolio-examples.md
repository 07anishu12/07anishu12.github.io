---
title: "Correlation vs Covariance: Formula and Numerical Examples"
seoTitle: "Correlation vs Covariance: Formula and Numerical Examples — CFA Level I"
slug: cfa-level-1-correlation-vs-covariance-portfolio-examples
description: "Master correlation vs covariance cfa for Level I (Portfolio Management). Includes verified CFA formulas, 2 step-by-step solved numerical examples, comparison."
category: cfa
tags:
  - "CFA"
  - "Level I"
  - "Portfolio Management"
  - "correlation vs covariance cfa"
  - "correlation vs covariance cfa formula"
author: Aniket Thakur
datePublished: "2026-11-11"
dateModified: "2026-11-11"
coverImage: /assets/images/blog/cfa-level-1-correlation-vs-covariance-portfolio-examples/cover.svg
coverImageAlt: "Illustrative guide to Correlation vs Covariance: Formula and Numerical Examples"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for Correlation vs Covariance: Formula and Numerical Examples."
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
  question: "Correlation vs Covariance: Formula and Numerical Examples: Key Summary & Verdict"
  answer: "Correlation vs Covariance: Formula and Numerical Examples is a core Level I Portfolio Management topic (LM 4 & Quant LM 3: Scenario probability covariance, variance-covariance matrix structure, and three-asset portfolio variance) focusing on."
  facts:
    - label: "CFA Level"
      value: "Level I"
    - label: "Curriculum Subject"
      value: "Portfolio Management"
    - label: "Topic Focus"
      value: "correlation vs covariance cfa"
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
  - question: "What is the primary formula for correlation vs covariance cfa in Level I Portfolio Management?"
    answer: "The primary equations for Correlation vs Covariance: Formula and Numerical Examples govern Portfolio Management calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is correlation vs covariance cfa tested on the CFA Level I exam?"
    answer: "On the CFA exam, Correlation vs Covariance: Formula and Numerical Examples is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
  - question: "How does Probability-Weighted Forward-Looking Covariance connect to related topics in Portfolio Management?"
    answer: "Within Portfolio Management, Probability-Weighted Forward-Looking Covariance links directly to How Does Portfolio Diversification Reduce Inv within the standard CFA Portfolio Management curriculum framework."
---

## Introduction

Correlation vs Covariance: Formula and Numerical Examples is a core Level I Portfolio Management topic (LM 4 & Quant LM 3: Scenario probability covariance, variance-covariance matrix structure, and three-asset portfolio variance) focusing on probability-weighted forward-looking covariance vs historical sample covariance, variance-covariance matrix dimensions, and three-asset portfolio variance expansion. This guide covers the governing equations (Probability-Weighted Forward-Looking Covariance and Three-Asset Portfolio Variance Expansion), two verified numerical examples, a comparison table, and three original CFA-style practice questions.

## Concept Explanation & Institutional Framework

From first principles, probability-weighted forward-looking covariance vs historical sample covariance, variance-covariance matrix dimensions, and three-asset portfolio variance expansion links theoretical valuation and risk mechanics to practical decisions in Portfolio Management. Probability-Weighted Forward-Looking Covariance (Cov(R_A, R_B) = ∑ P_s × [R_{A,s} − E(R_A)] × [R_{B,s} − E(R_B)] ; ρ_{A,B} = Cov(R_A, R_B) / (σ_A × σ_B)) establishes the primary relationship (Computes ex-ante covariance across macroeconomic scenarios s with state probabilities P_s.), while Three-Asset Portfolio Variance Expansion (σ_P^2 = w_1^2 σ_1^2 + w_2^2 σ_2^2 + w_3^2 σ_3^2 + 2 w_1 w_2 Cov_{12} + 2 w_1 w_3 Cov_{13} + 2 w_2 w_3 Cov_{23}) governs Contains N = 3 variance terms (diagonal of covariance matrix) and N(N−1)/2 = 3 unique pairwise covariance pairs (6 off-diagonal cells).

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: Probability-Weighted Forward-Looking Covariance

```formula
Cov(R_A, R_B) = ∑ P_s × [R_{A,s} − E(R_A)] × [R_{B,s} − E(R_B)]

ρ_{A,B} = Cov(R_A, R_B) / (σ_A × σ_B)
```

**Institutional Context & Variable Breakdown:** Computes ex-ante covariance across macroeconomic scenarios s with state probabilities P_s.

### Formula 2: Three-Asset Portfolio Variance Expansion

```formula
σ_P^2 = w_1^2 σ_1^2 + w_2^2 σ_2^2 + w_3^2 σ_3^2 + 2 w_1 w_2 Cov_{12} + 2 w_1 w_3 Cov_{13} + 2 w_2 w_3 Cov_{23}
```

**Institutional Context & Variable Breakdown:** Contains N = 3 variance terms (diagonal of covariance matrix) and N(N−1)/2 = 3 unique pairwise covariance pairs (6 off-diagonal cells).

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Calculating Scenario-Weighted Covariance and Correlation Across Economic States

**Problem & Given Scenario:**
Two assets face two equally likely macro states (P_Boom = 0.50, P_Recession = 0.50). In Boom: R_A = +20%, R_B = +2%. In Recession: R_A = −4%, R_B = +14%. Compute E(R), σ, Cov(A,B), and ρ_{A,B}.

```formula
Cov(R_A, R_B) = ∑ P_s × [R_{A,s} − E(R_A)] × [R_{B,s} − E(R_B)]

ρ_{A,B} = Cov(R_A, R_B) / (σ_A × σ_B)
```

**Step-by-Step Substitution & Calculation:**

Step 1: E(R_A) = 0.5(20%) + 0.5(−4%) = +8.0%; E(R_B) = 0.5(2%) + 0.5(14%) = +8.0%. Step 2: Deviations in Boom: (R_A − 8%) = +12%, (R_B − 8%) = −6%; Deviations in Recession: (R_A − 8%) = −12%, (R_B − 8%) = +6%. Step 3: σ_A = √[0.5(12^2) + 0.5(−12)^2] = 12.0%; σ_B = √[0.5(−6)^2 + 0.5(6^2)] = 6.0%. Step 4: Cov(A,B) = 0.5(+12)(−6) + 0.5(−12)(+6) = −36 − 36 = −72.0 (%^2). Step 5: Correlation ρ_{A,B} = −72.0 / (12.0 × 6.0) = −1.00!

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Because Asset B always moves in the exact opposite direction of Asset A across both states, their correlation is −1.00.

### Worked Example 2: Computing Variance of a 3-Asset Portfolio Using a Covariance Matrix

**Problem & Given Scenario:**
An endowment invests equally (w_1 = w_2 = w_3 = 1/3) in three uncorrelated strategies (Cov_12 = Cov_13 = Cov_23 = 0) with individual standard deviations σ_1 = 9%, σ_2 = 12%, and σ_3 = 18%.

```formula
σ_P^2 = w_1^2 σ_1^2 + w_2^2 σ_2^2 + w_3^2 σ_3^2 + 2 w_1 w_2 Cov_{12} + 2 w_1 w_3 Cov_{13} + 2 w_2 w_3 Cov_{23}
```

**Step-by-Step Substitution & Calculation:**

Because all pairwise covariances equal zero: σ_P^2 = (1/3)^2(9^2 + 12^2 + 18^2) = (1/9)(81 + 144 + 324) = 549 / 9 = 61.0 (%^2). Portfolio Standard Deviation σ_P = √61.0 = 7.81%.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Even though the hardest strategy has 18% volatility, combining three mutually uncorrelated strategies cuts portfolio volatility to 7.81%.

## Comparison & Reference Analysis

| Matrix / Metric Attribute | Covariance Matrix (N × N) | Correlation Matrix (N × N) | Portfolio Optimization Role |
|---|---|---|---|
| Main Diagonal Entries (N) | Asset Variances (Cov(i,i) = σ_i^2) | All 1.00 (ρ_{i,i} = 1.00) | Own-asset variance contribution |
| Off-Diagonal Entries (N(N−1)) | Symmetric Cov(i,j) = Cov(j,i) | Symmetric ρ_{i,j} ∈ [−1, +1] | N(N−1)/2 unique pairs to estimate |
| Effect of Doubling Leverage | Multiplies Cov(i,j) by 2×2 = 4 | Unchanged (scale-invariant) | Covariance scales with return units |
| Asset Count N = 50 Stocks | 50 variances + 1,225 unique covariances | 1,225 unique correlations | Total 1,275 parameters in Markowitz |

## Real-World Financial Applications

In institutional Portfolio Management practice, analysts apply Probability-Weighted Forward-Looking Covariance and Three-Asset Portfolio Variance Expansion to value securities, audit financial statements, and manage portfolio risk.

## CFA Examination Perspective & Testing Patterns

On the CFA Level I exam (LM 4 & Quant LM 3: Scenario probability covariance, variance-covariance matrix structure, and three-asset portfolio variance), correlation vs covariance cfa is tested via standalone 90-second MCQs combining Probability-Weighted Forward-Looking Covariance calculations with economic interpretation.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** In an N × N variance-covariance matrix for a portfolio of N = 20 distinct securities, how many variance terms sit on the main diagonal and how many unique pairwise covariance terms must be estimated?

- **[A]** 20 variances and 190 unique covariances

- **[B]** 20 variances and 380 unique covariances

- **[C]** 400 variances and 200 unique covariances

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** There are N = 20 variances on the diagonal and N(N − 1) / 2 = (20 × 19) / 2 = 190 unique pairwise covariances (since Cov(i,j) = Cov(j,i) across the 380 off-diagonal cells).

### Practice Question 2

**Question:** What is the covariance of any risky asset's return with the return of a truly risk-free asset (whose return has zero variance across all states)?

- **[A]** Equal to the risky asset's standard deviation

- **[B]** Exactly zero, because a constant risk-free rate has zero deviation from its mean [R_F − E(R_F) = 0]

- **[C]** Equal to +1.0

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** Since R_F never deviates from E(R_F), every product term [R_i − E(R_i)][R_F − E(R_F)] equals zero, making both Cov(R_i, R_F) = 0 and ρ_{i,RF} = 0.

### Practice Question 3

**Question:** Given two states of the economy—Expansion (probability 60%, Stock X return +15%, Stock Y return +10%) and Contraction (probability 40%, Stock X return −10%, Stock Y return +0%)—the expected return of Stock X and Stock Y are +5% and +6%, respectively. Their covariance is:

- **[A]** +40 (%^2)

- **[B]** +60 (%^2)

- **[C]** +100 (%^2)

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** Cov(X,Y) = 0.60 × (15 − 5)(10 − 6) + 0.40 × (−10 − 5)(0 − 6) = 0.60(10)(4) + 0.40(−15)(−6) = 24 + 36 = +60 (%^2).

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in Probability-Weighted Forward-Looking Covariance.**

- **Timing Errors: Mixing beginning and ending balances in Three-Asset Portfolio Variance Expansion.**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Curriculum Scope: LM 4 & Quant LM 3: Scenario probability covariance, variance-covariance matrix structure, and three-asset portfolio variance (Level I · Portfolio Management).**

- **Takeaway 2: Primary Formula (Probability-Weighted Forward-Looking Covariance): Cov(R_A, R_B) = ∑ P_s × [R_{A,s} − E(R_A)] × [R_{B,s} − E(R_B)] ; ρ_{A,B} = Cov(R_A, R_B) / (σ_A × σ_B).**

- **Takeaway 3: Secondary Formula (Three-Asset Portfolio Variance Expansion): σ_P^2 = w_1^2 σ_1^2 + w_2^2 σ_2^2 + w_3^2 σ_3^2 + 2 w_1 w_2 Cov_{12} + 2 w_1 w_3 Cov_{13} + 2 w_2 w_3 Cov_{23}.**

- **Takeaway 4: Key Insight 1: Because Asset B always moves in the exact opposite direction of Asset A across both states, their correlation is −1.00.**

- **Takeaway 5: Key Insight 2: Even though the hardest strategy has 18% volatility, combining three mutually uncorrelated strategies cuts portfolio volatility to 7.81%.**

## Frequently Asked Questions (FAQs)

### What is the primary formula for correlation vs covariance cfa in Level I Portfolio Management?

The primary equations for Correlation vs Covariance: Formula and Numerical Examples govern Portfolio Management calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is correlation vs covariance cfa tested on the CFA Level I exam?

On the CFA exam, Correlation vs Covariance: Formula and Numerical Examples is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

### How does Probability-Weighted Forward-Looking Covariance connect to related topics in Portfolio Management?

Within Portfolio Management, Probability-Weighted Forward-Looking Covariance links directly to How Does Portfolio Diversification Reduce Inv within the standard CFA Portfolio Management curriculum framework.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level I · Portfolio Management).

### Related CFA Study Guides

- [How Does Portfolio Diversification Reduce Investment Risk?](/blog/cfa/cfa-level-1-how-portfolio-diversification-reduces-risk/)

- [Modern Portfolio Theory Explained With Practical Examples](/blog/cfa/cfa-level-1-modern-portfolio-theory-explained-examples/)

- [Systematic vs Unsystematic Risk: Examples and CFA Questions](/blog/cfa/cfa-level-1-systematic-vs-unsystematic-risk-examples/)

