---
title: "Futures Pricing: How to Calculate Cost of Carry"
seoTitle: "Futures Pricing: How to Calculate Cost of Carry — CFA Level II"
slug: cfa-level-2-futures-pricing-calculate-cost-of-carry
description: "Master cost of carry futures pricing cfa for Level II (Derivatives). Includes verified CFA formulas, 2 step-by-step solved numerical examples, comparison tab."
category: cfa
tags:
  - "CFA"
  - "Level II"
  - "Derivatives"
  - "cost of carry futures pricing cfa"
  - "cost of carry futures pricing cfa formula"
author: Aniket Thakur
datePublished: "2026-11-13"
dateModified: "2026-11-13"
coverImage: /assets/images/blog/cfa-level-2-futures-pricing-calculate-cost-of-carry/cover.svg
coverImageAlt: "Illustrative guide to Futures Pricing: How to Calculate Cost of Carry"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for Futures Pricing: How to Calculate Cost of Carry."
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
  question: "Futures Pricing: How to Calculate Cost of Carry: Key Summary & Verdict"
  answer: "Futures Pricing: How to Calculate Cost of Carry covers calculating the Net Cost of Carry across asset classes (equities, bonds, commodities, currencies), reverse cash-and-carry arbitrage, and accrued interest adjustments in bond futures in Level II."
  facts:
    - label: "CFA Level"
      value: "Level II"
    - label: "Curriculum Subject"
      value: "Derivatives"
    - label: "Topic Focus"
      value: "cost of carry futures pricing cfa"
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
  - question: "What is the primary formula for cost of carry futures pricing cfa in Level II Derivatives?"
    answer: "The primary equations for Futures Pricing: How to Calculate Cost of Carry govern Derivatives calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is cost of carry futures pricing cfa tested on the CFA Level II exam?"
    answer: "On the CFA exam, Futures Pricing: How to Calculate Cost of Carry is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
---

## Introduction

Futures Pricing: How to Calculate Cost of Carry covers calculating the Net Cost of Carry across asset classes (equities, bonds, commodities, currencies), reverse cash-and-carry arbitrage, and accrued interest adjustments in bond futures in Level II Derivatives (LM 1: Cost-of-Carry Arbitrage across Equity, Fixed-Income, Commodity, and FX Futures — Net cost of carry (financing + storage − income/convenience yield), Eurodollar/SOFR vs Treasury bond futures), with verified formulas, two worked examples, and three practice MCQs.

## Concept Explanation & Institutional Framework

Unified Continuous Cost-of-Carry Futures Pricing Equation (F_0(T) = S_0 × e^((r_c + u − y − δ) × T) = S_0 × e^(Net_Carry × T)) and Reverse Cash-and-Carry Arbitrage (When Futures Is Underpriced: F_Market < F_Model) (At t = 0: Short Spot Asset (+S_0), Invest Proceeds at R_F, and Buy Underpriced Futures (F_Market) ; At t = T: Pay F_Market to take delivery and cover short spot) govern calculating the Net Cost of Carry across asset classes (equities, bonds, commodities, currencies), reverse cash-and-carry arbitrage, and accrued interest adjustments in bond futures.

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: Unified Continuous Cost-of-Carry Futures Pricing Equation

```formula
F_0(T) = S_0 × e^((r_c + u − y − δ) × T) = S_0 × e^(Net_Carry × T)
```

**Institutional Context & Variable Breakdown:**

- r_c = risk-free financing rate (+).

- u = storage/insurance cost % (+).

- y = convenience yield (−).

- δ = dividend/coupon/foreign-interest yield (−).

### Formula 2: Reverse Cash-and-Carry Arbitrage (When Futures Is Underpriced: F_Market < F_Model)

```formula
At t = 0: Short Spot Asset (+S_0), Invest Proceeds at R_F, and Buy Underpriced Futures (F_Market)

At t = T: Pay F_Market to take delivery and cover short spot
```

