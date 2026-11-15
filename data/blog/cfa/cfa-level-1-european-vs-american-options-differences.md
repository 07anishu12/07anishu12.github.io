---
title: "European vs American Options: Differences With Examples"
seoTitle: "European vs American Options: Differences With Examples — CFA Level I"
slug: cfa-level-1-european-vs-american-options-differences
description: "Master european vs american options cfa for Level I (Derivatives). Includes verified CFA formulas, 2 step-by-step solved numerical examples, comparison table."
category: cfa
tags:
  - "CFA"
  - "Level I"
  - "Derivatives"
  - "european vs american options cfa"
  - "european vs american options cfa formula"
author: Aniket Thakur
datePublished: "2026-11-11"
dateModified: "2026-11-11"
coverImage: /assets/images/blog/cfa-level-1-european-vs-american-options-differences/cover.svg
coverImageAlt: "Illustrative guide to European vs American Options: Differences With Examples"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for European vs American Options: Differences With Examples."
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
  question: "European vs American Options: Differences With Examples: Key Summary & Verdict"
  answer: "European vs American Options: Differences With Examples covers comparing European and American option exercise rights, minimum pricing bounds before expiration, and when early exercise of an American call or put is optimal in Level I Derivatives (LM 8 & LM 9."
  facts:
    - label: "CFA Level"
      value: "Level I"
    - label: "Curriculum Subject"
      value: "Derivatives"
    - label: "Topic Focus"
      value: "european vs american options cfa"
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
  - question: "What is the primary formula for european vs american options cfa in Level I Derivatives?"
    answer: "The primary equations for European vs American Options: Differences With Examples govern Derivatives calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is european vs american options cfa tested on the CFA Level I exam?"
    answer: "On the CFA exam, European vs American Options: Differences With Examples is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
---

## Introduction

European vs American Options: Differences With Examples covers comparing European and American option exercise rights, minimum pricing bounds before expiration, and when early exercise of an American call or put is optimal in Level I Derivatives (LM 8 & LM 9: European vs American Exercise Styles, Lower Pricing Bounds, Early Exercise Rationality for Calls (Dividends) and Puts (Deep ITM)), with verified formulas, two worked examples, and three practice MCQs.

## Concept Explanation & Institutional Framework

European vs. American Option Value Inequality & Lower Bounds (C_0 ≥ c_0 ≥ max[0, S_0 − PV(D) − X / (1 + R_F)^T] ; P_0 ≥ max(0, X − S_0) ≥ p_0 ≥ max[0, X / (1 + R_F)^T − S_0 + PV(D)]) and Early Exercise Rule for American Calls on Non-Dividend Stocks (On a Non-Dividend Stock: C_0 = c_0 > S_0 − X (Never Exercise an American Call Early!)) govern comparing European and American option exercise rights, minimum pricing bounds before expiration, and when early exercise of an American call or put is optimal.

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: European vs. American Option Value Inequality & Lower Bounds

```formula
C_0 ≥ c_0 ≥ max[0, S_0 − PV(D) − X / (1 + R_F)^T]

P_0 ≥ max(0, X − S_0) ≥ p_0 ≥ max[0, X / (1 + R_F)^T − S_0 + PV(D)]
```

**Institutional Context & Variable Breakdown:** An American option (C_0, P_0) is always worth at least as much as an otherwise identical European option (c_0, p_0) because it includes all European rights plus early exercise.

### Formula 2: Early Exercise Rule for American Calls on Non-Dividend Stocks

```formula
On a Non-Dividend Stock: C_0 = c_0 > S_0 − X (Never Exercise an American Call Early!)
```

**Institutional Context & Variable Breakdown:** Exercising a call early on a non-dividend stock sacrifices the interest on the strike price X − X/(1+R_F)^T and destroys the option's insurance time value.

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Proving Why an American Call on a Non-Dividend Stock Is Never Exercised Early

**Problem & Given Scenario:**
A non-dividend-paying stock trades at S_0 = $120.00. An investor holds an American Call with strike X = $100.00 expiring in 1 year (R_F = 5.0%). Compare (A) exercising the call immediately today vs. (B) selling the call in the market (or holding it).

```formula
C_0 ≥ c_0 ≥ max[0, S_0 − PV(D) − X / (1 + R_F)^T]

P_0 ≥ max(0, X − S_0) ≥ p_0 ≥ max[0, X / (1 + R_F)^T − S_0 + PV(D)]
```

**Step-by-Step Substitution & Calculation:**

If exercised today at t = 0: Immediate Intrinsic Value received = S_0 − X = $120.00 − $100.00 = $20.00. However, the minimum no-arbitrage price (lower bound) of the Call in the market is max(0, S_0 − X / 1.05) = $120.00 − $95.24 = $24.76 (plus volatility value!). Exercising early receives $20.00 and throws away at least $4.76 of time value (the $4.76 interest saved by deferring the $100 strike payment for 1 year plus downside protection if S_1 < $100).

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Therefore, an American call on a non-dividend-paying stock is NEVER exercised early and trades at the exact same price as a European call (C_0 = c_0).

### Worked Example 2: When Early Exercise IS Optimal: Dividend-Paying Calls and Deep-ITM Puts

**Problem & Given Scenario:**
Case 1 (Call before large ex-dividend): Stock at $110 goes ex-dividend tomorrow for a $6.00 dividend; 1-month strike $100 American Call has remaining time/interest value of $0.60 -> Exercise immediately before ex-dividend to capture the $6.00 dividend! Case 2 (Deep-ITM American Put on bankrupt stock): Stock drops to S_t = $0.50 with strike X = $80.00 and 1 year remaining (R_F = 6%).

