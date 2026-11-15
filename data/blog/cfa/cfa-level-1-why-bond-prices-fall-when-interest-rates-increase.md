---
title: "Why Do Bond Prices Fall When Interest Rates Increase? Explained With Examples"
seoTitle: "Why Do Bond Prices Fall When Interest Rates Increase? Explained With Examples — CFA Level I"
slug: cfa-level-1-why-bond-prices-fall-when-interest-rates-increase
description: "Master why do bond prices fall when interest rates rise for Level I (Fixed Income). Includes verified CFA formulas, 2 step-by-step solved numerical examples,."
category: cfa
tags:
  - "CFA"
  - "Level I"
  - "Fixed Income"
  - "why do bond prices fall when interest rates rise"
  - "why do bond prices fall when interest rates rise formula"
author: Aniket Thakur
datePublished: "2026-11-09"
dateModified: "2026-11-09"
coverImage: /assets/images/blog/cfa-level-1-why-bond-prices-fall-when-interest-rates-increase/cover.svg
coverImageAlt: "Illustrative guide to Why Do Bond Prices Fall When Interest Rates Increase? Explained With Examples"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for Why Do Bond Prices Fall When Interest Rates Increase? Explained With Examples."
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
  question: "Why Do Bond Prices Fall When Interest Rates Increase? Explained With Examples: Key Summary & Verdict"
  answer: "Why Do Bond Prices Fall When Interest Rates Increase? Explained With Examples is a core Level I Fixed Income topic (LM 4: Fixed-Income Bond Valuation — Inverse price-yield relationship, convexity, coupon and maturity effects on interest rate sensitivity)."
  facts:
    - label: "CFA Level"
      value: "Level I"
    - label: "Curriculum Subject"
      value: "Fixed Income"
    - label: "Topic Focus"
      value: "why do bond prices fall when intere"
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
  - question: "What is the primary formula for why do bond prices fall when interest rates rise in Level I Fixed Income?"
    answer: "The primary equations for Why Do Bond Prices Fall When Interest Rates Increase? Explained With Examples govern Fixed Income calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is why do bond prices fall when interest rates rise tested on the CFA Level I exam?"
    answer: "On the CFA exam, Why Do Bond Prices Fall When Interest Rates Increase? Explained With Examples is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
  - question: "How does Inverse Discounting Relationship & First Derivative connect to related topics in Fixed Income?"
    answer: "Within Fixed Income, Inverse Discounting Relationship & First Derivative links directly to How to Calculate Bond Prices in CFA Level 1 and H within the standard CFA Fixed Income curriculum framework."
---

## Introduction

Why Do Bond Prices Fall When Interest Rates Increase? Explained With Examples is a core Level I Fixed Income topic (LM 4: Fixed-Income Bond Valuation — Inverse price-yield relationship, convexity, coupon and maturity effects on interest rate sensitivity) focusing on economic and mathematical causes of the inverse bond price-yield relationship, convexity asymmetry, and coupon/maturity duration rules. This guide covers the governing equations (Inverse Discounting Relationship & First Derivative and Second Derivative (Positive Convexity Asymmetry)), two verified numerical examples, a comparison table, and three original CFA-style practice questions.

## Concept Explanation & Institutional Framework

From first principles, economic and mathematical causes of the inverse bond price-yield relationship, convexity asymmetry, and coupon/maturity duration rules links theoretical valuation and risk mechanics to practical decisions in Fixed Income. Inverse Discounting Relationship & First Derivative (P(y) = ∑ CF_t / (1 + y)^t ; dP / dy = ∑ [−t × CF_t / (1 + y)^(t+1)] < 0) establishes the primary relationship (Because fixed cash flows CF_t are in the numerator and market yield (1 + y) is in the denominator, dP/dy is strictly negative.), while Second Derivative (Positive Convexity Asymmetry) (d^2P / dy^2 = ∑ [t(t + 1) × CF_t / (1 + y)^(t+2)] > 0) governs For option-free fixed-coupon bonds, the percentage price increase when yields fall by Δy is strictly greater than the percentage price decrease when yields rise by Δy.

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: Inverse Discounting Relationship & First Derivative

