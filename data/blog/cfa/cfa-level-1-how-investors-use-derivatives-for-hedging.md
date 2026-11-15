---
title: "How Do Investors Use Derivatives for Hedging?"
seoTitle: "How Do Investors Use Derivatives for Hedging? — CFA Level I"
slug: cfa-level-1-how-investors-use-derivatives-for-hedging
description: "Master how do investors use derivatives for hedging for Level I (Derivatives). Includes verified CFA formulas, 2 step-by-step solved numerical examples, comp."
category: cfa
tags:
  - "CFA"
  - "Level I"
  - "Derivatives"
  - "how do investors use derivatives for hedging"
  - "how do investors use derivatives for hedging formula"
author: Aniket Thakur
datePublished: "2026-11-11"
dateModified: "2026-11-11"
coverImage: /assets/images/blog/cfa-level-1-how-investors-use-derivatives-for-hedging/cover.svg
coverImageAlt: "Illustrative guide to How Do Investors Use Derivatives for Hedging?"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for How Do Investors Use Derivatives for Hedging?."
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
  question: "How Do Investors Use Derivatives for Hedging?: Key Summary & Verdict"
  answer: "How Do Investors Use Derivatives for Hedging? is a core Level I Derivatives topic (LM 1, LM 5 & Portfolio Management: Hedging with Forwards/Futures/Options/Swaps — Short hedge vs long hedge, Forward Rate Agreements (FRAs), protective put vs collar) focusing."
  facts:
    - label: "CFA Level"
      value: "Level I"
    - label: "Curriculum Subject"
      value: "Derivatives"
    - label: "Topic Focus"
      value: "how do investors use derivatives fo"
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
  - question: "What is the primary formula for how do investors use derivatives for hedging in Level I Derivatives?"
    answer: "The primary equations for How Do Investors Use Derivatives for Hedging? govern Derivatives calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is how do investors use derivatives for hedging tested on the CFA Level I exam?"
    answer: "On the CFA exam, How Do Investors Use Derivatives for Hedging? is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
  - question: "How does Forward Rate Agreement (FRA) Cash Settlement at Loan Start (t = A) connect to related topics in Derivatives?"
    answer: "Within Derivatives, Forward Rate Agreement (FRA) Cash Settlement at Loan Start (t = A) links directly to Interest Rate Swaps Explained With within the standard CFA Derivatives curriculum framework."
---

## Introduction

How Do Investors Use Derivatives for Hedging? is a core Level I Derivatives topic (LM 1, LM 5 & Portfolio Management: Hedging with Forwards/Futures/Options/Swaps — Short hedge vs long hedge, Forward Rate Agreements (FRAs), protective put vs collar) focusing on designing short hedges (for asset holders/producers) and long hedges (for future buyers/end-users), Forward Rate Agreement (FRA) interest rate hedging, and option collars. This guide covers the governing equations (Forward Rate Agreement (FRA) Cash Settlement at Loan Start (t = A) and Zero-Cost Collar Option Hedge (Protective Put + Covered Call)), two verified numerical examples, a comparison table, and three original CFA-style practice questions.

## Concept Explanation & Institutional Framework

From first principles, designing short hedges (for asset holders/producers) and long hedges (for future buyers/end-users), Forward Rate Agreement (FRA) interest rate hedging, and option collars links theoretical valuation and risk mechanics to practical decisions in Derivatives. Forward Rate Agreement (FRA) Cash Settlement at Loan Start (t = A) (FRA Settlement (to Long / Fixed Payer) = Notional × [(MRR_{B−A} − FRA Rate) × τ] / [1 + (MRR_{B−A} × τ)]) establishes the primary relationship (Because FRA settlement occurs at the beginning of the loan period (t = A) whereas loan interest is paid at the end (t = B), the interest difference is discounted back by [1 + MRR × τ].), while Zero-Cost Collar Option Hedge (Protective Put + Covered Call) (Collar Position = Long Underlying S_0 + Long OTM Put (X_Put < S_0) + Short OTM Call (X_Call > S_0 where c_0 = p_0)) governs Finances downside put protection below X_Put by selling upside call appreciation above X_Call for zero net out-of-pocket premium.

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: Forward Rate Agreement (FRA) Cash Settlement at Loan Start (t = A)

```formula
FRA Settlement (to Long / Fixed Payer) = Notional × [(MRR_{B−A} − FRA Rate) × τ] / [1 + (MRR_{B−A} × τ)]
```

