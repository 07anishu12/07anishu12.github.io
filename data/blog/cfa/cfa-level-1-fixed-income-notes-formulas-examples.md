---
title: "CFA Fixed Income Level 1: Complete Notes, Formulas and Examples"
seoTitle: "CFA Fixed Income Level 1: Complete Notes, Formulas and Examples — CFA Level I"
slug: cfa-level-1-fixed-income-notes-formulas-examples
description: "Master cfa fixed income level 1 for Level I (Fixed Income). Includes verified CFA formulas, 2 step-by-step solved numerical examples, comparison table, and 3."
category: cfa
tags:
  - "CFA"
  - "Level I"
  - "Fixed Income"
  - "cfa fixed income level 1"
  - "cfa fixed income level 1 formula"
author: Aniket Thakur
datePublished: "2026-11-09"
dateModified: "2026-11-09"
coverImage: /assets/images/blog/cfa-level-1-fixed-income-notes-formulas-examples/cover.svg
coverImageAlt: "Illustrative guide to CFA Fixed Income Level 1: Complete Notes, Formulas and Examples"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for CFA Fixed Income Level 1: Complete Notes, Formulas and Examples."
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
  question: "CFA Fixed Income Level 1: Complete Notes, Formulas and Examples: Key Summary & Verdict"
  answer: "CFA Fixed Income Level 1: Complete Notes, Formulas and Examples is a core Level I Fixed Income topic (LM 1–19: Fixed-Income Instrument Features, Cash Flows, Bond Pricing, Yield Measures, Spot/Forward Rates, Duration, Convexity, Credit Risk, Securitization)."
  facts:
    - label: "CFA Level"
      value: "Level I"
    - label: "Curriculum Subject"
      value: "Fixed Income"
    - label: "Topic Focus"
      value: "cfa fixed income level 1"
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
  - question: "What is the primary formula for cfa fixed income level 1 in Level I Fixed Income?"
    answer: "The primary equations for CFA Fixed Income Level 1: Complete Notes, Formulas and Examples govern Fixed Income calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is cfa fixed income level 1 tested on the CFA Level I exam?"
    answer: "On the CFA exam, CFA Fixed Income Level 1: Complete Notes, Formulas and Examples is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
  - question: "How does Floating-Rate Note (FRN) Coupon & Clean/Full Price connect to related topics in Fixed Income?"
    answer: "Within Fixed Income, Floating-Rate Note (FRN) Coupon & Clean/Full Price links directly to How to Calculate Bond Prices in CFA Level 1 and Wh within the standard CFA Fixed Income curriculum framework."
---

## Introduction

CFA Fixed Income Level 1: Complete Notes, Formulas and Examples is a core Level I Fixed Income topic (LM 1–19: Fixed-Income Instrument Features, Cash Flows, Bond Pricing, Yield Measures, Spot/Forward Rates, Duration, Convexity, Credit Risk, Securitization) focusing on bond indenture covenants, coupon structures (fixed, floating, step-up, zero), clean vs dirty pricing, yield conventions, and interest rate risk. This guide covers the governing equations (Floating-Rate Note (FRN) Coupon & Clean/Full Price and Bond Price Change Approximation (Duration + Convexity)), two verified numerical examples, a comparison table, and three original CFA-style practice questions.

## Concept Explanation & Institutional Framework

From first principles, bond indenture covenants, coupon structures (fixed, floating, step-up, zero), clean vs dirty pricing, yield conventions, and interest rate risk links theoretical valuation and risk mechanics to practical decisions in Fixed Income. Floating-Rate Note (FRN) Coupon & Clean/Full Price (FRN Coupon Rate = Reference Rate (MRR) + Quoted Margin ; Full (Dirty) Price = Flat (Clean) Price + Accrued Interest) establishes the primary relationship (Separates accrued coupon interest (AI = Coupon × t/T) from clean quoted bond price to prevent artificial price jumps on coupon dates.), while Bond Price Change Approximation (Duration + Convexity) (%ΔPV_Full ≈ (−ModDur × ΔYield) + [0.5 × Convexity × (ΔYield)^2]) governs Combines first-order linear duration sensitivity and second-order curvature (convexity) for parallel yield curve shifts.

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: Floating-Rate Note (FRN) Coupon & Clean/Full Price

