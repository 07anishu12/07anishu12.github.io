---
title: "How to Calculate Bond Convexity With Step-by-Step Examples"
seoTitle: "How to Calculate Bond Convexity With Step-by-Step Examples — CFA Level I"
slug: cfa-level-1-how-to-calculate-bond-convexity
description: "Master how to calculate bond convexity cfa for Level I (Fixed Income). Includes verified CFA formulas, 2 step-by-step solved numerical examples, comparison t."
category: cfa
tags:
  - "CFA"
  - "Level I"
  - "Fixed Income"
  - "how to calculate bond convexity cfa"
  - "how to calculate bond convexity cfa formula"
author: Aniket Thakur
datePublished: "2026-11-09"
dateModified: "2026-11-09"
coverImage: /assets/images/blog/cfa-level-1-how-to-calculate-bond-convexity/cover.svg
coverImageAlt: "Illustrative guide to How to Calculate Bond Convexity With Step-by-Step Examples"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for How to Calculate Bond Convexity With Step-by-Step Examples."
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
  question: "How to Calculate Bond Convexity With Step-by-Step Examples: Key Summary & Verdict"
  answer: "How to Calculate Bond Convexity With Step-by-Step Examples is a core Level I Fixed Income topic (LM 12: Yield-Based Bond Convexity and Portfolio Properties — Approximate convexity, money convexity, and second-order price change calculation) focusing on."
  facts:
    - label: "CFA Level"
      value: "Level I"
    - label: "Curriculum Subject"
      value: "Fixed Income"
    - label: "Topic Focus"
      value: "how to calculate bond convexity cfa"
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
  - question: "What is the primary formula for how to calculate bond convexity cfa in Level I Fixed Income?"
    answer: "The primary equations for How to Calculate Bond Convexity With Step-by-Step Examples govern Fixed Income calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is how to calculate bond convexity cfa tested on the CFA Level I exam?"
    answer: "On the CFA exam, How to Calculate Bond Convexity With Step-by-Step Examples is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
  - question: "How does Approximate Annual Convexity Formula connect to related topics in Fixed Income?"
    answer: "Within Fixed Income, Approximate Annual Convexity Formula links directly to Duration vs Convexity: CFA Questions and Answers and Zero Coupon within the standard CFA Fixed Income curriculum framework."
---

## Introduction

How to Calculate Bond Convexity With Step-by-Step Examples is a core Level I Fixed Income topic (LM 12: Yield-Based Bond Convexity and Portfolio Properties — Approximate convexity, money convexity, and second-order price change calculation) focusing on calculating approximate convexity from finite price shifts, scaling convexity across periodicities, and computing dollar price changes with Money Convexity. This guide covers the governing equations (Approximate Annual Convexity Formula and Dollar Price Change via Money Duration & Money Convexity), two verified numerical examples, a comparison table, and three original CFA-style practice questions.

## Concept Explanation & Institutional Framework

From first principles, calculating approximate convexity from finite price shifts, scaling convexity across periodicities, and computing dollar price changes with Money Convexity links theoretical valuation and risk mechanics to practical decisions in Fixed Income. Approximate Annual Convexity Formula (ApproxConv = (PV_− + PV_+ − 2 × PV_0) / [(ΔYield)^2 × PV_0]) establishes the primary relationship (Uses bond prices after downward (PV_−) and upward (PV_+) yield shifts of ΔYield to compute second-order curvature.), while Dollar Price Change via Money Duration & Money Convexity (ΔPV_Full ≈ (−MoneyDur × ΔYield) + [0.5 × MoneyConv × (ΔYield)^2] where MoneyConv = Convexity × PV_Full) governs Computes the exact dollar gain or loss on a fixed-income position for any yield change ΔYield.

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: Approximate Annual Convexity Formula

```formula
ApproxConv = (PV_− + PV_+ − 2 × PV_0) / [(ΔYield)^2 × PV_0]
```

**Institutional Context & Variable Breakdown:** Uses bond prices after downward (PV_−) and upward (PV_+) yield shifts of ΔYield to compute second-order curvature.

### Formula 2: Dollar Price Change via Money Duration & Money Convexity

