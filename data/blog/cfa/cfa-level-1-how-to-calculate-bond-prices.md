---
title: "How to Calculate Bond Prices in CFA Level 1"
seoTitle: "How to Calculate Bond Prices in CFA Level 1 — CFA Level I"
slug: cfa-level-1-how-to-calculate-bond-prices
description: "Master how to calculate bond prices cfa for Level I (Fixed Income). Includes verified CFA formulas, 2 step-by-step solved numerical examples, comparison tabl."
category: cfa
tags:
  - "CFA"
  - "Level I"
  - "Fixed Income"
  - "how to calculate bond prices cfa"
  - "how to calculate bond prices cfa formula"
author: Aniket Thakur
datePublished: "2026-11-09"
dateModified: "2026-11-09"
coverImage: /assets/images/blog/cfa-level-1-how-to-calculate-bond-prices/cover.svg
coverImageAlt: "Illustrative guide to How to Calculate Bond Prices in CFA Level 1"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for How to Calculate Bond Prices in CFA Level 1."
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
  question: "How to Calculate Bond Prices in CFA Level 1: Key Summary & Verdict"
  answer: "How to Calculate Bond Prices in CFA Level 1 is a core Level I Fixed Income topic (LM 4: Fixed-Income Bond Valuation: Prices and Yields — Discounting coupons and par, semiannual conventions, spot-rate no-arbitrage pricing) focusing on discounting coupon."
  facts:
    - label: "CFA Level"
      value: "Level I"
    - label: "Curriculum Subject"
      value: "Fixed Income"
    - label: "Topic Focus"
      value: "how to calculate bond prices cfa"
    - label: "Syllabus Standard"
      value: "2026–2027 Curriculum"
  goodFor:
    - "Candidates preparing for CFA Level I (Fixed Income) exam questions."
    - "Financial analysts requiring verified formulas and worked calculations."
  watchFor:
    - "Verify compounding periodicity, sign conventions, and calculator mode (BGN vs END)."
    - "Review boundary conditions and common exam distractor traps."
  note: "2026–2027 CFA Program Curriculum Series · Aniket Thakur"
faqItems:
  - question: "What is the primary formula for how to calculate bond prices cfa in Level I Fixed Income?"
    answer: "The primary equations for How to Calculate Bond Prices in CFA Level 1 govern Fixed Income calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is how to calculate bond prices cfa tested on the CFA Level I exam?"
    answer: "On the CFA exam, How to Calculate Bond Prices in CFA Level 1 is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
  - question: "How does Fixed-Coupon Bond Pricing Formula (YTM Basis) connect to related topics in Fixed Income?"
    answer: "Within Fixed Income, Fixed-Coupon Bond Pricing Formula (YTM Basis) links directly to CFA Fixed Income Level 1: Complete Notes, Formulas and within the standard CFA Fixed Income curriculum framework."
---

## Introduction

How to Calculate Bond Prices in CFA Level 1 is a core Level I Fixed Income topic (LM 4: Fixed-Income Bond Valuation: Prices and Yields — Discounting coupons and par, semiannual conventions, spot-rate no-arbitrage pricing) focusing on discounting coupon annuities and principal repayment, annual vs semiannual bond pricing, and arbitrage-free valuation using the spot rate curve. This guide covers the governing equations (Fixed-Coupon Bond Pricing Formula (YTM Basis) and Arbitrage-Free Pricing Using Zero-Coupon Spot Rates), two verified numerical examples, a comparison table, and three original CFA-style practice questions.

## Concept Explanation & Institutional Framework

From first principles, discounting coupon annuities and principal repayment, annual vs semiannual bond pricing, and arbitrage-free valuation using the spot rate curve links theoretical valuation and risk mechanics to practical decisions in Fixed Income. Fixed-Coupon Bond Pricing Formula (YTM Basis) (PV = ∑ [PMT / (1 + r)^t] + [FV / (1 + r)^N] = PMT × [1 − (1 + r)^(−N)] / r + FV × (1 + r)^(−N)) establishes the primary relationship (Values a bond as the sum of an ordinary annuity of N coupon payments (PMT) plus the discounted par value (FV).), while Arbitrage-Free Pricing Using Zero-Coupon Spot Rates (PV = [PMT / (1 + z_1)^1] + [PMT / (1 + z_2)^2] + ... + [(PMT + FV) / (1 + z_N)^N]) governs Discounts each individual cash flow at its maturity-specific zero-coupon spot rate z_t.

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: Fixed-Coupon Bond Pricing Formula (YTM Basis)

