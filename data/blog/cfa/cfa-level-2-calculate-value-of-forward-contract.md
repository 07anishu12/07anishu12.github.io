---
title: "How to Calculate the Value of a Forward Contract"
seoTitle: "How to Calculate the Value of a Forward Contract — CFA Level II"
slug: cfa-level-2-calculate-value-of-forward-contract
description: "Master how to calculate value of a forward contract cfa for Level II (Derivatives). Includes verified CFA formulas, 2 step-by-step solved numerical examples,."
category: cfa
tags:
  - "CFA"
  - "Level II"
  - "Derivatives"
  - "how to calculate value of a forward contract cfa"
  - "how to calculate value of a forward contract cfa formula"
author: Aniket Thakur
datePublished: "2026-11-13"
dateModified: "2026-11-13"
coverImage: /assets/images/blog/cfa-level-2-calculate-value-of-forward-contract/cover.svg
coverImageAlt: "Illustrative guide to How to Calculate the Value of a Forward Contract"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for How to Calculate the Value of a Forward Contract."
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
  question: "How to Calculate the Value of a Forward Contract: Key Summary & Verdict"
  answer: "How to Calculate the Value of a Forward Contract covers calculating the inception price F_0(T) and mid-life mark-to-market value V_t(T) of Equity Forwards (discrete and continuous dividends), Coupon Bond Forwards, FRAs, and FX Forwards in Level II Derivatives."
  facts:
    - label: "CFA Level"
      value: "Level II"
    - label: "Curriculum Subject"
      value: "Derivatives"
    - label: "Topic Focus"
      value: "how to calculate value of a forward"
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
  - question: "What is the primary formula for how to calculate value of a forward contract cfa in Level II Derivatives?"
    answer: "The primary equations for How to Calculate the Value of a Forward Contract govern Derivatives calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is how to calculate value of a forward contract cfa tested on the CFA Level II exam?"
    answer: "On the CFA exam, How to Calculate the Value of a Forward Contract is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
---

## Introduction

How to Calculate the Value of a Forward Contract covers calculating the inception price F_0(T) and mid-life mark-to-market value V_t(T) of Equity Forwards (discrete and continuous dividends), Coupon Bond Forwards, FRAs, and FX Forwards in Level II Derivatives (LM 1: Pricing and Valuation of Forward Commitments — Valuing Equity Forwards (discrete dividends vs continuous dividend yield), Fixed-Income Coupon Bond Forwards, Forward Rate Agreements (FRAs), and Currency Forwards), with verified formulas, two worked examples, and three practice MCQs.

## Concept Explanation & Institutional Framework

Equity Forward Price & Mid-Life Value (Continuous Dividend Yield δ vs Discrete PV(D)) (Continuous: F_0(T) = S_0 × e^((r_c − δ) × T) ; V_t(T) = S_t × e^(−δ(T−t)) − F_0(T) × e^(−r_c(T−t)) ; Discrete: V_t(T) = S_t − PV_t(D) − F_0(T)/(1+r)^(T−t)) and Mid-Life Valuation of an Existing Forward Rate Agreement (FRA) (V_t(Long Pay-Fixed FRA) = Notional × [(FRA_t − FRA_0) × τ_m] / [1 + (z_B × T_B)]) govern calculating the inception price F_0(T) and mid-life mark-to-market value V_t(T) of Equity Forwards (discrete and continuous dividends), Coupon Bond Forwards, FRAs, and FX Forwards.

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: Equity Forward Price & Mid-Life Value (Continuous Dividend Yield δ vs Discrete PV(D))

```formula
Continuous: F_0(T) = S_0 × e^((r_c − δ) × T)

V_t(T) = S_t × e^(−δ(T−t)) − F_0(T) × e^(−r_c(T−t))

Discrete: V_t(T) = S_t − PV_t(D) − F_0(T)/(1+r)^(T−t)
```

**Institutional Context & Variable Breakdown:** In continuous dividend yield models, remember to discount S_t by e^(−δ(T−t)) when computing mid-life value V_t(T)!.

### Formula 2: Mid-Life Valuation of an Existing Forward Rate Agreement (FRA)

```formula
V_t(Long Pay-Fixed FRA) = Notional × [(FRA_t − FRA_0) × τ_m] / [1 + (z_B × T_B)]
```

**Institutional Context & Variable Breakdown:** Values an existing FRA before loan start by taking the difference between the new market FRA rate (FRA_t) and the original contract FRA rate (FRA_0), discounted from loan payoff date B back to time t.

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Pricing and Valuing an Equity Index Forward with Continuous Dividend Yield

