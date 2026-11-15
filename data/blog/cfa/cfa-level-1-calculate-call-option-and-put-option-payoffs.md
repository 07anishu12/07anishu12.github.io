---
title: "How to Calculate Call Option and Put Option Payoffs"
seoTitle: "How to Calculate Call Option and Put Option Payoffs — CFA Level I"
slug: cfa-level-1-calculate-call-option-and-put-option-payoffs
description: "Master How to Calculate Call Option and Put Option Payoffs for CFA Level I (Derivatives). Includes verified curriculum formulas, worked numerical examples, and exam review notes."
category: cfa
tags:
  - "CFA"
  - "Level I"
  - "Derivatives"
  - "how to calculate call and put option payoff"
  - "how to calculate call and put option payoff formula"
author: Aniket Thakur
datePublished: "2026-11-11"
dateModified: "2026-11-11"
coverImage: /assets/images/blog/cfa-level-1-calculate-call-option-and-put-option-payoffs/cover.svg
coverImageAlt: "Illustrative guide to How to Calculate Call Option and Put Option Payoffs"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for How to Calculate Call Option and Put Option Payoffs."
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
  question: "How to Calculate Call Option and Put Option Payoffs: Key Summary & Verdict"
  answer: "How to Calculate Call Option and Put Option Payoffs covers calculating expiration payoff, net profit, breakeven price, maximum gain, and maximum loss across the four core option positions (Long/Short Call, Long/Short Put) and Covered Call / Protective Put in."
  facts:
    - label: "CFA Level"
      value: "Level I"
    - label: "Curriculum Subject"
      value: "Derivatives"
    - label: "Topic Focus"
      value: "how to calculate call and put optio"
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
  - question: "What is the primary formula for how to calculate call and put option payoff in Level I Derivatives?"
    answer: "The primary equations for How to Calculate Call Option and Put Option Payoffs govern Derivatives calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is how to calculate call and put option payoff tested on the CFA Level I exam?"
    answer: "On the CFA exam, How to Calculate Call Option and Put Option Payoffs is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
---

## Introduction

How to Calculate Call Option and Put Option Payoffs covers calculating expiration payoff, net profit, breakeven price, maximum gain, and maximum loss across the four core option positions (Long/Short Call, Long/Short Put) and Covered Call / Protective Put in Level I Derivatives (LM 2 & LM 8: Expiration Payoff vs Net Profit, Breakeven Stock Price, Maximum Gain and Maximum Loss for Long/Short Calls, Long/Short Puts, Covered Calls, and Protective Puts), with verified formulas, two worked examples, and three practice MCQs.

## Concept Explanation & Institutional Framework

Call Option Payoff, Profit & Breakeven (Long Call Payoff = max(0, S_T − X) ; Profit = max(0, S_T − X) − c_0 ; Breakeven S_T* = X + c_0) and Put Option Payoff, Profit & Breakeven (Long Put Payoff = max(0, X − S_T) ; Profit = max(0, X − S_T) − p_0 ; Breakeven S_T* = X − p_0) govern calculating expiration payoff, net profit, breakeven price, maximum gain, and maximum loss across the four core option positions (Long/Short Call, Long/Short Put) and Covered Call / Protective Put.

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: Call Option Payoff, Profit & Breakeven

```formula
Long Call Payoff = max(0, S_T − X)

Profit = max(0, S_T − X) − c_0

Breakeven S_T* = X + c_0
```

**Institutional Context & Variable Breakdown:** Short Call is the exact mirror image: Payoff = −max(0, S_T − X), Profit = c_0 − max(0, S_T − X), with unlimited loss if S_T -> ∞.

### Formula 2: Put Option Payoff, Profit & Breakeven

```formula
Long Put Payoff = max(0, X − S_T)

Profit = max(0, X − S_T) − p_0

Breakeven S_T* = X − p_0
```

