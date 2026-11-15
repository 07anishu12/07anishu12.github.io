---
title: "CFA Derivatives Level 1: Complete Notes and Practice Questions"
seoTitle: "CFA Derivatives Level 1: Complete Notes and Practice Questions — CFA Level I"
slug: cfa-level-1-derivatives-notes-practice-questions
description: "Master cfa derivatives level 1 for Level I (Derivatives). Includes verified CFA formulas, 2 step-by-step solved numerical examples, comparison table, and 3 p."
category: cfa
tags:
  - "CFA"
  - "Level I"
  - "Derivatives"
  - "cfa derivatives level 1"
  - "cfa derivatives level 1 formula"
author: Aniket Thakur
datePublished: "2026-11-11"
dateModified: "2026-11-11"
coverImage: /assets/images/blog/cfa-level-1-derivatives-notes-practice-questions/cover.svg
coverImageAlt: "Illustrative guide to CFA Derivatives Level 1: Complete Notes and Practice Questions"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for CFA Derivatives Level 1: Complete Notes and Practice Questions."
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
  question: "CFA Derivatives Level 1: Complete Notes and Practice Questions: Key Summary & Verdict"
  answer: "CFA Derivatives Level 1: Complete Notes and Practice Questions is a core Level I Derivatives topic (LM 1–10: Derivative Instrument and Market Features, Forward Commitment and Contingent Claim Features, Arbitrage/Replication/Cost of Carry, Pricing and."
  facts:
    - label: "CFA Level"
      value: "Level I"
    - label: "Curriculum Subject"
      value: "Derivatives"
    - label: "Topic Focus"
      value: "cfa derivatives level 1"
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
  - question: "What is the primary formula for cfa derivatives level 1 in Level I Derivatives?"
    answer: "The primary equations for CFA Derivatives Level 1: Complete Notes and Practice Questions govern Derivatives calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is cfa derivatives level 1 tested on the CFA Level I exam?"
    answer: "On the CFA exam, CFA Derivatives Level 1: Complete Notes and Practice Questions is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
  - question: "How does No-Arbitrage Replication Identity connect to related topics in Derivatives?"
    answer: "Within Derivatives, No-Arbitrage Replication Identity links directly to Futures vs Forwards: Differences, Examples and CFA Questions and Cal within the standard CFA Derivatives curriculum framework."
---

## Introduction

CFA Derivatives Level 1: Complete Notes and Practice Questions is a core Level I Derivatives topic (LM 1–10: Derivative Instrument and Market Features, Forward Commitment and Contingent Claim Features, Arbitrage/Replication/Cost of Carry, Pricing and Valuation of Forwards, Futures, Swaps, and Options) focusing on forward commitments (forwards, futures, swaps) vs contingent claims (options, credit default swaps), no-arbitrage replication, and cost-of-carry pricing. This guide covers the governing equations (No-Arbitrage Replication Identity and Continuous & Discrete Cost-of-Carry Forward Price), two verified numerical examples, a comparison table, and three original CFA-style practice questions.

## Concept Explanation & Institutional Framework

From first principles, forward commitments (forwards, futures, swaps) vs contingent claims (options, credit default swaps), no-arbitrage replication, and cost-of-carry pricing links theoretical valuation and risk mechanics to practical decisions in Derivatives. No-Arbitrage Replication Identity (Long Risky Underlying Asset + Short Derivative = Risk-Free Asset (earning R_F)) establishes the primary relationship (Combining a long spot asset with a short forward commitment eliminates price uncertainty, forcing the hedged portfolio to earn the exact risk-free rate R_F.), while Continuous & Discrete Cost-of-Carry Forward Price (F_0(T) = [S_0 − PV(Benefits) + PV(Costs)] × (1 + R_F)^T = S_0 × e^((r_c + c − y) × T)) governs Forward price equals spot price compounded at the risk-free rate plus storage/carrying costs minus income/dividend/convenience yields.

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: No-Arbitrage Replication Identity

```formula
Long Risky Underlying Asset + Short Derivative = Risk-Free Asset (earning R_F)
```

