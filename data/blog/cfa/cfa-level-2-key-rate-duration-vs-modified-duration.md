---
title: "Key Rate Duration vs Modified Duration: Differences and Examples"
seoTitle: "Key Rate Duration vs Modified Duration: Differences and Examples — CFA Level II"
slug: cfa-level-2-key-rate-duration-vs-modified-duration
description: "Master key rate duration vs modified duration cfa for Level II (Fixed Income). Includes verified CFA formulas, 2 step-by-step solved numerical examples, comp."
category: cfa
tags:
  - "CFA"
  - "Level II"
  - "Fixed Income"
  - "key rate duration vs modified duration cfa"
  - "key rate duration vs modified duration cfa formula"
author: Aniket Thakur
datePublished: "2026-11-13"
dateModified: "2026-11-13"
coverImage: /assets/images/blog/cfa-level-2-key-rate-duration-vs-modified-duration/cover.svg
coverImageAlt: "Illustrative guide to Key Rate Duration vs Modified Duration: Differences and Examples"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for Key Rate Duration vs Modified Duration: Differences and Examples."
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
  question: "Key Rate Duration vs Modified Duration: Differences and Examples: Key Summary & Verdict"
  answer: "Key Rate Duration vs Modified Duration: Differences and Examples covers comparing Key Rate Durations (KRDs for non-parallel yield curve steepening/flattening shifts) against Effective/Modified Duration (parallel shifts), plus one-sided up/down durations for."
  facts:
    - label: "CFA Level"
      value: "Level II"
    - label: "Curriculum Subject"
      value: "Fixed Income"
    - label: "Topic Focus"
      value: "key rate duration vs modified durat"
    - label: "Syllabus Standard"
      value: "2026–2027 Curriculum"
  goodFor:
    - "Candidates preparing for CFA Level II (Fixed Income) exam questions."
    - "Financial analysts requiring verified formulas and worked calculations."
  watchFor:
    - "Verify compounding periodicity, sign conventions, and calculator mode (BGN vs END)."
    - "Review boundary conditions and common exam distractor traps."
  note: "2026–2027 CFA Program Curriculum Series · Aniket Thakur"
faqItems:
  - question: "What is the primary formula for key rate duration vs modified duration cfa in Level II Fixed Income?"
    answer: "The primary equations for Key Rate Duration vs Modified Duration: Differences and Examples govern Fixed Income calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is key rate duration vs modified duration cfa tested on the CFA Level II exam?"
    answer: "On the CFA exam, Key Rate Duration vs Modified Duration: Differences and Examples is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
---

## Introduction

Key Rate Duration vs Modified Duration: Differences and Examples covers comparing Key Rate Durations (KRDs for non-parallel yield curve steepening/flattening shifts) against Effective/Modified Duration (parallel shifts), plus one-sided up/down durations for embedded options in Level II Fixed Income (LM 1 & LM 3: Key Rate Duration (Partial Duration), Shaping Risk (Steepening, Flattening, Curvature), Effective Duration of Callable vs Putable vs Straight Bonds, One-Sided Up and Down Durations), with verified formulas, two worked examples, and three practice MCQs.

## Concept Explanation & Institutional Framework

Key Rate Duration (KRD) Additivity & Non-Parallel Price Change (∑ Key Rate Dur_k = Effective Duration ; %ΔPortfolio Value ≈ − ∑ (KRD_k × Δz_k)) and Coupon vs. Zero-Coupon Key Rate Duration Profile (Zero-Coupon Bond of Maturity T: KRD_T = Effective Duration (All other KRD_k = 0) ; Coupon Bond of Maturity T: Positive KRD at t < T (or small negative KRD for par yield shifts)) govern comparing Key Rate Durations (KRDs for non-parallel yield curve steepening/flattening shifts) against Effective/Modified Duration (parallel shifts), plus one-sided up/down durations for embedded options.

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: Key Rate Duration (KRD) Additivity & Non-Parallel Price Change

```formula
∑ Key Rate Dur_k = Effective Duration

%ΔPortfolio Value ≈ − ∑ (KRD_k × Δz_k)
```

**Institutional Context & Variable Breakdown:**

- Each Key Rate Duration KRD_k measures sensitivity to a 100 bps shift at maturity key rate k alone.

- the sum of all KRDs equals the bond's total Effective Duration.

### Formula 2: Coupon vs. Zero-Coupon Key Rate Duration Profile