```formula
ΔPV_Full ≈ (−MoneyDur × ΔYield) + [0.5 × MoneyConv × (ΔYield)^2] where MoneyConv = Convexity × PV_Full
```

**Institutional Context & Variable Breakdown:** Computes the exact dollar gain or loss on a fixed-income position for any yield change ΔYield.

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Step-by-Step Calculation of Approximate Convexity and Price Change

**Problem & Given Scenario:**
A 15-year bond trades at PV_0 = $100.00 at YTM = 5.0%. A 50 bps (−0.0050) drop in yield raises its price to PV_− = $105.38, and a 50 bps (+0.0050) rise in yield lowers its price to PV_+ = $95.05. Calculate (1) ApproxModDur, (2) ApproxConv, and (3) estimated price if YTM rises by 120 bps (+0.0120).

```formula
ApproxConv = (PV_− + PV_+ − 2 × PV_0) / [(ΔYield)^2 × PV_0]
```

**Step-by-Step Substitution & Calculation:**

Step 1: ApproxModDur = ($105.38 − $95.05) / (2 × 0.0050 × $100.00) = $10.33 / $1.00 = 10.33. Step 2: ApproxConv = ($105.38 + $95.05 − 2 × $100.00) / [(0.0050)^2 × $100.00] = $0.43 / (0.000025 × $100.00) = $0.43 / $0.0025 = 172.0. Step 3: For ΔYield = +0.0120: %ΔPrice ≈ (−10.33 × 0.0120) + [0.5 × 172.0 × (0.0120)^2] = −12.3960% + 1.2384% = −11.1576% ≈ −11.16%. Estimated New Price = $88.84.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Don't forget the 0.5 (1/2) Taylor series multiplier on the convexity term when computing percentage or dollar price changes!

### Worked Example 2: Converting Semiannual Periodic Convexity to Annualized Convexity

**Problem & Given Scenario:**
An analyst computes a bond's convexity in semiannual periods (m = 2) as Conv_semiannual = 520.0. Convert this to Annualized Convexity and compute the convexity % price boost for a 100 bps annual yield shift.

```formula
ΔPV_Full ≈ (−MoneyDur × ΔYield) + [0.5 × MoneyConv × (ΔYield)^2] where MoneyConv = Convexity × PV_Full
```

**Step-by-Step Substitution & Calculation:**

Because time t(t+1) is squared in the convexity numerator, Annualized Convexity = Conv_periodic / m^2 = 520.0 / (2^2) = 520.0 / 4 = 130.0. For ΔYield = 0.0100: Convexity % boost = 0.5 × 130.0 × (0.0100)^2 = +0.65%.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> While periodic Macaulay/Modified Duration divides by m = 2 to annualize, periodic Convexity divides by m^2 = 4 to annualize.

## Comparison & Reference Analysis

| Calculation Step | Formula Expression | Common Candidate Error | Verification Check |
|---|---|---|---|
| Numerator of ApproxConv | PV_− + PV_+ − (2 × PV_0) | Subtracting PV_+ instead of adding | Must be > 0 for option-free bond |
| Denominator of ApproxConv | (ΔYield)^2 × PV_0 | Using 2×ΔYield instead of (ΔYield)^2 | 50 bps = 0.005 -> squared = 0.000025 |
| Price Change % Formula | −ModDur(Δy) + 0.5×Conv×(Δy)^2 | Omitting the 0.5 multiplier | Convexity term is always + for Conv > 0 |
| Annualizing from m periods | Conv_annual = Conv_periodic / m^2 | Dividing by m instead of m^2 | Semiannual divides by 4; Quarterly by 16 |

## Real-World Financial Applications

In institutional Fixed Income practice, analysts apply Approximate Annual Convexity Formula and Dollar Price Change via Money Duration & Money Convexity to value securities, audit financial statements, and manage portfolio risk.

## CFA Examination Perspective & Testing Patterns