**Institutional Context & Variable Breakdown:** Combining a long spot asset with a short forward commitment eliminates price uncertainty, forcing the hedged portfolio to earn the exact risk-free rate R_F.

### Formula 2: Continuous & Discrete Cost-of-Carry Forward Price

```formula
F_0(T) = [S_0 − PV(Benefits) + PV(Costs)] × (1 + R_F)^T = S_0 × e^((r_c + c − y) × T)
```

**Institutional Context & Variable Breakdown:** Forward price equals spot price compounded at the risk-free rate plus storage/carrying costs minus income/dividend/convenience yields.

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Pricing a 1-Year Equity Forward Contract with Discrete Cash Dividends

**Problem & Given Scenario:**
A stock trades at S_0 = $120.00. It will pay a known $3.30 dividend in 6 months (t = 0.5). The annual effective risk-free rate is R_F = 5.00%. Compute the no-arbitrage 1-year Forward Price F_0(1).

```formula
Long Risky Underlying Asset + Short Derivative = Risk-Free Asset (earning R_F)
```

**Step-by-Step Substitution & Calculation:**

Step 1: Compute Present Value of the dividend at t = 0: PV(D) = $3.30 / (1.05)^0.5 = $3.30 / 1.024695 = $3.2205. Step 2: Subtract PV(D) from S_0 and compound for 1 year at 5.0%: F_0(1) = ($120.00 − $3.2205) × (1.05)^1 = $116.7795 × 1.05 = $122.62 (or $120×1.05 − $3.30×1.05^0.5 = $126.00 − $3.38 = $122.62).

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Because the forward buyer does not receive dividends paid prior to expiration, the dividend lowers the forward price by $3.38.

### Worked Example 2: Cash-and-Carry Arbitrage When a Forward Contract Is Overpriced

**Problem & Given Scenario:**
Suppose the 1-year forward contract above (fair value = $122.62) trades in the market at $125.00. Show the exact riskless arbitrage profit per share at t = 1.

```formula
F_0(T) = [S_0 − PV(Benefits) + PV(Costs)] × (1 + R_F)^T = S_0 × e^((r_c + c − y) × T)
```

**Step-by-Step Substitution & Calculation:**

Since Market Forward ($125.00) > Fair Forward ($122.62), execute Cash-and-Carry Arbitrage ('Buy Low, Sell High'): At t = 0: Borrow $120.00 at 5.0%, buy the stock at $120.00, and go Short the Forward at $125.00 (Net t = 0 cash flow = $0). At t = 1: Deliver stock into forward for +$125.00, add reinvested dividend +$3.38, and repay loan −$126.00 => Riskless Arbitrage Profit = $125.00 + $3.38 − $126.00 = +$2.38 per share!

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Arbitrageurs immediately buy spot and sell the overpriced forward until F_0 converges to $122.62.

## Comparison & Reference Analysis

| Derivative Category | Instruments Included | Payoff Profile & Symmetry | Upfront Premium Paid at t = 0 |
|---|---|---|---|
| Forward Commitments | Forwards, Futures, Swaps | Linear & symmetric (two-sided obligation) | $0 (Zero initial value at inception) |
| Contingent Claims | Call Options, Put Options | Non-linear & asymmetric (right, not obligation) | Positive Option Premium paid by buyer |
| Credit Derivatives (CDS) | Single-name & Index CDS | Contingent on credit event (default/restructuring) | Periodic CDS spread + upfront points |
| Exchange-Traded vs OTC | Futures/Options vs Forwards/Swaps | Clearinghouse daily margin vs bilateral/CCP | Standardized vs customized terms |

## Real-World Financial Applications

In institutional Derivatives practice, analysts apply No-Arbitrage Replication Identity and Continuous & Discrete Cost-of-Carry Forward Price to value securities, audit financial statements, and manage portfolio risk.

## CFA Examination Perspective & Testing Patterns

On the CFA Level I exam (LM 1–10: Derivative Instrument and Market Features, Forward Commitment and Contingent Claim Features, Arbitrage/Replication/Cost of Carry, Pricing and Valuation of Forwards, Futures, Swaps, and Options), cfa derivatives level 1 is tested via standalone 90-second MCQs combining No-Arbitrage Replication Identity calculations with economic interpretation.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** Which of the following instruments is classified as a contingent claim rather than a forward commitment?

