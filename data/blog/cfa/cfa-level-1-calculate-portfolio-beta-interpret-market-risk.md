---
title: "How to Calculate Portfolio Beta and Interpret Market Risk"
seoTitle: "How to Calculate Portfolio Beta and Interpret Market Risk — CFA Level I"
slug: cfa-level-1-calculate-portfolio-beta-interpret-market-risk
description: "Master how to calculate portfolio beta cfa for Level I (Portfolio Management). Includes verified CFA formulas, 2 step-by-step solved numerical examples, comp."
category: cfa
tags:
  - "CFA"
  - "Level I"
  - "Portfolio Management"
  - "how to calculate portfolio beta cfa"
  - "how to calculate portfolio beta cfa formula"
author: Aniket Thakur
datePublished: "2026-11-11"
dateModified: "2026-11-11"
coverImage: /assets/images/blog/cfa-level-1-calculate-portfolio-beta-interpret-market-risk/cover.svg
coverImageAlt: "Illustrative guide to How to Calculate Portfolio Beta and Interpret Market Risk"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for How to Calculate Portfolio Beta and Interpret Market Risk."
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
  question: "How to Calculate Portfolio Beta and Interpret Market Risk: Key Summary & Verdict"
  answer: "How to Calculate Portfolio Beta and Interpret Market Risk is a core Level I Portfolio Management topic (LM 5: Portfolio Risk and Return: Part II — Individual asset beta formulas, market-value-weighted portfolio beta, adjusting portfolio beta with cash or."
  facts:
    - label: "CFA Level"
      value: "Level I"
    - label: "Curriculum Subject"
      value: "Portfolio Management"
    - label: "Topic Focus"
      value: "how to calculate portfolio beta cfa"
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
  - question: "What is the primary formula for how to calculate portfolio beta cfa in Level I Portfolio Management?"
    answer: "The primary equations for How to Calculate Portfolio Beta and Interpret Market Risk govern Portfolio Management calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is how to calculate portfolio beta cfa tested on the CFA Level I exam?"
    answer: "On the CFA exam, How to Calculate Portfolio Beta and Interpret Market Risk is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
  - question: "How does Individual Asset Beta Equations connect to related topics in Portfolio Management?"
    answer: "Within Portfolio Management, Individual Asset Beta Equations links directly to Sharpe Ratio vs Treynor Ratio vs Jensen's Alpha and CAPM Expl within the standard CFA Portfolio Management curriculum framework."
---

## Introduction

How to Calculate Portfolio Beta and Interpret Market Risk is a core Level I Portfolio Management topic (LM 5: Portfolio Risk and Return: Part II — Individual asset beta formulas, market-value-weighted portfolio beta, adjusting portfolio beta with cash or index futures) focusing on computing individual asset Beta from covariance/correlation and market-value-weighted Portfolio Beta, plus tactical Beta adjustment using cash or equity index futures. This guide covers the governing equations (Individual Asset Beta Equations and Weighted-Average Portfolio Beta), two verified numerical examples, a comparison table, and three original CFA-style practice questions.

## Concept Explanation & Institutional Framework

