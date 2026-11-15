---
title: "Black-Scholes Model: How to Calculate Option Prices"
seoTitle: "Black-Scholes Model: How to Calculate Option Prices — CFA Level II"
slug: cfa-level-2-black-scholes-model-calculate-option-prices
description: "Master black scholes model cfa level 2 for Level II (Derivatives). Includes verified CFA formulas, 2 step-by-step solved numerical examples, comparison table."
category: cfa
tags:
  - "CFA"
  - "Level II"
  - "Derivatives"
  - "black scholes model cfa level 2"
  - "black scholes model cfa level 2 formula"
author: Aniket Thakur
datePublished: "2026-11-13"
dateModified: "2026-11-13"
coverImage: /assets/images/blog/cfa-level-2-black-scholes-model-calculate-option-prices/cover.svg
coverImageAlt: "Illustrative guide to Black-Scholes Model: How to Calculate Option Prices"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for Black-Scholes Model: How to Calculate Option Prices."
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
  question: "Black-Scholes Model: How to Calculate Option Prices: Key Summary & Verdict"
  answer: "Black-Scholes Model: How to Calculate Option Prices covers calculating option prices with the Black-Scholes-Merton (BSM) model and Black (1976) futures/swaption model, interpreting N(d_1) (option Delta) and N(d_2) (risk-neutral probability of expiring ITM)."
  facts:
    - label: "CFA Level"
      value: "Level II"
    - label: "Curriculum Subject"
      value: "Derivatives"
    - label: "Topic Focus"
      value: "black scholes model cfa level 2"
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
  - question: "What is the primary formula for black scholes model cfa level 2 in Level II Derivatives?"
    answer: "The primary equations for Black-Scholes Model: How to Calculate Option Prices govern Derivatives calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is black scholes model cfa level 2 tested on the CFA Level II exam?"
    answer: "On the CFA exam, Black-Scholes Model: How to Calculate Option Prices is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
---

## Introduction

Black-Scholes Model: How to Calculate Option Prices covers calculating option prices with the Black-Scholes-Merton (BSM) model and Black (1976) futures/swaption model, interpreting N(d_1) (option Delta) and N(d_2) (risk-neutral probability of expiring ITM), and BSM assumptions in Level II Derivatives (LM 2: Valuation of Contingent Claims — Black-Scholes-Merton (BSM) formula (with and without continuous dividend yield δ), Replication interpretation (S_0 N(d_1) vs e^(−rT) X N(d_2)), N(d_2) risk-neutral probability of expiring ITM, Black (1976) model for futures/bond options and swaptions), with verified formulas, two worked examples, and three practice MCQs.

## Concept Explanation & Institutional Framework

Black-Scholes-Merton (BSM) Call & Put Equations (with Continuous Yield δ) (c_0 = S_0 e^(−δT) N(d_1) − X e^(−rT) N(d_2) ; p_0 = X e^(−rT) N(−d_2) − S_0 e^(−δT) N(−d_1)) and Black (1976) Model for Options on Futures, Bonds & Swaptions (c_0 = e^(−rT) × [F_0(T) N(d_1) − X N(d_2)] ; Receiver Swaption = AP × [R_Fixed N(−d_2) − S_Swap N(−d_1)]) govern calculating option prices with the Black-Scholes-Merton (BSM) model and Black (1976) futures/swaption model, interpreting N(d_1) (option Delta) and N(d_2) (risk-neutral probability of expiring ITM), and BSM assumptions.

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: Black-Scholes-Merton (BSM) Call & Put Equations (with Continuous Yield δ)

```formula
c_0 = S_0 e^(−δT) N(d_1) − X e^(−rT) N(d_2)

p_0 = X e^(−rT) N(−d_2) − S_0 e^(−δT) N(−d_1)
```

**Institutional Context & Variable Breakdown:**

- d_1 = [ln(S_0 / X) + (r − δ + 0.5 σ^2)T] / (σ √T).

- d_2 = d_1 − (σ √T). Replicates a Call as a Leveraged Long Stock position [Long e^(−δT)N(d_1) shares funded by borrowing e^(−rT) X N(d_2)].

### Formula 2: Black (1976) Model for Options on Futures, Bonds & Swaptions

```formula
c_0 = e^(−rT) × [F_0(T) N(d_1) − X N(d_2)]

Receiver Swaption = AP × [R_Fixed N(−d_2) − S_Swap N(−d_1)]
```

**Institutional Context & Variable Breakdown:**