**Institutional Context & Variable Breakdown:** Maximum gain on a Long Put occurs if the stock falls to $0: Max Profit = X − p_0 (bounded because S_T ≥ 0).

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Calculating Expiration Payoff, Net Profit, and Breakeven for Call and Put Positions

**Problem & Given Scenario:**
A trader buys 1 Call contract (100 shares) at strike X = $80 for a premium of c_0 = $5.50/share ($550 total), and another trader writes (shorts) 1 Put contract (100 shares) at strike X = $75 for a premium of p_0 = $3.20/share ($320 total). Evaluate both at expiration if S_T = $92.00 vs. S_T = $68.00.

```formula
Long Call Payoff = max(0, S_T − X)

Profit = max(0, S_T − X) − c_0

Breakeven S_T* = X + c_0
```

**Step-by-Step Substitution & Calculation:**

Case 1 (S_T = $92.00): Long Call Payoff = max(0, 92 − 80) = $12.00/share; Net Profit = $12.00 − $5.50 = +$6.50/share (+$650 total; Call Breakeven = $80 + $5.50 = $85.50). Short Put expires OTM -> Payoff = $0, Profit = +$3.20/share (+$320 keep full premium). Case 2 (S_T = $68.00): Long Call expires OTM -> Payoff = $0, Net Loss = −$5.50/share (−$550 max loss). Short Put Payoff = −(75 − 68) = −$7.00/share; Net Profit = +$3.20 − $7.00 = −$3.80/share (−$380 loss; Put Breakeven = $75 − $3.20 = $71.80).

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Always distinguish between 'Payoff at Expiration' (which excludes the initial premium c_0 or p_0) and 'Net Profit' (which subtracts the premium paid or adds the premium received)!

### Worked Example 2: Covered Call and Protective Put Profit and Breakeven Calculation

**Problem & Given Scenario:**
An investor buys a stock at S_0 = $100.00. Strategy A (Covered Call): Writes a $105 Call for c_0 = $4.00. Strategy B (Protective Put): Buys a $95 Put for p_0 = $3.50.

```formula
Long Put Payoff = max(0, X − S_T)

Profit = max(0, X − S_T) − p_0

Breakeven S_T* = X − p_0
```

**Step-by-Step Substitution & Calculation:**

Strategy A (Covered Call = Long Stock $100 − Short Call $4 = $96 net outlay): Breakeven S_T = $100 − $4 = $96.00; Max Profit (for S_T ≥ $105) = ($105 − $100) + $4 = +$9.00/share; Max Loss (at S_T = $0) = −$96.00. Strategy B (Protective Put = Long Stock $100 + Long Put $3.50 = $103.50 total outlay): Breakeven S_T = $100 + $3.50 = $103.50; Max Loss (for S_T ≤ $95) = ($95 − $100) − $3.50 = −$8.50/share; Max Gain = Unlimited.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> A Covered Call sells upside above X in exchange for premium income (behaving like a Short Put), while a Protective Put buys downside insurance below X (behaving like a Long Call).

## Comparison & Reference Analysis

| Option Position | Expiration Breakeven (S_T*) | Maximum Possible Profit | Maximum Possible Loss |
|---|---|---|---|
| Long Call (pay c_0) | X + c_0 | Unlimited (as S_T -> ∞) | c_0 (Premium paid) |
| Short Call (receive c_0) | X + c_0 | c_0 (Premium received) | Unlimited (as S_T -> ∞) |
| Long Put (pay p_0) | X − p_0 | X − p_0 (when S_T = $0) | p_0 (Premium paid) |
| Short Put (receive p_0) | X − p_0 | p_0 (Premium received) | X − p_0 (when S_T = $0) |
| Protective Put (S_0 + p_0) | S_0 + p_0 | Unlimited (S_T − S_0 − p_0) | S_0 − X + p_0 (capped floor) |

## Real-World Financial Applications

Analysts apply Call Option Payoff, Profit & Breakeven and Put Option Payoff, Profit & Breakeven across Derivatives valuation and risk management.

