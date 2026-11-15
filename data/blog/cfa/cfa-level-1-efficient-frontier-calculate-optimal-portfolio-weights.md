---
title: "Efficient Frontier Explained: How to Calculate Optimal Portfolio Weights"
seoTitle: "Efficient Frontier Explained: How to Calculate Optimal Portfolio Weights — CFA Level I"
slug: cfa-level-1-efficient-frontier-calculate-optimal-portfolio-weights
description: "Master efficient frontier optimal portfolio weights for Level I (Portfolio Management). Includes verified CFA formulas, 2 step-by-step solved numerical examp."
category: cfa
tags:
  - "CFA"
  - "Level I"
  - "Portfolio Management"
  - "efficient frontier optimal portfolio weights"
  - "efficient frontier optimal portfolio weights formula"
author: Aniket Thakur
datePublished: "2026-11-11"
dateModified: "2026-11-11"
coverImage: /assets/images/blog/cfa-level-1-efficient-frontier-calculate-optimal-portfolio-weights/cover.svg
coverImageAlt: "Illustrative guide to Efficient Frontier Explained: How to Calculate Optimal Portfolio Weights"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for Efficient Frontier Explained: How to Calculate Optimal Portfolio Weights."
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
  question: "Efficient Frontier Explained: How to Calculate Optimal Portfolio Weights: Key Summary & Verdict"
  answer: "Efficient Frontier Explained: How to Calculate Optimal Portfolio Weights is a core Level I Portfolio Management topic (LM 4: Portfolio Risk and Return: Part I — Global Minimum-Variance Portfolio (GMVP) weights, Markowitz efficient frontier vs inefficient."
  facts:
    - label: "CFA Level"
      value: "Level I"
    - label: "Curriculum Subject"
      value: "Portfolio Management"
    - label: "Topic Focus"
      value: "efficient frontier optimal portfoli"
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
  - question: "What is the primary formula for efficient frontier optimal portfolio weights in Level I Portfolio Management?"
    answer: "The primary equations for Efficient Frontier Explained: How to Calculate Optimal Portfolio Weights govern Portfolio Management calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is efficient frontier optimal portfolio weights tested on the CFA Level I exam?"
    answer: "On the CFA exam, Efficient Frontier Explained: How to Calculate Optimal Portfolio Weights is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
  - question: "How does Two-Asset Global Minimum-Variance Portfolio (GMVP) Weight connect to related topics in Portfolio Management?"
    answer: "Within Portfolio Management, Two-Asset Global Minimum-Variance Portfolio (GMVP) Weight links directly to Modern Portfolio Theory Explained W within the standard CFA Portfolio Management curriculum framework."
---

## Introduction

Efficient Frontier Explained: How to Calculate Optimal Portfolio Weights is a core Level I Portfolio Management topic (LM 4: Portfolio Risk and Return: Part I — Global Minimum-Variance Portfolio (GMVP) weights, Markowitz efficient frontier vs inefficient lower boundary, tangency portfolio selection) focusing on calculating exact Global Minimum-Variance Portfolio (GMVP) weights for two risky assets, identifying the efficient vs inefficient frontier branches, and selecting the optimal CAL tangency portfolio. This guide covers the governing equations (Two-Asset Global Minimum-Variance Portfolio (GMVP) Weight and Optimal Risky Portfolio Selection Criterion (Sharpe Maximization)), two verified numerical examples, a comparison table, and three original CFA-style practice questions.

## Concept Explanation & Institutional Framework

From first principles, calculating exact Global Minimum-Variance Portfolio (GMVP) weights for two risky assets, identifying the efficient vs inefficient frontier branches, and selecting the optimal CAL tangency portfolio links theoretical valuation and risk mechanics to practical decisions in Portfolio Management. Two-Asset Global Minimum-Variance Portfolio (GMVP) Weight (w_1_GMVP = [σ_2^2 − Cov(1,2)] / [σ_1^2 + σ_2^2 − 2 Cov(1,2)] = [σ_2^2 − ρ_{12} σ_1 σ_2] / [σ_1^2 + σ_2^2 − 2 ρ_{12} σ_1 σ_2]) establishes the primary relationship (Finds the exact portfolio weights (w_1, w_2 = 1 − w_1) that minimize total portfolio variance σ_P^2 across two risky assets.), while Optimal Risky Portfolio Selection Criterion (Sharpe Maximization) (Max Sharpe Ratio = max [ (E(R_P) − R_F) / σ_P ]) governs Among all portfolios on the Markowitz efficient frontier, the optimal risky portfolio is the one that maximizes the slope of the Capital Allocation Line (the Sharpe Ratio).

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: Two-Asset Global Minimum-Variance Portfolio (GMVP) Weight

```formula
w_1_GMVP = [σ_2^2 − Cov(1,2)] / [σ_1^2 + σ_2^2 − 2 Cov(1,2)] = [σ_2^2 − ρ_{12} σ_1 σ_2] / [σ_1^2 + σ_2^2 − 2 ρ_{12} σ_1 σ_2]
```

