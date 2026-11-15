---
title: "How to Calculate Macaulay Duration and Modified Duration"
seoTitle: "How to Calculate Macaulay Duration and Modified Duration — CFA Level I"
slug: cfa-level-1-calculate-macaulay-duration-modified-duration
description: "Master How to Calculate Macaulay Duration and Modified Duration for CFA Level I (Fixed Income). Includes verified curriculum formulas, worked numerical examples, and exam review notes."
category: cfa
tags:
  - "CFA"
  - "Level I"
  - "Fixed Income"
  - "macaulay duration vs modified duration cfa"
  - "macaulay duration vs modified duration cfa formula"
author: Aniket Thakur
datePublished: "2026-11-09"
dateModified: "2026-11-09"
coverImage: /assets/images/blog/cfa-level-1-calculate-macaulay-duration-modified-duration/cover.svg
coverImageAlt: "Illustrative guide to How to Calculate Macaulay Duration and Modified Duration"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for How to Calculate Macaulay Duration and Modified Duration."
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
  question: "How to Calculate Macaulay Duration and Modified Duration: Key Summary & Verdict"
  answer: "How to Calculate Macaulay Duration and Modified Duration is a core Level I Fixed Income topic (LM 10 & LM 11: Interest Rate Risk and Return, Yield-Based Bond Duration Measures — Macaulay duration, Modified duration, Approximate Modified Duration, Effective."
  facts:
    - label: "CFA Level"
      value: "Level I"
    - label: "Curriculum Subject"
      value: "Fixed Income"
    - label: "Topic Focus"
      value: "macaulay duration vs modified durat"
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
  - question: "What is the primary formula for macaulay duration vs modified duration cfa in Level I Fixed Income?"
    answer: "The primary equations for How to Calculate Macaulay Duration and Modified Duration govern Fixed Income calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is macaulay duration vs modified duration cfa tested on the CFA Level I exam?"
    answer: "On the CFA exam, How to Calculate Macaulay Duration and Modified Duration is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
  - question: "How does Macaulay Duration & Exact Modified Duration connect to related topics in Fixed Income?"
    answer: "Within Fixed Income, Macaulay Duration & Exact Modified Duration links directly to Premium Bond vs Discount Bond vs Par Bond: Numerical Exam within the standard CFA Fixed Income curriculum framework."
---

## Introduction

How to Calculate Macaulay Duration and Modified Duration is a core Level I Fixed Income topic (LM 10 & LM 11: Interest Rate Risk and Return, Yield-Based Bond Duration Measures — Macaulay duration, Modified duration, Approximate Modified Duration, Effective Duration, Money Duration, PVBP) focusing on present-value-weighted cash flow horizon (Macaulay duration), percentage yield sensitivity (Modified duration), numerical difference approximation, and Money Duration / PVBP. This guide covers the governing equations (Macaulay Duration & Exact Modified Duration and Approximate Modified Duration, Money Duration & PVBP), two verified numerical examples, a comparison table, and three original CFA-style practice questions.

## Concept Explanation & Institutional Framework

From first principles, present-value-weighted cash flow horizon (Macaulay duration), percentage yield sensitivity (Modified duration), numerical difference approximation, and Money Duration / PVBP links theoretical valuation and risk mechanics to practical decisions in Fixed Income. Macaulay Duration & Exact Modified Duration (MacDur = ∑ [t × PV(CF_t)] / PV_Full ; ModDur = MacDur / (1 + r_periodic)) establishes the primary relationship (MacDur is the PV-weighted average time to receipt of cash flows (in years); ModDur measures the percentage price change per 1% change in yield.), while Approximate Modified Duration, Money Duration & PVBP (ApproxModDur = (PV_− − PV_+) / (2 × ΔYield × PV_0) ; MoneyDur = ModDur × PV_Full ; PVBP = (PV_−1bp − PV_+1bp) / 2) governs Approximates slope using central finite differences and converts percentage duration into dollar risk per 1 bp change (PVBP ≈ MoneyDur × 0.0001).

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: Macaulay Duration & Exact Modified Duration

```formula
MacDur = ∑ [t × PV(CF_t)] / PV_Full

ModDur = MacDur / (1 + r_periodic)
```

**Institutional Context & Variable Breakdown:**

- MacDur is the PV-weighted average time to receipt of cash flows (in years).

- ModDur measures the percentage price change per 1% change in yield.

