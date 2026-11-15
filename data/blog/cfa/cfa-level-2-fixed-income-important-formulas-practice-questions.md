---
title: "CFA Level 2 Fixed Income: Important Formulas and Practice Questions"
seoTitle: "CFA Level 2 Fixed Income: Important Formulas and Practice Questions — CFA Level II"
slug: cfa-level-2-fixed-income-important-formulas-practice-questions
description: "Master cfa level 2 fixed income formulas for Level II (Fixed Income). Includes verified CFA formulas, 2 step-by-step solved numerical examples, comparison ta."
category: cfa
tags:
  - "CFA"
  - "Level II"
  - "Fixed Income"
  - "cfa level 2 fixed income formulas"
  - "cfa level 2 fixed income formulas formula"
author: Aniket Thakur
datePublished: "2026-11-13"
dateModified: "2026-11-13"
coverImage: /assets/images/blog/cfa-level-2-fixed-income-important-formulas-practice-questions/cover.svg
coverImageAlt: "Illustrative guide to CFA Level 2 Fixed Income: Important Formulas and Practice Questions"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for CFA Level 2 Fixed Income: Important Formulas and Practice Questions."
draft: false
featured: false
sources:
  - title: "CFA Institute 2026–2027 Program Curriculum: Fixed Income"
    url: https://www.cfainstitute.org/en/programs/cfa/curriculum
  - title: "CFA Institute Candidate Study Resources & Topic Outlines"
    url: https://www.cfainstitute.org/en/programs/cfa/candidate
showSources: true
enquiry: false
quickAnswer:
  question: "CFA Level 2 Fixed Income: Important Formulas and Practice Questions: Key Summary & Verdict"
  answer: "CFA Level 2 Fixed Income: Important Formulas and Practice Questions covers spot/forward rate dynamics, riding the yield curve vs rolling down the curve, dominance-free and arbitrage-free binomial trees, callable/putable/convertible bonds, structural vs."
  facts:
    - label: "CFA Level"
      value: "Level II"
    - label: "Curriculum Subject"
      value: "Fixed Income"
    - label: "Topic Focus"
      value: "cfa level 2 fixed income formulas"
    - label: "Syllabus Standard"
      value: "2026–2027 Curriculum"
  goodFor:
    - "Candidates preparing for CFA Level II (Fixed Income) exam questions."
    - "Financial analysts requiring verified formulas and worked calculations."
  watchFor:
    - "Verify compounding periodicity, sign conventions, and calculator mode (BGN vs END)."
    - "Review boundary conditions and common exam distractor traps."
  note: "2026–2027 CFA Program Curriculum Series · Aniket Thakur"
faqItems:
  - question: "What is the primary formula for cfa level 2 fixed income formulas in Level II Fixed Income?"
    answer: "The primary equations for CFA Level 2 Fixed Income: Important Formulas and Practice Questions govern Fixed Income calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is cfa level 2 fixed income formulas tested on the CFA Level II exam?"
    answer: "On the CFA exam, CFA Level 2 Fixed Income: Important Formulas and Practice Questions is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
---

## Introduction

CFA Level 2 Fixed Income: Important Formulas and Practice Questions covers spot/forward rate dynamics, riding the yield curve vs rolling down the curve, dominance-free and arbitrage-free binomial trees, callable/putable/convertible bonds, structural vs reduced-form credit models, and CDS in Level II Fixed Income (LM 1–5: The Term Structure and Interest Rate Dynamics, Arbitrage-Free Valuation Framework, Valuation and Analysis of Bonds with Embedded Options, Credit Analysis Models, Credit Default Swaps), with verified formulas, two worked examples, and three practice MCQs.

## Concept Explanation & Institutional Framework

Forward Rate Model & Riding the Yield Curve Return ([1 + z_T]^T = [1 + z_1] × [1 + f(1, T−1)]^(T−1) ; If Future Spot z_{T−1} < Implied Forward f(1, T−1) => Bond Price Beat Constant-Yield Trajectory) and Swap Spread, TED Spread, and SOFR-OIS Spread (Swap Spread = Fixed Swap Rate − On-the-Run Govt Yield ; TED Spread = 3m Libor/Bank Rate − 3m T-Bill Yield) govern spot/forward rate dynamics, riding the yield curve vs rolling down the curve, dominance-free and arbitrage-free binomial trees, callable/putable/convertible bonds, structural vs reduced-form credit models, and CDS.

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: Forward Rate Model & Riding the Yield Curve Return