**Institutional Context & Variable Breakdown:** Finds the exact portfolio weights (w_1, w_2 = 1 − w_1) that minimize total portfolio variance σ_P^2 across two risky assets.

### Formula 2: Optimal Risky Portfolio Selection Criterion (Sharpe Maximization)

```formula
Max Sharpe Ratio = max [ (E(R_P) − R_F) / σ_P ]
```

**Institutional Context & Variable Breakdown:** Among all portfolios on the Markowitz efficient frontier, the optimal risky portfolio is the one that maximizes the slope of the Capital Allocation Line (the Sharpe Ratio).

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Calculating Exact Global Minimum-Variance Portfolio (GMVP) Weights and Volatility

**Problem & Given Scenario:**
Asset 1 (Bonds) has E(R_1) = 6.0% and σ_1 = 10.0% (σ_1^2 = 100). Asset 2 (Equities) has E(R_2) = 12.0% and σ_2 = 20.0% (σ_2^2 = 400). Their correlation is ρ_12 = 0.00 (Cov_12 = 0). Compute (1) the exact weights of the Global Minimum-Variance Portfolio (GMVP), (2) its Expected Return, and (3) its Standard Deviation.

```formula
w_1_GMVP = [σ_2^2 − Cov(1,2)] / [σ_1^2 + σ_2^2 − 2 Cov(1,2)] = [σ_2^2 − ρ_{12} σ_1 σ_2] / [σ_1^2 + σ_2^2 − 2 ρ_{12} σ_1 σ_2]
```

**Step-by-Step Substitution & Calculation:**

Step 1 (GMVP Weight in Asset 1): w_1 = (400 − 0) / (100 + 400 − 0) = 400 / 500 = 0.80 (80.0% Bonds, 20.0% Equities). Step 2 (GMVP Expected Return): E(R_GMVP) = 0.80(6.0%) + 0.20(12.0%) = 4.80% + 2.40% = 7.20%. Step 3 (GMVP Volatility): σ_GMVP = √[(0.80^2 × 100) + (0.20^2 × 400)] = √(64 + 16) = √80 = 8.944% ≈ 8.94% (< 10.0% standalone bond volatility!).

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> A portfolio holding 100% Bonds (E(R) = 6.0%, σ = 10.0%) lies on the lower INEFFICIENT branch of the bullet because the 80/20 GMVP delivers both higher return (7.20% > 6.00%) and lower risk (8.94% < 10.00%)!

### Worked Example 2: Selecting the Optimal Tangency Portfolio from Three Efficient Frontier Candidates

**Problem & Given Scenario:**
The risk-free rate is R_F = 3.50%. Three portfolios lie on the Markowitz Efficient Frontier: Portfolio A (E(R) = 7.5%, σ = 9.0%); Portfolio B (E(R) = 10.5%, σ = 14.0%); Portfolio C (E(R) = 13.1%, σ = 20.0%). Identify the optimal risky tangency portfolio.

```formula
Max Sharpe Ratio = max [ (E(R_P) − R_F) / σ_P ]
```

**Step-by-Step Substitution & Calculation:**

Compute Sharpe Ratios [(E(R_P) − R_F) / σ_P]: Sharpe_A = (7.5 − 3.5) / 9.0 = 4.0 / 9.0 = 0.4444. Sharpe_B = (10.5 − 3.5) / 14.0 = 7.0 / 14.0 = 0.5000 (Highest!). Sharpe_C = (13.1 − 3.5) / 20.0 = 9.6 / 20.0 = 0.4800.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Portfolio B generates the highest Sharpe ratio (0.5000), making its Capital Allocation Line the steepest tangent to the efficient frontier.

## Comparison & Reference Analysis

| Frontier Landmark | Defining Mathematical Property | Status for Rational Investors | Slope (dE(R)/dσ) |
|---|---|---|---|
| Global Min-Variance Portfolio (GMVP) | Absolute lowest σ on entire bullet | Leftmost starting point of Efficient Frontier | Vertical tangent (∞ slope) |
| Upper Branch (Above GMVP) | Highest E(R) for each level of σ | Markowitz Efficient Frontier (Investable) | Positive, decreasing (concave) |
| Lower Branch (Below GMVP) | Same σ as upper branch but lower E(R) | Strictly Dominated / Inefficient | Negative slope |
| Tangency Portfolio (M) | Maximizes Sharpe Ratio (E(R)−R_F)/σ | Optimal Risky Portfolio on CML | Slope equals Sharpe Ratio |

## Real-World Financial Applications

In institutional Portfolio Management practice, analysts apply Two-Asset Global Minimum-Variance Portfolio (GMVP) Weight and Optimal Risky Portfolio Selection Criterion (Sharpe Maximization) to value securities, audit financial statements, and manage portfolio risk.

## CFA Examination Perspective & Testing Patterns

