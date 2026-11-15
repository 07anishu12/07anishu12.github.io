---
title: "Call Options vs Put Options: How Do They Work?"
seoTitle: "Call Options vs Put Options: How Do They Work? — CFA Level I"
slug: cfa-level-1-call-options-vs-put-options-how-they-work
description: "Master call options vs put options cfa for Level I (Derivatives). Includes verified CFA formulas, 2 step-by-step solved numerical examples, comparison table,."
category: cfa
tags:
  - "CFA"
  - "Level I"
  - "Derivatives"
  - "call options vs put options cfa"
  - "call options vs put options cfa formula"
author: Aniket Thakur
datePublished: "2026-11-11"
dateModified: "2026-11-11"
coverImage: /assets/images/blog/cfa-level-1-call-options-vs-put-options-how-they-work/cover.svg
coverImageAlt: "Illustrative guide to Call Options vs Put Options: How Do They Work?"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for Call Options vs Put Options: How Do They Work?."
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
  question: "Call Options vs Put Options: How Do They Work?: Key Summary & Verdict"
  answer: "Call Options vs Put Options: How Do They Work? is a core Level I Derivatives topic (LM 2, LM 8 & LM 9: Contingent Claims, Option Moneyness, Intrinsic Value vs Time Value, Six Factors Affecting Option Value, Put-Call Parity) focusing on call vs put option."
  facts:
    - label: "CFA Level"
      value: "Level I"
    - label: "Curriculum Subject"
      value: "Derivatives"
    - label: "Topic Focus"
      value: "call options vs put options cfa"
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
  - question: "What is the primary formula for call options vs put options cfa in Level I Derivatives?"
    answer: "The primary equations for Call Options vs Put Options: How Do They Work? govern Derivatives calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is call options vs put options cfa tested on the CFA Level I exam?"
    answer: "On the CFA exam, Call Options vs Put Options: How Do They Work? is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
  - question: "How does Option Intrinsic Value, Time Value & Moneyness connect to related topics in Derivatives?"
    answer: "Within Derivatives, Option Intrinsic Value, Time Value & Moneyness links directly to Futures vs Forwards: Differences, Examples and CFA Ques within the standard CFA Derivatives curriculum framework."
---

## Introduction

Call Options vs Put Options: How Do They Work? is a core Level I Derivatives topic (LM 2, LM 8 & LM 9: Contingent Claims, Option Moneyness, Intrinsic Value vs Time Value, Six Factors Affecting Option Value, Put-Call Parity) focusing on call vs put option rights and obligations, moneyness (ITM, ATM, OTM), intrinsic value vs time value, the six option pricing determinants, and Put-Call Parity. This guide covers the governing equations (Option Intrinsic Value, Time Value & Moneyness and Put-Call Parity & Put-Call-Forward Parity), two verified numerical examples, a comparison table, and three original CFA-style practice questions.

## Concept Explanation & Institutional Framework

From first principles, call vs put option rights and obligations, moneyness (ITM, ATM, OTM), intrinsic value vs time value, the six option pricing determinants, and Put-Call Parity links theoretical valuation and risk mechanics to practical decisions in Derivatives. Option Intrinsic Value, Time Value & Moneyness (Call Intrinsic = max(0, S_t − X) ; Put Intrinsic = max(0, X − S_t) ; Option Price = Intrinsic Value + Time Value) establishes the primary relationship (Before expiration, Option Price > Intrinsic Value due to positive Time Value (volatility value).), while Put-Call Parity & Put-Call-Forward Parity (S_0 + p_0 = c_0 + [X / (1 + R_F)^T] ; [F_0(T) / (1 + R_F)^T] + p_0 = c_0 + [X / (1 + R_F)^T]) governs Links European call (c_0), European put (p_0), underlying stock (S_0), and risk-free bond with face value X (Fiduciary Call = Protective Put).

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: Option Intrinsic Value, Time Value & Moneyness

```formula
Call Intrinsic = max(0, S_t − X)

Put Intrinsic = max(0, X − S_t)

Option Price = Intrinsic Value + Time Value
```

**Institutional Context & Variable Breakdown:** Before expiration, Option Price > Intrinsic Value due to positive Time Value (volatility value).

