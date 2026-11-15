---
title: "CFA Level 2 Derivatives: Complete Notes and Formulas"
seoTitle: "CFA Level 2 Derivatives: Complete Notes and Formulas — CFA Level II"
slug: cfa-level-2-derivatives-complete-notes-and-formulas
description: "Master cfa level 2 derivatives formulas for Level II (Derivatives). Includes verified CFA formulas, 2 step-by-step solved numerical examples, comparison tabl."
category: cfa
tags:
  - "CFA"
  - "Level II"
  - "Derivatives"
  - "cfa level 2 derivatives formulas"
  - "cfa level 2 derivatives formulas formula"
author: Aniket Thakur
datePublished: "2026-11-13"
dateModified: "2026-11-13"
coverImage: /assets/images/blog/cfa-level-2-derivatives-complete-notes-and-formulas/cover.svg
coverImageAlt: "Illustrative guide to CFA Level 2 Derivatives: Complete Notes and Formulas"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for CFA Level 2 Derivatives: Complete Notes and Formulas."
draft: false
featured: false
sources:
  - title: "CFA Institute 2026–2027 Program Curriculum: Derivatives"
    url: https://www.cfainstitute.org/en/programs/cfa/curriculum
  - title: "CFA Institute Candidate Study Resources & Topic Outlines"
    url: https://www.cfainstitute.org/en/programs/cfa/candidate
showSources: true
enquiry: false
quickAnswer:
  question: "CFA Level 2 Derivatives: Complete Notes and Formulas: Key Summary & Verdict"
  answer: "CFA Level 2 Derivatives: Complete Notes and Formulas covers unified pricing and valuation of Forward Commitments (FRA, Bond Futures with Conversion Factor, Equity/FX Forwards, Interest Rate/Currency/Equity Swaps) and Contingent Claims (Binomial, BSM, Black."
  facts:
    - label: "CFA Level"
      value: "Level II"
    - label: "Curriculum Subject"
      value: "Derivatives"
    - label: "Topic Focus"
      value: "cfa level 2 derivatives formulas"
    - label: "Syllabus Standard"
      value: "2026–2027 Curriculum"
  goodFor:
    - "Candidates preparing for CFA Level II (Derivatives) exam questions."
    - "Financial analysts requiring verified formulas and worked calculations."
  watchFor:
    - "Verify compounding periodicity, sign conventions, and calculator mode (BGN vs END)."
    - "Review boundary conditions and common exam distractor traps."
  note: "2026–2027 CFA Program Curriculum Series · Aniket Thakur"
faqItems:
  - question: "What is the primary formula for cfa level 2 derivatives formulas in Level II Derivatives?"
    answer: "The primary equations for CFA Level 2 Derivatives: Complete Notes and Formulas govern Derivatives calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is cfa level 2 derivatives formulas tested on the CFA Level II exam?"
    answer: "On the CFA exam, CFA Level 2 Derivatives: Complete Notes and Formulas is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
---

## Introduction

CFA Level 2 Derivatives: Complete Notes and Formulas covers unified pricing and valuation of Forward Commitments (FRA, Bond Futures with Conversion Factor, Equity/FX Forwards, Interest Rate/Currency/Equity Swaps) and Contingent Claims (Binomial, BSM, Black Model, Option Greeks) in Level II Derivatives (LM 1–2: Pricing and Valuation of Forward Commitments (Equity, Fixed-Income, Interest Rate, and Currency Forwards/Futures/Swaps) & Valuation of Contingent Claims (Multi-Period Binomial, Black-Scholes-Merton, Black Model, Option Greeks)), with verified formulas, two worked examples, and three practice MCQs.

## Concept Explanation & Institutional Framework

Option Greeks Summary & Delta-Gamma Approximation (ΔCall ≈ Delta_c × (ΔS) + 0.5 × Gamma × (ΔS)^2 + Vega × (Δσ) + Theta × (Δt) + Rho × (Δr)) and Fixed-Income Futures Pricing with Cheapest-to-Deliver Conversion Factor (CF) (Quoted Futures Price QFP = [Full Forward Price − AI_T] / Conversion Factor = [(Flat_0 + AI_0)(1+r)^T − AI_T − FV(Coupon)] / CF) govern unified pricing and valuation of Forward Commitments (FRA, Bond Futures with Conversion Factor, Equity/FX Forwards, Interest Rate/Currency/Equity Swaps) and Contingent Claims (Binomial, BSM, Black Model, Option Greeks).

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: Option Greeks Summary & Delta-Gamma Approximation