```formula
[1 + z_T]^T = [1 + z_1] × [1 + f(1, T−1)]^(T−1)

If Future Spot z_{T−1} < Implied Forward f(1, T−1) => Bond Price Beat Constant-Yield Trajectory
```

**Institutional Context & Variable Breakdown:** A bond earns an excess return over the 1-period risk-free rate z_1 if and only if the realized future spot rate turns out to be LOWER than today's implied forward rate!.

### Formula 2: Swap Spread, TED Spread, and SOFR-OIS Spread

```formula
Swap Spread = Fixed Swap Rate − On-the-Run Govt Yield

TED Spread = 3m Libor/Bank Rate − 3m T-Bill Yield
```

**Institutional Context & Variable Breakdown:** Measures interbank credit, counterparty, and systemic funding liquidity stress.

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Riding the Yield Curve (Rolling Down an Upward-Sloping Static Yield Curve)

**Problem & Given Scenario:**
The current annual spot/par yield curve is upward-sloping: 1-year = 3.00%, 2-year = 4.00%, 3-year = 5.00% (so a 3-year 5.0% annual coupon bond trades at $100.00 par today). Assuming the yield curve remains COMPLETELY UNCHANGED over the next year, calculate the 1-year total holding period return of buying the 3-year 5% bond and selling it after 1 year as a 2-year bond yielding 4.00%.

```formula
[1 + z_T]^T = [1 + z_1] × [1 + f(1, T−1)]^(T−1)

If Future Spot z_{T−1} < Implied Forward f(1, T−1) => Bond Price Beat Constant-Yield Trajectory
```

**Step-by-Step Substitution & Calculation:**

Step 1: Implied 2-year forward rate 1 year from today f(1,2) = [(1.05^3 / 1.03)^(1/2)] − 1 = (1.123908)^0.5 − 1 = 6.015%. Because the curve stays static at 4.00% (< 6.015% forward rate!), riding the curve generates excess return! Step 2: Price of the 5.0% coupon bond in 1 year (with 2 years remaining discounted at the 2-year yield of 4.00%): P_1 = 5 / 1.04 + 105 / 1.04^2 = $4.8077 + $97.0784 = $101.886 ≈ $101.89. Step 3: Total 1-Year Cash + Price Return = ($5.00 coupon + $1.89 capital gain) / $100.00 = +6.89% (beating the 3.00% 1-year rate by +389 bps!).

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> When an upward-sloping yield curve remains static (meaning realized spot rates are below implied forward rates), buying bonds with maturity longer than the investment horizon ('riding the yield curve') generates capital gains as the bond rolls down to lower yields.

### Worked Example 2: Cox-Ingersoll-Ross (CIR) vs. Vasicek Equilibrium Term Structure Models

**Problem & Given Scenario:**
Compare the mean-reverting short-rate differential equations of the Vasicek model and the Cox-Ingersoll-Ross (CIR) model: Vasicek: dr_t = k(θ − r_t)dt + σ dW_t vs. CIR: dr_t = k(θ − r_t)dt + σ√(r_t) dW_t.

```formula
Swap Spread = Fixed Swap Rate − On-the-Run Govt Yield

TED Spread = 3m Libor/Bank Rate − 3m T-Bill Yield
```

**Step-by-Step Substitution & Calculation:**

- **Step 1. Both Vasicek and CIR are one-factor equilibrium models with mean reversion speed k toward long-run rate θ.**

- **Step 2. Vasicek has constant volatility σ (allowing interest rates to become negative!).**

- **Step 3. CIR scales volatility by √(r_t), which guarantees non-negative interest rates (r_t ≥ 0) and makes rate volatility increase as interest rates rise.**

- **Step 4. Ho-Lee and Kalotay-Williams-Fabozzi (KWF) are arbitrage-free models calibrated directly to today's observed market yield curve (with no explicit drift mean reversion parameter).**

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> This comparison between Equilibrium (Vasicek/CIR) and Arbitrage-Free (Ho-Lee/KWF) short-rate models is tested in virtually every Level II Fixed Income exam window.

## Comparison & Reference Analysis

| Term Structure Model | Category | Drift / Mean Reversion? | Can Rates Turn Negative? |
|---|---|---|---|
| Cox-Ingersoll-Ross (CIR) | Equilibrium Model | Yes: k(θ − r_t)dt | No (σ√r_t keeps r_t ≥ 0) |
| Vasicek Model | Equilibrium Model | Yes: k(θ − r_t)dt | Yes (constant volatility σ) |
| Ho-Lee Model | Arbitrage-Free Model | Time-dependent θ_t calibrated to curve | Yes (normal distribution) |
| Kalotay-Williams-Fabozzi (KWF) | Arbitrage-Free (Log-normal) | Time-dependent drift | No (log-normal d(ln r_t) keeps r_t > 0) |

