---
title: "What Is the Yield Curve? Normal, Inverted and Flat Yield Curves"
seoTitle: "What Is the Yield Curve? Normal, Inverted and Flat Yield Curves — CFA Level I"
slug: cfa-level-1-what-is-yield-curve-normal-inverted-flat
description: "Master what is the yield curve cfa for Level I (Fixed Income). Includes verified CFA formulas, 2 step-by-step solved numerical examples, comparison table, an."
category: cfa
tags:
  - "CFA"
  - "Level I"
  - "Fixed Income"
  - "what is the yield curve cfa"
  - "what is the yield curve cfa formula"
author: Aniket Thakur
datePublished: "2026-11-09"
dateModified: "2026-11-09"
coverImage: /assets/images/blog/cfa-level-1-what-is-yield-curve-normal-inverted-flat/cover.svg
coverImageAlt: "Illustrative guide to What Is the Yield Curve? Normal, Inverted and Flat Yield Curves"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for What Is the Yield Curve? Normal, Inverted and Flat Yield Curves."
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
  question: "What Is the Yield Curve? Normal, Inverted and Flat Yield Curves: Key Summary & Verdict"
  answer: "What Is the Yield Curve? Normal, Inverted and Flat Yield Curves is a core Level I Fixed Income topic (LM 6 & LM 7: The Term Structure of Interest Rates — Spot, par, and forward yield curves, upward/inverted/flat curves, G-spread, I-spread, Z-spread, OAS)."
  facts:
    - label: "CFA Level"
      value: "Level I"
    - label: "Curriculum Subject"
      value: "Fixed Income"
    - label: "Topic Focus"
      value: "what is the yield curve cfa"
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
  - question: "What is the primary formula for what is the yield curve cfa in Level I Fixed Income?"
    answer: "The primary equations for What Is the Yield Curve? Normal, Inverted and Flat Yield Curves govern Fixed Income calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is what is the yield curve cfa tested on the CFA Level I exam?"
    answer: "On the CFA exam, What Is the Yield Curve? Normal, Inverted and Flat Yield Curves is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
  - question: "How does Spot Rate to Implied Forward Rate Bootstrapping connect to related topics in Fixed Income?"
    answer: "Within Fixed Income, Spot Rate to Implied Forward Rate Bootstrapping links directly to Bond Credit Ratings Explained: Investment Grade vs Ju within the standard CFA Fixed Income curriculum framework."
---

## Introduction

What Is the Yield Curve? Normal, Inverted and Flat Yield Curves is a core Level I Fixed Income topic (LM 6 & LM 7: The Term Structure of Interest Rates — Spot, par, and forward yield curves, upward/inverted/flat curves, G-spread, I-spread, Z-spread, OAS) focusing on spot vs par vs forward curves across upward-sloping, inverted, and flat term structures, plus yield spread metrics (G-spread, I-spread, Z-spread, OAS). This guide covers the governing equations (Spot Rate to Implied Forward Rate Bootstrapping and Z-Spread vs. Option-Adjusted Spread (OAS)), two verified numerical examples, a comparison table, and three original CFA-style practice questions.

## Concept Explanation & Institutional Framework

From first principles, spot vs par vs forward curves across upward-sloping, inverted, and flat term structures, plus yield spread metrics (G-spread, I-spread, Z-spread, OAS) links theoretical valuation and risk mechanics to practical decisions in Fixed Income. Spot Rate to Implied Forward Rate Bootstrapping ((1 + z_B)^B = (1 + z_A)^A × (1 + f_{A, B−A})^(B−A)) establishes the primary relationship (Links the B-period spot rate z_B and A-period spot rate z_A to the implied forward rate starting at time A for (B − A) periods.), while Z-Spread vs. Option-Adjusted Spread (OAS) (P_Full = ∑ [CF_t / (1 + z_t + Z_Spread)^t] ; OAS = Z_Spread − Option Value Spread (for Callable Bond)) governs Z-spread is the constant spread added to every spot rate z_t; OAS strips out the embedded call/put option cost.

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: Spot Rate to Implied Forward Rate Bootstrapping

```formula
(1 + z_B)^B = (1 + z_A)^A × (1 + f_{A, B−A})^(B−A)
```

**Institutional Context & Variable Breakdown:** Links the B-period spot rate z_B and A-period spot rate z_A to the implied forward rate starting at time A for (B − A) periods.