## CFA Examination Perspective & Testing Patterns

Tested on the CFA Level I exam (LM 2 & LM 8: Expiration Payoff vs Net Profit, Breakeven Stock Price, Maximum Gain and Maximum Loss for Long/Short Calls, Long/Short Puts, Covered Calls, and Protective Puts) via quantitative and conceptual MCQs.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** An investor purchases a put option with an exercise price of $50.00 for a premium of $3.80. At expiration, if the underlying stock price is $41.20, the investor's expiration PAYOFF and net PROFIT per share, respectively, are:

- **[A]** Payoff = $8.80; Profit = $5.00

- **[B]** Payoff = $5.00; Profit = $8.80

- **[C]** Payoff = $8.80; Profit = $8.80

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** Expiration Payoff = max(0, X − S_T) = $50.00 − $41.20 = $8.80. Net Profit = Payoff − Premium = $8.80 − $3.80 = $5.00.

### Practice Question 2

**Question:** What is the maximum possible profit and maximum possible loss for a trader who writes (sells) an uncovered put option with a strike price of X = $40.00 for a premium of p_0 = $2.75?

- **[A]** Maximum profit = $2.75; Maximum loss = $37.25

- **[B]** Maximum profit = $37.25; Maximum loss = $2.75

- **[C]** Maximum profit = $2.75; Maximum loss = Unlimited

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** The put writer's maximum profit is the $2.75 premium collected (if S_T ≥ $40.00). Because a stock's price cannot fall below $0.00, the worst-case loss at S_T = $0 is $40.00 − $2.75 = $37.25.

### Practice Question 3

**Question:** An investor buys 100 shares of a stock at $62.00 and simultaneously writes one call option contract (100 shares) with a strike price of $65.00 for a premium of $2.40 per share. The breakeven stock price and maximum profit per share for this covered call strategy are:

- **[A]** Breakeven = $59.60; Maximum profit = $5.40

- **[B]** Breakeven = $64.40; Maximum profit = $3.00

- **[C]** Breakeven = $62.60; Maximum profit = Unlimited

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** Net initial cost = S_0 − c_0 = $62.00 − $2.40 = $59.60 (which is the breakeven price). Maximum profit occurs at S_T ≥ $65.00: ($65.00 − $62.00) + $2.40 = $5.40 per share.

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in Call Option Payoff, Profit & Breakeven.**

- **Timing Errors: Mixing beginning and ending balances in Put Option Payoff, Profit & Breakeven.**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Call Option Payoff, Profit & Breakeven: Long Call Payoff = max(0, S_T − X) ; Profit = max(0, S_T − X) − c_0 ; Breakeven S_T* = X + c_0.**

- **Takeaway 2: Put Option Payoff, Profit & Breakeven: Long Put Payoff = max(0, X − S_T) ; Profit = max(0, X − S_T) − p_0 ; Breakeven S_T* = X − p_0.**

- **Takeaway 3: Always distinguish between 'Payoff at Expiration' (which excludes the initial premium c_0.**

- **Takeaway 4: A Covered Call sells upside above X in exchange for premium income (behaving like a Short.**

## Frequently Asked Questions (FAQs)

### What is the primary formula for how to calculate call and put option payoff in Level I Derivatives?

The primary equations for How to Calculate Call Option and Put Option Payoffs govern Derivatives calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is how to calculate call and put option payoff tested on the CFA Level I exam?

On the CFA exam, How to Calculate Call Option and Put Option Payoffs is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level I · Derivatives).

### Related CFA Study Guides

- [Call Options vs Put Options: How Do They Work?](/blog/cfa/cfa-level-1-call-options-vs-put-options-how-they-work/)

- [European vs American Options: Differences With Examples](/blog/cfa/cfa-level-1-european-vs-american-options-differences/)

- [Futures vs Forwards: Differences, Examples and CFA Questions](/blog/cfa/cfa-level-1-futures-vs-forwards-differences-examples/)

