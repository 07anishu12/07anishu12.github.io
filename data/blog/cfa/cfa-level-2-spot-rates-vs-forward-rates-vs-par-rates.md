---
title: "Spot Rates vs Forward Rates vs Par Rates: Numerical Examples"
seoTitle: "Spot Rates vs Forward Rates vs Par Rates: Numerical Examples — CFA Level II"
slug: cfa-level-2-spot-rates-vs-forward-rates-vs-par-rates
description: "Master Spot Rates vs Forward Rates vs Par Rates: Numerical Examples for CFA Level II (Fixed Income). Includes verified curriculum formulas, worked numerical examples, and exam review notes."
category: cfa
tags:
  - "CFA"
  - "Level II"
  - "Fixed Income"
  - "spot rates vs forward rates vs par rates"
  - "spot rates vs forward rates vs par rates formula"
author: Aniket Thakur
datePublished: "2026-11-13"
dateModified: "2026-11-13"
coverImage: /assets/images/blog/cfa-level-2-spot-rates-vs-forward-rates-vs-par-rates/cover.svg
coverImageAlt: "Illustrative guide to Spot Rates vs Forward Rates vs Par Rates: Numerical Examples"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for Spot Rates vs Forward Rates vs Par Rates: Numerical Examples."
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
  question: "Spot Rates vs Forward Rates vs Par Rates: Numerical Examples: Key Summary & Verdict"
  answer: "Spot Rates vs Forward Rates vs Par Rates: Numerical Examples is a core Level II Fixed Income topic (LM 1: The Term Structure and Interest Rate Dynamics — Bootstrapping spot rates from par rates, deriving forward rates from spot rates, and discounting bonds."
  facts:
    - label: "CFA Level"
      value: "Level II"
    - label: "Curriculum Subject"
      value: "Fixed Income"
    - label: "Topic Focus"
      value: "spot rates vs forward rates vs par"
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
  - question: "What is the primary formula for spot rates vs forward rates vs par rates in Level II Fixed Income?"
    answer: "The primary equations for Spot Rates vs Forward Rates vs Par Rates: Numerical Examples govern Fixed Income calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is spot rates vs forward rates vs par rates tested on the CFA Level II exam?"
    answer: "On the CFA exam, Spot Rates vs Forward Rates vs Par Rates: Numerical Examples is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
  - question: "How does Bootstrapping Spot Rate z_T from the Par Curve connect to related topics in Fixed Income?"
    answer: "Within Fixed Income, Bootstrapping Spot Rate z_T from the Par Curve links directly to CFA Level 2 Fixed Income: Important Formulas and Pract within the standard CFA Fixed Income curriculum framework."
---

## Introduction

Spot Rates vs Forward Rates vs Par Rates: Numerical Examples is a core Level II Fixed Income topic (LM 1: The Term Structure and Interest Rate Dynamics — Bootstrapping spot rates from par rates, deriving forward rates from spot rates, and discounting bonds using forward rates) focusing on bootstrapping zero-coupon spot rates (z_T) from par yields (c_T), extracting implied forward rates f(A, B−A), and valuing bonds directly using chains of one-period forward rates. This guide covers the governing equations (Bootstrapping Spot Rate z_T from the Par Curve and Bond Valuation Using One-Period Forward Rates), two verified numerical examples, a comparison table, and three original CFA-style practice questions.

## Concept Explanation & Institutional Framework

From first principles, bootstrapping zero-coupon spot rates (z_T) from par yields (c_T), extracting implied forward rates f(A, B−A), and valuing bonds directly using chains of one-period forward rates links theoretical valuation and risk mechanics to practical decisions in Fixed Income. Bootstrapping Spot Rate z_T from the Par Curve (100 = [Par_T / (1 + z_1)^1] + [Par_T / (1 + z_2)^2] + ... + [(100 + Par_T) / (1 + z_T)^T]) establishes the primary relationship (Solves sequentially for z_1 (where z_1 = Par_1), then z_2, then z_3 from observable coupon-bearing par bond yields.), while Bond Valuation Using One-Period Forward Rates (V_0 = CF_1 / (1 + z_1) + CF_2 / [(1 + z_1)(1 + f_{1,1})] + CF_3 / [(1 + z_1)(1 + f_{1,1})(1 + f_{2,1})]) governs Discounting a bond's cash flows using spot rates z_t or compounded chains of one-period forward rates produces the exact same arbitrage-free price.

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: Bootstrapping Spot Rate z_T from the Par Curve

```formula
100 = [Par_T / (1 + z_1)^1] + [Par_T / (1 + z_2)^2] + ... + [(100 + Par_T) / (1 + z_T)^T]
```

**Institutional Context & Variable Breakdown:** Solves sequentially for z_1 (where z_1 = Par_1), then z_2, then z_3 from observable coupon-bearing par bond yields.