### Formula 2: Z-Spread vs. Option-Adjusted Spread (OAS)

```formula
P_Full = ∑ [CF_t / (1 + z_t + Z_Spread)^t]

OAS = Z_Spread − Option Value Spread (for Callable Bond)
```

**Institutional Context & Variable Breakdown:**

- Z-spread is the constant spread added to every spot rate z_t.

- OAS strips out the embedded call/put option cost.

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Ordering of Par, Spot, and Forward Curves & Bootstrapping 1y1y Forward Rate

**Problem & Given Scenario:**
Given annual spot rates: z_1 = 3.00%, z_2 = 4.00%, z_3 = 5.00% (upward-sloping spot curve). Compute (1) the 2-year Par Rate, (2) the 1y1y Forward Rate (f_{1,1}), and (3) verify the curve ordering.

```formula
(1 + z_B)^B = (1 + z_A)^A × (1 + f_{A, B−A})^(B−A)
```

**Step-by-Step Substitution & Calculation:**

Step 1 (2-Year Par Rate c_2): Solve 100 = c_2 / 1.03 + (100 + c_2) / 1.04^2 => 1 − c_2 / 1.03 = (1 + c_2/100) / 1.0816 => c_2 = [1 − (1 / 1.04^2)] / [(1/1.03) + (1/1.04^2)] = 0.075444 / 1.895437 = 3.9803% ≈ 3.98%. Step 2 (1y1y Forward Rate): f_{1,1} = [(1.04)^2 / 1.03] − 1 = 1.0816 / 1.03 − 1 = 5.0097% ≈ 5.01%. Step 3: At Year 2, Par Rate (3.98%) < Spot Rate (4.00%) < Forward Rate (5.01%).

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Whenever the yield curve is upward-sloping, the Forward Curve lies above the Spot Curve, which lies above the Par Curve (Forward > Spot > Par). When inverted, the exact reverse holds (Par > Spot > Forward).

### Worked Example 2: Comparing G-Spread, Z-Spread, and Option-Adjusted Spread (OAS) on a Callable Bond

**Problem & Given Scenario:**
A 5-year callable corporate bond yields 6.45%. The 5-year on-the-run government bond yields 4.20%. The bond's Z-spread over the spot curve is 232 bps, and the embedded call option has a spread cost of 45 bps.

```formula
P_Full = ∑ [CF_t / (1 + z_t + Z_Spread)^t]

OAS = Z_Spread − Option Value Spread (for Callable Bond)
```

**Step-by-Step Substitution & Calculation:**

G-Spread = Corporate YTM − Benchmark Govt YTM = 6.45% − 4.20% = 2.25% (225 bps). Z-Spread = 232 bps. Option-Adjusted Spread (OAS) = Z-Spread − Call Option Cost = 232 bps − 45 bps = 187 bps.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> For a callable bond, OAS < Z-Spread because investors must be compensated for the 45 bps call option given to the issuer; for a putable bond, OAS > Z-Spread.

## Comparison & Reference Analysis

| Yield Curve Shape | Economic Signal | Curve Ordering (Par, Spot, Forward) | Classic Term Structure Theory |
|---|---|---|---|
| Normal (Upward-Sloping) | Expansion / Rising rate expectations + MRP | Par < Spot < Forward | Liquidity Preference Theory (LPT) |
| Inverted (Downward-Sloping) | Recession signal / Central bank cuts expected | Par > Spot > Forward | Pure Expectations (falling short rates) |
| Flat Yield Curve | Monetary transition / Policy peak | Par = Spot = Forward | Constant expected future short rates |
| Humped (Segmented) | Supply/demand imbalance at mid-belly | Crosses at peak maturity | Market Segmentation / Preferred Habitat |

## Real-World Financial Applications

In institutional Fixed Income practice, analysts apply Spot Rate to Implied Forward Rate Bootstrapping and Z-Spread vs. Option-Adjusted Spread (OAS) to value securities, audit financial statements, and manage portfolio risk.

## CFA Examination Perspective & Testing Patterns

On the CFA Level I exam (LM 6 & LM 7: The Term Structure of Interest Rates — Spot, par, and forward yield curves, upward/inverted/flat curves, G-spread, I-spread, Z-spread, OAS), what is the yield curve cfa is tested via standalone 90-second MCQs combining Spot Rate to Implied Forward Rate Bootstrapping calculations with economic interpretation.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** When the zero-coupon spot yield curve is downward-sloping (inverted) across all maturities, which ordering of the Par curve, Spot curve, and implied Forward curve is correct?