- Replaces S_0 e^(−δT) with discounted futures price e^(−rT) F_0(T).

- for a Payer Swaption, V = AP × [S_Swap N(d_1) − R_X N(d_2)] where AP is the Annuity Present Value factor.

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Full Step-by-Step Black-Scholes-Merton Call and Put Calculation

**Problem & Given Scenario:**
A non-dividend-paying stock (δ = 0) trades at S_0 = $100.00. Price a 1-year (T = 1.0) European Call and European Put with strike price X = $100.00 given a continuously compounded risk-free rate of r = 5.00% and annual return volatility of σ = 20.0% (0.20).

```formula
c_0 = S_0 e^(−δT) N(d_1) − X e^(−rT) N(d_2)

p_0 = X e^(−rT) N(−d_2) − S_0 e^(−δT) N(−d_1)
```

**Step-by-Step Substitution & Calculation:**

Step 1 (Calculate d_1 and d_2): ln(100/100) = 0.0000; d_1 = [0 + (0.05 − 0 + 0.5 × 0.20^2) × 1.0] / (0.20 × √1.0) = (0.05 + 0.02) / 0.20 = 0.07 / 0.20 = +0.3500. d_2 = d_1 − σ√T = 0.3500 − 0.2000 = +0.1500. Step 2 (Cumulative Normal Lookups): N(+0.35) = 0.6368; N(+0.15) = 0.5596; N(−0.35) = 1 − 0.6368 = 0.3632; N(−0.15) = 1 − 0.5596 = 0.4404; Discount factor e^(−0.05 × 1) = 0.951229. Step 3 (Call Value c_0): c_0 = ($100.00 × 0.6368) − ($100.00 × 0.951229 × 0.5596) = $63.68 − $53.23 = $10.45. Step 4 (Put Value p_0): p_0 = ($100.00 × 0.951229 × 0.4404) − ($100.00 × 0.3632) = $41.89 − $36.32 = $5.57.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Interpretation of BSM replication: Buying 1 Call for $10.45 is replicated by buying N(d_1) = 0.6368 shares of stock ($63.68) and borrowing $53.23 in risk-free debt!

### Worked Example 2: Pricing an Option on a Futures Contract Using the Black (1976) Model

**Problem & Given Scenario:**
A 6-month (T = 0.50) European Call option on a crude oil futures contract has strike X = $80.00 when the current 6-month futures price is F_0(0.5) = $82.00. Given N(d_1) = 0.5800, N(d_2) = 0.5200, and continuous risk-free rate r = 4.00% (so e^(−0.04×0.5) = e^(−0.02) = 0.9802), compute the call option price.

```formula
c_0 = e^(−rT) × [F_0(T) N(d_1) − X N(d_2)]

Receiver Swaption = AP × [R_Fixed N(−d_2) − S_Swap N(−d_1)]
```

**Step-by-Step Substitution & Calculation:**

c_0 = e^(−rT) × [F_0(T) N(d_1) − X N(d_2)] = 0.9802 × [($82.00 × 0.5800) − ($80.00 × 0.5200)] = 0.9802 × [$47.56 − $41.60] = 0.9802 × $5.96 = $5.84.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> In Black's (1976) futures option model, BOTH the futures price term F_0 N(d_1) and the strike term X N(d_2) are multiplied by the discount factor e^(−rT).

## Comparison & Reference Analysis

| BSM / Black Model Term | Mathematical Expression | Economic / Replication Meaning | Call vs. Put Sign |
|---|---|---|---|
| Call Delta | e^(−δT) × N(d_1) | Shares of stock to buy per call in replicating portfolio | Positive ∈ (0, 1) |
| Put Delta | −e^(−δT) × N(−d_1) | Shares of stock to short per put in replicating portfolio | Negative ∈ (−1, 0) |
| Risk-Neutral ITM Prob | N(d_2) for Call ; N(−d_2) for Put | Risk-neutral probability option expires in-the-money | Strictly between 0 and 1 |
| BSM Bond Leg | −X e^(−rT) N(d_2) (Call) | Short risk-free bond (borrowing) to finance call | Long bond +X e^(−rT) N(−d_2) for Put |

## Real-World Financial Applications

Analysts apply Black-Scholes-Merton (BSM) Call & Put Equations (with Continuous Yield δ) and Black (1976) Model for Options on Futures, Bonds & Swaptions across Derivatives valuation and risk management.

## CFA Examination Perspective & Testing Patterns

