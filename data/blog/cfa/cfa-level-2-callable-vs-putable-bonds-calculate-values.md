---
title: "Callable vs Putable Bonds: How to Calculate Their Values"
seoTitle: "Callable vs Putable Bonds: How to Calculate Their Values — CFA Level II"
slug: cfa-level-2-callable-vs-putable-bonds-calculate-values
description: "Master callable vs putable bonds cfa level 2 for Level II (Fixed Income). Includes verified CFA formulas, 2 step-by-step solved numerical examples, compariso."
category: cfa
tags:
  - "CFA"
  - "Level II"
  - "Fixed Income"
  - "callable vs putable bonds cfa level 2"
  - "callable vs putable bonds cfa level 2 formula"
author: Aniket Thakur
datePublished: "2026-11-13"
dateModified: "2026-11-13"
coverImage: /assets/images/blog/cfa-level-2-callable-vs-putable-bonds-calculate-values/cover.svg
coverImageAlt: "Illustrative guide to Callable vs Putable Bonds: How to Calculate Their Values"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for Callable vs Putable Bonds: How to Calculate Their Values."
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
  question: "Callable vs Putable Bonds: How to Calculate Their Values: Key Summary & Verdict"
  answer: "Callable vs Putable Bonds: How to Calculate Their Values covers calculating Callable and Putable bond values on a binomial tree (capping at Call Price and flooring at Put Price), embedded option value, OAS vs Volatility sensitivity, and Convertible Bond."
  facts:
    - label: "CFA Level"
      value: "Level II"
    - label: "Curriculum Subject"
      value: "Fixed Income"
    - label: "Topic Focus"
      value: "callable vs putable bonds cfa level"
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
  - question: "What is the primary formula for callable vs putable bonds cfa level 2 in Level II Fixed Income?"
    answer: "The primary equations for Callable vs Putable Bonds: How to Calculate Their Values govern Fixed Income calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is callable vs putable bonds cfa level 2 tested on the CFA Level II exam?"
    answer: "On the CFA exam, Callable vs Putable Bonds: How to Calculate Their Values is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
---

## Introduction

Callable vs Putable Bonds: How to Calculate Their Values covers calculating Callable and Putable bond values on a binomial tree (capping at Call Price and flooring at Put Price), embedded option value, OAS vs Volatility sensitivity, and Convertible Bond valuation metrics in Level II Fixed Income (LM 3: Valuation and Analysis of Bonds with Embedded Options — V_Callable = V_Straight − V_Call, V_Putable = V_Straight + V_Put, Binomial tree node capping/flooring rules, Volatility impact on OAS vs Price, Convertible bond metrics (Conversion Value, Straight Value, Market Conversion Premium)), with verified formulas, two worked examples, and three practice MCQs.

## Concept Explanation & Institutional Framework

Callable & Putable Bond Decomposition & Node Rules (V_Callable = V_Straight − V_Issuer_Call (Node Value = min(Backward Induction Value, Call Price)) ; V_Putable = V_Straight + V_Investor_Put (Node Value = max(Backward Induction Value, Put Price))) and Convertible Bond Valuation Metrics (Conversion Value = Stock Price × Conversion Ratio ; V_Convertible = V_Straight + V_Call_on_Stock ; Market Conversion Price = Convertible Bond Price / Conversion Ratio) govern calculating Callable and Putable bond values on a binomial tree (capping at Call Price and flooring at Put Price), embedded option value, OAS vs Volatility sensitivity, and Convertible Bond valuation metrics.

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: Callable & Putable Bond Decomposition & Node Rules

```formula
V_Callable = V_Straight − V_Issuer_Call (Node Value = min(Backward Induction Value, Call Price))

V_Putable = V_Straight + V_Investor_Put (Node Value = max(Backward Induction Value, Put Price))
```

**Institutional Context & Variable Breakdown:**

- At every callable node on a binomial tree, replace any value above the Call Price with the Call Price.

- at every putable node, replace any value below the Put Price with the Put Price.

### Formula 2: Convertible Bond Valuation Metrics

```formula
Conversion Value = Stock Price × Conversion Ratio

V_Convertible = V_Straight + V_Call_on_Stock

Market Conversion Price = Convertible Bond Price / Conversion Ratio
```

**Institutional Context & Variable Breakdown:**

- A convertible bond's minimum value floor is max(Straight Bond Value, Conversion Value).

- the gap above that floor is the option time value.

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Valuing a 2-Year Callable Bond and Putable Bond on a Binomial Tree