```formula
ΔCall ≈ Delta_c × (ΔS) + 0.5 × Gamma × (ΔS)^2 + Vega × (Δσ) + Theta × (Δt) + Rho × (Δr)
```

**Institutional Context & Variable Breakdown:**

- Delta (∂c/∂S ∈ [0,1] for calls, [−1,0] for puts) measures slope.

- Gamma (∂^2c/∂S^2 > 0 for long options) measures Delta curvature (highest ATM near expiry).

### Formula 2: Fixed-Income Futures Pricing with Cheapest-to-Deliver Conversion Factor (CF)

```formula
Quoted Futures Price QFP = [Full Forward Price − AI_T] / Conversion Factor = [(Flat_0 + AI_0)(1+r)^T − AI_T − FV(Coupon)] / CF
```

**Institutional Context & Variable Breakdown:** Adjusts individual deliverable Treasury bonds of varying coupons/maturities to a standardized 6% notional bond equivalent via the Conversion Factor (CF).

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Delta-Gamma Hedge Approximation and Portfolio Delta Neutrality

**Problem & Given Scenario:**
A market maker is Short 10,000 call options on Stock X (Current Stock Price S_0 = $100.00). Each call option has Delta_c = +0.60 and Gamma = +0.04. (1) How many shares of Stock X must the market maker buy to make the portfolio Delta-neutral? (2) If Stock X suddenly jumps by +$5.00 to $105.00, estimate the change in the value of 1 call option using the Delta-Gamma approximation.

```formula
ΔCall ≈ Delta_c × (ΔS) + 0.5 × Gamma × (ΔS)^2 + Vega × (Δσ) + Theta × (Δt) + Rho × (Δr)
```

**Step-by-Step Substitution & Calculation:**

Step 1 (Delta-Neutral Hedge): Position Delta of 10,000 short calls = −10,000 × (+0.60) = −6,000. Since underlying stock has Delta = +1.00 (and Gamma = 0), the market maker must BUY 6,000 shares of Stock X. Step 2 (Delta-Gamma Call Change for ΔS = +$5.00): Δc ≈ (0.60 × $5.00) + [0.5 × 0.04 × ($5.00)^2] = +$3.00 + $0.50 = +$3.50 per call. Step 3 (Unhedged Gamma Loss on Delta-Hedged Short Call Position): Gain on 6,000 shares = +$30,000; Loss on 10,000 calls = −$35,000 -> Net Loss = −$5,000 (due to negative position Gamma!).

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Delta hedging eliminates linear first-order price risk ($30,000), but a short option position has negative Gamma, losing −$5,000 on large stock jumps in either direction.

### Worked Example 2: Pricing a Quoted Treasury Bond Futures Contract Using the Conversion Factor

**Problem & Given Scenario:**
A 6-month (T = 0.50 yr) Treasury bond futures contract has a Cheapest-to-Deliver (CTD) bond with a Quoted Flat Price of $104.00, Current Accrued Interest AI_0 = $1.00, Accrued Interest at delivery AI_T = $2.50 (no interim coupon paid), and a Conversion Factor of CF = 1.0800. The risk-free rate is r = 4.00% annually.

```formula
Quoted Futures Price QFP = [Full Forward Price − AI_T] / Conversion Factor = [(Flat_0 + AI_0)(1+r)^T − AI_T − FV(Coupon)] / CF
```

**Step-by-Step Substitution & Calculation:**

Step 1: Full Spot Price S_0 = Flat_0 + AI_0 = $104.00 + $1.00 = $105.00. Step 2: Full Forward Price F_0 = $105.00 × (1.04)^0.50 = $105.00 × 1.019804 = $107.0794. Step 3: Clean Forward Price = Full Forward − AI_T = $107.0794 − $2.50 = $104.5794. Step 4: Quoted Futures Price QFP = Clean Forward / CF = $104.5794 / 1.0800 = $96.8328 ≈ $96.83.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Dividing the clean forward price by the Conversion Factor (CF) normalizes the CTD bond to the standardized futures quote.

## Comparison & Reference Analysis

| Option Greek | Mathematical Derivative | Sign for Long Call vs. Long Put | Behavior & Risk Interpretation |
|---|---|---|---|
| Delta (Δ) | ∂V / ∂S (Slope wrt Spot) | Call: [0, +1] ; Put: [−1, 0] | Delta_Call − Delta_Put = 1 (or e^(−δT)) |
| Gamma (Γ) | ∂^2V / ∂S^2 (Change in Delta) | Positive (+) for BOTH Long Call & Put | Largest when At-the-Money near expiration |
| Vega (ν) | ∂V / ∂σ (Sensitivity to Vol) | Positive (+) for BOTH Long Call & Put | Largest when At-the-Money with long T |
| Theta (Θ) | ∂V / ∂t (Time decay per day) | Negative (−) for most Long Options | Accelerates rapidly in final 30 days (Exception: deep ITM European Put can be +) |
| Rho (ρ) | ∂V / ∂r (Sensitivity to R_F) | Call: Positive (+) ; Put: Negative (−) | Relatively small for equity options |