Tested on the CFA Level II exam (LM 2: Valuation of Contingent Claims — Black-Scholes-Merton (BSM) formula (with and without continuous dividend yield δ), Replication interpretation (S_0 N(d_1) vs e^(−rT) X N(d_2)), N(d_2) risk-neutral probability of expiring ITM, Black (1976) model for futures/bond options and swaptions) via quantitative and conceptual MCQs.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** In the Black-Scholes-Merton (BSM) option pricing formula for a European call option on a non-dividend-paying stock [c_0 = S_0 N(d_1) − e^(−rT) X N(d_2)], what do the terms N(d_1) and N(d_2) represent, respectively?

- **[A]** N(d_1) is the probability the call expires in-the-money; N(d_2) is the call's Delta

- **[B]** N(d_1) is the call option's Delta (number of shares in the replicating portfolio); N(d_2) is the risk-neutral probability that the call option expires in-the-money (S_T > X)

- **[C]** Both represent the volatility of the stock

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** This is a top-tested Level II concept: N(d_1) (or e^(−δT)N(d_1)) is the call option's Delta, whereas N(d_2) is the risk-neutral probability that the call finishes in-the-money (and N(−d_2) is the risk-neutral probability that the put finishes in-the-money).

### Practice Question 2

**Question:** How is a long position in a European PUT option replicated in the Black-Scholes-Merton framework?

- **[A]** Buying N(d_1) shares of the underlying stock and borrowing at the risk-free rate

- **[B]** Selling short e^(−δT) N(−d_1) shares of the underlying stock AND lending (buying risk-free bonds) in the amount of e^(−rT) X N(−d_2)

- **[C]** Buying both the stock and a risk-free bond

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** Because p_0 = e^(−rT) X N(−d_2) − S_0 e^(−δT) N(−d_1), the positive term is a Long Risk-Free Bond (lending) and the negative term is a Short Stock position.

### Practice Question 3

**Question:** Which of the following is an explicit assumption of the Black-Scholes-Merton (BSM) model?

- **[A]** The underlying asset's price follows a geometric Brownian motion with constant known volatility (so prices are lognormally distributed and continuously compounded returns are normally distributed), with no jumps and no early exercise

- **[B]** Volatility follows a mean-reverting GARCH process

- **[C]** Options are American-style and can be exercised at any time

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** BSM assumes European exercise, constant continuous risk-free rate r and volatility σ, lognormally distributed asset prices (smooth continuous trading with zero price jumps), and frictionless markets.

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in Black-Scholes-Merton (BSM) Call & Put Equations (with Continuous Yield δ).**

- **Timing Errors: Mixing beginning and ending balances in Black (1976) Model for Options on Futures, Bonds & Swaptions.**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Black-Scholes-Merton (BSM) Call & Put Equations (with Continuous Yield δ): c_0 = S_0 e^(−δT) N(d_1) − X e^(−rT) N(d_2) ; p_0 = X e^(−rT) N(−d_2) − S_0 e^(−δT) N(−d_1).**

- **Takeaway 2: Black (1976) Model for Options on Futures, Bonds & Swaptions: c_0 = e^(−rT) × [F_0(T) N(d_1) − X N(d_2)] ; Receiver Swaption = AP × [R_Fixed N(−d_2) − S_Swap N(−d_1)].**

- **Takeaway 3: Interpretation of BSM replication: Buying 1 Call for $10.45 is replicated by buying N(d_1).**

- **Takeaway 4: In Black's (1976) futures option model, BOTH the futures price term F_0 N(d_1) and the.**

## Frequently Asked Questions (FAQs)

### What is the primary formula for black scholes model cfa level 2 in Level II Derivatives?

The primary equations for Black-Scholes Model: How to Calculate Option Prices govern Derivatives calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is black scholes model cfa level 2 tested on the CFA Level II exam?

On the CFA exam, Black-Scholes Model: How to Calculate Option Prices is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level II · Derivatives).

### Related CFA Study Guides

- [Binomial Option Pricing Model: Numerical Questions With Solutions](/blog/cfa/cfa-level-2-binomial-option-pricing-model-numerical-questions/)

- [How to Value Interest Rate Swaps and Currency Swaps](/blog/cfa/cfa-level-2-value-interest-rate-swaps-and-currency-swaps/)

- [Futures Pricing: How to Calculate Cost of Carry](/blog/cfa/cfa-level-2-futures-pricing-calculate-cost-of-carry/)

