---
title: "How to Value Interest Rate Swaps and Currency Swaps"
seoTitle: "How to Value Interest Rate Swaps and Currency Swaps — CFA Level II"
slug: cfa-level-2-value-interest-rate-swaps-and-currency-swaps
description: "Master how to value interest rate swaps cfa for Level II (Derivatives). Includes verified CFA formulas, 2 step-by-step solved numerical examples, comparison ."
category: cfa
tags:
  - "CFA"
  - "Level II"
  - "Derivatives"
  - "how to value interest rate swaps cfa"
  - "how to value interest rate swaps cfa formula"
author: Aniket Thakur
datePublished: "2026-11-13"
dateModified: "2026-11-13"
coverImage: /assets/images/blog/cfa-level-2-value-interest-rate-swaps-and-currency-swaps/cover.svg
coverImageAlt: "Illustrative guide to How to Value Interest Rate Swaps and Currency Swaps"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for How to Value Interest Rate Swaps and Currency Swaps."
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
  question: "How to Value Interest Rate Swaps and Currency Swaps: Key Summary & Verdict"
  answer: "How to Value Interest Rate Swaps and Currency Swaps covers calculating the fixed par swap rate from zero-coupon discount factors, valuing an existing Interest Rate Swap between or on reset dates, valuing Cross-Currency Swaps (with notional exchange), and."
  facts:
    - label: "CFA Level"
      value: "Level II"
    - label: "Curriculum Subject"
      value: "Derivatives"
    - label: "Topic Focus"
      value: "how to value interest rate swaps cf"
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
  - question: "What is the primary formula for how to value interest rate swaps cfa in Level II Derivatives?"
    answer: "The primary equations for How to Value Interest Rate Swaps and Currency Swaps govern Derivatives calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is how to value interest rate swaps cfa tested on the CFA Level II exam?"
    answer: "On the CFA exam, How to Value Interest Rate Swaps and Currency Swaps is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
---

## Introduction

How to Value Interest Rate Swaps and Currency Swaps covers calculating the fixed par swap rate from zero-coupon discount factors, valuing an existing Interest Rate Swap between or on reset dates, valuing Cross-Currency Swaps (with notional exchange), and valuing Equity Swaps in Level II Derivatives (LM 1: Pricing and Valuation of Forward Commitments — Calculating the Par Fixed Swap Rate from Discount Factors, Valuing a Seasoned Interest Rate Swap, Pricing and Valuing a Cross-Currency Swap, and Valuing an Equity Swap), with verified formulas, two worked examples, and three practice MCQs.

## Concept Explanation & Institutional Framework

Par Fixed Swap Rate Formula (from Discount Factors P_i) (s_periodic = (1 − P_N) / (∑_{i=1}^N P_i) ; Annualized Par Swap Rate R_Fix = m × [(1 − P_N) / ∑ P_i]) and Mark-to-Market Valuation of a Seasoned Interest Rate, Currency, or Equity Swap (IRS Value (Pay-Fixed): V_Swap = V_Floating − V_Fixed = [(s_new − s_old) × τ × ∑ P_i] × Notional ; Currency Swap: V = V_Rec_Dom − S_t × V_Pay_For (Exchanges Notional at t=0 and t=T!) ; Equity Swap (Rec-Equity, Pay-Fixed): V_t = (S_t / S_{t−1}) × NA − V_Fixed_Bond) govern calculating the fixed par swap rate from zero-coupon discount factors, valuing an existing Interest Rate Swap between or on reset dates, valuing Cross-Currency Swaps (with notional exchange), and valuing Equity Swaps.

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: Par Fixed Swap Rate Formula (from Discount Factors P_i)

```formula
s_periodic = (1 − P_N) / (∑_{i=1}^N P_i)

Annualized Par Swap Rate R_Fix = m × [(1 − P_N) / ∑ P_i]
```

**Institutional Context & Variable Breakdown:**

- P_i = 1 / [1 + z_i × (Days_i / 360)] is the zero-coupon discount factor for payment date i.

- ensures that at t = 0, V_Fixed_Leg = V_Floating_Leg = Par ($1.00).

### Formula 2: Mark-to-Market Valuation of a Seasoned Interest Rate, Currency, or Equity Swap

```formula
IRS Value (Pay-Fixed): V_Swap = V_Floating − V_Fixed = [(s_new − s_old) × τ × ∑ P_i] × Notional

Currency Swap: V = V_Rec_Dom − S_t × V_Pay_For (Exchanges Notional at t=0 and t=T!)

Equity Swap (Rec-Equity, Pay-Fixed): V_t = (S_t / S_{t−1}) × NA − V_Fixed_Bond
```

**Institutional Context & Variable Breakdown:** Unlike interest rate and equity swaps, Cross-Currency Swaps exchange notional principals at inception (at S_0) and at maturity (at S_T).

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Calculating the Annualized Fixed Swap Rate and Mid-Life Value of an Interest Rate Swap