- **[A]** Forward curve > Spot curve > Par curve

- **[B]** Par curve > Spot curve > Forward curve

- **[C]** Spot curve > Par curve > Forward curve

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** In an inverted yield curve, early high-rate coupons raise the par yield above the terminal maturity spot rate, while marginal forward rates must lie below the spot average: Par > Spot > Forward.

### Practice Question 2

**Question:** Given a 1-year spot rate of z_1 = 5.0% and a 2-year spot rate of z_2 = 4.0%, the 1-year implied forward rate starting one year from today (f_{1,1}) is closest to:

- **[A]** 3.01%

- **[B]** 3.50%

- **[C]** 4.50%

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** (1 + z_2)^2 = (1 + z_1) × (1 + f_{1,1}) => f_{1,1} = (1.04^2 / 1.05) − 1 = (1.0816 / 1.05) − 1 = 1.030095 − 1 = 3.01%.

### Practice Question 3

**Question:** For a putable corporate bond, how does its Option-Adjusted Spread (OAS) compare to its zero-volatility spread (Z-spread)?

- **[A]** OAS is less than the Z-spread

- **[B]** OAS equals the Z-spread

- **[C]** OAS is greater than the Z-spread because the investor owns the valuable put option

> [!TIP]
> **Correct Answer: Option C.**
>
> **Explanation:** For a putable bond, Z-Spread = OAS − Put Option Spread (because the investor accepts a lower yield spread in exchange for the put protection), meaning OAS = Z-Spread + Put Option Spread > Z-Spread.

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in Spot Rate to Implied Forward Rate Bootstrapping.**

- **Timing Errors: Mixing beginning and ending balances in Z-Spread vs. Option-Adjusted Spread (OAS).**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Curriculum Scope: LM 6 & LM 7: The Term Structure of Interest Rates — Spot, par, and forward yield curves, upward/inverted/flat curves, G-spread, I-spread, Z-spread, OAS (Level I · Fixed Income).**

- **Takeaway 2: Primary Formula (Spot Rate to Implied Forward Rate Bootstrapping): (1 + z_B)^B = (1 + z_A)^A × (1 + f_{A, B−A})^(B−A).**

- **Takeaway 3: Secondary Formula (Z-Spread vs. Option-Adjusted Spread (OAS)): P_Full = ∑ [CF_t / (1 + z_t + Z_Spread)^t] ; OAS = Z_Spread − Option Value Spread (for Callable Bond).**

- **Takeaway 4: Key Insight 1: Whenever the yield curve is upward-sloping, the Forward Curve lies above the Spot Curve, which lies above the Par Curve (Forward > Spot >.**

- **Takeaway 5: Key Insight 2: For a callable bond, OAS < Z-Spread because investors must be compensated for the 45 bps call option given to the issuer; for a putable bond.**

## Frequently Asked Questions (FAQs)

### What is the primary formula for what is the yield curve cfa in Level I Fixed Income?

The primary equations for What Is the Yield Curve? Normal, Inverted and Flat Yield Curves govern Fixed Income calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is what is the yield curve cfa tested on the CFA Level I exam?

On the CFA exam, What Is the Yield Curve? Normal, Inverted and Flat Yield Curves is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

### How does Spot Rate to Implied Forward Rate Bootstrapping connect to related topics in Fixed Income?

Within Fixed Income, Spot Rate to Implied Forward Rate Bootstrapping links directly to Bond Credit Ratings Explained: Investment Grade vs Ju within the standard CFA Fixed Income curriculum framework.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level I · Fixed Income).

### Related CFA Study Guides

- [Bond Credit Ratings Explained: Investment Grade vs Junk Bonds](/blog/cfa/cfa-level-1-bond-credit-ratings-investment-grade-vs-junk/)

- [CFA Fixed Income Practice Questions: Bond Pricing and Yield Calculations](/blog/cfa/cfa-level-1-fixed-income-practice-questions/)

- [Zero Coupon Bonds: How to Calculate Price and Yield](/blog/cfa/cfa-level-1-zero-coupon-bonds-price-and-yield/)