```formula
FRN Coupon Rate = Reference Rate (MRR) + Quoted Margin

Full (Dirty) Price = Flat (Clean) Price + Accrued Interest
```

**Institutional Context & Variable Breakdown:** Separates accrued coupon interest (AI = Coupon × t/T) from clean quoted bond price to prevent artificial price jumps on coupon dates.

### Formula 2: Bond Price Change Approximation (Duration + Convexity)

```formula
%ΔPV_Full ≈ (−ModDur × ΔYield) + [0.5 × Convexity × (ΔYield)^2]
```

**Institutional Context & Variable Breakdown:** Combines first-order linear duration sensitivity and second-order curvature (convexity) for parallel yield curve shifts.

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Clean (Flat) Price vs. Full (Dirty) Invoice Price Between Coupon Dates

**Problem & Given Scenario:**
A 6.0% semiannual coupon corporate bond ($1,000 par, $30 semiannual coupon) settles 72 days into a 180-day coupon period (30/360 day-count). The remaining cash flows discounted to the next coupon date equal $1,042.50, and the semiannual YTM is 2.50% (5.00% annual).

```formula
FRN Coupon Rate = Reference Rate (MRR) + Quoted Margin

Full (Dirty) Price = Flat (Clean) Price + Accrued Interest
```

**Step-by-Step Substitution & Calculation:**

Step 1: Full (Dirty) Price at settlement = $1,042.50 / (1.025)^(1 − 72/180) = $1,042.50 / (1.025)^(0.60) = $1,042.50 / 1.014926 = $1,027.17. Step 2: Accrued Interest (AI) = $30.00 × (72 / 180) = $12.00. Step 3: Flat (Clean) Quoted Price = $1,027.17 − $12.00 = $1,015.17.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Traders quote the Flat (Clean) Price ($1,015.17) so daily interest accrual does not distort yield change signals, while settlement invoices the Full Price ($1,027.17).

### Worked Example 2: Estimating Bond Price Change Using Modified Duration and Convexity

**Problem & Given Scenario:**
A bond trades at a Full Price of $102.00 with Annual Modified Duration = 7.40 and Annual Convexity = 68.0. Estimate the percentage and dollar price change if its YTM rises by 150 bps (+0.0150).

```formula
%ΔPV_Full ≈ (−ModDur × ΔYield) + [0.5 × Convexity × (ΔYield)^2]
```

**Step-by-Step Substitution & Calculation:**

Duration effect = −7.40 × (+0.0150) = −11.100%. Convexity effect = 0.5 × 68.0 × (0.0150)^2 = +0.765%. Total estimated %ΔPrice = −11.100% + 0.765% = −10.335%. Estimated New Price = $102.00 × (1 − 0.10335) = $91.46.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Positive convexity (+0.765%) cushions the bond's price decline when yields surge by 150 bps.

## Comparison & Reference Analysis

| Fixed-Income Concept | Key Convention / Rule | Market Standard | CFA Exam Application |
|---|---|---|---|
| Quoted vs Settlement Price | Flat (Clean) vs Full (Dirty = Clean + AI) | 30/360 (Corporates) vs Actual/Actual (Treasuries) | Always quote Clean; settle Dirty |
| Floating-Rate Note (FRN) | MRR + Quoted Margin vs Discount Margin | Price = Par when QM = DM at reset | Low interest rate duration; credit sensitivity |
| Affirmative vs Negative Covenants | Must do (pay taxes) vs Cannot do (debt cap) | Bond indenture legal contract | Protects bondholders from dilution |
| Embedded Options | Callable (issuer right) vs Putable (investor) | V_callable = V_straight − V_call | Callable caps upside when rates fall |

## Real-World Financial Applications

In institutional Fixed Income practice, analysts apply Floating-Rate Note (FRN) Coupon & Clean/Full Price and Bond Price Change Approximation (Duration + Convexity) to value securities, audit financial statements, and manage portfolio risk.

## CFA Examination Perspective & Testing Patterns