**Problem & Given Scenario:**
Recall from Article 137 our 2-year, 5.0% annual coupon bond ($100 par) on the binomial tree (r_0 = 3.50%, r_{1,u} = 5.493%, r_{1,d} = 4.070%), where the Straight Bond had t = 1 nodal values of V_{1,u} = $99.5327 and V_{1,d} = $100.8936, and V_Straight(0) = $101.655. Now value: (A) a Callable Bond callable at t = 1 at $100.00 par; and (B) a Putable Bond putable at t = 1 at $100.00 par.

```formula
V_Callable = V_Straight − V_Issuer_Call (Node Value = min(Backward Induction Value, Call Price))

V_Putable = V_Straight + V_Investor_Put (Node Value = max(Backward Induction Value, Put Price))
```

**Step-by-Step Substitution & Calculation:**

Part A (Callable at $100 at t = 1): At the t = 1 down-rate node, V_{1,d} = $100.8936 > $100.00 Call Price, so the issuer calls the bond and caps V_{1,d_Callable} = $100.0000! (Up-node stays $99.5327). Discount to t = 0: V_Callable(0) = [0.5($99.5327 + $5) + 0.5($100.0000 + $5)] / 1.0350 = $104.7664 / 1.0350 = $101.2235 ≈ $101.22. Value of Embedded Call Option = V_Straight − V_Callable = $101.655 − $101.224 = $0.431. Part B (Putable at $100 at t = 1): At the t = 1 up-rate node, V_{1,u} = $99.5327 < $100.00 Put Price, so the investor exercises the put and floors V_{1,u_Putable} = $100.0000! (Down-node stays $100.8936). Discount to t = 0: V_Putable(0) = [0.5($100.0000 + $5) + 0.5($100.8936 + $5)] / 1.0350 = $105.4468 / 1.0350 = $101.881 ≈ $101.88. Value of Embedded Put Option = V_Putable − V_Straight = $101.881 − $101.655 = $0.226.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Capping the down-rate node at $100 reduces the Callable Bond value by $0.43, whereas flooring the up-rate node at $100 increases the Putable Bond value by $0.23!

### Worked Example 2: Analyzing a Convertible Bond: Conversion Value, Market Conversion Price, and Premium

**Problem & Given Scenario:**
A 5-year, 3.0% convertible bond ($1,000 par) is convertible into 25 common shares (Conversion Ratio = 25) and currently trades in the market at $1,150.00. The underlying stock trades at $42.00 per share, and an otherwise identical straight bond trades at $940.00.

```formula
Conversion Value = Stock Price × Conversion Ratio

V_Convertible = V_Straight + V_Call_on_Stock

Market Conversion Price = Convertible Bond Price / Conversion Ratio
```

**Step-by-Step Substitution & Calculation:**

- **Step 1. Conversion Value (Parity Value) = 25 shares × $42.00 = $1,050.00.**

- **Step 2. Minimum Value Floor = max(Straight Value $940, Conversion Value $1,050) = $1,050.00.**

- **Step 3. Market Conversion Price (effective price paid per share via the bond) = $1,150.00 / 25 = $46.00 per share.**

- **Step 4. Market Conversion Premium per Share = $46.00 − $42.00 = $4.00 (Market Conversion Premium Ratio = $4.00 / $42.00 = 9.52%).**

- **Step 5. Premium over Straight Value = ($1,150 / $940) − 1 = 22.34%.**

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Convertible bondholders pay a 9.52% conversion premium ($46 vs $42) in exchange for the $940 straight-bond downside floor and a 3.0% coupon yield advantage over common stock.

## Comparison & Reference Analysis

| Shock / Change in Market Input | Effect on Callable Bond Value | Effect on Putable Bond Value | Effect on Computed OAS (Given Fixed Market Price) |
|---|---|---|---|
| Interest Rate Volatility (σ) Rises | Decreases (Call option worth more to issuer) | Increases (Put option worth more to holder) | Callable OAS Decreases; Putable OAS Increases |
| Interest Rate Volatility (σ) Falls | Increases (Call option worth less) | Decreases (Put option worth less) | Callable OAS Increases; Putable OAS Decreases |
| Parallel Yield Curve Drop (−Δy) | Rises less than Straight (capped at Call) | Rises same as Straight (Put goes OTM) | Unchanged if model is well-calibrated |
| Parallel Yield Curve Hike (+Δy) | Falls same as Straight (Call goes OTM) | Falls less than Straight (floored at Put) | Unchanged |

## Real-World Financial Applications

