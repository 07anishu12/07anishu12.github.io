---
title: "Derivatives Practice Questions for CFA Level 1 With Solutions"
seoTitle: "Derivatives Practice Questions for CFA Level 1 With Solutions — CFA Level I"
slug: cfa-level-1-derivatives-practice-questions-with-solutions
description: "Master Derivatives Practice Questions for CFA Level 1 With Solutions for CFA Level I (Derivatives). Includes verified curriculum formulas, worked numerical examples, and exam review notes."
category: cfa
tags:
  - "CFA"
  - "Level I"
  - "Derivatives"
  - "cfa level 1 derivatives practice questions"
  - "cfa level 1 derivatives practice questions formula"
author: Aniket Thakur
datePublished: "2026-11-11"
dateModified: "2026-11-11"
coverImage: /assets/images/blog/cfa-level-1-derivatives-practice-questions-with-solutions/cover.svg
coverImageAlt: "Illustrative guide to Derivatives Practice Questions for CFA Level 1 With Solutions"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for Derivatives Practice Questions for CFA Level 1 With Solutions."
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
  question: "Derivatives Practice Questions for CFA Level 1 With Solutions: Key Summary & Verdict"
  answer: "Derivatives Practice Questions for CFA Level 1 With Solutions is a core Level I Derivatives topic (LM 1–10: Comprehensive Derivatives Synthesis — One-period binomial option pricing, risk-neutral probability, put-call-forward parity, and swap/forward."
  facts:
    - label: "CFA Level"
      value: "Level I"
    - label: "Curriculum Subject"
      value: "Derivatives"
    - label: "Topic Focus"
      value: "cfa level 1 derivatives practice qu"
    - label: "Syllabus Standard"
      value: "2026–2027 Curriculum"
  goodFor:
    - "Candidates preparing for CFA Level I (Derivatives) exam questions."
    - "Financial analysts requiring verified formulas and worked calculations."
  watchFor:
    - "Verify compounding periodicity, sign conventions, and calculator mode (BGN vs END)."
    - "Review boundary conditions and common exam distractor traps."
  note: "2026–2027 CFA Program Curriculum Series · Aniket Thakur"
faqItems:
  - question: "What is the primary formula for cfa level 1 derivatives practice questions in Level I Derivatives?"
    answer: "The primary equations for Derivatives Practice Questions for CFA Level 1 With Solutions govern Derivatives calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is cfa level 1 derivatives practice questions tested on the CFA Level I exam?"
    answer: "On the CFA exam, Derivatives Practice Questions for CFA Level 1 With Solutions is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
  - question: "How does One-Period Binomial Risk-Neutral Option Pricing Formula connect to related topics in Derivatives?"
    answer: "Within Derivatives, One-Period Binomial Risk-Neutral Option Pricing Formula links directly to How Do Investors Use Derivatives for Hedging?"
---

## Introduction

Derivatives Practice Questions for CFA Level 1 With Solutions is a core Level I Derivatives topic (LM 1–10: Comprehensive Derivatives Synthesis — One-period binomial option pricing, risk-neutral probability, put-call-forward parity, and swap/forward valuation) focusing on integrated exam problem-solving: one-period binomial option valuation, risk-neutral probabilities, neutrality to investor risk aversion, and Put-Call-Forward Parity. This guide covers the governing equations (One-Period Binomial Risk-Neutral Option Pricing Formula and Binomial Hedge Ratio (Delta) & Put-Call-Forward Parity), two verified numerical examples, a comparison table, and three original CFA-style practice questions.

## Concept Explanation & Institutional Framework

From first principles, integrated exam problem-solving: one-period binomial option valuation, risk-neutral probabilities, neutrality to investor risk aversion, and Put-Call-Forward Parity links theoretical valuation and risk mechanics to practical decisions in Derivatives. One-Period Binomial Risk-Neutral Option Pricing Formula (c_0 = [π × c_1^u + (1 − π) × c_1^d] / (1 + R_F) where π = (1 + R_F − d) / (u − d)) establishes the primary relationship (u = S_1^u / S_0 (up factor); d = S_1^d / S_0 (down factor); π is the risk-neutral probability (NOT the real-world physical probability!).), while Binomial Hedge Ratio (Delta) & Put-Call-Forward Parity (h (Delta) = (c_1^u − c_1^d) / (S_1^u − S_1^d) ; F_0(T) / (1 + R_F)^T + p_0 = c_0 + X / (1 + R_F)^T) governs h shares of stock combined with 1 short call creates a perfectly riskless portfolio across both up and down binomial nodes.

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: One-Period Binomial Risk-Neutral Option Pricing Formula