```formula
On a Non-Dividend Stock: C_0 = c_0 > S_0 − X (Never Exercise an American Call Early!)
```

**Step-by-Step Substitution & Calculation:**

For the Deep-ITM Put at S_t = $0.50: European Put value is bounded by PV(X) − S_t = $80/1.06 − $0.50 = $75.47 − $0.50 = $74.97. By exercising the American Put immediately today, the holder collects $80.00 − $0.50 = $79.50 cash today and invests it at 6% to have $84.27 in 1 year! Thus P_0 ≥ $79.50 > p_0 ($74.97).

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Unlike calls, an American Put on a non-dividend-paying stock CAN be optimally exercised early when it is deep in-the-money because receiving cash X early earns interest R_F.

## Comparison & Reference Analysis

| Option Type & Dividend Status | Is Early Exercise Ever Optimal? | American vs. European Price | Economic Reason |
|---|---|---|---|
| Call on Non-Dividend Asset | Never | C_0 = c_0 (Identical) | Early exercise loses interest on X & insurance |
| Call on Dividend-Paying Asset | Yes (just before ex-dividend date) | C_0 ≥ c_0 (C_0 > c_0 if div large) | Captures large dividend exceeding time value |
| Put on Non-Dividend Asset | Yes (when deep in-the-money) | P_0 > p_0 (Strictly higher) | Early receipt of strike cash X earns R_F |
| Put on Dividend-Paying Asset | Less likely (dividends help puts) | P_0 ≥ p_0 | Waiting captures ex-dividend stock price drop |

## Real-World Financial Applications

Analysts apply European vs. American Option Value Inequality & Lower Bounds and Early Exercise Rule for American Calls on Non-Dividend Stocks across Derivatives valuation and risk management.

## CFA Examination Perspective & Testing Patterns

Tested on the CFA Level I exam (LM 8 & LM 9: European vs American Exercise Styles, Lower Pricing Bounds, Early Exercise Rationality for Calls (Dividends) and Puts (Deep ITM)) via quantitative and conceptual MCQs.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** For an American call option and a European call option with identical strike prices and expiration dates written on a stock that pays NO dividends, which statement is most accurate?

- **[A]** The American call always trades at a higher price than the European call

- **[B]** It is never optimal to exercise the American call early, so the American call and European call have the exact same value (C_0 = c_0)

- **[C]** The American call should be exercised as soon as S_t exceeds X

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** Without dividends (or carrying benefits), there is zero benefit to owning the stock early instead of holding the call, while early exercise forfeits interest on X and downside protection; thus C_0 = c_0.

### Practice Question 2

**Question:** Under which circumstance is it most likely optimal to exercise an American PUT option prior to expiration?

- **[A]** When the put option is slightly out-of-the-money and volatility is high

- **[B]** When the underlying stock is about to pay a large cash dividend

- **[C]** When the put option is deep in-the-money (S_t is near zero) and interest rates are high, so the investor can collect the strike price X immediately and invest it at the risk-free rate

> [!TIP]
> **Correct Answer: Option C.**
>
> **Explanation:** When S_t is near zero, the stock can barely fall further, so the put has virtually no upside left; exercising early captures cash X immediately to earn interest at R_F.

### Practice Question 3

**Question:** A 1-year European call option has a strike price of $55.00. The underlying non-dividend-paying stock trades at $62.00, and the annual risk-free rate is 5.0%. The minimum no-arbitrage price (lower bound) of the European call option is closest to:

- **[A]** $7.00

- **[B]** $9.62

- **[C]** $10.10

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** Lower bound c_0 ≥ max[0, S_0 − X / (1 + R_F)^T] = $62.00 − ($55.00 / 1.05) = $62.00 − $52.381 = $9.619 ≈ $9.62. (Notice this exceeds the $7.00 intrinsic value!).

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in European vs. American Option Value Inequality & Lower Bounds.**

- **Timing Errors: Mixing beginning and ending balances in Early Exercise Rule for American Calls on Non-Dividend Stocks.**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: European vs. American Option Value Inequality & Lower Bounds: C_0 ≥ c_0 ≥ max[0, S_0 − PV(D) − X / (1 + R_F)^T] ; P_0 ≥ max(0, X − S_0) ≥ p_0 ≥ max[0, X / (1 + R_F)^T − S_0 + PV(D)].**

- **Takeaway 2: Early Exercise Rule for American Calls on Non-Dividend Stocks: On a Non-Dividend Stock: C_0 = c_0 > S_0 − X (Never Exercise an American Call Early!).**

- **Takeaway 3: Therefore, an American call on a non-dividend-paying stock is NEVER exercised early and.**

- **Takeaway 4: Unlike calls, an American Put on a non-dividend-paying stock CAN be optimally exercised.**

## Frequently Asked Questions (FAQs)

### What is the primary formula for european vs american options cfa in Level I Derivatives?

The primary equations for European vs American Options: Differences With Examples govern Derivatives calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is european vs american options cfa tested on the CFA Level I exam?

On the CFA exam, European vs American Options: Differences With Examples is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level I · Derivatives).

### Related CFA Study Guides

- [How to Calculate Call Option and Put Option Payoffs](/blog/cfa/cfa-level-1-calculate-call-option-and-put-option-payoffs/)

- [How to Calculate Profit and Loss in Futures Contracts](/blog/cfa/cfa-level-1-calculate-profit-and-loss-in-futures-contracts/)

- [Call Options vs Put Options: How Do They Work?](/blog/cfa/cfa-level-1-call-options-vs-put-options-how-they-work/)