**Problem & Given Scenario:**
An equity index stands at S_0 = 5,000.00. The continuously compounded risk-free rate is r_c = 5.00% and the continuous dividend yield on the index is δ = 2.00%. (1) Calculate the 1-year (T = 1.0) no-arbitrage Forward Price F_0(1). (2) Six months later (t = 0.50, with T − t = 0.50 years remaining), the index is at S_0.5 = 5,200.00. Calculate the mark-to-market value V_0.5(1) of a Long Forward contract (multiplier = $1).

```formula
Continuous: F_0(T) = S_0 × e^((r_c − δ) × T)

V_t(T) = S_t × e^(−δ(T−t)) − F_0(T) × e^(−r_c(T−t))

Discrete: V_t(T) = S_t − PV_t(D) − F_0(T)/(1+r)^(T−t)
```

**Step-by-Step Substitution & Calculation:**

Step 1 (Initial 1-Year Forward Price): F_0(1) = 5,000 × e^((0.05 − 0.02) × 1.0) = 5,000 × e^(0.03) = 5,000 × 1.030455 = $5,152.27. Step 2 (Mid-Life Value at t = 0.50): V_0.5(1) = 5,200 × e^(−0.02 × 0.50) − 5,152.27 × e^(−0.05 × 0.50) = 5,200 × e^(−0.01) − 5,152.27 × e^(−0.025) = $5,148.26 − $5,025.06 = +$123.20.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Equivalently, the new 6-month forward price at t = 0.5 is F_0.5(1) = 5,200 × e^(0.03 × 0.5) = $5,278.59, and discounting ($5,278.59 − $5,152.27) × e^(−0.05 × 0.5) = $126.32 × 0.97531 = +$123.20!

### Worked Example 2: Valuing an Existing 3x9 FRA 1 Month After Inception (Now a 2x8 FRA)

**Problem & Given Scenario:**
One month ago (at t = 0), a corporate treasurer entered a $10,000,000 Long 3x9 FRA (6-month loan period τ = 180/360 = 0.50) at a fixed rate of FRA_0 = 4.20%. Today (t = 1 month, so 2 months until loan start and 8 months = 240 days until loan maturity), the 60-day spot rate is z_60 = 4.00% and the 240-day spot rate is z_240 = 4.80% (Actual/360). Compute the new market 2x8 FRA rate (FRA_t) and the mark-to-market value of the FRA today.

```formula
V_t(Long Pay-Fixed FRA) = Notional × [(FRA_t − FRA_0) × τ_m] / [1 + (z_B × T_B)]
```

**Step-by-Step Substitution & Calculation:**

Step 1: Compute new implied 2x8 forward rate FRA_t: [1 + FRA_t × (180/360)] = [1 + 0.0480 × (240/360)] / [1 + 0.0400 × (60/360)] = 1.032000 / 1.006667 = 1.025165 => FRA_t = 0.025165 × (360/180) = 5.033% ≈ 5.03%. Step 2: Interest difference at loan end (Day 240) = $10,000,000 × (0.05033% − 0.04200%) × (180/360) = $10,000,000 × 0.00833 × 0.50 = +$41,652. Step 3: Discount from Day 240 back to today (t = 1m) using the 240-day factor (1.032000): V_t = $41,652 / 1.032000 = +$40,360.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Valuing a seasoned FRA simply compares the new replacement FRA rate (5.033%) against the original FRA rate (4.200%) and discounts from the end of the underlying loan period (Day 240) back to today!

## Comparison & Reference Analysis

| Forward Contract Type | Initial Forward Price F_0(T) | Mid-Life Long Value V_t(T) | Discounting Convention |
|---|---|---|---|
| Equity (Discrete Div D) | [S_0 − PV_0(D)] × (1 + r)^T | S_t − PV_t(D) − F_0/(1+r)^(T−t) | Annual effective compounding (1+r)^T |
| Equity Index (Cont. Yield δ) | S_0 × e^((r_c − δ)T) | S_t e^(−δ(T−t)) − F_0 e^(−r_c(T−t)) | Continuous compounding e^(rT) |
| Coupon Bond Forward | [Full_0 − PV_0(CI)] × (1 + r)^T | Full_t − PV_t(CI) − F_0/(1+r)^(T−t) | Use Full (Dirty) Price = Clean + AI |
| Forward Rate Agreement (FRA) | Implied forward rate f(A, B−A) | Notional × (FRA_t − FRA_0)τ / [1 + z_B T_B] | Simple money-market Actual/360 |

## Real-World Financial Applications

Analysts apply Equity Forward Price & Mid-Life Value (Continuous Dividend Yield δ vs Discrete PV(D)) and Mid-Life Valuation of an Existing Forward Rate Agreement (FRA) across Derivatives valuation and risk management.

## CFA Examination Perspective & Testing Patterns