```formula
c_0 = [π × c_1^u + (1 − π) × c_1^d] / (1 + R_F) where π = (1 + R_F − d) / (u − d)
```

**Institutional Context & Variable Breakdown:**

- u = S_1^u / S_0 (up factor).

- d = S_1^d / S_0 (down factor).

- π is the risk-neutral probability (NOT the real-world physical probability!).

### Formula 2: Binomial Hedge Ratio (Delta) & Put-Call-Forward Parity

```formula
h (Delta) = (c_1^u − c_1^d) / (S_1^u − S_1^d)

F_0(T) / (1 + R_F)^T + p_0 = c_0 + X / (1 + R_F)^T
```

**Institutional Context & Variable Breakdown:** h shares of stock combined with 1 short call creates a perfectly riskless portfolio across both up and down binomial nodes.

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Solving a One-Period Binomial Call and Put Option Valuation Problem

**Problem & Given Scenario:**
A stock currently trades at S_0 = $50.00. Over the next year, it will either rise by 25% to S_1^u = $62.50 (u = 1.25) or fall by 20% to S_1^d = $40.00 (d = 0.80). The real-world probability of an up-move is 70%, and the annual risk-free rate is R_F = 4.00%. Price a 1-year European Call option with strike X = $52.00.

```formula
c_0 = [π × c_1^u + (1 − π) × c_1^d] / (1 + R_F) where π = (1 + R_F − d) / (u − d)
```

**Step-by-Step Substitution & Calculation:**

Step 1: Terminal Call payoffs at t = 1: c_1^u = max(0, $62.50 − $52.00) = $10.50; c_1^d = max(0, $40.00 − $52.00) = $0.00. Step 2: Compute Risk-Neutral Probability π (ignore the 70% real-world probability!): π = (1 + 0.04 − 0.80) / (1.25 − 0.80) = 0.24 / 0.45 = 0.53333 (53.33%), so (1 − π) = 0.46667. Step 3: Discount expected risk-neutral payoff at R_F = 4.0%: c_0 = [0.53333 × $10.50 + 0.46667 × $0.00] / 1.04 = $5.60 / 1.04 = $5.3846 ≈ $5.38. Step 4: Hedge ratio h = ($10.50 − $0) / ($62.50 − $40.00) = 10.50 / 22.50 = 0.4667 shares per call.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> A classic CFA exam trap gives you the real-world probability (70%) to tempt you into using 0.70 instead of the no-arbitrage risk-neutral probability π = (1 + R_F − d)/(u − d) = 53.33%!

### Worked Example 2: Applying Put-Call-Forward Parity to Find Implied Forward Price

**Problem & Given Scenario:**
For an asset with 1-year European options at strike X = $90.00, the call price is c_0 = $7.40, the put price is p_0 = $4.50, and the risk-free rate is R_F = 5.0%. Find the no-arbitrage 1-year Forward Price F_0(1).

```formula
h (Delta) = (c_1^u − c_1^d) / (S_1^u − S_1^d)

F_0(T) / (1 + R_F)^T + p_0 = c_0 + X / (1 + R_F)^T
```

**Step-by-Step Substitution & Calculation:**

Rearranging Put-Call-Forward Parity: [F_0(T) − X] / (1 + R_F)^T = c_0 − p_0 => F_0(1) − $90.00 = ($7.40 − $4.50) × 1.05 = $2.90 × 1.05 = +$3.045 => F_0(1) = $93.045 ≈ $93.05.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Long 1 Call at strike X plus Short 1 Put at strike X creates a synthetic Long Forward at delivery price X!

## Comparison & Reference Analysis

| Synthetic Position | Option / Bond Replication | Equivalent Derivative / Asset | Put-Call Parity Rearrangement |
|---|---|---|---|
| Synthetic Long Stock | Long Call + Short Put + Long Bond PV(X) | Long Underlying Stock S_0 | S_0 = c_0 − p_0 + PV(X) |
| Synthetic Long Call | Long Stock + Long Put − Short Bond PV(X) | Long European Call c_0 | c_0 = S_0 + p_0 − PV(X) |
| Synthetic Long Put | Long Call − Short Stock + Long Bond PV(X) | Long European Put p_0 | p_0 = c_0 − S_0 + PV(X) |
| Synthetic Risk-Free Bond | Long Stock + Long Put − Short Call | Zero-Coupon Bond paying X | PV(X) = S_0 + p_0 − c_0 |

## Real-World Financial Applications

In institutional Derivatives practice, analysts apply One-Period Binomial Risk-Neutral Option Pricing Formula and Binomial Hedge Ratio (Delta) & Put-Call-Forward Parity to value securities, audit financial statements, and manage portfolio risk.