**Problem & Given Scenario:**
Calculate the annualized fixed rate on a 1-year quarterly-pay interest rate swap (m = 4, 90/360 periods) given the following simple money-market spot rates: 90-day = 4.00%, 180-day = 4.40%, 270-day = 4.80%, 360-day = 5.20%. Then value a $20,000,000 Receive-Fixed swap locked in earlier at 5.50% annual fixed if today's curve is the one above.

```formula
s_periodic = (1 − P_N) / (∑_{i=1}^N P_i)

Annualized Par Swap Rate R_Fix = m × [(1 − P_N) / ∑ P_i]
```

**Step-by-Step Substitution & Calculation:**

Step 1 (Compute Discount Factors P_i = 1 / [1 + z_i × (Days/360)]): P_1 = 1 / [1 + 0.040(90/360)] = 1 / 1.0100 = 0.990099; P_2 = 1 / [1 + 0.044(180/360)] = 1 / 1.0220 = 0.978474; P_3 = 1 / [1 + 0.048(270/360)] = 1 / 1.0360 = 0.965251; P_4 = 1 / [1 + 0.052(360/360)] = 1 / 1.0520 = 0.950570. Sum of Discount Factors ∑ P_i = 0.990099 + 0.978474 + 0.965251 + 0.950570 = 3.884394. Step 2 (Periodic & Annualized Fixed Swap Rate): s_quarterly = (1 − 0.950570) / 3.884394 = 0.049430 / 3.884394 = 0.012725 (1.2725% per quarter). Annualized Fixed Swap Rate = 4 × 1.2725% = 5.090% ≈ 5.09%. Step 3 (Value of Existing $20M Receive-Fixed Swap @ 5.50% vs new 5.09% market swap rate): V_Rec_Fixed = $20,000,000 × [(0.0550 − 0.0509) / 4] × 3.884394 = $20,000,000 × 0.001025 × 3.884394 = +$79,630.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Using [(s_old − s_new)/m] × ∑ P_i × Notional values any seasoned swap on a reset date in one clean step!

### Worked Example 2: Valuing an Equity Swap (Receive-Index-Return, Pay-Fixed Rate) Between Reset Dates

**Problem & Given Scenario:**
An asset manager enters a 1-year quarterly-reset $10,000,000 notional Equity Swap where the manager RECEIVES the total return on an Equity Index (Initial Index S_0 = 2,000) and PAYS a fixed rate of 4.80% annually (1.20% per quarter = $120,000 per quarter). Exactly 45 days into Quarter 1 (with 3.5 quarters remaining), the Equity Index has risen to S_t = 2,120 (+6.0%), and the present value of the remaining fixed bond leg (coupons + $10M par at maturity) discounted at current rates is $9,940,000.

```formula
IRS Value (Pay-Fixed): V_Swap = V_Floating − V_Fixed = [(s_new − s_old) × τ × ∑ P_i] × Notional

Currency Swap: V = V_Rec_Dom − S_t × V_Pay_For (Exchanges Notional at t=0 and t=T!)

Equity Swap (Rec-Equity, Pay-Fixed): V_t = (S_t / S_{t−1}) × NA − V_Fixed_Bond
```

**Step-by-Step Substitution & Calculation:**

Step 1 (Value of Equity Leg at t): ($2,120 / $2,000) × $10,000,000 = 1.0600 × $10,000,000 = $10,600,000. Step 2 (Value of Fixed Leg at t): $9,940,000. Step 3 (Net Value of Swap to Receive-Equity Manager): V_Swap = V_Equity_Leg − V_Fixed_Leg = $10,600,000 − $9,940,000 = +$660,000.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Note that an Equity Swap can have a negative cash flow on the equity leg if the index falls during a reset period—meaning the Receive-Equity counterparty must pay BOTH the fixed rate AND the percentage drop in the equity index!

## Comparison & Reference Analysis

| Swap Type | Notional Principal Exchanged? | Fixed Leg Valuation | Special Valuation Nuance |
|---|---|---|---|
| Plain-Vanilla Interest Rate Swap | No (net interest only) | [s_periodic × ∑ P_i] + P_N | Floating leg = 1.00 (Par) on reset dates |
| Fixed-for-Fixed Currency Swap | YES (at t = 0 and t = T) | Value each bond in own currency | Convert foreign bond PV at new Spot S_t |
| Receive-Equity, Pay-Fixed Swap | No (implied par used in formula) | [(S_t / S_{t−1}) × NA] − V_Fixed_Bond | If Index drops, Equity Receiver pays BOTH legs! |
| Receive-Equity, Pay-Floating Swap | No | [(S_t / S_{t−1}) − PV(1 + MRR×τ)] × NA | Floating leg discounted from next reset only |

