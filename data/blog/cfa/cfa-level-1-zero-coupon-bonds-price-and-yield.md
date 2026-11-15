---
title: "Zero Coupon Bonds: How to Calculate Price and Yield"
seoTitle: "Zero Coupon Bonds: How to Calculate Price and Yield — CFA Level I"
slug: cfa-level-1-zero-coupon-bonds-price-and-yield
description: "Master zero coupon bond price and yield cfa for Level I (Fixed Income). Includes verified CFA formulas, 2 step-by-step solved numerical examples, comparison ."
category: cfa
tags:
  - "CFA"
  - "Level I"
  - "Fixed Income"
  - "zero coupon bond price and yield cfa"
  - "zero coupon bond price and yield cfa formula"
author: Aniket Thakur
datePublished: "2026-11-09"
dateModified: "2026-11-09"
coverImage: /assets/images/blog/cfa-level-1-zero-coupon-bonds-price-and-yield/cover.svg
coverImageAlt: "Illustrative guide to Zero Coupon Bonds: How to Calculate Price and Yield"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for Zero Coupon Bonds: How to Calculate Price and Yield."
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
  question: "Zero Coupon Bonds: How to Calculate Price and Yield: Key Summary & Verdict"
  answer: "Zero Coupon Bonds: How to Calculate Price and Yield is a core Level I Fixed Income topic (LM 4, LM 5 & LM 11: Zero-coupon pricing, spot rates, Macaulay duration and convexity of zero-coupon bonds, OID tax accretion) focusing on pricing zero-coupon bonds on."
  facts:
    - label: "CFA Level"
      value: "Level I"
    - label: "Curriculum Subject"
      value: "Fixed Income"
    - label: "Topic Focus"
      value: "zero coupon bond price and yield cf"
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
  - question: "What is the primary formula for zero coupon bond price and yield cfa in Level I Fixed Income?"
    answer: "The primary equations for Zero Coupon Bonds: How to Calculate Price and Yield govern Fixed Income calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is zero coupon bond price and yield cfa tested on the CFA Level I exam?"
    answer: "On the CFA exam, Zero Coupon Bonds: How to Calculate Price and Yield is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
  - question: "How does Zero-Coupon Bond Price & Implied Spot Yield connect to related topics in Fixed Income?"
    answer: "Within Fixed Income, Zero-Coupon Bond Price & Implied Spot Yield links directly to How to Calculate Bond Convexity With Step-by-Step Example within the standard CFA Fixed Income curriculum framework."
---

## Introduction

Zero Coupon Bonds: How to Calculate Price and Yield is a core Level I Fixed Income topic (LM 4, LM 5 & LM 11: Zero-coupon pricing, spot rates, Macaulay duration and convexity of zero-coupon bonds, OID tax accretion) focusing on pricing zero-coupon bonds on semiannual and annual bases, extracting spot rates, exact duration/convexity closed-form formulas, and Original Issue Discount (OID) taxation. This guide covers the governing equations (Zero-Coupon Bond Price & Implied Spot Yield and Exact Macaulay Duration, Modified Duration & Convexity of a Zero), two verified numerical examples, a comparison table, and three original CFA-style practice questions.

## Concept Explanation & Institutional Framework

From first principles, pricing zero-coupon bonds on semiannual and annual bases, extracting spot rates, exact duration/convexity closed-form formulas, and Original Issue Discount (OID) taxation links theoretical valuation and risk mechanics to practical decisions in Fixed Income. Zero-Coupon Bond Price & Implied Spot Yield (PV_Zero = FV / (1 + z_m / m)^(m×T) ; z_m = m × [(FV / PV_Zero)^(1 / (m×T)) − 1]) establishes the primary relationship (Values a pure discount bond paying zero interim coupons and extracts the m-compounded spot yield z_m.), while Exact Macaulay Duration, Modified Duration & Convexity of a Zero (MacDur_Zero = T (years) ; ModDur_Zero = T / (1 + z_m / m) ; Conv_Zero = [T × (T + 1/m)] / (1 + z_m / m)^2) governs Because 100% of cash flow occurs at maturity T, a zero-coupon bond's Macaulay duration equals its exact time to maturity T.

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: Zero-Coupon Bond Price & Implied Spot Yield