On the CFA Level I exam (LM 4: Portfolio Risk and Return: Part I — Global Minimum-Variance Portfolio (GMVP) weights, Markowitz efficient frontier vs inefficient lower boundary, tangency portfolio selection), efficient frontier optimal portfolio weights is tested via standalone 90-second MCQs combining Two-Asset Global Minimum-Variance Portfolio (GMVP) Weight calculations with economic interpretation.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** Asset X has a standard deviation of 10% (variance = 100) and Asset Y has a standard deviation of 15% (variance = 225). If the covariance between X and Y is +25 (%^2), the weight of Asset X in the Global Minimum-Variance Portfolio (assuming no short-selling constraints) is:

- **[A]** 68.97%

- **[B]** 72.73%

- **[C]** 80.00%

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** w_X = [σ_Y^2 − Cov(X,Y)] / [σ_X^2 + σ_Y^2 − 2 Cov(X,Y)] = (225 − 25) / (100 + 225 − 50) = 200 / 275 = 0.72727 = 72.73%.

### Practice Question 2

**Question:** Why would a rational risk-averse investor NEVER hold a portfolio located on the lower portion of the minimum-variance frontier below the Global Minimum-Variance Portfolio (GMVP)?

- **[A]** Because short selling is required on the lower portion

- **[B]** Because for every portfolio on the lower branch, there exists a portfolio directly above it on the upper branch (the Efficient Frontier) with the exact same standard deviation and a strictly higher expected return

- **[C]** Because beta is negative on the lower branch

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** Every point below the GMVP is vertically dominated by a point on the upper efficient branch that has the same σ_P and a higher E(R_P).

### Practice Question 3

**Question:** Given a risk-free rate of 4.0%, which of the following three efficient frontier portfolios is the optimal risky tangency portfolio? Portfolio 1 (E(R) = 8.8%, σ = 8.0%), Portfolio 2 (E(R) = 11.0%, σ = 12.5%), Portfolio 3 (E(R) = 13.6%, σ = 16.0%).

- **[A]** Portfolio 1 only

- **[B]** Portfolio 2 only

- **[C]** Portfolio 3 only

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** Sharpe_1 = (8.8% − 4.0%) / 8.0% = 4.8% / 8.0% = 0.600. Sharpe_2 = (11.0% − 4.0%) / 12.5% = 0.560. With Portfolio 3 having a lower Sharpe ratio, Portfolio 1 maximizes the slope of the CAL.

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in Two-Asset Global Minimum-Variance Portfolio (GMVP) Weight.**

- **Timing Errors: Mixing beginning and ending balances in Optimal Risky Portfolio Selection Criterion (Sharpe Maximization).**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Curriculum Scope: LM 4: Portfolio Risk and Return: Part I — Global Minimum-Variance Portfolio (GMVP) weights, Markowitz efficient frontier vs inefficient lower boundary, tangency portfolio selection (Level I · Portfolio Management).**

- **Takeaway 2: Primary Formula (Two-Asset Global Minimum-Variance Portfolio (GMVP) Weight): w_1_GMVP = [σ_2^2 − Cov(1,2)] / [σ_1^2 + σ_2^2 − 2 Cov(1,2)] = [σ_2^2 − ρ_{12} σ_1 σ_2] / [σ_1^2 + σ_2^2 − 2 ρ_{12} σ_1 σ_2].**

- **Takeaway 3: Secondary Formula (Optimal Risky Portfolio Selection Criterion (Sharpe Maximization)): Max Sharpe Ratio = max [ (E(R_P) − R_F) / σ_P ].**

- **Takeaway 4: Key Insight 1: A portfolio holding 100% Bonds (E(R) = 6.0%, σ = 10.0%) lies on the lower INEFFICIENT branch of the bullet because the 80/20 GMVP delivers.**

- **Takeaway 5: Key Insight 2: Portfolio B generates the highest Sharpe ratio (0.5000), making its Capital Allocation Line the steepest tangent to the efficient frontier.**

## Frequently Asked Questions (FAQs)

### What is the primary formula for efficient frontier optimal portfolio weights in Level I Portfolio Management?

The primary equations for Efficient Frontier Explained: How to Calculate Optimal Portfolio Weights govern Portfolio Management calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is efficient frontier optimal portfolio weights tested on the CFA Level I exam?

On the CFA exam, Efficient Frontier Explained: How to Calculate Optimal Portfolio Weights is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

### How does Two-Asset Global Minimum-Variance Portfolio (GMVP) Weight connect to related topics in Portfolio Management?

Within Portfolio Management, Two-Asset Global Minimum-Variance Portfolio (GMVP) Weight links directly to Modern Portfolio Theory Explained W within the standard CFA Portfolio Management curriculum framework.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level I · Portfolio Management).

### Related CFA Study Guides

- [Modern Portfolio Theory Explained With Practical Examples](/blog/cfa/cfa-level-1-modern-portfolio-theory-explained-examples/)

- [CAPM Explained: How to Calculate Expected Return Using Beta](/blog/cfa/cfa-level-1-capm-calculate-expected-return-using-beta/)

- [Correlation vs Covariance: Formula and Numerical Examples](/blog/cfa/cfa-level-1-correlation-vs-covariance-portfolio-examples/)