**Institutional Context & Variable Breakdown:** Because FRA settlement occurs at the beginning of the loan period (t = A) whereas loan interest is paid at the end (t = B), the interest difference is discounted back by [1 + MRR × τ].

### Formula 2: Zero-Cost Collar Option Hedge (Protective Put + Covered Call)

```formula
Collar Position = Long Underlying S_0 + Long OTM Put (X_Put < S_0) + Short OTM Call (X_Call > S_0 where c_0 = p_0)
```

**Institutional Context & Variable Breakdown:** Finances downside put protection below X_Put by selling upside call appreciation above X_Call for zero net out-of-pocket premium.

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Hedging a Future Corporate Borrowing Rate Using a 3x9 Forward Rate Agreement (FRA)

**Problem & Given Scenario:**
A treasurer will borrow $40,000,000 in 3 months (t = 3m) for a 6-month loan period (ending at t = 9m, so τ = 180/360 = 0.50). To lock in the borrowing rate today, the treasurer goes LONG a 3x9 FRA (Pay-Fixed, Receive-Floating) at an FRA rate of 4.50%. At t = 3 months, actual 6-month SOFR is 5.30%. Calculate the exact cash settlement at t = 3 months.

```formula
FRA Settlement (to Long / Fixed Payer) = Notional × [(MRR_{B−A} − FRA Rate) × τ] / [1 + (MRR_{B−A} × τ)]
```

**Step-by-Step Substitution & Calculation:**

Step 1: Undiscounted interest savings at t = 9 months = $40,000,000 × (0.0530 − 0.0450) × (180/360) = $40,000,000 × 0.0080 × 0.50 = +$160,000. Step 2: Discount from t = 9m back to FRA settlement date t = 3m at actual 6-month SOFR (5.30%): FRA Cash Settlement = $160,000 / [1 + (0.0530 × 0.50)] = $160,000 / 1.0265 = +$155,869.46.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> If the treasurer invests the $155,869.46 FRA payout at 5.30% for the 6-month loan period, it grows to $160,000 at t = 9m, reducing net loan interest from $1,060,000 (5.30%) to exactly $900,000 (4.50% locked rate!).

### Worked Example 2: Hedging an Equity Position with a Zero-Cost Collar

**Problem & Given Scenario:**
An executive holds 10,000 shares of company stock at S_0 = $100.00 ($1,000,000). She buys 100 Put contracts at strike X_P = $90.00 for p_0 = $4.20 and sells 100 Call contracts at strike X_C = $112.00 for c_0 = $4.20.

```formula
Collar Position = Long Underlying S_0 + Long OTM Put (X_Put < S_0) + Short OTM Call (X_Call > S_0 where c_0 = p_0)
```

**Step-by-Step Substitution & Calculation:**

Net initial option outlay = $4.20 − $4.20 = $0.00 (Zero-Cost Collar). Worst-case portfolio value at expiration (if S_T ≤ $90) = 10,000 × $90.00 = $900,000 (max loss capped at −10%). Best-case portfolio value (if S_T ≥ $112) = 10,000 × $112.00 = $1,120,000 (max gain capped at +12%).

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> A collar eliminates out-of-pocket hedging cost by trading away upside above $112 to fund the $90 floor.

## Comparison & Reference Analysis

| Underlying Exposure | Market Risk Faced | Correct Derivative Hedge | Hedge Classification |
|---|---|---|---|
| Gold Miner / Oil Producer | Falling commodity price | Short Futures / Buy Put Options | Short Hedge |
| Airline Buying Jet Fuel in 6m | Rising energy/fuel price | Long Futures / Buy Call Options | Long Hedge |
| Corporation Borrowing in 3m | Rising interest rates (MRR) | Long FRA (Pay-Fixed, Rec-Floating) | Rate Cap / Forward Lock |
| US Exporter Receiving EUR | EUR depreciating vs USD | Sell EUR Forward (USD/EUR) | Short Currency Hedge |

## Real-World Financial Applications

In institutional Derivatives practice, analysts apply Forward Rate Agreement (FRA) Cash Settlement at Loan Start (t = A) and Zero-Cost Collar Option Hedge (Protective Put + Covered Call) to value securities, audit financial statements, and manage portfolio risk.

## CFA Examination Perspective & Testing Patterns