```formula
PV_Zero = FV / (1 + z_m / m)^(m×T)

z_m = m × [(FV / PV_Zero)^(1 / (m×T)) − 1]
```

**Institutional Context & Variable Breakdown:** Values a pure discount bond paying zero interim coupons and extracts the m-compounded spot yield z_m.

### Formula 2: Exact Macaulay Duration, Modified Duration & Convexity of a Zero

```formula
MacDur_Zero = T (years)

ModDur_Zero = T / (1 + z_m / m)

Conv_Zero = [T × (T + 1/m)] / (1 + z_m / m)^2
```

**Institutional Context & Variable Breakdown:** Because 100% of cash flow occurs at maturity T, a zero-coupon bond's Macaulay duration equals its exact time to maturity T.

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Pricing a 10-Year Zero-Coupon Bond and Computing Its Exact Duration and Convexity

**Problem & Given Scenario:**
Calculate the price (per $1,000 par), Macaulay Duration, Modified Duration, and Annual Convexity of a 10-year zero-coupon bond priced at a semiannual YTM of 5.20% (m = 2, periodic rate = 2.60%, N = 20).

```formula
PV_Zero = FV / (1 + z_m / m)^(m×T)

z_m = m × [(FV / PV_Zero)^(1 / (m×T)) − 1]
```

**Step-by-Step Substitution & Calculation:**

Step 1: Price PV = $1,000 / (1.026)^20 = $1,000 / 1.670888 = $598.48. Step 2: Macaulay Duration = 10.00 years (or 20 semiannual periods). Step 3: Annual Modified Duration = 10.00 / 1.026 = 9.7466 years. Step 4: Periodic Convexity = (20 × 21) / (1.026)^2 = 420 / 1.052676 = 398.98; Annualized Convexity = 398.98 / (2^2) = 99.75.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> A 10-year zero-coupon bond has zero reinvestment risk if held for 10 years because there are no interim coupons to reinvest.

### Worked Example 2: Calculating Implied Semiannual Yield and OID Year 1 Accreted Value

**Problem & Given Scenario:**
A 12-year zero-coupon Treasury STRIP ($100 par) trades at $52.40. Find its semiannual bond basis YTM and its constant-yield carrying value after 1 year (2 semiannual periods).

```formula
MacDur_Zero = T (years)

ModDur_Zero = T / (1 + z_m / m)

Conv_Zero = [T × (T + 1/m)] / (1 + z_m / m)^2
```

**Step-by-Step Substitution & Calculation:**

Semiannual N = 24: z_2 = 2 × [(100 / 52.40)^(1/24) − 1] = 2 × [(1.908397)^(0.041667) − 1] = 2 × 0.027319 = 5.4638% ≈ 5.46%. Carrying Value after 1 year (22 semiannual periods remaining) = $52.40 × (1.027319)^2 = $55.30 (generating $2.90 of taxable Original Issue Discount interest in Year 1).

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Even though zero-coupon bondholders receive $0 cash in Year 1, tax authorities tax the $2.90 constant-yield OID accretion as ordinary interest income.

## Comparison & Reference Analysis

| Zero-Coupon Property | Formula / Value | Comparison vs. Coupon Bond of Same Maturity | Portfolio Use Case |
|---|---|---|---|
| Macaulay Duration | Exactly T (Maturity in years) | Strictly higher than coupon bond | Exact single-liability immunization |
| Reinvestment Risk | Zero (if held to maturity T) | Eliminates coupon reinvestment risk | Locks in exact terminal wealth FV |
| Price Sensitivity (ModDur) | T / (1 + y/m) | Maximum rate sensitivity for maturity T | Extending portfolio duration efficiently |
| Annual Convexity | [T × (T + 1/m)] / (1 + y/m)^2 | Higher than single coupon bond of maturity T | Long-end convexity hedging |

## Real-World Financial Applications

In institutional Fixed Income practice, analysts apply Zero-Coupon Bond Price & Implied Spot Yield and Exact Macaulay Duration, Modified Duration & Convexity of a Zero to value securities, audit financial statements, and manage portfolio risk.

## CFA Examination Perspective & Testing Patterns