### Formula 2: Approximate Modified Duration, Money Duration & PVBP

```formula
ApproxModDur = (PV_− − PV_+) / (2 × ΔYield × PV_0)

MoneyDur = ModDur × PV_Full

PVBP = (PV_−1bp − PV_+1bp) / 2
```

**Institutional Context & Variable Breakdown:** Approximates slope using central finite differences and converts percentage duration into dollar risk per 1 bp change (PVBP ≈ MoneyDur × 0.0001).

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Step-by-Step Table Calculation of Macaulay and Modified Duration

**Problem & Given Scenario:**
Calculate the Macaulay Duration and Modified Duration of a 3-year, 6.0% annual coupon bond ($100 par) trading at YTM = 5.0%.

```formula
MacDur = ∑ [t × PV(CF_t)] / PV_Full

ModDur = MacDur / (1 + r_periodic)
```

**Step-by-Step Substitution & Calculation:**

Year 1: CF_1 = $6, PV(CF_1) = 6 / 1.05 = $5.7143, t × PV = 1 × 5.7143 = $5.7143. Year 2: CF_2 = $6, PV(CF_2) = 6 / 1.05^2 = $5.4422, t × PV = 2 × 5.4422 = $10.8844. Year 3: CF_3 = $106, PV(CF_3) = 106 / 1.05^3 = $91.5669, t × PV = 3 × 91.5669 = $274.7007. Sum of PV (Bond Price) = $5.7143 + $5.4422 + $91.5669 = $102.7232. Sum of (t × PV) = $5.7143 + $10.8844 + $274.7007 = $291.2994. Macaulay Duration = $291.2994 / $102.7232 = 2.8358 years. Modified Duration = 2.8358 / (1 + 0.05) = 2.7007 years.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Because coupon payments arrive in Years 1 and 2, Macaulay Duration (2.84 years) is strictly less than the 3.00-year maturity.

### Worked Example 2: Approximate Modified Duration, Money Duration, and Price Value of a Basis Point (PVBP)

**Problem & Given Scenario:**
A bond trades at a full price of PV_0 = $101.50. When its YTM decreases by 25 bps (Δy = 0.0025), its price rises to PV_− = $103.18. When its YTM increases by 25 bps, its price falls to PV_+ = $99.86. Compute ApproxModDur, Money Duration (per $1,000,000 par), and PVBP (per $100 par).

```formula
ApproxModDur = (PV_− − PV_+) / (2 × ΔYield × PV_0)

MoneyDur = ModDur × PV_Full

PVBP = (PV_−1bp − PV_+1bp) / 2
```

**Step-by-Step Substitution & Calculation:**

ApproxModDur = ($103.18 − $99.86) / (2 × 0.0025 × $101.50) = $3.32 / $0.5075 = 6.5419. Money Duration on $1,000,000 par (Full Market Value = $1,015,000) = 6.5419 × $1,015,000 = $6,640,000. PVBP per $100 par = 6.5419 × $101.50 × 0.0001 = $0.0664 (or $664 per $1M par per basis point).

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Every 1 basis point (0.01%) shift in yield changes the market value of the $1M par position by $664.

## Comparison & Reference Analysis

| Duration Measure | Input Variable Shifted | Applicable Bond Types | Immunization / Risk Role |
|---|---|---|---|
| Macaulay Duration | PV-weighted time (years) | Option-free fixed-rate bonds | Match MacDur = Investment Horizon (Zero Duration Gap) |
| Modified Duration | Bond's own Yield to Maturity | Option-free fixed-rate bonds | %ΔPrice ≈ −ModDur × ΔYTM |
| Effective Duration | Benchmark Yield Curve (ΔCurve) | Callable, Putable, MBS (embedded options) | (PV_− − PV_+) / (2 × ΔCurve × PV_0) |
| Money Duration / PVBP | Dollar price sensitivity | Fixed-income portfolio hedging | Futures hedge ratio = MoneyDur_Port / MoneyDur_CTD |

## Real-World Financial Applications

In institutional Fixed Income practice, analysts apply Macaulay Duration & Exact Modified Duration and Approximate Modified Duration, Money Duration & PVBP to value securities, audit financial statements, and manage portfolio risk.

## CFA Examination Perspective & Testing Patterns

