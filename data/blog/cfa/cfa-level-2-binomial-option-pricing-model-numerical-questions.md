---
title: "Binomial Option Pricing Model: Numerical Questions With Solutions"
seoTitle: "Binomial Option Pricing Model: Numerical Questions With Solutions — CFA Level II"
slug: cfa-level-2-binomial-option-pricing-model-numerical-questions
description: "Master Binomial Option Pricing Model: Numerical Questions With Solutions for CFA Level II (Derivatives). Includes verified curriculum formulas, worked numerical examples, and exam review notes."
category: cfa
tags:
  - "CFA"
  - "Level II"
  - "Derivatives"
  - "binomial option pricing model cfa level 2"
  - "binomial option pricing model cfa level 2 formula"
author: Aniket Thakur
datePublished: "2026-11-13"
dateModified: "2026-11-13"
coverImage: /assets/images/blog/cfa-level-2-binomial-option-pricing-model-numerical-questions/cover.svg
coverImageAlt: "Illustrative guide to Binomial Option Pricing Model: Numerical Questions With Solutions"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for Binomial Option Pricing Model: Numerical Questions With Solutions."
draft: false
featured: false
sources:
  - title: "CFA Institute 2026–2027 Program Curriculum: Derivatives"
    url: https://www.cfainstitute.org/en/programs/cfa/curriculum
  - title: "CFA Institute Candidate Study Resources & Topic Outlines"
    url: https://www.cfainstitute.org/en/programs/cfa/candidate
showSources: true
enquiry: false
quickAnswer:
  question: "Binomial Option Pricing Model: Numerical Questions With Solutions: Key Summary & Verdict"
  answer: "Binomial Option Pricing Model: Numerical Questions With Solutions covers two-period binomial option valuation, checking for optimal early exercise of an American Put at t = 1 nodes, dynamic Delta hedge rebalancing across periods, and interest rate."
  facts:
    - label: "CFA Level"
      value: "Level II"
    - label: "Curriculum Subject"
      value: "Derivatives"
    - label: "Topic Focus"
      value: "binomial option pricing model cfa l"
    - label: "Syllabus Standard"
      value: "2026–2027 Curriculum"
  goodFor:
    - "Candidates preparing for CFA Level II (Derivatives) exam questions."
    - "Financial analysts requiring verified formulas and worked calculations."
  watchFor:
    - "Verify compounding periodicity, sign conventions, and calculator mode (BGN vs END)."
    - "Review boundary conditions and common exam distractor traps."
  note: "2026–2027 CFA Program Curriculum Series · Aniket Thakur"
faqItems:
  - question: "What is the primary formula for binomial option pricing model cfa level 2 in Level II Derivatives?"
    answer: "The primary equations for Binomial Option Pricing Model: Numerical Questions With Solutions govern Derivatives calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is binomial option pricing model cfa level 2 tested on the CFA Level II exam?"
    answer: "On the CFA exam, Binomial Option Pricing Model: Numerical Questions With Solutions is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
---

## Introduction

Binomial Option Pricing Model: Numerical Questions With Solutions covers two-period binomial option valuation, checking for optimal early exercise of an American Put at t = 1 nodes, dynamic Delta hedge rebalancing across periods, and interest rate caplets/floorlets in Level II Derivatives (LM 2: Valuation of Contingent Claims — Two-period binomial option pricing (European vs American early exercise check), Dynamic Delta hedge replication (h shares + B bond), Binomial Interest Rate Option valuation), with verified formulas, two worked examples, and three practice MCQs.

## Concept Explanation & Institutional Framework

Two-Period Binomial European Option Formula (V_0 = [π^2 × V_{2,uu} + 2π(1−π) × V_{2,ud} + (1−π)^2 × V_{2,dd}] / (1 + R_F)^2 where π = (1 + R_F − d) / (u − d)) and American Put Early Exercise Check at t = 1 Nodes (V_{1,node}(American Put) = max[ Exercise Value (X − S_{1,node}), Hold Value ([π V_{2,up} + (1−π) V_{2,down}] / (1 + R_F)) ]) govern two-period binomial option valuation, checking for optimal early exercise of an American Put at t = 1 nodes, dynamic Delta hedge rebalancing across periods, and interest rate caplets/floorlets.

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: Two-Period Binomial European Option Formula

```formula
V_0 = [π^2 × V_{2,uu} + 2π(1−π) × V_{2,ud} + (1−π)^2 × V_{2,dd}] / (1 + R_F)^2 where π = (1 + R_F − d) / (u − d)
```

**Institutional Context & Variable Breakdown:** Applies backward induction across two time steps (Warning: only use the 1-step shortcut formula for EUROPEAN options—for AMERICAN options, you MUST check early exercise at t = 1 nodes!).