```formula
PV = ∑ [PMT / (1 + r)^t] + [FV / (1 + r)^N] = PMT × [1 − (1 + r)^(−N)] / r + FV × (1 + r)^(−N)
```

**Institutional Context & Variable Breakdown:** Values a bond as the sum of an ordinary annuity of N coupon payments (PMT) plus the discounted par value (FV).

### Formula 2: Arbitrage-Free Pricing Using Zero-Coupon Spot Rates

```formula
PV = [PMT / (1 + z_1)^1] + [PMT / (1 + z_2)^2] + ... + [(PMT + FV) / (1 + z_N)^N]
```

**Institutional Context & Variable Breakdown:** Discounts each individual cash flow at its maturity-specific zero-coupon spot rate z_t.

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Pricing a Semiannual Corporate Bond on a Coupon Date

**Problem & Given Scenario:**
Calculate the price of a 7-year, 5.60% semiannual coupon bond ($1,000 par) when the market yield to maturity is 6.40% compounded semiannually (Street Convention).

```formula
PV = ∑ [PMT / (1 + r)^t] + [FV / (1 + r)^N] = PMT × [1 − (1 + r)^(−N)] / r + FV × (1 + r)^(−N)
```

**Step-by-Step Substitution & Calculation:**

Step 1: Convert to semiannual inputs: N = 7 × 2 = 14 periods; periodic coupon PMT = ($1,000 × 5.60%) / 2 = $28.00; periodic yield r = 6.40% / 2 = 3.20% (0.032); FV = $1,000. Step 2: PV of coupons = $28.00 × [1 − (1.032)^(−14)] / 0.032 = $28.00 × 11.158385 = $312.43. Step 3: PV of par = $1,000 / (1.032)^14 = $642.93. Step 4: Total Bond Price = $312.43 + $642.93 = $955.36 (or 95.536% of par).

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Because the coupon rate (5.60%) is below the required YTM (6.40%), the bond trades at a discount ($955.36 < $1,000).

### Worked Example 2: Arbitrage-Free Bond Valuation Using the Spot Rate Curve

**Problem & Given Scenario:**
Value a 3-year, 6.0% annual coupon bond ($100 par) given the following annual zero-coupon spot rates: z_1 = 4.0%, z_2 = 5.0%, z_3 = 6.2%.

```formula
PV = [PMT / (1 + z_1)^1] + [PMT / (1 + z_2)^2] + ... + [(PMT + FV) / (1 + z_N)^N]
```

**Step-by-Step Substitution & Calculation:**

CF_1 = $6 / (1.04)^1 = $5.7692; CF_2 = $6 / (1.05)^2 = $5.4422; CF_3 = $106 / (1.062)^3 = $106 / 1.197770 = $88.4978. Arbitrage-free Bond Price = $5.7692 + $5.4422 + $88.4978 = $99.7092 ≈ $99.71.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> If the bond traded in the market away from $99.71, dealers could strip or reconstitute zero-coupon Treasury strips to lock in a riskless arbitrage profit.

## Comparison & Reference Analysis

| Pricing Input | Annual Coupon Bond (m = 1) | Semiannual Coupon Bond (m = 2) | BA II Plus Keystroke Rule |
|---|---|---|---|
| Number of Periods (N) | Years to Maturity (T) | 2 × Years to Maturity (2T) | Enter total coupon periods in N |
| Periodic Discount Rate (I/Y) | Annual YTM (%) | Annual YTM / 2 (%) | Keep P/Y = 1; divide I/Y by 2 |
| Periodic Coupon (PMT) | Par × Annual Coupon Rate | (Par × Annual Coupon Rate) / 2 | Enter positive PMT and positive FV |
| Par Redemption (FV) | 100 or 1,000 | 100 or 1,000 | Press CPT PV (ignore minus sign) |

## Real-World Financial Applications

In institutional Fixed Income practice, analysts apply Fixed-Coupon Bond Pricing Formula (YTM Basis) and Arbitrage-Free Pricing Using Zero-Coupon Spot Rates to value securities, audit financial statements, and manage portfolio risk.

## CFA Examination Perspective & Testing Patterns