### Formula 2: Put-Call Parity & Put-Call-Forward Parity

```formula
S_0 + p_0 = c_0 + [X / (1 + R_F)^T]

[F_0(T) / (1 + R_F)^T] + p_0 = c_0 + [X / (1 + R_F)^T]
```

**Institutional Context & Variable Breakdown:** Links European call (c_0), European put (p_0), underlying stock (S_0), and risk-free bond with face value X (Fiduciary Call = Protective Put).

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Applying Put-Call Parity to Price a European Put and Construct a Synthetic Call

**Problem & Given Scenario:**
A non-dividend-paying stock trades at S_0 = $100.00. A 1-year European call option with strike price X = $105.00 trades at c_0 = $8.20. The annual risk-free rate is R_F = 5.00%. Compute the no-arbitrage price of the 1-year European put option p_0 with strike $105.00.

```formula
Call Intrinsic = max(0, S_t − X)

Put Intrinsic = max(0, X − S_t)

Option Price = Intrinsic Value + Time Value
```

**Step-by-Step Substitution & Calculation:**

Step 1: Compute PV of the strike price: PV(X) = $105.00 / (1 + 0.05)^1 = $100.00. Step 2: Apply Put-Call Parity (S_0 + p_0 = c_0 + PV(X)): $100.00 + p_0 = $8.20 + $100.00 => p_0 = $8.20! Step 3: Synthetic Call construction: Long Stock ($100) + Long Put ($8.20) − Short Risk-Free Bond ($100) = $8.20.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Notice that when the strike price X equals the forward price F_0 = S_0(1+R_F) = $105.00 (at-the-money forward), the European call price and put price are identical ($8.20)!

### Worked Example 2: Decomposing Option Premium into Intrinsic Value and Time Value

**Problem & Given Scenario:**
With the stock at S_0 = $100.00 and strike X = $105.00, decompose both the Call ($8.20) and Put ($8.20) into Intrinsic Value and Time Value.

```formula
S_0 + p_0 = c_0 + [X / (1 + R_F)^T]

[F_0(T) / (1 + R_F)^T] + p_0 = c_0 + [X / (1 + R_F)^T]
```

**Step-by-Step Substitution & Calculation:**

Call (X = $105 > S_0 = $100 -> Out-of-the-Money): Intrinsic Value = max(0, 100 − 105) = $0.00; Time Value = $8.20 − $0.00 = $8.20. Put (X = $105 > S_0 = $100 -> In-the-Money): Intrinsic Value = max(0, 105 − 100) = $5.00; Time Value = $8.20 − $5.00 = $3.20.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Even though the Call is $5 out-of-the-money while the Put is $5 in-the-money, the 5% risk-free carry on the stock ($5 PV difference) makes their total premiums equal ($8.20).

## Comparison & Reference Analysis

| Option Pricing Factor (Increase in Factor) | Effect on European Call (c_0) | Effect on European Put (p_0) | Economic Intuition |
|---|---|---|---|
| Underlying Spot Price (S_0) | Increases (+) | Decreases (−) | Raises S − X; lowers X − S |
| Exercise / Strike Price (X) | Decreases (−) | Increases (+) | Higher hurdle for call; higher floor for put |
| Volatility of Underlying (σ) | Increases (+) | Increases (+) | Asymmetric payoff benefits both options |
| Risk-Free Interest Rate (R_F) | Increases (+) | Decreases (−) | Lowers PV(X) = X/(1+R_F)^T |
| Dividends / Income on Asset | Decreases (−) | Increases (+) | Stock price drops on ex-dividend date |

## Real-World Financial Applications

In institutional Derivatives practice, analysts apply Option Intrinsic Value, Time Value & Moneyness and Put-Call Parity & Put-Call-Forward Parity to value securities, audit financial statements, and manage portfolio risk.

## CFA Examination Perspective & Testing Patterns

On the CFA Level I exam (LM 2, LM 8 & LM 9: Contingent Claims, Option Moneyness, Intrinsic Value vs Time Value, Six Factors Affecting Option Value, Put-Call Parity), call options vs put options cfa is tested via standalone 90-second MCQs combining Option Intrinsic Value, Time Value & Moneyness calculations with economic interpretation.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** According to put-call parity for European options on a non-dividend-paying stock, a 'Fiduciary Call' (Long Call + Risk-Free Bond paying X at expiration) has an expiration payoff identical to a:

- **[A]** Covered call (Long Stock + Short Call)

- **[B]** Protective put (Long Stock + Long Put)

- **[C]** Straddle (Long Call + Long Put)

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** Both a Fiduciary Call (c_0 + X/(1+R_F)^T) and a Protective Put (S_0 + p_0) pay max(S_T, X) at expiration: X if S_T ≤ X, and S_T if S_T > X.

### Practice Question 2

**Question:** Holding all other inputs constant, an increase in the risk-free interest rate (R_F) and an increase in the volatility of the underlying stock (σ) will affect the value of a European Put option as follows:

- **[A]** Higher R_F decreases put value; higher volatility σ increases put value

- **[B]** Both higher R_F and higher volatility σ increase put value

- **[C]** Higher R_F increases put value; higher volatility σ decreases put value

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** A higher risk-free rate reduces the present value of the strike price received upon exercising the put [PV(X) falls, lowering put value], while higher volatility always increases both call and put values.

### Practice Question 3

**Question:** A 6-month European call option with an exercise price of $60 trades for $4.50 when the underlying non-dividend-paying stock trades at $58.00 and the present value of $60 discounted at the risk-free rate is $58.50. By put-call parity, the no-arbitrage price of the 6-month European put option with a $60 exercise price is:

- **[A]** $4.00

- **[B]** $5.00

- **[C]** $6.50

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** p_0 = c_0 + PV(X) − S_0 = $4.50 + $58.50 − $58.00 = $5.00.

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in Option Intrinsic Value, Time Value & Moneyness.**

- **Timing Errors: Mixing beginning and ending balances in Put-Call Parity & Put-Call-Forward Parity.**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Curriculum Scope: LM 2, LM 8 & LM 9: Contingent Claims, Option Moneyness, Intrinsic Value vs Time Value, Six Factors Affecting Option Value, Put-Call Parity (Level I · Derivatives).**

- **Takeaway 2: Primary Formula (Option Intrinsic Value, Time Value & Moneyness): Call Intrinsic = max(0, S_t − X) ; Put Intrinsic = max(0, X − S_t) ; Option Price = Intrinsic Value + Time Value.**

- **Takeaway 3: Secondary Formula (Put-Call Parity & Put-Call-Forward Parity): S_0 + p_0 = c_0 + [X / (1 + R_F)^T] ; [F_0(T) / (1 + R_F)^T] + p_0 = c_0 + [X / (1 + R_F)^T].**

- **Takeaway 4: Key Insight 1: Notice that when the strike price X equals the forward price F_0 = S_0(1+R_F) = $105.00 (at-the-money forward), the European call price.**

- **Takeaway 5: Key Insight 2: Even though the Call is $5 out-of-the-money while the Put is $5 in-the-money, the 5% risk-free carry on the stock ($5 PV difference) makes.**

## Frequently Asked Questions (FAQs)

### What is the primary formula for call options vs put options cfa in Level I Derivatives?

The primary equations for Call Options vs Put Options: How Do They Work? govern Derivatives calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is call options vs put options cfa tested on the CFA Level I exam?

On the CFA exam, Call Options vs Put Options: How Do They Work? is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

### How does Option Intrinsic Value, Time Value & Moneyness connect to related topics in Derivatives?

Within Derivatives, Option Intrinsic Value, Time Value & Moneyness links directly to Futures vs Forwards: Differences, Examples and CFA Ques within the standard CFA Derivatives curriculum framework.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level I · Derivatives).

### Related CFA Study Guides

- [Futures vs Forwards: Differences, Examples and CFA Questions](/blog/cfa/cfa-level-1-futures-vs-forwards-differences-examples/)

- [How to Calculate Call Option and Put Option Payoffs](/blog/cfa/cfa-level-1-calculate-call-option-and-put-option-payoffs/)

- [CFA Derivatives Level 1: Complete Notes and Practice Questions](/blog/cfa/cfa-level-1-derivatives-notes-practice-questions/)

