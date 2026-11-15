---
title: "Duration vs Convexity: CFA Questions and Answers"
seoTitle: "Duration vs Convexity: CFA Questions and Answers — CFA Level I"
slug: cfa-level-1-duration-vs-convexity-questions-answers
description: "Master duration vs convexity cfa for Level I (Fixed Income). Includes verified CFA formulas, 2 step-by-step solved numerical examples, comparison table, and ."
category: cfa
tags:
  - "CFA"
  - "Level I"
  - "Fixed Income"
  - "duration vs convexity cfa"
  - "duration vs convexity cfa formula"
author: Aniket Thakur
datePublished: "2026-11-09"
dateModified: "2026-11-09"
coverImage: /assets/images/blog/cfa-level-1-duration-vs-convexity-questions-answers/cover.svg
coverImageAlt: "Illustrative guide to Duration vs Convexity: CFA Questions and Answers"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for Duration vs Convexity: CFA Questions and Answers."
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
  question: "Duration vs Convexity: CFA Questions and Answers: Key Summary & Verdict"
  answer: "Duration vs Convexity: CFA Questions and Answers is a core Level I Fixed Income topic (LM 11 & LM 12: Yield-Based Bond Duration and Convexity — Linear tangent approximation vs second-order curvature, negative convexity in callable bonds) focusing on comparing."
  facts:
    - label: "CFA Level"
      value: "Level I"
    - label: "Curriculum Subject"
      value: "Fixed Income"
    - label: "Topic Focus"
      value: "duration vs convexity cfa"
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
  - question: "What is the primary formula for duration vs convexity cfa in Level I Fixed Income?"
    answer: "The primary equations for Duration vs Convexity: CFA Questions and Answers govern Fixed Income calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is duration vs convexity cfa tested on the CFA Level I exam?"
    answer: "On the CFA exam, Duration vs Convexity: CFA Questions and Answers is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
  - question: "How does Taylor Series Bond Price Expansion connect to related topics in Fixed Income?"
    answer: "Within Fixed Income, Taylor Series Bond Price Expansion links directly to How to Calculate Macaulay Duration and Modified Duration and How t within the standard CFA Fixed Income curriculum framework."
---

## Introduction

Duration vs Convexity: CFA Questions and Answers is a core Level I Fixed Income topic (LM 11 & LM 12: Yield-Based Bond Duration and Convexity — Linear tangent approximation vs second-order curvature, negative convexity in callable bonds) focusing on comparing first-order linear duration tangent vs second-order convexity curvature, cash flow dispersion effects, and negative convexity in callable bonds. This guide covers the governing equations (Taylor Series Bond Price Expansion and Effective Convexity for Bonds with Embedded Options), two verified numerical examples, a comparison table, and three original CFA-style practice questions.

## Concept Explanation & Institutional Framework

From first principles, comparing first-order linear duration tangent vs second-order convexity curvature, cash flow dispersion effects, and negative convexity in callable bonds links theoretical valuation and risk mechanics to practical decisions in Fixed Income. Taylor Series Bond Price Expansion (%ΔPV_Full ≈ [−ModDur × ΔYield] + [0.5 × Convexity × (ΔYield)^2]) establishes the primary relationship (First-order duration captures the tangent line slope; second-order convexity corrects for the upward bend of the price-yield curve.), while Effective Convexity for Bonds with Embedded Options (EffConv = (PV_− + PV_+ − 2 × PV_0) / [(ΔCurve)^2 × PV_0]) governs Measures curvature when benchmark rates shift; becomes negative for callable bonds near or below the call strike yield.

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: Taylor Series Bond Price Expansion

```formula
%ΔPV_Full ≈ [−ModDur × ΔYield] + [0.5 × Convexity × (ΔYield)^2]
```

**Institutional Context & Variable Breakdown:**

- First-order duration captures the tangent line slope.

- second-order convexity corrects for the upward bend of the price-yield curve.