From first principles, computing individual asset Beta from covariance/correlation and market-value-weighted Portfolio Beta, plus tactical Beta adjustment using cash or equity index futures links theoretical valuation and risk mechanics to practical decisions in Portfolio Management. Individual Asset Beta Equations (β_i = Cov(R_i, R_M) / σ_M^2 = [ρ_{i,M} × σ_i × σ_M] / σ_M^2 = ρ_{i,M} × (σ_i / σ_M)) establishes the primary relationship (Expresses asset i's systematic sensitivity to the market portfolio as correlation multiplied by the ratio of asset volatility to market volatility.), while Weighted-Average Portfolio Beta (β_Portfolio = ∑_{i=1}^n (w_i × β_i) where ∑ w_i = 1.0 (and β_RiskFree = 0.0, β_Market = 1.0)) governs Unlike portfolio standard deviation, portfolio beta is a simple linear market-value-weighted average of constituent betas.

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: Individual Asset Beta Equations

```formula
β_i = Cov(R_i, R_M) / σ_M^2 = [ρ_{i,M} × σ_i × σ_M] / σ_M^2 = ρ_{i,M} × (σ_i / σ_M)
```

**Institutional Context & Variable Breakdown:** Expresses asset i's systematic sensitivity to the market portfolio as correlation multiplied by the ratio of asset volatility to market volatility.

### Formula 2: Weighted-Average Portfolio Beta

```formula
β_Portfolio = ∑_{i=1}^n (w_i × β_i) where ∑ w_i = 1.0 (and β_RiskFree = 0.0, β_Market = 1.0)
```

**Institutional Context & Variable Breakdown:** Unlike portfolio standard deviation, portfolio beta is a simple linear market-value-weighted average of constituent betas.

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Calculating Individual Stock Betas and Weighted-Average Portfolio Beta

**Problem & Given Scenario:**
A $10,000,000 equity portfolio holds three positions and cash: (1) $4,000,000 in Stock A (σ_A = 24%, ρ_{A,M} = 0.75); (2) $3,000,000 in Stock B (Cov(B,M) = 315 %^2); (3) $2,000,000 in Stock C (β_C = 0.85); and (4) $1,000,000 in Risk-Free T-Bills. Market volatility is σ_M = 15.0% (σ_M^2 = 225 %^2).

```formula
β_i = Cov(R_i, R_M) / σ_M^2 = [ρ_{i,M} × σ_i × σ_M] / σ_M^2 = ρ_{i,M} × (σ_i / σ_M)
```

**Step-by-Step Substitution & Calculation:**

Step 1: Compute individual betas: β_A = 0.75 × (24% / 15%) = 1.20; β_B = 315 / 225 = 1.40; β_C = 0.85; β_Cash = 0.00. Step 2: Compute market-value weights: w_A = 0.40, w_B = 0.30, w_C = 0.20, w_Cash = 0.10. Step 3: Portfolio Beta β_P = (0.40 × 1.20) + (0.30 × 1.40) + (0.20 × 0.85) + (0.10 × 0.00) = 0.48 + 0.42 + 0.17 + 0.00 = 1.07.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Holding 10% in risk-free cash (β = 0) reduces the equity portfolio's overall market beta from 1.189 (on the $9M equity portion) down to 1.07.

### Worked Example 2: Reallocating Portfolio Weights to Hit a Target Defensive Beta

**Problem & Given Scenario:**
Using the $10,000,000 portfolio above (currently β_P = 1.07), the CIO anticipates a recession and wants to reduce Portfolio Beta to a target of β_Target = 0.75 by selling Stock B (β_B = 1.40) and placing the proceeds into Risk-Free T-Bills (β_Cash = 0.00). How much of Stock B must be sold?

```formula
β_Portfolio = ∑_{i=1}^n (w_i × β_i) where ∑ w_i = 1.0 (and β_RiskFree = 0.0, β_Market = 1.0)
```

**Step-by-Step Substitution & Calculation:**

Required Beta reduction = 1.07 − 0.75 = 0.32. Shifting weight Δw from Stock B (1.40) to Cash (0.00) changes portfolio beta by Δw × (0.00 − 1.40) = −0.32 => Δw = 0.32 / 1.40 = 22.857% of the $10M portfolio = $2,285,714 sold from Stock B into Cash.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Linear additivity of Beta makes tactical beta targeting fast and exact.

## Comparison & Reference Analysis

| Beta Value Range | Systematic Risk Classification | Expected Return vs. Market | Typical Sector / Asset Examples |
|---|---|---|---|
| β < 0.0 | Counter-cyclical / Hedge asset | E(R_i) < R_F (insurance value) | Gold bullion, long-volatility tail hedges |
| β = 0.0 | Zero systematic market risk | E(R_i) = R_F | T-bills, market-neutral equity hedge fund |
| 0.0 < β < 1.0 | Defensive / Low-beta asset | R_F < E(R_i) < E(R_M) | Regulated utilities, consumer staples |
| β = 1.0 | Market-average systematic risk | E(R_i) = E(R_M) | Broad S&P 500 / MSCI World index ETF |
| β > 1.0 | Cyclical / Aggressive growth | E(R_i) > E(R_M) | Semiconductors, luxury goods, investment banks |

## Real-World Financial Applications

In institutional Portfolio Management practice, analysts apply Individual Asset Beta Equations and Weighted-Average Portfolio Beta to value securities, audit financial statements, and manage portfolio risk.

## CFA Examination Perspective & Testing Patterns

On the CFA Level I exam (LM 5: Portfolio Risk and Return: Part II — Individual asset beta formulas, market-value-weighted portfolio beta, adjusting portfolio beta with cash or index futures), how to calculate portfolio beta cfa is tested via standalone 90-second MCQs combining Individual Asset Beta Equations calculations with economic interpretation.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** A portfolio invests 35% in Stock X (β = 1.40), 45% in Stock Y (β = 0.90), and 20% in Risk-Free Treasury Bills. The portfolio's beta is closest to:

- **[A]** 0.895

- **[B]** 1.095

- **[C]** 1.150

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** Risk-free T-bills have a beta of 0.00. Portfolio Beta = (0.35 × 1.40) + (0.45 × 0.90) + (0.20 × 0.00) = 0.490 + 0.405 + 0.000 = 0.895.

### Practice Question 2

**Question:** Stock J has the exact same return volatility as the market portfolio (σ_J = σ_M = 16.0%), and its correlation with the market portfolio is ρ_{J,M} = +0.65. What is Stock J's beta?

- **[A]** 0.65

- **[B]** 1.00

- **[C]** 1.54

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** β_J = ρ_{J,M} × (σ_J / σ_M) = 0.65 × (16.0% / 16.0%) = 0.65 × 1.00 = 0.65.

### Practice Question 3

**Question:** Under the Capital Asset Pricing Model (CAPM), if a risky asset has a negative beta (β = −0.30) because it rallies strongly during market crashes, how does its equilibrium expected return compare to the risk-free rate R_F?

- **[A]** It is strictly less than the risk-free rate R_F because the asset provides valuable portfolio crash insurance

- **[B]** It equals the risk-free rate R_F

- **[C]** It exceeds the market return E(R_M)

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** When β < 0, E(R_i) = R_F + β × ERP < R_F; investors willingly accept a return below T-bills because the negative-beta asset pays off during market downturns and reduces total portfolio variance.

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in Individual Asset Beta Equations.**

- **Timing Errors: Mixing beginning and ending balances in Weighted-Average Portfolio Beta.**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Curriculum Scope: LM 5: Portfolio Risk and Return: Part II — Individual asset beta formulas, market-value-weighted portfolio beta, adjusting portfolio beta with cash or index futures (Level I · Portfolio Management).**

- **Takeaway 2: Primary Formula (Individual Asset Beta Equations): β_i = Cov(R_i, R_M) / σ_M^2 = [ρ_{i,M} × σ_i × σ_M] / σ_M^2 = ρ_{i,M} × (σ_i / σ_M).**

- **Takeaway 3: Secondary Formula (Weighted-Average Portfolio Beta): β_Portfolio = ∑_{i=1}^n (w_i × β_i) where ∑ w_i = 1.0 (and β_RiskFree = 0.0, β_Market = 1.0).**

- **Takeaway 4: Key Insight 1: Holding 10% in risk-free cash (β = 0) reduces the equity portfolio's overall market beta from 1.189 (on the $9M equity portion) down to 1.07.**

- **Takeaway 5: Key Insight 2: Linear additivity of Beta makes tactical beta targeting fast and exact.**

## Frequently Asked Questions (FAQs)

### What is the primary formula for how to calculate portfolio beta cfa in Level I Portfolio Management?

The primary equations for How to Calculate Portfolio Beta and Interpret Market Risk govern Portfolio Management calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is how to calculate portfolio beta cfa tested on the CFA Level I exam?

On the CFA exam, How to Calculate Portfolio Beta and Interpret Market Risk is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

### How does Individual Asset Beta Equations connect to related topics in Portfolio Management?

Within Portfolio Management, Individual Asset Beta Equations links directly to Sharpe Ratio vs Treynor Ratio vs Jensen's Alpha and CAPM Expl within the standard CFA Portfolio Management curriculum framework.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level I · Portfolio Management).

### Related CFA Study Guides

- [Sharpe Ratio vs Treynor Ratio vs Jensen's Alpha](/blog/cfa/cfa-level-1-sharpe-ratio-vs-treynor-ratio-vs-jensens-alpha/)

- [CAPM Explained: How to Calculate Expected Return Using Beta](/blog/cfa/cfa-level-1-capm-calculate-expected-return-using-beta/)

- [Efficient Frontier Explained: How to Calculate Optimal Portfolio Weights](/blog/cfa/cfa-level-1-efficient-frontier-calculate-optimal-portfolio-weights/)