```formula
P(y) = ∑ CF_t / (1 + y)^t

dP / dy = ∑ [−t × CF_t / (1 + y)^(t+1)] < 0
```

**Institutional Context & Variable Breakdown:** Because fixed cash flows CF_t are in the numerator and market yield (1 + y) is in the denominator, dP/dy is strictly negative.

### Formula 2: Second Derivative (Positive Convexity Asymmetry)

```formula
d^2P / dy^2 = ∑ [t(t + 1) × CF_t / (1 + y)^(t+2)] > 0
```

**Institutional Context & Variable Breakdown:** For option-free fixed-coupon bonds, the percentage price increase when yields fall by Δy is strictly greater than the percentage price decrease when yields rise by Δy.

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Demonstrating Asymmetric Price Changes (+100 bps vs. −100 bps Yield Shift)

**Problem & Given Scenario:**
A 20-year, 5.0% annual coupon bond ($100 par) initially trades at par ($100.00) when market YTM = 5.0%. Compute its exact price if YTM rises to 6.0% (+100 bps) vs. falls to 4.0% (−100 bps).

```formula
P(y) = ∑ CF_t / (1 + y)^t

dP / dy = ∑ [−t × CF_t / (1 + y)^(t+1)] < 0
```

**Step-by-Step Substitution & Calculation:**

At YTM = 6.0%: Price = 5 × [1 − 1.06^(−20)] / 0.06 + 100 / 1.06^20 = $57.3496 + $31.1805 = $88.53 (a −11.47% price drop). At YTM = 4.0%: Price = 5 × [1 − 1.04^(−20)] / 0.04 + 100 / 1.04^20 = $67.9516 + $45.6387 = $113.59 (a +13.59% price gain).

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Because the price-yield curve is convex toward the origin, a 100 bps rate cut produces a +13.59% gain while a 100 bps rate hike produces a smaller −11.47% loss.

### Worked Example 2: Comparing Maturity and Coupon Effects on Rate Sensitivity

**Problem & Given Scenario:**
When market yields jump from 5.0% to 7.0% (+200 bps), compare the price drop of: Bond A (5-year, 5% coupon), Bond B (20-year, 5% coupon), and Bond C (20-year, 0% zero-coupon).

```formula
d^2P / dy^2 = ∑ [t(t + 1) × CF_t / (1 + y)^(t+2)] > 0
```

**Step-by-Step Substitution & Calculation:**

Bond A (5-yr, 5%): falls from $100.00 to $91.80 (−8.20%). Bond B (20-yr, 5%): falls from $100.00 to $78.81 (−21.19%). Bond C (20-yr, 0%): falls from $37.6889 (at 5%) to $25.8419 (at 7%), a −31.43% drop!

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Holding coupon constant, longer maturity magnifies rate sensitivity (−21.19% vs −8.20%); holding maturity constant, lower coupon magnifies rate sensitivity (−31.43% vs −21.19%).

## Comparison & Reference Analysis

| Bond Characteristic | Change in Feature | Effect on Price Sensitivity (Duration) | Economic Explanation |
|---|---|---|---|
| Time to Maturity (T) | Longer Maturity | Increases sensitivity (usually) | Cash flows discounted over more periods |
| Coupon Rate (C) | Lower Coupon Rate | Increases sensitivity | Higher weight on distant principal payment |
| Yield to Maturity (y) | Lower Initial YTM | Increases sensitivity | Present value of distant flows is larger |
| Equal +Δy vs −Δy Shift | Equal bps magnitude | \|% Price Gain\| > \|% Price Loss\| | Positive convexity of (1 + y)^(−t) |

## Real-World Financial Applications

In institutional Fixed Income practice, analysts apply Inverse Discounting Relationship & First Derivative and Second Derivative (Positive Convexity Asymmetry) to value securities, audit financial statements, and manage portfolio risk.

## CFA Examination Perspective & Testing Patterns

On the CFA Level I exam (LM 4: Fixed-Income Bond Valuation — Inverse price-yield relationship, convexity, coupon and maturity effects on interest rate sensitivity), why do bond prices fall when interest rates rise is tested via standalone 90-second MCQs combining Inverse Discounting Relationship & First Derivative calculations with economic interpretation.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** For an option-free fixed-rate bond, how does the magnitude of the percentage price increase when market yields fall by 50 bps compare to the percentage price decrease when market yields rise by 50 bps?