### Formula 2: American Put Early Exercise Check at t = 1 Nodes

```formula
V_{1,node}(American Put) = max[ Exercise Value (X − S_{1,node}), Hold Value ([π V_{2,up} + (1−π) V_{2,down}] / (1 + R_F)) ]
```

**Institutional Context & Variable Breakdown:** If intrinsic exercise value (X − S_1) exceeds the discounted continuation (hold) value at node t = 1, replace the node value with (X − S_1) before discounting to t = 0.

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Two-Period Binomial Valuation: European Put vs. American Put (Early Exercise at t = 1)

**Problem & Given Scenario:**
A non-dividend stock trades at S_0 = $50.00. Each period (1 year), it moves up by u = 1.20 or down by d = 0.80, and the annual risk-free rate is R_F = 5.00%. Value both a 2-year European Put and a 2-year American Put with strike price X = $52.00.

```formula
V_0 = [π^2 × V_{2,uu} + 2π(1−π) × V_{2,ud} + (1−π)^2 × V_{2,dd}] / (1 + R_F)^2 where π = (1 + R_F − d) / (u − d)
```

**Step-by-Step Substitution & Calculation:**

Step 1 (Stock Tree): S_0 = $50; at t = 1: S_u = $60, S_d = $40; at t = 2: S_uu = $72, S_ud = $48, S_dd = $32. Step 2 (Risk-Neutral Prob π): π = (1.05 − 0.80) / (1.20 − 0.80) = 0.25 / 0.40 = 0.625, so (1 − π) = 0.375. Step 3 (Terminal Put Payoffs at t = 2 for X = $52): p_uu = max(0, 52 − 72) = $0.00; p_ud = max(0, 52 − 48) = $4.00; p_dd = max(0, 52 − 32) = $20.00. Step 4 (Backward Induction at t = 1 Nodes): • Up Node (S_u = $60): Hold Value p_u = [0.625($0) + 0.375($4.00)] / 1.05 = $1.50 / 1.05 = $1.4286 (Exercise Value = $0). • Down Node (S_d = $40): Hold Value p_d = [0.625($4.00) + 0.375($20.00)] / 1.05 = ($2.50 + $7.50) / 1.05 = $10.00 / 1.05 = $9.5238. Check Early Exercise at S_d = $40: Immediate Exercise Value = $52.00 − $40.00 = $12.0000! Since $12.0000 > $9.5238, an American Put IS exercised early at node S_d (P_d = $12.00)! Step 5 (Discount to t = 0): • European Put p_0 = [0.625($1.4286) + 0.375($9.5238)] / 1.05 = ($0.8929 + $3.5714) / 1.05 = $4.4643 / 1.05 = $4.25. • American Put P_0 = [0.625($1.4286) + 0.375($12.0000)] / 1.05 = ($0.8929 + $4.5000) / 1.05 = $5.3929 / 1.05 = $5.14.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Early exercise at the t = 1 down-node ($12.00 > $9.52) boosts the American Put value to $5.14 vs $4.25 for the European Put (+$0.89 early exercise premium)!

### Worked Example 2: Calculating Dynamic Hedge Ratio (Delta) Across Binomial Nodes

**Problem & Given Scenario:**
Using the European Call on the same tree (X = $52: c_uu = $20, c_ud = $0, c_dd = $0; at t = 1: c_u = [0.625($20)]/1.05 = $11.9048, c_d = $0), calculate the Call Hedge Ratio h (Delta) at t = 0, at t = 1 Up Node, and at t = 1 Down Node.

```formula
V_{1,node}(American Put) = max[ Exercise Value (X − S_{1,node}), Hold Value ([π V_{2,up} + (1−π) V_{2,down}] / (1 + R_F)) ]
```

**Step-by-Step Substitution & Calculation:**

At t = 0: h_0 = (c_u − c_d) / (S_u − S_d) = ($11.9048 − $0) / ($60 − $40) = 11.9048 / 20 = 0.5952 shares per call. At t = 1 Up Node (S_u = $60): h_{1,u} = (c_uu − c_ud) / (S_uu − S_ud) = ($20 − $0) / ($72 − $48) = 20 / 24 = 0.8333 shares. At t = 1 Down Node (S_d = $40): h_{1,d} = ($0 − $0) / ($48 − $32) = 0.0000 shares.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> As the stock rises in Period 1 (to $60), Call Delta increases from 0.5952 to 0.8333, requiring the market maker to buy additional shares to maintain a delta-neutral hedge.

## Comparison & Reference Analysis