On the CFA Level I exam (LM 1–19: Fixed-Income Instrument Features, Cash Flows, Bond Pricing, Yield Measures, Spot/Forward Rates, Duration, Convexity, Credit Risk, Securitization), cfa fixed income level 1 is tested via standalone 90-second MCQs combining Floating-Rate Note (FRN) Coupon & Clean/Full Price calculations with economic interpretation.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** A corporate bond pays a 5.0% semiannual coupon ($25 every 180 days on $1,000 par) and settles 54 days after the last coupon payment under the 30/360 day-count convention. If its quoted flat (clean) price is $984.50, the full (dirty) invoice price paid by the buyer is:

- **[A]** $977.00

- **[B]** $984.50

- **[C]** $992.00

> [!TIP]
> **Correct Answer: Option C.**
>
> **Explanation:** Accrued Interest = $25.00 × (54 / 180) = $25.00 × 0.30 = $7.50. Full (Dirty) Price = Flat Price ($984.50) + Accrued Interest ($7.50) = $992.00.

### Practice Question 2

**Question:** A floating-rate note (FRN) pays 3-month SOFR plus a quoted margin of 120 bps. On a coupon reset date, if the market-required discount margin for the issuer's credit risk has widened to 165 bps, the FRN will trade at:

- **[A]** A discount to par

- **[B]** Par value

- **[C]** A premium to par

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** Because the promised quoted margin (120 bps) is less than the market-required discount margin (165 bps), investors demand a discount below par.

### Practice Question 3

**Question:** Which bond indenture provision restricts the issuer from pledging assets to future creditors unless existing bondholders are secured equally?

- **[A]** Cross-default clause

- **[B]** Negative pledge clause (a negative covenant)

- **[C]** Sinking fund provision (an affirmative covenant)

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** A negative pledge clause is a negative (restrictive) covenant preventing the issuer from subordinating existing creditors by granting senior liens on assets.

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in Floating-Rate Note (FRN) Coupon & Clean/Full Price.**

- **Timing Errors: Mixing beginning and ending balances in Bond Price Change Approximation (Duration + Convexity).**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Curriculum Scope: LM 1–19: Fixed-Income Instrument Features, Cash Flows, Bond Pricing, Yield Measures, Spot/Forward Rates, Duration, Convexity, Credit Risk, Securitization (Level I · Fixed Income).**

- **Takeaway 2: Primary Formula (Floating-Rate Note (FRN) Coupon & Clean/Full Price): FRN Coupon Rate = Reference Rate (MRR) + Quoted Margin ; Full (Dirty) Price = Flat (Clean) Price + Accrued Interest.**

- **Takeaway 3: Secondary Formula (Bond Price Change Approximation (Duration + Convexity)): %ΔPV_Full ≈ (−ModDur × ΔYield) + [0.5 × Convexity × (ΔYield)^2].**

- **Takeaway 4: Key Insight 1: Traders quote the Flat (Clean) Price ($1,015.17) so daily interest accrual does not distort yield change signals, while settlement invoices.**

- **Takeaway 5: Key Insight 2: Positive convexity (+0.765%) cushions the bond's price decline when yields surge by 150 bps.**

## Frequently Asked Questions (FAQs)

### What is the primary formula for cfa fixed income level 1 in Level I Fixed Income?

The primary equations for CFA Fixed Income Level 1: Complete Notes, Formulas and Examples govern Fixed Income calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is cfa fixed income level 1 tested on the CFA Level I exam?

On the CFA exam, CFA Fixed Income Level 1: Complete Notes, Formulas and Examples is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

### How does Floating-Rate Note (FRN) Coupon & Clean/Full Price connect to related topics in Fixed Income?

Within Fixed Income, Floating-Rate Note (FRN) Coupon & Clean/Full Price links directly to How to Calculate Bond Prices in CFA Level 1 and Wh within the standard CFA Fixed Income curriculum framework.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level I · Fixed Income).

### Related CFA Study Guides

- [How to Calculate Bond Prices in CFA Level 1](/blog/cfa/cfa-level-1-how-to-calculate-bond-prices/)

- [Why Do Bond Prices Fall When Interest Rates Increase? Explained With Examples](/blog/cfa/cfa-level-1-why-bond-prices-fall-when-interest-rates-increase/)

- [How to Calculate Yield to Maturity](/blog/cfa/cfa-level-1-how-to-calculate-yield-to-maturity-ytm/)