**Institutional Context & Variable Breakdown:** Requires ability to short the physical underlying asset without prohibitive borrowing costs.

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Pricing a Physical Gold vs. Industrial Copper Futures Contract with Storage and Convenience Yield

**Problem & Given Scenario:**
Gold spot price is S_0 = $2,400/oz, continuously compounded risk-free rate is r_c = 4.50%, storage/insurance cost is u = 0.50% per year, and gold has zero convenience yield (y = 0%). Meanwhile, Industrial Copper trades at S_0 = $9,000/ton with r_c = 4.50%, storage u = 1.50%, and a high scarcity convenience yield of y = 8.00%. Compute the 1-year (T = 1.0) futures price for both.

```formula
F_0(T) = S_0 × e^((r_c + u − y − δ) × T) = S_0 × e^(Net_Carry × T)
```

**Step-by-Step Substitution & Calculation:**

- **Step 1. Gold (Positive Net Carry = 4.5% + 0.5% − 0% = +5.0%): F_Gold = $2,400 × e^(+0.050 × 1.0) = $2,400 × 1.051271 = $2,523.05/oz (Contango: F > S).**

- **Step 2. Industrial Copper (Negative Net Carry = 4.5% + 1.5% − 8.0% = −2.0%): F_Copper = $9,000 × e^(−0.020 × 1.0) = $9,000 × 0.980199 = $8,821.79/ton (Backwardation: F < S).**

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> When non-monetary benefits (convenience yield y or dividend yield δ) exceed financing plus storage costs (r + u), net carry turns negative and futures trade below spot (backwardation).

### Worked Example 2: Coupon Bond Forward/Futures Price with Interim Coupon Payment

**Problem & Given Scenario:**
A 10-year, 6.0% semiannual coupon Treasury bond ($100 par, $3.00 coupon every 182.5 days) has a quoted Clean Price of $102.00 and Accrued Interest today of AI_0 = $1.00 (61 days into the period). Price a 9-month (T = 0.75 yr) forward contract given an annual effective risk-free rate of r = 4.00%, if a $3.00 coupon is paid in 4 months (t = 0.3333 yr) and Accrued Interest at delivery (t = 0.75 yr) is AI_T = $2.50.

```formula
At t = 0: Short Spot Asset (+S_0), Invest Proceeds at R_F, and Buy Underpriced Futures (F_Market)

At t = T: Pay F_Market to take delivery and cover short spot
```

**Step-by-Step Substitution & Calculation:**

Step 1: Full Spot Price S_0 = $102.00 + $1.00 = $103.00. Step 2: PV of the $3.00 interim coupon at t = 0: PV(CI) = $3.00 / (1.04)^0.3333 = $2.9610. Step 3: Full Forward Price F_Full = ($103.00 − $2.9610) × (1.04)^0.75 = $100.0390 × 1.029852 = $103.025. Step 4: Clean Forward Price = Full Forward − AI_T = $103.025 − $2.50 = $100.53.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Always add AI_0 at the start to get Full Spot Price, deduct PV of interim coupons, compound at (1 + r)^T, and subtract AI_T at the end to get Clean Forward Price!

## Comparison & Reference Analysis

| Asset Class | Carry Costs (+) | Carry Benefits (−) | Condition for Futures < Spot (Backwardation) |
|---|---|---|---|
| Equity Index | Risk-free rate (r) | Dividend yield (δ) | Dividend yield δ > Risk-free rate r |
| Fixed-Income Bond | Repo / Risk-free rate (r) | Coupon income (CI) | Current coupon yield > Repo financing rate (Positive Carry) |
| Physical Commodity | Risk-free (r) + Storage (u) | Convenience yield (y) | Convenience yield y > r + Storage u |
| Foreign Currency (P/B) | Price currency rate (r_P) | Base currency rate (r_B) | Base rate r_B > Price rate r_P |

## Real-World Financial Applications

Analysts apply Unified Continuous Cost-of-Carry Futures Pricing Equation and Reverse Cash-and-Carry Arbitrage (When Futures Is Underpriced: F_Market < F_Model) across Derivatives valuation and risk management.

