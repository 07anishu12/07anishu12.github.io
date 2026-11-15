---
title: "How to Calculate Yield to Maturity (YTM) With Numerical Questions"
seoTitle: "How to Calculate Yield to Maturity (YTM) With Numerical Questions — CFA Level I"
slug: cfa-level-1-how-to-calculate-yield-to-maturity-ytm
description: "Master how to calculate yield to maturity for Level I (Fixed Income). Includes verified CFA formulas, 2 step-by-step solved numerical examples, comparison ta."
category: cfa
tags:
  - "CFA"
  - "Level I"
  - "Fixed Income"
  - "how to calculate yield to maturity"
  - "how to calculate yield to maturity formula"
author: Aniket Thakur
datePublished: "2026-11-09"
dateModified: "2026-11-09"
coverImage: /assets/images/blog/cfa-level-1-how-to-calculate-yield-to-maturity-ytm/cover.svg
coverImageAlt: "Illustrative guide to How to Calculate Yield to Maturity (YTM) With Numerical Questions"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for How to Calculate Yield to Maturity (YTM) With Numerical Questions."
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
  question: "How to Calculate Yield to Maturity (YTM) With Numerical Questions: Key Summary & Verdict"
  answer: "How to Calculate Yield to Maturity (YTM) With Numerical Questions is a core Level I Fixed Income topic (LM 4 & LM 5: Yield to Maturity (YTM), street convention vs true yield, periodicity conversions, Yield to Call (YTC), Yield to Worst (YTW)) focusing on."
  facts:
    - label: "CFA Level"
      value: "Level I"
    - label: "Curriculum Subject"
      value: "Fixed Income"
    - label: "Topic Focus"
      value: "how to calculate yield to maturity"
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
  - question: "What is the primary formula for how to calculate yield to maturity in Level I Fixed Income?"
    answer: "The primary equations for How to Calculate Yield to Maturity (YTM) With Numerical Questions govern Fixed Income calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is how to calculate yield to maturity tested on the CFA Level I exam?"
    answer: "On the CFA exam, How to Calculate Yield to Maturity (YTM) With Numerical Questions is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
  - question: "How does Yield to Maturity (IRR Equation) & Periodicity Conversion connect to related topics in Fixed Income?"
    answer: "Within Fixed Income, Yield to Maturity (IRR Equation) & Periodicity Conversion links directly to Why Do Bond Prices Fall When Interest Rates within the standard CFA Fixed Income curriculum framework."
---

## Introduction

How to Calculate Yield to Maturity (YTM) With Numerical Questions is a core Level I Fixed Income topic (LM 4 & LM 5: Yield to Maturity (YTM), street convention vs true yield, periodicity conversions, Yield to Call (YTC), Yield to Worst (YTW)) focusing on internal rate of return of bond cash flows (YTM), reinvestment assumptions, periodicity conversion formulas, and Yield to Call / Yield to Worst. This guide covers the governing equations (Yield to Maturity (IRR Equation) & Periodicity Conversion and Realized Horizon Yield & Yield to Call (YTC)), two verified numerical examples, a comparison table, and three original CFA-style practice questions.

## Concept Explanation & Institutional Framework