### Formula 2: Bond Valuation Using One-Period Forward Rates

```formula
V_0 = CF_1 / (1 + z_1) + CF_2 / [(1 + z_1)(1 + f_{1,1})] + CF_3 / [(1 + z_1)(1 + f_{1,1})(1 + f_{2,1})]
```

**Institutional Context & Variable Breakdown:** Discounting a bond's cash flows using spot rates z_t or compounded chains of one-period forward rates produces the exact same arbitrage-free price.

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Bootstrapping the 3-Year Spot Rate (z_3) from Par Rates

**Problem & Given Scenario:**
Given the annual Par Curve: 1-year Par Rate = 4.00% (so z_1 = 4.00%), 2-year Par Rate = 5.00% (so z_2 = 5.025%), and 3-year Par Rate = 6.00%. Bootstrap the exact 3-year zero-coupon Spot Rate z_3.

```formula
100 = [Par_T / (1 + z_1)^1] + [Par_T / (1 + z_2)^2] + ... + [(100 + Par_T) / (1 + z_T)^T]
```

**Step-by-Step Substitution & Calculation:**

Step 1: Set up the 3-year Par Bond ($100 price, $6.00 annual coupon): 100 = 6.00 / (1.04)^1 + 6.00 / (1.05025)^2 + 106.00 / (1 + z_3)^3. Step 2: Compute PV of Year 1 and Year 2 coupons: PV_1 = 6.00 / 1.04 = $5.76923; PV_2 = 6.00 / 1.103025 = $5.43959; Sum = $11.20882. Step 3: Solve for (1 + z_3)^3: 106.00 / (1 + z_3)^3 = 100.00 − 11.20882 = 88.79118 => (1 + z_3)^3 = 106.00 / 88.79118 = 1.193812 => 1 + z_3 = (1.193812)^(1/3) = 1.06083 => z_3 = 6.083% ≈ 6.08%.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Notice that because the par curve is upward-sloping (4% -> 5% -> 6%), the bootstrapped 3-year spot rate (6.08%) is strictly greater than the 3-year par rate (6.00%).

### Worked Example 2: Valuing a 3-Year Bond Using One-Period Implied Forward Rates

**Problem & Given Scenario:**
Given one-period forward rates: z_1 = 4.00%, f(1,1) = 6.06%, and f(2,1) = 8.23%, value a 3-year, 5.00% annual coupon bond ($100 par).

```formula
V_0 = CF_1 / (1 + z_1) + CF_2 / [(1 + z_1)(1 + f_{1,1})] + CF_3 / [(1 + z_1)(1 + f_{1,1})(1 + f_{2,1})]
```

**Step-by-Step Substitution & Calculation:**

Year 1 discount factor = 1.04 => PV(CF_1) = 5.00 / 1.04 = $4.8077. Year 2 discount factor = 1.04 × 1.0606 = 1.103024 => PV(CF_2) = 5.00 / 1.103024 = $4.5330. Year 3 discount factor = 1.103024 × 1.0823 = 1.193803 => PV(CF_3) = 105.00 / 1.193803 = $87.9542. Total Arbitrage-Free Bond Price = $4.8077 + $4.5330 + $87.9542 = $97.29.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Compounding sequential 1-year forward rates [(1+z_1)(1+f_{1,1})(1+f_{2,1})] equals (1 + z_3)^3 = 1.1938, proving equivalence of spot and forward valuation.

## Comparison & Reference Analysis

| Rate Type | Definition | How It Is Obtained | Discounting Application |
|---|---|---|---|
| Par Rate (c_T) | Coupon rate making T-yr bond price = $100 | Observed from on-the-run benchmark bonds | Constructing par swap & Treasury curves |
| Spot Rate (z_T) | YTM on a T-year zero-coupon bond | Bootstrapped from Par Curve or STRIPS | Discounts single cash flow CF_T at time T |
| Forward Rate f(A, B−A) | Implied rate from time A to time B | Derived from Spot Rates z_A and z_B | Break-even future rate / FRA pricing |
| Yield to Maturity (YTM) | Internal rate of return of all bond flows | Single uniform IRR across all CF_t | Approximate average of spot rates |

## Real-World Financial Applications

In institutional Fixed Income practice, analysts apply Bootstrapping Spot Rate z_T from the Par Curve and Bond Valuation Using One-Period Forward Rates to value securities, audit financial statements, and manage portfolio risk.

## CFA Examination Perspective & Testing Patterns