## Real-World Financial Applications

Analysts apply Forward Rate Model & Riding the Yield Curve Return and Swap Spread, TED Spread, and SOFR-OIS Spread across Fixed Income valuation and risk management.

## CFA Examination Perspective & Testing Patterns

Tested on the CFA Level II exam (LM 1–5: The Term Structure and Interest Rate Dynamics, Arbitrage-Free Valuation Framework, Valuation and Analysis of Bonds with Embedded Options, Credit Analysis Models, Credit Default Swaps) via quantitative and conceptual MCQs.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** If an upward-sloping spot yield curve remains completely unchanged over a 1-year investment horizon, how does the realized 1-year holding period return on a 5-year fixed-coupon bond compare to the 1-year spot rate (z_1) and the bond's initial 5-year YTM?

- **[A]** It equals the 1-year spot rate z_1

- **[B]** It exceeds BOTH the 1-year spot rate z_1 and the bond's initial 5-year YTM, because the bond rolls down the static upward-sloping curve to a lower 4-year yield

- **[C]** It is less than the 1-year spot rate

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** When an upward-sloping yield curve does not shift up to the higher implied forward rates, a long-term bond appreciates in price as its remaining maturity shortens from 5 years to 4 years at a lower yield.

### Practice Question 2

**Question:** How does the Cox-Ingersoll-Ross (CIR) short-rate term structure model differ from the Vasicek model?

- **[A]** CIR assumes interest rates have no mean reversion

- **[B]** CIR multiplies the volatility term by the square root of the current short rate (σ√r_t), which prevents interest rates from becoming negative and causes volatility to increase when interest rates are high

- **[C]** Vasicek prevents negative interest rates while CIR allows them

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** The √r_t factor in the CIR diffusion term drives volatility to zero as r_t approaches zero (preventing negative rates, provided 2kθ ≥ σ^2) and scales volatility up with the level of rates.

### Practice Question 3

**Question:** According to the Pure Expectations Theory (Unbiased Expectations Theory) of the term structure, if the current yield curve is upward-sloping, it implies solely that:

- **[A]** Investors demand a positive liquidity risk premium for holding longer-maturity bonds

- **[B]** The market expects future short-term interest rates to rise, and the expected 1-period holding return is equal across bonds of all maturities

- **[C]** Bond markets are segmented by institutional maturity habitats

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** Pure Expectations Theory assumes risk-neutral investors (zero maturity risk premium), meaning forward rates are unbiased predictors of future spot rates and all maturities have the exact same expected 1-period return.

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in Forward Rate Model & Riding the Yield Curve Return.**

- **Timing Errors: Mixing beginning and ending balances in Swap Spread, TED Spread, and SOFR-OIS Spread.**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Forward Rate Model & Riding the Yield Curve Return: [1 + z_T]^T = [1 + z_1] × [1 + f(1, T−1)]^(T−1) ; If Future Spot z_{T−1} < Implied Forward f(1, T−1) => Bond Price Beat Constant-Yield Trajectory.**

- **Takeaway 2: Swap Spread, TED Spread, and SOFR-OIS Spread: Swap Spread = Fixed Swap Rate − On-the-Run Govt Yield ; TED Spread = 3m Libor/Bank Rate − 3m T-Bill Yield.**

- **Takeaway 3: When an upward-sloping yield curve remains static (meaning realized spot rates are below.**

- **Takeaway 4: This comparison between Equilibrium (Vasicek/CIR) and Arbitrage-Free (Ho-Lee/KWF) short-ra.**

## Frequently Asked Questions (FAQs)

### What is the primary formula for cfa level 2 fixed income formulas in Level II Fixed Income?

The primary equations for CFA Level 2 Fixed Income: Important Formulas and Practice Questions govern Fixed Income calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is cfa level 2 fixed income formulas tested on the CFA Level II exam?

On the CFA exam, CFA Level 2 Fixed Income: Important Formulas and Practice Questions is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level II · Fixed Income).

### Related CFA Study Guides

- [Spot Rates vs Forward Rates vs Par Rates: Numerical Examples](/blog/cfa/cfa-level-2-spot-rates-vs-forward-rates-vs-par-rates/)

- [How to Calculate Forward Interest Rates From Spot Rates](/blog/cfa/cfa-level-2-calculate-forward-interest-rates-from-spot-rates/)

- [How to Value Bonds Using Binomial Interest Rate Trees](/blog/cfa/cfa-level-2-value-bonds-binomial-interest-rate-trees/)