From first principles, internal rate of return of bond cash flows (YTM), reinvestment assumptions, periodicity conversion formulas, and Yield to Call / Yield to Worst links theoretical valuation and risk mechanics to practical decisions in Fixed Income. Yield to Maturity (IRR Equation) & Periodicity Conversion (P_Full = ∑ [PMT / (1 + YTM/m)^t] + [FV / (1 + YTM/m)^(m×T)] ; (1 + APR_m / m)^m = (1 + APR_n / n)^n) establishes the primary relationship (Solves for the single uniform discount rate equating the bond's full price to its promised cash flows, and converts stated yields across compounding frequencies m and n.), while Realized Horizon Yield & Yield to Call (YTC) (Horizon Yield = (Total Future Value of Reinvested Coupons + Sale/Par Price / Purchase Price)^(1/N) − 1) governs YTM equals realized return only if the bond is held to maturity, does not default, and all coupons are reinvested at the exact initial YTM.

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: Yield to Maturity (IRR Equation) & Periodicity Conversion

```formula
P_Full = ∑ [PMT / (1 + YTM/m)^t] + [FV / (1 + YTM/m)^(m×T)]

(1 + APR_m / m)^m = (1 + APR_n / n)^n
```

**Institutional Context & Variable Breakdown:** Solves for the single uniform discount rate equating the bond's full price to its promised cash flows, and converts stated yields across compounding frequencies m and n.

### Formula 2: Realized Horizon Yield & Yield to Call (YTC)

```formula
Horizon Yield = (Total Future Value of Reinvested Coupons + Sale/Par Price / Purchase Price)^(1/N) − 1
```

**Institutional Context & Variable Breakdown:** YTM equals realized return only if the bond is held to maturity, does not default, and all coupons are reinvested at the exact initial YTM.

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Solving for Semiannual Street Convention YTM and Converting to Quarterly/Annual Periodicity

**Problem & Given Scenario:**
An 8-year, 6.0% semiannual coupon bond ($1,000 par) currently trades at a clean price of $932.67 on a coupon date. Find (1) its semiannual bond basis YTM (APR_2), (2) its Effective Annual Yield (APR_1), and (3) its quarterly compounded yield (APR_4).

```formula
P_Full = ∑ [PMT / (1 + YTM/m)^t] + [FV / (1 + YTM/m)^(m×T)]

(1 + APR_m / m)^m = (1 + APR_n / n)^n
```

**Step-by-Step Substitution & Calculation:**

Step 1: Enter N = 16, PV = −932.67, PMT = 30.00, FV = 1,000 -> periodic semiannual yield = 3.550%. Street Convention YTM (APR_2) = 2 × 3.550% = 7.10%. Step 2: Effective Annual Yield (APR_1) = (1 + 0.0355)^2 − 1 = 7.2260% ≈ 7.23%. Step 3: Quarterly periodicity (APR_4): (1 + APR_4 / 4)^4 = (1.0355)^2 => 1 + APR_4 / 4 = (1.0355)^0.5 = 1.017595 => APR_4 = 4 × 1.7595% = 7.038% ≈ 7.04%.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Converting a 7.10% semiannual bond yield to an annual basis raises the stated rate to 7.23%, whereas converting to a quarterly basis lowers the stated rate to 7.04%.

### Worked Example 2: Calculating Yield to Call (YTC) and Yield to Worst (YTW) on a Callable Bond

**Problem & Given Scenario:**
A 10-year, 7.0% semiannual coupon bond ($100 par) trades at $106.50. It is callable in 3 years (N = 6 semiannual periods) at a call price of $102.00 and at par ($100.00) in 5 years (N = 10 periods).

```formula
Horizon Yield = (Total Future Value of Reinvested Coupons + Sale/Par Price / Purchase Price)^(1/N) − 1
```

**Step-by-Step Substitution & Calculation:**

YTM (10 yrs, N = 20, PV = −106.50, PMT = 3.50, FV = 100): semiannual = 3.063% -> Annual YTM = 6.13%. YTC_FirstCall (3 yrs, N = 6, PV = −106.50, PMT = 3.50, FV = 102): semiannual = 2.617% -> Annual YTC_3 = 5.23%. YTC_ParCall (5 yrs, N = 10, PV = −106.50, PMT = 3.50, FV = 100): semiannual = 2.750% -> Annual YTC_5 = 5.50%. Yield to Worst (YTW) = min(6.13%, 5.23%, 5.50%) = 5.23%.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> For a premium callable bond, the issuer is likely to call early, making the 3-year YTC (5.23%) the conservative Yield to Worst.

## Comparison & Reference Analysis

| Yield Measure | Redemption Value & Horizon | Reinvestment Assumption | Primary Fixed-Income Role |
|---|---|---|---|
| Street Convention YTM | Par at Maturity (m×T periods) | Coupons reinvested at YTM | Standard market quotation (ignores weekends) |
| True Yield | Actual business-day settlement | Coupons reinvested at True YTM | Never exceeds Street Convention YTM |
| Yield to Call (YTC) | Call Price at Call Date | Coupons reinvested at YTC | Evaluates upside cap on callable bonds |
| Realized Horizon Return | Actual Reinvested FV + Sale Price | Explicit reinvestment rate r_reinv | Captures reinvestment & price risk |

## Real-World Financial Applications

In institutional Fixed Income practice, analysts apply Yield to Maturity (IRR Equation) & Periodicity Conversion and Realized Horizon Yield & Yield to Call (YTC) to value securities, audit financial statements, and manage portfolio risk.

## CFA Examination Perspective & Testing Patterns

On the CFA Level I exam (LM 4 & LM 5: Yield to Maturity (YTM), street convention vs true yield, periodicity conversions, Yield to Call (YTC), Yield to Worst (YTW)), how to calculate yield to maturity is tested via standalone 90-second MCQs combining Yield to Maturity (IRR Equation) & Periodicity Conversion calculations with economic interpretation.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** An investor buys a 5-year, 6.0% annual coupon bond at par ($100.00, so initial YTM = 6.0%). Immediately after purchase, market interest rates fall to 4.0% and remain at 4.0% for all 5 years. The investor's 5-year realized compound annual horizon yield will be:

- **[A]** Less than 6.0% because coupons are reinvested at 4.0%

- **[B]** Exactly 6.0% because the bond is held to maturity

- **[C]** Greater than 6.0% because bond prices rose

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** With each $6 coupon reinvested at 4.0%, terminal wealth at Year 5 is $6 × [(1.04^5 − 1)/0.04] + $100 = $32.4979 + $100 = $132.50, yielding a realized return of (132.50/100)^(1/5) − 1 = 5.79% < 6.00%.

### Practice Question 2

**Question:** A bond has a stated annual yield to maturity of 6.40% quoted on a semiannual bond basis (m = 2). Its equivalent yield quoted on an annual compounding basis (m = 1) is closest to:

- **[A]** 6.30%

- **[B]** 6.40%

- **[C]** 6.50%

> [!TIP]
> **Correct Answer: Option C.**
>
> **Explanation:** (1 + APR_1)^1 = (1 + 0.064 / 2)^2 = (1.032)^2 = 1.065024, so APR_1 = 6.5024% ≈ 6.50%.

### Practice Question 3

**Question:** Because coupon payment dates falling on weekends or holidays delay actual cash receipt by one or two days without extra interest, a bond's 'True Yield' compared to its 'Street Convention YTM' is:

- **[A]** Slightly higher

- **[B]** Always less than or equal to Street Convention YTM

- **[C]** Unrelated

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** Delaying cash flows by weekend/holiday business days slightly reduces the internal rate of return, so True Yield is always ≤ Street Convention YTM (differing by at most 1–2 bps).

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in Yield to Maturity (IRR Equation) & Periodicity Conversion.**

- **Timing Errors: Mixing beginning and ending balances in Realized Horizon Yield & Yield to Call (YTC).**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Curriculum Scope: LM 4 & LM 5: Yield to Maturity (YTM), street convention vs true yield, periodicity conversions, Yield to Call (YTC), Yield to Worst (YTW) (Level I · Fixed Income).**

- **Takeaway 2: Primary Formula (Yield to Maturity (IRR Equation) & Periodicity Conversion): P_Full = ∑ [PMT / (1 + YTM/m)^t] + [FV / (1 + YTM/m)^(m×T)] ; (1 + APR_m / m)^m = (1 + APR_n / n)^n.**

- **Takeaway 3: Secondary Formula (Realized Horizon Yield & Yield to Call (YTC)): Horizon Yield = (Total Future Value of Reinvested Coupons + Sale/Par Price / Purchase Price)^(1/N) − 1.**

- **Takeaway 4: Key Insight 1: Converting a 7.10% semiannual bond yield to an annual basis raises the stated rate to 7.23%, whereas converting to a quarterly basis lowers.**

- **Takeaway 5: Key Insight 2: For a premium callable bond, the issuer is likely to call early, making the 3-year YTC (5.23%) the conservative Yield to Worst.**

## Frequently Asked Questions (FAQs)

### What is the primary formula for how to calculate yield to maturity in Level I Fixed Income?

The primary equations for How to Calculate Yield to Maturity (YTM) With Numerical Questions govern Fixed Income calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is how to calculate yield to maturity tested on the CFA Level I exam?

On the CFA exam, How to Calculate Yield to Maturity (YTM) With Numerical Questions is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

### How does Yield to Maturity (IRR Equation) & Periodicity Conversion connect to related topics in Fixed Income?

Within Fixed Income, Yield to Maturity (IRR Equation) & Periodicity Conversion links directly to Why Do Bond Prices Fall When Interest Rates within the standard CFA Fixed Income curriculum framework.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level I · Fixed Income).

### Related CFA Study Guides

- [Why Do Bond Prices Fall When Interest Rates Increase? Explained With Examples](/blog/cfa/cfa-level-1-why-bond-prices-fall-when-interest-rates-increase/)

- [Coupon Rate vs Current Yield vs Yield to Maturity: Key Differences](/blog/cfa/cfa-level-1-coupon-rate-vs-current-yield-vs-ytm/)

- [How to Calculate Bond Prices in CFA Level 1](/blog/cfa/cfa-level-1-how-to-calculate-bond-prices/)