On the CFA Level I exam (LM 1, LM 5 & Portfolio Management: Hedging with Forwards/Futures/Options/Swaps — Short hedge vs long hedge, Forward Rate Agreements (FRAs), protective put vs collar), how do investors use derivatives for hedging is tested via standalone 90-second MCQs combining Forward Rate Agreement (FRA) Cash Settlement at Loan Start (t = A) calculations with economic interpretation.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** A corporate borrower plans to issue a 90-day commercial paper loan in 60 days and wants to hedge against rising short-term interest rates. The borrower should:

- **[A]** Enter a long position in a 2x5 Forward Rate Agreement (FRA), which is a pay-fixed, receive-floating contract

- **[B]** Enter a short position in a 2x5 FRA (receive-fixed, pay-floating)

- **[C]** Buy interest rate futures contracts

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** In CFA terminology, a 'Long FRA' is the party that pays the fixed rate and receives the floating reference rate (profiting when interest rates rise, which offsets higher borrowing costs on the upcoming loan).

### Practice Question 2

**Question:** An agricultural wheat farmer who will harvest 50,000 bushels of wheat in 4 months and wants to lock in the selling price today should execute a:

- **[A]** Long hedge by buying wheat futures

- **[B]** Short hedge by selling wheat futures

- **[C]** Short put option on wheat

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** Because the farmer is naturally long the physical wheat harvest and fears a price drop, the farmer executes a Short Hedge by selling wheat futures.

### Practice Question 3

**Question:** What is 'basis risk' in a futures hedging strategy?

- **[A]** The risk that the central clearinghouse defaults

- **[B]** The risk that the spot price of the hedged asset and the futures price do not move in lockstep (due to grade, location, or maturity differences), causing the Basis (Spot − Futures) to change unexpectedly

- **[C]** The risk that initial margin is refunded

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** Basis = Spot Price − Futures Price. When the hedged asset differs slightly in grade, delivery location, or timing from the standardized futures contract (a cross-hedge), imperfect correlation creates basis risk.

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in Forward Rate Agreement (FRA) Cash Settlement at Loan Start (t = A).**

- **Timing Errors: Mixing beginning and ending balances in Zero-Cost Collar Option Hedge (Protective Put + Covered Call).**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Curriculum Scope: LM 1, LM 5 & Portfolio Management: Hedging with Forwards/Futures/Options/Swaps — Short hedge vs long hedge, Forward Rate Agreements (FRAs), protective put vs collar (Level I · Derivatives).**

- **Takeaway 2: Primary Formula (Forward Rate Agreement (FRA) Cash Settlement at Loan Start (t = A)): FRA Settlement (to Long / Fixed Payer) = Notional × [(MRR_{B−A} − FRA Rate) × τ] / [1 + (MRR_{B−A} × τ)].**

- **Takeaway 3: Secondary Formula (Zero-Cost Collar Option Hedge (Protective Put + Covered Call)): Collar Position = Long Underlying S_0 + Long OTM Put (X_Put < S_0) + Short OTM Call (X_Call > S_0 where c_0 = p_0).**

- **Takeaway 4: Key Insight 1: If the treasurer invests the $155,869.46 FRA payout at 5.30% for the 6-month loan period, it grows to $160,000 at t = 9m, reducing net loan.**

- **Takeaway 5: Key Insight 2: A collar eliminates out-of-pocket hedging cost by trading away upside above $112 to fund the $90 floor.**

## Frequently Asked Questions (FAQs)

### What is the primary formula for how do investors use derivatives for hedging in Level I Derivatives?

The primary equations for How Do Investors Use Derivatives for Hedging? govern Derivatives calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is how do investors use derivatives for hedging tested on the CFA Level I exam?

On the CFA exam, How Do Investors Use Derivatives for Hedging? is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

### How does Forward Rate Agreement (FRA) Cash Settlement at Loan Start (t = A) connect to related topics in Derivatives?

Within Derivatives, Forward Rate Agreement (FRA) Cash Settlement at Loan Start (t = A) links directly to Interest Rate Swaps Explained With within the standard CFA Derivatives curriculum framework.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level I · Derivatives).

### Related CFA Study Guides

- [Interest Rate Swaps Explained With Numerical Examples](/blog/cfa/cfa-level-1-interest-rate-swaps-explained-examples/)

- [Derivatives Practice Questions for CFA Level 1 With Solutions](/blog/cfa/cfa-level-1-derivatives-practice-questions-with-solutions/)

- [How to Calculate Profit and Loss in Futures Contracts](/blog/cfa/cfa-level-1-calculate-profit-and-loss-in-futures-contracts/)