## CFA Examination Perspective & Testing Patterns

Tested on the CFA Level II exam (LM 1: Cost-of-Carry Arbitrage across Equity, Fixed-Income, Commodity, and FX Futures — Net cost of carry (financing + storage − income/convenience yield), Eurodollar/SOFR vs Treasury bond futures) via quantitative and conceptual MCQs.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** For an equity index futures contract, under what condition will the no-arbitrage futures price F_0(T) be LESS than the current spot index level S_0?

- **[A]** When the index's dividend yield (δ) exceeds the risk-free interest rate (r)

- **[B]** When the risk-free interest rate exceeds the dividend yield

- **[C]** When market volatility is high

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** Since F_0(T) = S_0 × e^((r − δ)T), whenever the dividend yield δ is greater than the risk-free financing rate r, net carry (r − δ) is negative and F_0(T) < S_0.

### Practice Question 2

**Question:** In Treasury bond futures pricing, if a deliverable coupon bond has a positive net carry (meaning its current coupon yield exceeds the short-term risk-free repo financing rate), how will its clean forward price compare to its current clean spot price?

- **[A]** Its clean forward price will be lower than its current clean spot price

- **[B]** Its clean forward price will be higher than its current clean spot price

- **[C]** They will be equal

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** Forward Price = Spot Price + Financing Cost − Coupon Income. When Coupon Income > Financing Cost (positive carry for the cash bond holder), the forward price is lower than the spot price.

### Practice Question 3

**Question:** Why is 'reverse cash-and-carry' arbitrage (shorting the physical asset and buying an underpriced futures contract) often difficult to execute in physical agricultural or energy commodity markets?

- **[A]** Because futures cannot be bought by institutions

- **[B]** Because market participants holding scarce physical inventories for industrial production refuse to lend out their physical stock for short selling

- **[C]** Because storage costs are negative

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** When physical inventories are scarce (driving backwardation), industrial users need the physical commodity to keep factories running and will not lend it to arbitrageurs for short sales.

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in Unified Continuous Cost-of-Carry Futures Pricing Equation.**

- **Timing Errors: Mixing beginning and ending balances in Reverse Cash-and-Carry Arbitrage (When Futures Is Underpriced: F_Market < F_Model).**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Unified Continuous Cost-of-Carry Futures Pricing Equation: F_0(T) = S_0 × e^((r_c + u − y − δ) × T) = S_0 × e^(Net_Carry × T).**

- **Takeaway 2: Reverse Cash-and-Carry Arbitrage (When Futures Is Underpriced: F_Market < F_Model): At t = 0: Short Spot Asset (+S_0), Invest Proceeds at R_F, and Buy Underpriced Futures (F_Market) ; At t = T: Pay F_Market to take delivery and cover short spot.**

- **Takeaway 3: When non-monetary benefits (convenience yield y or dividend yield δ) exceed financing plus.**

- **Takeaway 4: Always add AI_0 at the start to get Full Spot Price, deduct PV of interim coupons, compoun.**

## Frequently Asked Questions (FAQs)

### What is the primary formula for cost of carry futures pricing cfa in Level II Derivatives?

The primary equations for Futures Pricing: How to Calculate Cost of Carry govern Derivatives calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is cost of carry futures pricing cfa tested on the CFA Level II exam?

On the CFA exam, Futures Pricing: How to Calculate Cost of Carry is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level II · Derivatives).

### Related CFA Study Guides

- [How to Calculate the Value of a Forward Contract](/blog/cfa/cfa-level-2-calculate-value-of-forward-contract/)

- [Binomial Option Pricing Model: Numerical Questions With Solutions](/blog/cfa/cfa-level-2-binomial-option-pricing-model-numerical-questions/)

- [CFA Level 2 Derivatives: Complete Notes and Formulas](/blog/cfa/cfa-level-2-derivatives-complete-notes-and-formulas/)