```formula
Zero-Coupon Bond of Maturity T: KRD_T = Effective Duration (All other KRD_k = 0)

Coupon Bond of Maturity T: Positive KRD at t < T (or small negative KRD for par yield shifts)
```

**Institutional Context & Variable Breakdown:** A zero-coupon bond has 100% of its key rate duration concentrated at its single maturity date T, whereas a barbell portfolio has high KRDs at short and long ends and zero KRD in the middle.

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Calculating Portfolio Price Impact of a Yield Curve Steepening Twist Using Key Rate Durations

**Problem & Given Scenario:**
Compare two duration-matched portfolios (both have Total Effective Duration = 6.00): Bullet Portfolio (100% in 7-year zero, so KRD_2 = 0.0, KRD_7 = 6.0, KRD_20 = 0.0) vs. Barbell Portfolio (KRD_2 = 1.2, KRD_7 = 0.0, KRD_20 = 4.8). Suppose the yield curve undergoes a non-parallel steepening twist: the 2-year spot rate falls by −50 bps (Δz_2 = −0.0050), the 7-year spot rate is unchanged (Δz_7 = 0.0000), and the 20-year spot rate rises by +50 bps (Δz_20 = +0.0050).

```formula
∑ Key Rate Dur_k = Effective Duration

%ΔPortfolio Value ≈ − ∑ (KRD_k × Δz_k)
```

**Step-by-Step Substitution & Calculation:**

- **Step 1. Bullet Portfolio %ΔPrice = −(0.0 × −0.50%) − (6.0 × 0.00%) − (0.0 × +0.50%) = 0.00% (completely unaffected!).**

- **Step 2. Barbell Portfolio %ΔPrice = −(1.2 × −0.50%) − (0.0 × 0.00%) − (4.8 × +0.50%) = +0.60% − 2.40% = −1.80% loss!**

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Even though both portfolios have the exact same Effective Duration of 6.00, Effective Duration fails under non-parallel twists: the Barbell loses −1.80% in a steepening twist because 4.8 of its 6.0 duration sits at the 20-year maturity!

### Worked Example 2: Comparing One-Sided Up-Duration vs. Down-Duration for Callable and Putable Bonds

**Problem & Given Scenario:**
Evaluate how Effective Duration and One-Sided Durations behave for a Straight Bond (EffDur = 6.5), a Callable Bond, and a Putable Bond when the bonds are near the money.

```formula
Zero-Coupon Bond of Maturity T: KRD_T = Effective Duration (All other KRD_k = 0)

Coupon Bond of Maturity T: Positive KRD at t < T (or small negative KRD for par yield shifts)
```

**Step-by-Step Substitution & Calculation:**

• Option-Free Bond: Up-Duration ≈ Down-Duration ≈ 6.50. • Callable Bond: When rates fall (Down-Duration), the call option moves in-the-money and caps price appreciation -> Down-Duration (e.g., 3.1) < Up-Duration (e.g., 5.8) < Straight Duration (6.5). • Putable Bond: When rates rise (Up-Duration), the put option moves in-the-money and floors the price drop -> Up-Duration (e.g., 3.2) < Down-Duration (e.g., 5.9) < Straight Duration (6.5).

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Because embedded options respond asymmetrically to rate hikes vs. rate cuts, one-sided durations are far more informative than two-sided Effective Duration when bonds are near their strike price.

## Comparison & Reference Analysis

| Bond / Portfolio Type | Effective Duration vs. Straight Bond | One-Sided Duration Asymmetry | Best Performer When... |
|---|---|---|---|
| Option-Free Straight Bond | Baseline (EffDur ≈ ModDur) | Down-Dur ≥ Up-Dur (slight convexity) | Yields fall sharply |
| Callable Bond | EffDur ≤ Straight (shrinks when r falls) | Down-Dur < Up-Dur (Call caps upside) | Rates stay stable / low volatility |
| Putable Bond | EffDur ≤ Straight (shrinks when r rises) | Up-Dur < Down-Dur (Put floors downside) | Yields rise sharply / high volatility |
| Barbell vs. Bullet (Same EffDur) | Identical Total Effective Duration | Barbell KRD at 2y & 30y; Bullet KRD at 10y | Barbell wins in Curve Flattening |

## Real-World Financial Applications

Analysts apply Key Rate Duration (KRD) Additivity & Non-Parallel Price Change and Coupon vs. Zero-Coupon Key Rate Duration Profile across Fixed Income valuation and risk management.

## CFA Examination Perspective & Testing Patterns