On the CFA Level I exam (LM 4: Fixed-Income Bond Valuation: Prices and Yields — Discounting coupons and par, semiannual conventions, spot-rate no-arbitrage pricing), how to calculate bond prices cfa is tested via standalone 90-second MCQs combining Fixed-Coupon Bond Pricing Formula (YTM Basis) calculations with economic interpretation.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** A 5-year corporate bond with a $1,000 par value pays a 4.80% coupon semiannually. If its yield to maturity is 5.80% (semiannual bond basis), its price is closest to:

- **[A]** $952.40

- **[B]** $957.12

- **[C]** $962.15

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** Semiannual inputs: N = 10, I/Y = 5.80 / 2 = 2.90%, PMT = $48 / 2 = $24.00, FV = $1,000. PV = $24 × [1 − 1.029^(−10)] / 0.029 + $1,000 / 1.029^10 = $205.81 + $751.31 = $957.12.

### Practice Question 2

**Question:** Given 1-year, 2-year, and 3-year annual spot rates of z_1 = 3.0%, z_2 = 4.0%, and z_3 = 5.0%, the no-arbitrage price of a 3-year, 5.0% annual coupon bond ($100 par) is closest to:

- **[A]** $100.00

- **[B]** $100.18

- **[C]** $101.35

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** PV = 5 / 1.03 + 5 / 1.04^2 + 105 / 1.05^3 = $4.8544 + $4.6228 + $90.7029 = $100.18 (exceeding $100 par because the Year 1 and Year 2 coupons are discounted at spot rates below 5.0%).

### Practice Question 3

**Question:** As a discount fixed-coupon bond approaches its maturity date while market yields remain unchanged, its carrying price will:

- **[A]** Remain constant until maturity

- **[B]** Increase along the constant-yield price trajectory toward par value (pull-to-par)

- **[C]** Decrease toward par value

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** Holding yield constant, a discount bond's price accretes upward toward par value along its constant-yield price trajectory as remaining time N shrinks.

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in Fixed-Coupon Bond Pricing Formula (YTM Basis).**

- **Timing Errors: Mixing beginning and ending balances in Arbitrage-Free Pricing Using Zero-Coupon Spot Rates.**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Curriculum Scope: LM 4: Fixed-Income Bond Valuation: Prices and Yields — Discounting coupons and par, semiannual conventions, spot-rate no-arbitrage pricing (Level I · Fixed Income).**

- **Takeaway 2: Primary Formula (Fixed-Coupon Bond Pricing Formula (YTM Basis)): PV = ∑ [PMT / (1 + r)^t] + [FV / (1 + r)^N] = PMT × [1 − (1 + r)^(−N)] / r + FV × (1 + r)^(−N).**

- **Takeaway 3: Secondary Formula (Arbitrage-Free Pricing Using Zero-Coupon Spot Rates): PV = [PMT / (1 + z_1)^1] + [PMT / (1 + z_2)^2] + ... + [(PMT + FV) / (1 + z_N)^N].**

- **Takeaway 4: Key Insight 1: Because the coupon rate (5.60%) is below the required YTM (6.40%), the bond trades at a discount ($955.36 < $1,000).**

- **Takeaway 5: Key Insight 2: If the bond traded in the market away from $99.71, dealers could strip or reconstitute zero-coupon Treasury strips to lock in a riskless.**

## Frequently Asked Questions (FAQs)

### What is the primary formula for how to calculate bond prices cfa in Level I Fixed Income?

The primary equations for How to Calculate Bond Prices in CFA Level 1 govern Fixed Income calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is how to calculate bond prices cfa tested on the CFA Level I exam?

On the CFA exam, How to Calculate Bond Prices in CFA Level 1 is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

### How does Fixed-Coupon Bond Pricing Formula (YTM Basis) connect to related topics in Fixed Income?

Within Fixed Income, Fixed-Coupon Bond Pricing Formula (YTM Basis) links directly to CFA Fixed Income Level 1: Complete Notes, Formulas and within the standard CFA Fixed Income curriculum framework.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level I · Fixed Income).

### Related CFA Study Guides

- [CFA Fixed Income Level 1: Complete Notes, Formulas and Examples](/blog/cfa/cfa-level-1-fixed-income-notes-formulas-examples/)

- [Why Do Bond Prices Fall When Interest Rates Increase? Explained With Examples](/blog/cfa/cfa-level-1-why-bond-prices-fall-when-interest-rates-increase/)

- [How to Calculate Yield to Maturity](/blog/cfa/cfa-level-1-how-to-calculate-yield-to-maturity-ytm/)