## CFA Examination Perspective & Testing Patterns

On the CFA Level I exam (LM 1–10: Comprehensive Derivatives Synthesis — One-period binomial option pricing, risk-neutral probability, put-call-forward parity, and swap/forward valuation), cfa level 1 derivatives practice questions is tested via standalone 90-second MCQs combining One-Period Binomial Risk-Neutral Option Pricing Formula calculations with economic interpretation.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** A stock trades at $100. Over the next year, it will either rise to $120 (u = 1.20) or fall to $85 (d = 0.85). If the annual risk-free interest rate is 6.0%, the risk-neutral probability of an up-move (π) in a one-period binomial model is closest to:

- **[A]** 0.500

- **[B]** 0.600

- **[C]** 0.650

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** π = (1 + R_F − d) / (u − d) = (1 + 0.06 − 0.85) / (1.20 − 0.85) = 0.21 / 0.35 = 0.600 (60.0%).

### Practice Question 2

**Question:** In the one-period binomial option pricing model, if investors in the market suddenly become more risk-averse (demanding a higher real-world expected return on the stock while u, d, S_0, and R_F remain unchanged), the no-arbitrage price of a call option will:

- **[A]** Increase

- **[B]** Decrease

- **[C]** Remain completely unchanged because option valuation is based on riskless arbitrage replication and depends only on u, d, S_0, X, and R_F—not real-world probabilities or risk aversion

> [!TIP]
> **Correct Answer: Option C.**
>
> **Explanation:** Because the binomial portfolio (h shares long + 1 short call) is perfectly hedged across both states, investor risk aversion and real-world probabilities drop out of the valuation equation entirely.

### Practice Question 3

**Question:** By Put-Call-Forward Parity, combining a Long European Call with strike X and a Short European Put with the same strike X and expiration T has the exact same expiration payoff as:

- **[A]** A long forward contract on the underlying asset with a delivery price equal to X

- **[B]** A short forward contract with delivery price X

- **[C]** A straddle

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** At expiration T, Long Call − Short Put pays max(0, S_T − X) − max(0, X − S_T) = S_T − X, which is identical to the payoff of a Long Forward with delivery price X.

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in One-Period Binomial Risk-Neutral Option Pricing Formula.**

- **Timing Errors: Mixing beginning and ending balances in Binomial Hedge Ratio (Delta) & Put-Call-Forward Parity.**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Curriculum Scope: LM 1–10: Comprehensive Derivatives Synthesis — One-period binomial option pricing, risk-neutral probability, put-call-forward parity, and swap/forward valuation (Level I · Derivatives).**

- **Takeaway 2: Primary Formula (One-Period Binomial Risk-Neutral Option Pricing Formula): c_0 = [π × c_1^u + (1 − π) × c_1^d] / (1 + R_F) where π = (1 + R_F − d) / (u − d).**

- **Takeaway 3: Secondary Formula (Binomial Hedge Ratio (Delta) & Put-Call-Forward Parity): h (Delta) = (c_1^u − c_1^d) / (S_1^u − S_1^d) ; F_0(T) / (1 + R_F)^T + p_0 = c_0 + X / (1 + R_F)^T.**

- **Takeaway 4: Key Insight 1: A classic CFA exam trap gives you the real-world probability (70%) to tempt you into using 0.70 instead of the no-arbitrage risk-neutral.**

- **Takeaway 5: Key Insight 2: Long 1 Call at strike X plus Short 1 Put at strike X creates a synthetic Long Forward at delivery price X!**

## Frequently Asked Questions (FAQs)

### What is the primary formula for cfa level 1 derivatives practice questions in Level I Derivatives?

The primary equations for Derivatives Practice Questions for CFA Level 1 With Solutions govern Derivatives calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is cfa level 1 derivatives practice questions tested on the CFA Level I exam?

On the CFA exam, Derivatives Practice Questions for CFA Level 1 With Solutions is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

### How does One-Period Binomial Risk-Neutral Option Pricing Formula connect to related topics in Derivatives?

Within Derivatives, One-Period Binomial Risk-Neutral Option Pricing Formula links directly to How Do Investors Use Derivatives for Hedging?

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level I · Derivatives).

### Related CFA Study Guides

- [How Do Investors Use Derivatives for Hedging?](/blog/cfa/cfa-level-1-how-investors-use-derivatives-for-hedging/)

- [Interest Rate Swaps Explained With Numerical Examples](/blog/cfa/cfa-level-1-interest-rate-swaps-explained-examples/)

- [How to Calculate Profit and Loss in Futures Contracts](/blog/cfa/cfa-level-1-calculate-profit-and-loss-in-futures-contracts/)