Analysts apply Callable & Putable Bond Decomposition & Node Rules and Convertible Bond Valuation Metrics across Fixed Income valuation and risk management.

## CFA Examination Perspective & Testing Patterns

Tested on the CFA Level II exam (LM 3: Valuation and Analysis of Bonds with Embedded Options — V_Callable = V_Straight − V_Call, V_Putable = V_Straight + V_Put, Binomial tree node capping/flooring rules, Volatility impact on OAS vs Price, Convertible bond metrics (Conversion Value, Straight Value, Market Conversion Premium)) via quantitative and conceptual MCQs.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** An option-free straight bond has an arbitrage-free value of $102.40. An otherwise identical callable bond trades at $99.80, and an otherwise identical putable bond trades at $104.10. The values of the embedded call option and embedded put option, respectively, are:

- **[A]** Call value = $2.60; Put value = $1.70

- **[B]** Call value = $1.70; Put value = $2.60

- **[C]** Call value = $4.30; Put value = $2.60

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** V_Call = V_Straight − V_Callable = $102.40 − $99.80 = $2.60. V_Put = V_Putable − V_Straight = $104.10 − $102.40 = $1.70.

### Practice Question 2

**Question:** If an analyst increases the assumed interest rate volatility (σ) in a binomial interest rate tree while holding the observed market price of a callable bond constant, what happens to the model-computed Option-Adjusted Spread (OAS) of the callable bond?

- **[A]** The computed OAS increases

- **[B]** The computed OAS decreases, because higher volatility increases the value of the embedded call option, requiring a smaller OAS spread to discount the tree down to the fixed market price

- **[C]** The computed OAS is unaffected by volatility assumptions

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** Higher assumed volatility makes the issuer's short call option more costly (lowering model bond value at any given spread); to match the observed market price, the required discount spread (OAS) must decrease.

### Practice Question 3

**Question:** A $1,000 par convertible bond has a conversion ratio of 20 shares and currently trades at $1,080. If the underlying common stock trades at $50.00 per share, the bond's Market Conversion Price and Market Conversion Premium per Share are:

- **[A]** Market Conversion Price = $54.00; Market Conversion Premium per Share = $4.00

- **[B]** Market Conversion Price = $50.00; Market Conversion Premium per Share = $80.00

- **[C]** Market Conversion Price = $46.30; Market Conversion Premium per Share = $3.70

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** Market Conversion Price = Convertible Bond Price / Conversion Ratio = $1,080 / 20 = $54.00. Market Conversion Premium per Share = $54.00 − $50.00 = $4.00 (or 8.0%).

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in Callable & Putable Bond Decomposition & Node Rules.**

- **Timing Errors: Mixing beginning and ending balances in Convertible Bond Valuation Metrics.**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Callable & Putable Bond Decomposition & Node Rules: V_Callable = V_Straight − V_Issuer_Call (Node Value = min(Backward Induction Value, Call Price)) ; V_Putable = V_Straight + V_Investor_Put (Node Value = max(Backward Induction Value, Put Price)).**

- **Takeaway 2: Convertible Bond Valuation Metrics: Conversion Value = Stock Price × Conversion Ratio ; V_Convertible = V_Straight + V_Call_on_Stock ; Market Conversion Price = Convertible Bond Price / Conversion Ratio.**

- **Takeaway 3: Capping the down-rate node at $100 reduces the Callable Bond value by $0.43, whereas floor.**

- **Takeaway 4: Convertible bondholders pay a 9.52% conversion premium ($46 vs $42) in exchange for the $9.**

## Frequently Asked Questions (FAQs)

### What is the primary formula for callable vs putable bonds cfa level 2 in Level II Fixed Income?

The primary equations for Callable vs Putable Bonds: How to Calculate Their Values govern Fixed Income calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is callable vs putable bonds cfa level 2 tested on the CFA Level II exam?

On the CFA exam, Callable vs Putable Bonds: How to Calculate Their Values is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level II · Fixed Income).

### Related CFA Study Guides

- [Mortgage-Backed Securities vs Asset-Backed Securities Explained](/blog/cfa/cfa-level-2-mortgage-backed-securities-vs-asset-backed-securities/)

- [How to Calculate Credit Spreads and Analyse Bond Credit Risk](/blog/cfa/cfa-level-2-calculate-credit-spreads-analyse-bond-credit-risk/)

- [Key Rate Duration vs Modified Duration: Differences and Examples](/blog/cfa/cfa-level-2-key-rate-duration-vs-modified-duration/)