## Real-World Financial Applications

Analysts apply Option Greeks Summary & Delta-Gamma Approximation and Fixed-Income Futures Pricing with Cheapest-to-Deliver Conversion Factor (CF) across Derivatives valuation and risk management.

## CFA Examination Perspective & Testing Patterns

Tested on the CFA Level II exam (LM 1–2: Pricing and Valuation of Forward Commitments (Equity, Fixed-Income, Interest Rate, and Currency Forwards/Futures/Swaps) & Valuation of Contingent Claims (Multi-Period Binomial, Black-Scholes-Merton, Black Model, Option Greeks)) via quantitative and conceptual MCQs.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** When is an option's Gamma (the rate of change of Delta with respect to the underlying asset price) at its absolute maximum?

- **[A]** When the option is deep in-the-money with 2 years to expiration

- **[B]** When the option is at-the-money (S ≈ X) and very close to its expiration date

- **[C]** When the option is deep out-of-the-money

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** Near expiration, an at-the-money option's Delta jumps abruptly between 0.0 and 1.0 on tiny stock moves, making Gamma peak sharply when ATM near expiry.

### Practice Question 2

**Question:** A portfolio of stocks and options is currently Delta-neutral (Portfolio Delta = 0) but has a large positive Gamma (+500). If the underlying stock price experiences a sudden large move (either +10% up or −10% down), the value of this Delta-neutral, positive-Gamma portfolio will:

- **[A]** Increase in value regardless of whether the stock jumps up or down

- **[B]** Decrease in value

- **[C]** Remain unchanged

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** With Delta = 0 and Gamma > 0, ΔPortfolio ≈ 0 + 0.5 × Gamma × (ΔS)^2 > 0 for both positive and negative jumps ΔS (as in a long straddle).

### Practice Question 3

**Question:** For European call and put options with the same strike price X and expiration T on a non-dividend-paying stock, if the call option's Delta is +0.62, what is the put option's Delta?

- **[A]** −0.62

- **[B]** −0.38

- **[C]** +0.38

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** By put-call parity (c − p = S − PV(X)), taking the derivative with respect to S gives Delta_Call − Delta_Put = 1.0 => Delta_Put = Delta_Call − 1.0 = 0.62 − 1.00 = −0.38.

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in Option Greeks Summary & Delta-Gamma Approximation.**

- **Timing Errors: Mixing beginning and ending balances in Fixed-Income Futures Pricing with Cheapest-to-Deliver Conversion Factor (CF).**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Option Greeks Summary & Delta-Gamma Approximation: ΔCall ≈ Delta_c × (ΔS) + 0.5 × Gamma × (ΔS)^2 + Vega × (Δσ) + Theta × (Δt) + Rho × (Δr).**

- **Takeaway 2: Fixed-Income Futures Pricing with Cheapest-to-Deliver Conversion Factor (CF): Quoted Futures Price QFP = [Full Forward Price − AI_T] / Conversion Factor = [(Flat_0 + AI_0)(1+r)^T − AI_T − FV(Coupon)] /.**

- **Takeaway 3: Delta hedging eliminates linear first-order price risk ($30,000), but a short option posit.**

- **Takeaway 4: Dividing the clean forward price by the Conversion Factor (CF) normalizes the CTD bond.**

## Frequently Asked Questions (FAQs)

### What is the primary formula for cfa level 2 derivatives formulas in Level II Derivatives?

The primary equations for CFA Level 2 Derivatives: Complete Notes and Formulas govern Derivatives calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is cfa level 2 derivatives formulas tested on the CFA Level II exam?

On the CFA exam, CFA Level 2 Derivatives: Complete Notes and Formulas is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level II · Derivatives).

### Related CFA Study Guides

- [How to Calculate the Value of a Forward Contract](/blog/cfa/cfa-level-2-calculate-value-of-forward-contract/)

- [Futures Pricing: How to Calculate Cost of Carry](/blog/cfa/cfa-level-2-futures-pricing-calculate-cost-of-carry/)

- [Binomial Option Pricing Model: Numerical Questions With Solutions](/blog/cfa/cfa-level-2-binomial-option-pricing-model-numerical-questions/)