On the CFA Level I exam (LM 4, LM 5 & LM 11: Zero-coupon pricing, spot rates, Macaulay duration and convexity of zero-coupon bonds, OID tax accretion), zero coupon bond price and yield cfa is tested via standalone 90-second MCQs combining Zero-Coupon Bond Price & Implied Spot Yield calculations with economic interpretation.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** A 7-year zero-coupon bond ($1,000 par) trades at $710.68. Quoted on a semiannual bond basis (m = 2), its yield to maturity is closest to:

- **[A]** 4.94%

- **[B]** 5.00%

- **[C]** 5.06%

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** With m = 2 and T = 7, N = 14 semiannual periods. Periodic rate = (1,000 / 710.68)^(1/14) − 1 = (1.407103)^(1/14) − 1 = 0.02470 = 2.470%. Semiannual bond basis YTM = 2 × 2.470% = 4.94%.

### Practice Question 2

**Question:** What is the annualized convexity of an 8-year zero-coupon bond priced at an annual effective yield of 5.0% (m = 1)?

- **[A]** 65.31

- **[B]** 72.00

- **[C]** 81.63

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** For annual compounding (m = 1), Conv = [T × (T + 1)] / (1 + y)^2 = (8 × 9) / (1.05)^2 = 72 / 1.1025 = 65.306 ≈ 65.31.

### Practice Question 3

**Question:** To immunize a single guaranteed $10,000,000 cash outflow due in exactly 9.0 years with zero reinvestment risk and zero price risk at maturity, a pension manager should purchase:

- **[A]** A 9-year, 6% coupon Treasury note

- **[B]** A 9-year zero-coupon Treasury STRIP with a face value of $10,000,000

- **[C]** A 12-year corporate bond with a Macaulay duration of 9.0 years

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** A 9-year zero-coupon bond matches Macaulay duration (9.0 years) to the 9.0-year horizon and matures directly into $10,000,000 cash with zero interim coupon reinvestment risk.

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in Zero-Coupon Bond Price & Implied Spot Yield.**

- **Timing Errors: Mixing beginning and ending balances in Exact Macaulay Duration, Modified Duration & Convexity of a Zero.**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Curriculum Scope: LM 4, LM 5 & LM 11: Zero-coupon pricing, spot rates, Macaulay duration and convexity of zero-coupon bonds, OID tax accretion (Level I · Fixed Income).**

- **Takeaway 2: Primary Formula (Zero-Coupon Bond Price & Implied Spot Yield): PV_Zero = FV / (1 + z_m / m)^(m×T) ; z_m = m × [(FV / PV_Zero)^(1 / (m×T)) − 1].**

- **Takeaway 3: Secondary Formula (Exact Macaulay Duration, Modified Duration & Convexity of a Zero): MacDur_Zero = T (years) ; ModDur_Zero = T / (1 + z_m / m) ; Conv_Zero = [T × (T + 1/m)] / (1 + z_m / m)^2.**

- **Takeaway 4: Key Insight 1: A 10-year zero-coupon bond has zero reinvestment risk if held for 10 years because there are no interim coupons to reinvest.**

- **Takeaway 5: Key Insight 2: Even though zero-coupon bondholders receive $0 cash in Year 1, tax authorities tax the $2.90 constant-yield OID accretion as ordinary intere.**

## Frequently Asked Questions (FAQs)

### What is the primary formula for zero coupon bond price and yield cfa in Level I Fixed Income?

The primary equations for Zero Coupon Bonds: How to Calculate Price and Yield govern Fixed Income calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is zero coupon bond price and yield cfa tested on the CFA Level I exam?

On the CFA exam, Zero Coupon Bonds: How to Calculate Price and Yield is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

### How does Zero-Coupon Bond Price & Implied Spot Yield connect to related topics in Fixed Income?

Within Fixed Income, Zero-Coupon Bond Price & Implied Spot Yield links directly to How to Calculate Bond Convexity With Step-by-Step Example within the standard CFA Fixed Income curriculum framework.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level I · Fixed Income).

### Related CFA Study Guides

- [How to Calculate Bond Convexity With Step-by-Step Examples](/blog/cfa/cfa-level-1-how-to-calculate-bond-convexity/)

- [Bond Credit Ratings Explained: Investment Grade vs Junk Bonds](/blog/cfa/cfa-level-1-bond-credit-ratings-investment-grade-vs-junk/)

- [Duration vs Convexity: CFA Questions and Answers](/blog/cfa/cfa-level-1-duration-vs-convexity-questions-answers/)