### Formula 2: Effective Convexity for Bonds with Embedded Options

```formula
EffConv = (PV_− + PV_+ − 2 × PV_0) / [(ΔCurve)^2 × PV_0]
```

**Institutional Context & Variable Breakdown:**

- Measures curvature when benchmark rates shift.

- becomes negative for callable bonds near or below the call strike yield.

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Comparing Duration-Only vs. Duration-Plus-Convexity Price Estimates

**Problem & Given Scenario:**
A 30-year Treasury bond has ModDur = 16.50 and Convexity = 380.0. If yields fall by 200 bps (Δy = −0.0200), compare the Duration-only estimate against the Duration + Convexity estimate.

```formula
%ΔPV_Full ≈ [−ModDur × ΔYield] + [0.5 × Convexity × (ΔYield)^2]
```

**Step-by-Step Substitution & Calculation:**

Duration-only estimate = −16.50 × (−0.0200) = +33.00%. Convexity adjustment = 0.5 × 380.0 × (−0.0200)^2 = 190 × 0.0004 = +7.60%. Duration + Convexity estimate = +33.00% + 7.60% = +40.60%.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> For a large 200 bps yield shift on a long-dated bond, ignoring convexity understates the true price gain by 760 basis points (+33.00% vs +40.60%).

### Worked Example 2: Demonstrating Negative Effective Convexity in a Callable Bond

**Problem & Given Scenario:**
A callable bond (callable at $100) trades at PV_0 = $99.50. If benchmark yields fall by 50 bps (ΔCurve = 0.0050), the call cap limits its price rise to PV_− = $100.20. If benchmark yields rise by 50 bps, its price falls to PV_+ = $97.80. Compute Effective Duration and Effective Convexity.

```formula
EffConv = (PV_− + PV_+ − 2 × PV_0) / [(ΔCurve)^2 × PV_0]
```

**Step-by-Step Substitution & Calculation:**

EffDur = ($100.20 − $97.80) / (2 × 0.0050 × $99.50) = $2.40 / $0.995 = 2.412. EffConv = ($100.20 + $97.80 − 2 × $99.50) / [(0.0050)^2 × $99.50] = ($198.00 − $199.00) / (0.000025 × $99.50) = −$1.00 / $0.0024875 = −402.01.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Because the call price caps upside appreciation (+$0.70 gain vs −$1.70 drop), PV_− + PV_+ < 2×PV_0, yielding strongly negative Effective Convexity (−402.0).

## Comparison & Reference Analysis

| Risk Dimension | Duration (ModDur / EffDur) | Convexity (ApproxConv / EffConv) | Portfolio Strategy Impact |
|---|---|---|---|
| Calculus Order | First derivative (slope / tangent) | Second derivative (curvature) | Duration dominates for small Δy (<10 bps) |
| Direction of Adjustment | Opposite sign to ΔYield | Always positive for option-free bonds | Positive convexity adds value in volatile rates |
| Cash Flow Dispersion | Matched across Bullet & Barbell | Higher for Barbell than Bullet | Barbell outperforms Bullet in large Δy |
| Callable Bond Behavior | EffDur shrinks as yields fall | Turns Negative when yields fall | Issuer call option caps bond price upside |

## Real-World Financial Applications

In institutional Fixed Income practice, analysts apply Taylor Series Bond Price Expansion and Effective Convexity for Bonds with Embedded Options to value securities, audit financial statements, and manage portfolio risk.

## CFA Examination Perspective & Testing Patterns

On the CFA Level I exam (LM 11 & LM 12: Yield-Based Bond Duration and Convexity — Linear tangent approximation vs second-order curvature, negative convexity in callable bonds), duration vs convexity cfa is tested via standalone 90-second MCQs combining Taylor Series Bond Price Expansion calculations with economic interpretation.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** Because the linear duration tangent line lies strictly below the true convex price-yield curve of an option-free bond, a duration-only price estimate will:

- **[A]** Underestimate the new bond price regardless of whether yields increase or decrease

- **[B]** Overestimate the new bond price when yields increase and underestimate it when yields decrease

- **[C]** Be exact for large parallel yield curve shifts

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** Since the true price-yield curve bends above the tangent line on both sides of PV_0, the linear duration estimate always understates the ending bond price (overstating price drops when yields rise and understating price gains when yields fall).

### Practice Question 2

**Question:** Portfolio A (a Bullet portfolio holding 10-year bonds) and Portfolio B (a Barbell portfolio holding 2-year and 25-year bonds) have the exact same Modified Duration of 8.5 years and the same initial YTM. Which portfolio has higher convexity?

- **[A]** Portfolio A (Bullet)

- **[B]** Portfolio B (Barbell) because its cash flows have greater dispersion around the 8.5-year duration

- **[C]** Both have identical convexity

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** Convexity increases with the time dispersion of cash flows around the Macaulay duration. A barbell portfolio has higher dispersion and therefore higher positive convexity than a duration-matched bullet.

### Practice Question 3

**Question:** Which of the following fixed-income securities exhibits negative effective convexity when market interest rates decline substantially?

- **[A]** An option-free zero-coupon Treasury strip

- **[B]** A putable corporate bond

- **[C]** A callable corporate bond or agency mortgage-backed security (MBS)

> [!TIP]
> **Correct Answer: Option C.**
>
> **Explanation:** Callable bonds and MBS (due to homeowner prepayment options) experience price compression near the call price when rates fall, generating negative convexity.

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in Taylor Series Bond Price Expansion.**

- **Timing Errors: Mixing beginning and ending balances in Effective Convexity for Bonds with Embedded Options.**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Curriculum Scope: LM 11 & LM 12: Yield-Based Bond Duration and Convexity — Linear tangent approximation vs second-order curvature, negative convexity in callable bonds (Level I · Fixed Income).**

- **Takeaway 2: Primary Formula (Taylor Series Bond Price Expansion): %ΔPV_Full ≈ [−ModDur × ΔYield] + [0.5 × Convexity × (ΔYield)^2].**

- **Takeaway 3: Secondary Formula (Effective Convexity for Bonds with Embedded Options): EffConv = (PV_− + PV_+ − 2 × PV_0) / [(ΔCurve)^2 × PV_0].**

- **Takeaway 4: Key Insight 1: For a large 200 bps yield shift on a long-dated bond, ignoring convexity understates the true price gain by 760 basis points (+33.00% vs +40.**

- **Takeaway 5: Key Insight 2: Because the call price caps upside appreciation (+$0.70 gain vs −$1.70 drop), PV_− + PV_+ < 2×PV_0, yielding strongly negative Effective.**

## Frequently Asked Questions (FAQs)

### What is the primary formula for duration vs convexity cfa in Level I Fixed Income?

The primary equations for Duration vs Convexity: CFA Questions and Answers govern Fixed Income calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is duration vs convexity cfa tested on the CFA Level I exam?

On the CFA exam, Duration vs Convexity: CFA Questions and Answers is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

### How does Taylor Series Bond Price Expansion connect to related topics in Fixed Income?

Within Fixed Income, Taylor Series Bond Price Expansion links directly to How to Calculate Macaulay Duration and Modified Duration and How t within the standard CFA Fixed Income curriculum framework.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level I · Fixed Income).

### Related CFA Study Guides

- [How to Calculate Macaulay Duration and Modified Duration](/blog/cfa/cfa-level-1-calculate-macaulay-duration-modified-duration/)

- [How to Calculate Bond Convexity With Step-by-Step Examples](/blog/cfa/cfa-level-1-how-to-calculate-bond-convexity/)

- [Premium Bond vs Discount Bond vs Par Bond: Numerical Examples](/blog/cfa/cfa-level-1-premium-bond-vs-discount-bond-vs-par-bond/)