On the CFA Level I exam (LM 10 & LM 11: Interest Rate Risk and Return, Yield-Based Bond Duration Measures — Macaulay duration, Modified duration, Approximate Modified Duration, Effective Duration, Money Duration, PVBP), macaulay duration vs modified duration cfa is tested via standalone 90-second MCQs combining Macaulay Duration & Exact Modified Duration calculations with economic interpretation.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** A bond has an annual Macaulay duration of 6.24 years and trades at a semiannual yield to maturity of 5.60% (2.80% per semiannual period). Its annual Modified duration is closest to:

- **[A]** 5.91

- **[B]** 6.07

- **[C]** 6.24

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** ModDur = MacDur / (1 + YTM / m) = 6.24 / (1 + 0.056 / 2) = 6.24 / 1.028 = 6.0700 ≈ 6.07.

### Practice Question 2

**Question:** A bond currently trades at $98.50. A 20 bps decrease in yield raises its price to $99.92, and a 20 bps increase in yield lowers its price to $97.12. Its approximate modified duration is closest to:

- **[A]** 7.00

- **[B]** 7.11

- **[C]** 14.21

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** ApproxModDur = ($99.92 − $97.12) / (2 × 0.0020 × $98.50) = $2.80 / $0.3940 = 7.1066 ≈ 7.11.

### Practice Question 3

**Question:** An institutional investor holds a bond with a Macaulay duration of 7.0 years against a single liability due in 5.0 years. The investor's duration gap (MacDur − Horizon) is +2.0 years, meaning the investor is primarily exposed to:

- **[A]** Reinvestment rate risk (falling interest rates)

- **[B]** Market price risk from rising interest rates

- **[C]** Zero interest rate risk

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** When Macaulay duration (7.0 yrs) exceeds the investment horizon (5.0 yrs), the duration gap is positive (+2.0 yrs), meaning market price risk dominates reinvestment risk and rising interest rates hurt the investor.

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in Macaulay Duration & Exact Modified Duration.**

- **Timing Errors: Mixing beginning and ending balances in Approximate Modified Duration, Money Duration & PVBP.**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Curriculum Scope: LM 10 & LM 11: Interest Rate Risk and Return, Yield-Based Bond Duration Measures — Macaulay duration, Modified duration, Approximate Modified Duration, Effective Duration, Money Duration, PVBP (Level I · Fixed Income).**

- **Takeaway 2: Primary Formula (Macaulay Duration & Exact Modified Duration): MacDur = ∑ [t × PV(CF_t)] / PV_Full ; ModDur = MacDur / (1 + r_periodic).**

- **Takeaway 3: Secondary Formula (Approximate Modified Duration, Money Duration & PVBP): ApproxModDur = (PV_− − PV_+) / (2 × ΔYield × PV_0) ; MoneyDur = ModDur × PV_Full ; PVBP = (PV_−1bp − PV_+1bp) / 2.**

- **Takeaway 4: Key Insight 1: Because coupon payments arrive in Years 1 and 2, Macaulay Duration (2.84 years) is strictly less than the 3.00-year maturity.**

- **Takeaway 5: Key Insight 2: Every 1 basis point (0.01%) shift in yield changes the market value of the $1M par position by $664.**

## Frequently Asked Questions (FAQs)

### What is the primary formula for macaulay duration vs modified duration cfa in Level I Fixed Income?

The primary equations for How to Calculate Macaulay Duration and Modified Duration govern Fixed Income calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is macaulay duration vs modified duration cfa tested on the CFA Level I exam?

On the CFA exam, How to Calculate Macaulay Duration and Modified Duration is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

### How does Macaulay Duration & Exact Modified Duration connect to related topics in Fixed Income?

Within Fixed Income, Macaulay Duration & Exact Modified Duration links directly to Premium Bond vs Discount Bond vs Par Bond: Numerical Exam within the standard CFA Fixed Income curriculum framework.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level I · Fixed Income).

### Related CFA Study Guides

- [Premium Bond vs Discount Bond vs Par Bond: Numerical Examples](/blog/cfa/cfa-level-1-premium-bond-vs-discount-bond-vs-par-bond/)

- [Duration vs Convexity: CFA Questions and Answers](/blog/cfa/cfa-level-1-duration-vs-convexity-questions-answers/)

- [Coupon Rate vs Current Yield vs Yield to Maturity: Key Differences](/blog/cfa/cfa-level-1-coupon-rate-vs-current-yield-vs-ytm/)