- **[A]** The percentage price increase is smaller than the percentage price decrease

- **[B]** The percentage price increase is equal to the percentage price decrease

- **[C]** The percentage price increase is larger than the percentage price decrease due to positive convexity

> [!TIP]
> **Correct Answer: Option C.**
>
> **Explanation:** Option-free bonds have positive convexity (d^2P/dy^2 > 0), so the slope steepens as yields fall and flattens as yields rise.

### Practice Question 2

**Question:** Which of the following option-free bonds will experience the largest percentage price decline if market yields increase by 100 bps across all maturities?

- **[A]** 5-year, 6% coupon bond priced at YTM = 5%

- **[B]** 15-year, 6% coupon bond priced at YTM = 5%

- **[C]** 15-year, 0% zero-coupon bond priced at YTM = 5%

> [!TIP]
> **Correct Answer: Option C.**
>
> **Explanation:** Maximum interest rate sensitivity occurs in the bond with the longest maturity (15 years) and the lowest coupon rate (0% zero-coupon).

### Practice Question 3

**Question:** Why does an existing 4.0% fixed-coupon bond drop below par ($100) when newly issued bonds of identical credit and maturity offer a 5.5% coupon?

- **[A]** Because the issuer reduces the par value paid at maturity

- **[B]** Because the bond must trade at a capital discount so that its fixed $4 coupon plus capital appreciation equals the 5.5% market yield

- **[C]** Because accrued interest becomes negative

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** No rational investor will pay $100 for a 4.0% coupon when new par bonds pay 5.5%; the existing bond's price falls until its total return (coupon + pull-to-par capital gain) matches 5.5%.

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in Inverse Discounting Relationship & First Derivative.**

- **Timing Errors: Mixing beginning and ending balances in Second Derivative (Positive Convexity Asymmetry).**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Curriculum Scope: LM 4: Fixed-Income Bond Valuation — Inverse price-yield relationship, convexity, coupon and maturity effects on interest rate sensitivity (Level I · Fixed Income).**

- **Takeaway 2: Primary Formula (Inverse Discounting Relationship & First Derivative): P(y) = ∑ CF_t / (1 + y)^t ; dP / dy = ∑ [−t × CF_t / (1 + y)^(t+1)] < 0.**

- **Takeaway 3: Secondary Formula (Second Derivative (Positive Convexity Asymmetry)): d^2P / dy^2 = ∑ [t(t + 1) × CF_t / (1 + y)^(t+2)] > 0.**

- **Takeaway 4: Key Insight 1: Because the price-yield curve is convex toward the origin, a 100 bps rate cut produces a +13.59% gain while a 100 bps rate hike produces a.**

- **Takeaway 5: Key Insight 2: Holding coupon constant, longer maturity magnifies rate sensitivity (−21.19% vs −8.20%); holding maturity constant, lower coupon magnifies.**

## Frequently Asked Questions (FAQs)

### What is the primary formula for why do bond prices fall when interest rates rise in Level I Fixed Income?

The primary equations for Why Do Bond Prices Fall When Interest Rates Increase? Explained With Examples govern Fixed Income calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is why do bond prices fall when interest rates rise tested on the CFA Level I exam?

On the CFA exam, Why Do Bond Prices Fall When Interest Rates Increase? Explained With Examples is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

### How does Inverse Discounting Relationship & First Derivative connect to related topics in Fixed Income?

Within Fixed Income, Inverse Discounting Relationship & First Derivative links directly to How to Calculate Bond Prices in CFA Level 1 and H within the standard CFA Fixed Income curriculum framework.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level I · Fixed Income).

### Related CFA Study Guides

- [How to Calculate Bond Prices in CFA Level 1](/blog/cfa/cfa-level-1-how-to-calculate-bond-prices/)

- [How to Calculate Yield to Maturity](/blog/cfa/cfa-level-1-how-to-calculate-yield-to-maturity-ytm/)

- [CFA Fixed Income Level 1: Complete Notes, Formulas and Examples](/blog/cfa/cfa-level-1-fixed-income-notes-formulas-examples/)