On the CFA Level II exam (LM 1: The Term Structure and Interest Rate Dynamics — Bootstrapping spot rates from par rates, deriving forward rates from spot rates, and discounting bonds using forward rates), spot rates vs forward rates vs par rates is tested via 4-question vignette item sets combining Bootstrapping Spot Rate z_T from the Par Curve calculations with economic interpretation.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** Given a 1-year par rate of 3.00% and a 2-year par rate of 4.00% (annual coupon basis), the bootstrapped 2-year zero-coupon spot rate (z_2) is closest to:

- **[A]** 3.98%

- **[B]** 4.00%

- **[C]** 4.02%

> [!TIP]
> **Correct Answer: Option C.**
>
> **Explanation:** For the 2-year 4.0% par bond: 100 = 4 / 1.03 + 104 / (1 + z_2)^2 => 100 − 3.8835 = 96.1165 = 104 / (1 + z_2)^2 => (1 + z_2)^2 = 104 / 96.1165 = 1.08202 => z_2 = √1.08202 − 1 = 4.020% ≈ 4.02%.

### Practice Question 2

**Question:** An analyst is given the following 1-year rates: current 1-year spot rate z_1 = 3.0%, 1-year forward rate one year from now f(1,1) = 4.0%, and 1-year forward rate two years from now f(2,1) = 5.0%. The price of a 3-year zero-coupon bond ($100 par) is closest to:

- **[A]** $88.90

- **[B]** $89.66

- **[C]** $91.51

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** PV = $100 / [(1 + z_1)(1 + f_{1,1})(1 + f_{2,1})] = $100 / [(1.03)(1.04)(1.05)] = $100 / 1.12476 = $88.9078 ≈ $88.91.

### Practice Question 3

**Question:** When the spot rate curve is flat at 4.50% across all maturities from Year 1 to Year 30, how do the Par Curve and the Implied Forward Curve compare to the Spot Curve?

- **[A]** The Forward Curve is above 4.50% and the Par Curve is below 4.50%

- **[B]** The Par Curve, Spot Curve, and Implied Forward Curve are all completely flat and identical at 4.50%

- **[C]** The Par Curve is above 4.50%

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** When spot rates are constant across all maturities (flat curve), every par rate and every implied forward rate equals that exact same constant rate (4.50%).

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in Bootstrapping Spot Rate z_T from the Par Curve.**

- **Timing Errors: Mixing beginning and ending balances in Bond Valuation Using One-Period Forward Rates.**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Curriculum Scope: LM 1: The Term Structure and Interest Rate Dynamics — Bootstrapping spot rates from par rates, deriving forward rates from spot rates, and discounting bonds using forward rates (Level II · Fixed Income).**

- **Takeaway 2: Primary Formula (Bootstrapping Spot Rate z_T from the Par Curve): 100 = [Par_T / (1 + z_1)^1] + [Par_T / (1 + z_2)^2] + ... + [(100 + Par_T) / (1 + z_T)^T].**

- **Takeaway 3: Secondary Formula (Bond Valuation Using One-Period Forward Rates): V_0 = CF_1 / (1 + z_1) + CF_2 / [(1 + z_1)(1 + f_{1,1})] + CF_3 / [(1 + z_1)(1 + f_{1,1})(1 + f_{2,1})].**

- **Takeaway 4: Key Insight 1: Notice that because the par curve is upward-sloping (4% -> 5% -> 6%), the bootstrapped 3-year spot rate (6.08%) is strictly greater than.**

- **Takeaway 5: Key Insight 2: Compounding sequential 1-year forward rates [(1+z_1)(1+f_{1,1})(1+f_{2,1})] equals (1 + z_3)^3 = 1.1938, proving equivalence of spot and.**

## Frequently Asked Questions (FAQs)

### What is the primary formula for spot rates vs forward rates vs par rates in Level II Fixed Income?

The primary equations for Spot Rates vs Forward Rates vs Par Rates: Numerical Examples govern Fixed Income calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is spot rates vs forward rates vs par rates tested on the CFA Level II exam?

On the CFA exam, Spot Rates vs Forward Rates vs Par Rates: Numerical Examples is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

### How does Bootstrapping Spot Rate z_T from the Par Curve connect to related topics in Fixed Income?

Within Fixed Income, Bootstrapping Spot Rate z_T from the Par Curve links directly to CFA Level 2 Fixed Income: Important Formulas and Pract within the standard CFA Fixed Income curriculum framework.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level II · Fixed Income).

### Related CFA Study Guides

- [CFA Level 2 Fixed Income: Important Formulas and Practice Questions](/blog/cfa/cfa-level-2-fixed-income-important-formulas-practice-questions/)

- [How to Calculate Forward Interest Rates From Spot Rates](/blog/cfa/cfa-level-2-calculate-forward-interest-rates-from-spot-rates/)

- [How to Value Bonds Using Binomial Interest Rate Trees](/blog/cfa/cfa-level-2-value-bonds-binomial-interest-rate-trees/)