| Binomial Node / Metric | European Put (X = $52) | American Put (X = $52) | Analytical Rule |
|---|---|---|---|
| t = 2 Payoffs (uu, ud, dd) | $0.00, $4.00, $20.00 | $0.00, $4.00, $20.00 | Identical at final expiration |
| t = 1 Up Node (S_u = $60) | $1.43 (Hold) | $1.43 (Hold > $0 Exercise) | Out-of-the-money -> Hold |
| t = 1 Down Node (S_d = $40) | $9.52 (Must Hold) | $12.00 (Exercise $12 > $9.52 Hold!) | Deep ITM -> Exercise American Put early |
| t = 0 Option Value | $4.25 | $5.14 (+$0.89 early exercise value) | P_0 − p_0 = 0.375×($12 − $9.52)/1.05 |

## Real-World Financial Applications

Analysts apply Two-Period Binomial European Option Formula and American Put Early Exercise Check at t = 1 Nodes across Derivatives valuation and risk management.

## CFA Examination Perspective & Testing Patterns

Tested on the CFA Level II exam (LM 2: Valuation of Contingent Claims — Two-period binomial option pricing (European vs American early exercise check), Dynamic Delta hedge replication (h shares + B bond), Binomial Interest Rate Option valuation) via quantitative and conceptual MCQs.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** At the t = 1 down-node of a two-period binomial tree, the underlying stock price is $36.00 and the strike price of a put option is $45.00. The discounted expected continuation (hold) value of the put option at that node is $7.60. What node value should be used at t = 1 when valuing a European Put vs. an American Put?

- **[A]** European Put = $7.60; American Put = $9.00

- **[B]** European Put = $9.00; American Put = $9.00

- **[C]** European Put = $7.60; American Put = $7.60

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** The European put cannot be exercised at t = 1, so its node value is the $7.60 hold value. The American put can be exercised immediately for $45.00 − $36.00 = $9.00 > $7.60, so its node value is $9.00.

### Practice Question 2

**Question:** In a two-period binomial model where the risk-neutral probability of an up-move is π = 0.60, what is the risk-neutral probability of reaching the middle node (S_ud, one up-move and one down-move in either order) at t = 2?

- **[A]** 0.24

- **[B]** 0.36

- **[C]** 0.48

> [!TIP]
> **Correct Answer: Option C.**
>
> **Explanation:** There are two paths to the middle node (Up-then-Down and Down-then-Up), each with probability π(1 − π) = 0.60 × 0.40 = 0.24. Summing both paths gives 2 × 0.24 = 0.48.

### Practice Question 3

**Question:** When valuing an interest rate option (such as an interest rate call/caplet) on a calibrated binomial interest rate tree, what risk-neutral probability π is used at each node?

- **[A]** π = (1 + R_F − d) / (u − d)

- **[B]** π = 0.50 (50% up, 50% down), because the interest rate tree's nodal rates have already been calibrated to match observed benchmark bond prices under 50/50 probabilities

- **[C]** π = 1.00

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** Unlike equity binomial trees (where u and d are fixed and π is solved), a calibrated Fixed-Income / Interest Rate binomial tree fixes π = 0.50 and calibrates the nodal interest rates to fit the spot curve.

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in Two-Period Binomial European Option Formula.**

- **Timing Errors: Mixing beginning and ending balances in American Put Early Exercise Check at t = 1 Nodes.**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Two-Period Binomial European Option Formula: V_0 = [π^2 × V_{2,uu} + 2π(1−π) × V_{2,ud} + (1−π)^2 × V_{2,dd}] / (1 + R_F)^2 where π = (1 + R_F − d) / (u − d).**

- **Takeaway 2: American Put Early Exercise Check at t = 1 Nodes: V_{1,node}(American Put) = max[ Exercise Value (X − S_{1,node}), Hold Value ([π V_{2,up} + (1−π) V_{2,down}] / (1 + R_F)) ].**

- **Takeaway 3: Early exercise at the t = 1 down-node ($12.00 > $9.52) boosts the American Put value to $5.**

- **Takeaway 4: As the stock rises in Period 1 (to $60), Call Delta increases from 0.5952 to 0.8333, requi.**

## Frequently Asked Questions (FAQs)

### What is the primary formula for binomial option pricing model cfa level 2 in Level II Derivatives?

The primary equations for Binomial Option Pricing Model: Numerical Questions With Solutions govern Derivatives calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is binomial option pricing model cfa level 2 tested on the CFA Level II exam?

On the CFA exam, Binomial Option Pricing Model: Numerical Questions With Solutions is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level II · Derivatives).

### Related CFA Study Guides

- [Futures Pricing: How to Calculate Cost of Carry](/blog/cfa/cfa-level-2-futures-pricing-calculate-cost-of-carry/)

- [Black-Scholes Model: How to Calculate Option Prices](/blog/cfa/cfa-level-2-black-scholes-model-calculate-option-prices/)

- [How to Calculate the Value of a Forward Contract](/blog/cfa/cfa-level-2-calculate-value-of-forward-contract/)