Tested on the CFA Level II exam (LM 1: Pricing and Valuation of Forward Commitments — Valuing Equity Forwards (discrete dividends vs continuous dividend yield), Fixed-Income Coupon Bond Forwards, Forward Rate Agreements (FRAs), and Currency Forwards) via quantitative and conceptual MCQs.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** An equity index is at 4,000, has a continuous dividend yield of δ = 1.5%, and the continuously compounded risk-free rate is r_c = 4.5%. The 6-month (T = 0.50) no-arbitrage forward price on the index is closest to:

- **[A]** 4,030.11

- **[B]** 4,060.45

- **[C]** 4,121.80

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** F_0(0.5) = S_0 × e^((r_c − δ) × T) = 4,000 × e^((0.045 − 0.015) × 0.50) = 4,000 × e^(0.015) = 4,000 × 1.015113 = 4,060.45.

### Practice Question 2

**Question:** A trader is Long a 6-month forward contract on a coupon-paying Treasury bond at a locked-in full forward price of $102.00. Two months before expiration (T − t = 2/12 years, no remaining coupons before expiry), the bond's quoted clean price is $101.50, accrued interest today is $1.80, and the risk-free rate is 6.0% annually. The value of the long forward contract today is closest to:

- **[A]** −$0.50

- **[B]** +$1.30

- **[C]** +$2.29

> [!TIP]
> **Correct Answer: Option C.**
>
> **Explanation:** First compute the bond's Full (Dirty) Price today: Full_t = Clean ($101.50) + AI_t ($1.80) = $103.30. Then subtract the present value of the $102.00 forward price discounted over 2 months: V_t = $103.30 − [$102.00 / (1.06)^(2/12)] = $103.30 − $101.014 = +$2.286 ≈ +$2.29.

### Practice Question 3

**Question:** Two months ago, a bank entered a $50,000,000 Pay-Fixed (Long) 3x6 FRA at a fixed rate of 3.80% (90-day loan period τ = 90/360 = 0.25). Today (1 month before the 90-day loan starts, so 120 days until loan payoff), the new market 1x4 FRA rate is 4.40% and the 120-day discount rate is 4.20% (Actual/360). The market value of the FRA to the bank today is closest to:

- **[A]** +$73,964

- **[B]** +$75,000

- **[C]** +$295,858

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** Undiscounted interest gain at Day 120 = $50,000,000 × (0.0440 − 0.0380) × (90/360) = $50,000,000 × 0.0060 × 0.25 = +$75,000. Discount from Day 120 back to today at 4.20%: V_t = $75,000 / [1 + 0.0420 × (120/360)] = $75,000 / 1.0140 = +$73,964.50.

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in Equity Forward Price & Mid-Life Value (Continuous Dividend Yield δ vs Discrete PV(D)).**

- **Timing Errors: Mixing beginning and ending balances in Mid-Life Valuation of an Existing Forward Rate Agreement (FRA).**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Equity Forward Price & Mid-Life Value (Continuous Dividend Yield δ vs Discrete PV(D)): Continuous: F_0(T) = S_0 × e^((r_c − δ) × T) ; V_t(T) = S_t × e^(−δ(T−t)) − F_0(T) × e^(−r_c(T−t)) ; Discrete: V_t(T) = S_t − PV_t(D) − F_0(T)/(1+r)^(T−t).**

- **Takeaway 2: Mid-Life Valuation of an Existing Forward Rate Agreement (FRA): V_t(Long Pay-Fixed FRA) = Notional × [(FRA_t − FRA_0) × τ_m] / [1 + (z_B × T_B)].**

- **Takeaway 3: Equivalently, the new 6-month forward price at t = 0.5 is F_0.5(1) = 5,200 × e^(0.03 × 0.5.**

- **Takeaway 4: Valuing a seasoned FRA simply compares the new replacement FRA rate (5.033%) against the.**

## Frequently Asked Questions (FAQs)

### What is the primary formula for how to calculate value of a forward contract cfa in Level II Derivatives?

The primary equations for How to Calculate the Value of a Forward Contract govern Derivatives calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is how to calculate value of a forward contract cfa tested on the CFA Level II exam?

On the CFA exam, How to Calculate the Value of a Forward Contract is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level II · Derivatives).

### Related CFA Study Guides

- [CFA Level 2 Derivatives: Complete Notes and Formulas](/blog/cfa/cfa-level-2-derivatives-complete-notes-and-formulas/)

- [Futures Pricing: How to Calculate Cost of Carry](/blog/cfa/cfa-level-2-futures-pricing-calculate-cost-of-carry/)

- [Binomial Option Pricing Model: Numerical Questions With Solutions](/blog/cfa/cfa-level-2-binomial-option-pricing-model-numerical-questions/)