On the CFA Level I exam (LM 12: Yield-Based Bond Convexity and Portfolio Properties — Approximate convexity, money convexity, and second-order price change calculation), how to calculate bond convexity cfa is tested via standalone 90-second MCQs combining Approximate Annual Convexity Formula calculations with economic interpretation.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** A bond is priced at $100.00. If its yield falls by 100 bps (Δy = 0.01), its price rises to $108.60. If its yield rises by 100 bps, its price falls to $92.20. The bond's approximate annual convexity is closest to:

- **[A]** 40.0

- **[B]** 80.0

- **[C]** 160.0

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** ApproxConv = ($108.60 + $92.20 − 200.00) / [(0.01)^2 × $100.00] = $0.80 / (0.0001 × 100) = $0.80 / $0.01 = 80.0.

### Practice Question 2

**Question:** A fixed-rate bond has an annual Modified Duration of 6.50 and an annual Convexity of 90.0. If its yield to maturity decreases by 150 bps (Δy = −0.015), its estimated percentage price change is closest to:

- **[A]** +8.74%

- **[B]** +9.75%

- **[C]** +10.76%

> [!TIP]
> **Correct Answer: Option C.**
>
> **Explanation:** %ΔPrice ≈ (−6.50 × −0.015) + [0.5 × 90.0 × (−0.015)^2] = +9.7500% + [45.0 × 0.000225] = +9.7500% + 1.0125% = +10.7625% ≈ +10.76%.

### Practice Question 3

**Question:** A portfolio has a market value of $50,000,000, a Money Duration of $350,000,000, and a Money Convexity of $3,200,000,000. For a +100 bps (+0.01) parallel increase in yields, the estimated dollar change in portfolio value is closest to:

- **[A]** −$3,500,000

- **[B]** −$3,340,000

- **[C]** −$3,180,000

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** ΔPV ≈ (−$350,000,000 × 0.01) + [0.5 × $3,200,000,000 × (0.01)^2] = −$3,500,000 + $160,000 = −$3,340,000.

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in Approximate Annual Convexity Formula.**

- **Timing Errors: Mixing beginning and ending balances in Dollar Price Change via Money Duration & Money Convexity.**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Curriculum Scope: LM 12: Yield-Based Bond Convexity and Portfolio Properties — Approximate convexity, money convexity, and second-order price change calculation (Level I · Fixed Income).**

- **Takeaway 2: Primary Formula (Approximate Annual Convexity Formula): ApproxConv = (PV_− + PV_+ − 2 × PV_0) / [(ΔYield)^2 × PV_0].**

- **Takeaway 3: Secondary Formula (Dollar Price Change via Money Duration & Money Convexity): ΔPV_Full ≈ (−MoneyDur × ΔYield) + [0.5 × MoneyConv × (ΔYield)^2] where MoneyConv = Convexity × PV_Full.**

- **Takeaway 4: Key Insight 1: Don't forget the 0.5 (1/2) Taylor series multiplier on the convexity term when computing percentage or dollar price changes!**

- **Takeaway 5: Key Insight 2: While periodic Macaulay/Modified Duration divides by m = 2 to annualize, periodic Convexity divides by m^2 = 4 to annualize.**

## Frequently Asked Questions (FAQs)

### What is the primary formula for how to calculate bond convexity cfa in Level I Fixed Income?

The primary equations for How to Calculate Bond Convexity With Step-by-Step Examples govern Fixed Income calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is how to calculate bond convexity cfa tested on the CFA Level I exam?

On the CFA exam, How to Calculate Bond Convexity With Step-by-Step Examples is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

### How does Approximate Annual Convexity Formula connect to related topics in Fixed Income?

Within Fixed Income, Approximate Annual Convexity Formula links directly to Duration vs Convexity: CFA Questions and Answers and Zero Coupon within the standard CFA Fixed Income curriculum framework.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level I · Fixed Income).

### Related CFA Study Guides

- [Duration vs Convexity: CFA Questions and Answers](/blog/cfa/cfa-level-1-duration-vs-convexity-questions-answers/)

- [Zero Coupon Bonds: How to Calculate Price and Yield](/blog/cfa/cfa-level-1-zero-coupon-bonds-price-and-yield/)

- [How to Calculate Macaulay Duration and Modified Duration](/blog/cfa/cfa-level-1-calculate-macaulay-duration-modified-duration/)