- **[A]** An over-the-counter currency forward contract

- **[B]** A plain-vanilla interest rate swap

- **[C]** A European put option or a Credit Default Swap (CDS)

> [!TIP]
> **Correct Answer: Option C.**
>
> **Explanation:** Options and Credit Default Swaps (CDS) are contingent claims whose payoffs depend on a specified event or threshold occurring, whereas forwards, futures, and swaps are linear forward commitments.

### Practice Question 2

**Question:** In a Credit Default Swap (CDS), the 'protection buyer' makes periodic fixed spread payments to the 'protection seller' and has a credit risk exposure economically equivalent to:

- **[A]** Being short the reference entity's risky corporate bond

- **[B]** Being long the reference entity's risky corporate bond

- **[C]** Owning common equity in the reference entity

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** The CDS protection buyer profits if the reference entity defaults or its credit spread widens—economically equivalent to being short the underlying risky bond (while the protection seller is long credit risk).

### Practice Question 3

**Question:** A non-dividend-paying stock trades at $80.00. If the annual risk-free rate is 6.0% and the 1-year forward contract is mispriced in the market at $86.50, an arbitrageur can lock in a riskless profit of $1.70 at expiration by:

- **[A]** Buying the stock at $80.00 (funded by borrowing at 6.0%) and selling the 1-year forward contract at $86.50

- **[B]** Shorting the stock at $80.00 and buying the 1-year forward contract at $86.50

- **[C]** Buying a put option

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** Fair forward price = $80.00 × 1.06 = $84.80. Since the market forward ($86.50) is overpriced by $1.70, buy the underlying stock at $80 (borrowing at 6%) and sell the forward at $86.50 (cash-and-carry arbitrage).

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in No-Arbitrage Replication Identity.**

- **Timing Errors: Mixing beginning and ending balances in Continuous & Discrete Cost-of-Carry Forward Price.**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Curriculum Scope: LM 1–10: Derivative Instrument and Market Features, Forward Commitment and Contingent Claim Features, Arbitrage/Replication/Cost of Carry, Pricing and Valuation of Forwards, Futures, Swaps, and Options (Level I · Derivatives).**

- **Takeaway 2: Primary Formula (No-Arbitrage Replication Identity): Long Risky Underlying Asset + Short Derivative = Risk-Free Asset (earning R_F).**

- **Takeaway 3: Secondary Formula (Continuous & Discrete Cost-of-Carry Forward Price): F_0(T) = [S_0 − PV(Benefits) + PV(Costs)] × (1 + R_F)^T = S_0 × e^((r_c + c − y) × T).**

- **Takeaway 4: Key Insight 1: Because the forward buyer does not receive dividends paid prior to expiration, the dividend lowers the forward price by $3.38.**

- **Takeaway 5: Key Insight 2: Arbitrageurs immediately buy spot and sell the overpriced forward until F_0 converges to $122.62.**

## Frequently Asked Questions (FAQs)

### What is the primary formula for cfa derivatives level 1 in Level I Derivatives?

The primary equations for CFA Derivatives Level 1: Complete Notes and Practice Questions govern Derivatives calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is cfa derivatives level 1 tested on the CFA Level I exam?

On the CFA exam, CFA Derivatives Level 1: Complete Notes and Practice Questions is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

### How does No-Arbitrage Replication Identity connect to related topics in Derivatives?

Within Derivatives, No-Arbitrage Replication Identity links directly to Futures vs Forwards: Differences, Examples and CFA Questions and Cal within the standard CFA Derivatives curriculum framework.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level I · Derivatives).

### Related CFA Study Guides

- [Futures vs Forwards: Differences, Examples and CFA Questions](/blog/cfa/cfa-level-1-futures-vs-forwards-differences-examples/)

- [Call Options vs Put Options: How Do They Work?](/blog/cfa/cfa-level-1-call-options-vs-put-options-how-they-work/)

- [How to Calculate Call Option and Put Option Payoffs](/blog/cfa/cfa-level-1-calculate-call-option-and-put-option-payoffs/)