Tested on the CFA Level II exam (LM 1 & LM 3: Key Rate Duration (Partial Duration), Shaping Risk (Steepening, Flattening, Curvature), Effective Duration of Callable vs Putable vs Straight Bonds, One-Sided Up and Down Durations) via quantitative and conceptual MCQs.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** A fixed-income portfolio has Key Rate Durations of KRD_2yr = 0.80, KRD_5yr = 2.20, and KRD_10yr = 4.00 (and 0.00 at all other maturities). What is the portfolio's total Effective Duration, and what is its estimated percentage price change if the 2-year spot rate rises by 50 bps, the 5-year spot rate is unchanged, and the 10-year spot rate falls by 25 bps?

- **[A]** Effective Duration = 7.00; Estimated price change = +0.60%

- **[B]** Effective Duration = 7.00; Estimated price change = −1.40%

- **[C]** Effective Duration = 2.33; Estimated price change = +0.60%

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** Total Effective Duration = sum of KRDs = 0.80 + 2.20 + 4.00 = 7.00. %ΔPrice ≈ −(0.80 × +0.50%) − (2.20 × 0%) − (4.00 × −0.25%) = −0.40% + 1.00% = +0.60%.

### Practice Question 2

**Question:** For a callable corporate bond currently trading near its call price, how does its one-sided 'Down-Duration' (when interest rates fall) compare to its one-sided 'Up-Duration' (when interest rates rise)?

- **[A]** Down-Duration is greater than Up-Duration

- **[B]** Down-Duration is strictly less than Up-Duration, because falling interest rates push the embedded call option into the money and compress price appreciation near the call price

- **[C]** Down-Duration and Up-Duration are equal

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** When rates fall, the issuer's call option caps the callable bond's price near the call price, making the bond less sensitive to rate cuts (lower Down-Duration) than to rate hikes (higher Up-Duration).

### Practice Question 3

**Question:** How do the Effective Duration of a Callable Bond and the Effective Duration of a Putable Bond compare to the Effective Duration of an otherwise identical Option-Free Straight Bond?

- **[A]** Callable Duration is lower, while Putable Duration is higher than Straight Duration

- **[B]** BOTH Callable Effective Duration and Putable Effective Duration are less than or equal to the Effective Duration of the otherwise identical Option-Free Straight Bond

- **[C]** Both are higher than Straight Duration

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** Both embedded options truncate one side of the bond's price movement (a call caps upside when yields fall; a put floors downside when yields rise), so BOTH callable and putable bonds have Effective Duration ≤ Straight Bond Duration.

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in Key Rate Duration (KRD) Additivity & Non-Parallel Price Change.**

- **Timing Errors: Mixing beginning and ending balances in Coupon vs. Zero-Coupon Key Rate Duration Profile.**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Key Rate Duration (KRD) Additivity & Non-Parallel Price Change: ∑ Key Rate Dur_k = Effective Duration ; %ΔPortfolio Value ≈ − ∑ (KRD_k × Δz_k).**

- **Takeaway 2: Coupon vs. Zero-Coupon Key Rate Duration Profile: Zero-Coupon Bond of Maturity T: KRD_T = Effective Duration (All other KRD_k = 0) ; Coupon Bond of Maturity T: Positive KRD at t < T (or small negative KRD for par yield shifts).**

- **Takeaway 3: Even though both portfolios have the exact same Effective Duration of 6.00, Effective Dura.**

- **Takeaway 4: Because embedded options respond asymmetrically to rate hikes vs. rate cuts, one-sided.**

## Frequently Asked Questions (FAQs)

### What is the primary formula for key rate duration vs modified duration cfa in Level II Fixed Income?

The primary equations for Key Rate Duration vs Modified Duration: Differences and Examples govern Fixed Income calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is key rate duration vs modified duration cfa tested on the CFA Level II exam?

On the CFA exam, Key Rate Duration vs Modified Duration: Differences and Examples is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level II · Fixed Income).

### Related CFA Study Guides

- [How to Value Bonds Using Binomial Interest Rate Trees](/blog/cfa/cfa-level-2-value-bonds-binomial-interest-rate-trees/)

- [How to Calculate Credit Spreads and Analyse Bond Credit Risk](/blog/cfa/cfa-level-2-calculate-credit-spreads-analyse-bond-credit-risk/)

- [How to Calculate Forward Interest Rates From Spot Rates](/blog/cfa/cfa-level-2-calculate-forward-interest-rates-from-spot-rates/)