## Real-World Financial Applications

Analysts apply Par Fixed Swap Rate Formula (from Discount Factors P_i) and Mark-to-Market Valuation of a Seasoned Interest Rate, Currency, or Equity Swap across Derivatives valuation and risk management.

## CFA Examination Perspective & Testing Patterns

Tested on the CFA Level II exam (LM 1: Pricing and Valuation of Forward Commitments — Calculating the Par Fixed Swap Rate from Discount Factors, Valuing a Seasoned Interest Rate Swap, Pricing and Valuing a Cross-Currency Swap, and Valuing an Equity Swap) via quantitative and conceptual MCQs.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** Given three annual zero-coupon discount factors of P_1 = 0.9600, P_2 = 0.9150, and P_3 = 0.8650 (Sum of discount factors = 2.7400), the annual fixed swap rate on a 3-year annual-pay interest rate swap is closest to:

- **[A]** 4.50%

- **[B]** 4.93%

- **[C]** 5.15%

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** Annual Fixed Swap Rate = (1 − P_3) / (P_1 + P_2 + P_3) = (1 − 0.8650) / 2.7400 = 0.1350 / 2.7400 = 0.04927 = 4.93%.

### Practice Question 2

**Question:** How does a Cross-Currency Swap differ structurally from a plain-vanilla single-currency Interest Rate Swap?

- **[A]** A cross-currency swap exchanges notional principals in the two currencies at inception (and re-exchanges those same initial notional amounts at maturity) because the two legs are denominated in different currencies

- **[B]** A cross-currency swap has no interest payments

- **[C]** A cross-currency swap is only traded on futures exchanges

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** Because the two legs are in different currencies (e.g., USD and EUR), notional principal is exchanged at t = 0 at the initial spot rate S_0 and re-exchanged at maturity T.

### Practice Question 3

**Question:** A pension fund enters a $50 million notional quarterly-reset Equity Swap in which it receives the quarterly return on the S&P 500 Index and pays a fixed rate of 1.00% per quarter ($500,000). If the S&P 500 Index DECLINES by −3.00% during the first quarter, what is the net cash flow for the pension fund at the Quarter 1 settlement date?

- **[A]** The pension fund pays $1,000,000

- **[B]** The pension fund pays $2,000,000 (paying both the $500,000 fixed leg AND the $1,500,000 negative equity return)

- **[C]** The pension fund receives $1,000,000

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** When the equity index declines (−3.0% × $50M = −$1,500,000), the Receive-Equity, Pay-Fixed party must pay the 3.0% equity loss ($1.5M) PLUS its promised 1.0% fixed payment ($0.5M) = −$2,000,000 total cash outflow.

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in Par Fixed Swap Rate Formula (from Discount Factors P_i).**

- **Timing Errors: Mixing beginning and ending balances in Mark-to-Market Valuation of a Seasoned Interest Rate, Currency, or Equity Swap.**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Par Fixed Swap Rate Formula (from Discount Factors P_i): s_periodic = (1 − P_N) / (∑_{i=1}^N P_i) ; Annualized Par Swap Rate R_Fix = m × [(1 − P_N) / ∑ P_i].**

- **Takeaway 2: Mark-to-Market Valuation of a Seasoned Interest Rate, Currency, or Equity Swap: IRS Value (Pay-Fixed): V_Swap = V_Floating − V_Fixed = [(s_new − s_old) × τ × ∑ P_i] × Notional ; Currency Swap: V = V_Rec_Dom − S_t × V_Pay_For (Exchanges Notional at t=0 and t=T!) ; Equity Swap (Rec-Equity, Pay-Fixed): V_t = (S_t / S_{t−1}) × NA − V_Fixed_Bond.**

- **Takeaway 3: Using [(s_old − s_new)/m] × ∑ P_i × Notional values any seasoned swap on a reset date in.**

- **Takeaway 4: Note that an Equity Swap can have a negative cash flow on the equity leg if the index fall.**

## Frequently Asked Questions (FAQs)

### What is the primary formula for how to value interest rate swaps cfa in Level II Derivatives?

The primary equations for How to Value Interest Rate Swaps and Currency Swaps govern Derivatives calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is how to value interest rate swaps cfa tested on the CFA Level II exam?

On the CFA exam, How to Value Interest Rate Swaps and Currency Swaps is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level II · Derivatives).

### Related CFA Study Guides

- [Black-Scholes Model: How to Calculate Option Prices](/blog/cfa/cfa-level-2-black-scholes-model-calculate-option-prices/)

- [Binomial Option Pricing Model: Numerical Questions With Solutions](/blog/cfa/cfa-level-2-binomial-option-pricing-model-numerical-questions/)

- [Futures Pricing: How to Calculate Cost of Carry](/blog/cfa/cfa-level-2-futures-pricing-calculate-cost-of-carry/)

