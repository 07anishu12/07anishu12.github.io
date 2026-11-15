---
title: "How to Calculate Forward Exchange Rates Using Interest Rate Parity"
seoTitle: "How to Calculate Forward Exchange Rates Using Interest Rate Parity — CFA Level II"
slug: cfa-level-2-calculate-forward-exchange-rates-interest-rate-parity
description: "Master interest rate parity forward exchange rate cfa for Level II (Economics). Includes verified CFA formulas, 2 step-by-step solved numerical examples, com."
category: cfa
tags:
  - "CFA"
  - "Level II"
  - "Economics"
  - "interest rate parity forward exchange rate cfa"
  - "interest rate parity forward exchange rate cfa formula"
author: Aniket Thakur
datePublished: "2026-11-13"
dateModified: "2026-11-13"
coverImage: /assets/images/blog/cfa-level-2-calculate-forward-exchange-rates-interest-rate-parity/cover.svg
coverImageAlt: "Illustrative guide to How to Calculate Forward Exchange Rates Using Interest Rate Parity"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for How to Calculate Forward Exchange Rates Using Interest Rate Parity."
draft: false
featured: false
sources:
  - title: "CFA Institute 2026–2027 Program Curriculum: Economics"
    url: https://www.cfainstitute.org/en/programs/cfa/curriculum
  - title: "CFA Institute Candidate Study Resources & Topic Outlines"
    url: https://www.cfainstitute.org/en/programs/cfa/candidate
showSources: true
enquiry: false
quickAnswer:
  question: "How to Calculate Forward Exchange Rates Using Interest Rate Parity: Key Summary & Verdict"
  answer: "How to Calculate Forward Exchange Rates Using Interest Rate Parity covers calculating dealer Bid and Ask cross-exchange rates, triangular currency arbitrage, Covered Interest Rate Parity (CIRP) forward rates, and marking a seasoned currency forward contract."
  facts:
    - label: "CFA Level"
      value: "Level II"
    - label: "Curriculum Subject"
      value: "Economics"
    - label: "Topic Focus"
      value: "interest rate parity forward exchan"
    - label: "Syllabus Standard"
      value: "2026–2027 Curriculum"
  goodFor:
    - "Candidates preparing for CFA Level II (Economics) exam questions."
    - "Financial analysts requiring verified formulas and worked calculations."
  watchFor:
    - "Verify compounding periodicity, sign conventions, and calculator mode (BGN vs END)."
    - "Review boundary conditions and common exam distractor traps."
  note: "2026–2027 CFA Program Curriculum Series · Aniket Thakur"
faqItems:
  - question: "What is the primary formula for interest rate parity forward exchange rate cfa in Level II Economics?"
    answer: "The primary equations for How to Calculate Forward Exchange Rates Using Interest Rate Parity govern Economics calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is interest rate parity forward exchange rate cfa tested on the CFA Level II exam?"
    answer: "On the CFA exam, How to Calculate Forward Exchange Rates Using Interest Rate Parity is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
---

## Introduction

How to Calculate Forward Exchange Rates Using Interest Rate Parity covers calculating dealer Bid and Ask cross-exchange rates, triangular currency arbitrage, Covered Interest Rate Parity (CIRP) forward rates, and marking a seasoned currency forward contract to market using bid/ask quotes in Level II Economics (LM 1: Currency Exchange Rates: Understanding Equilibrium Value — Dealer Bid-Ask Cross Rates, Covered Interest Rate Parity (CIRP), Forward Premium/Discount, Mark-to-Market Value of a Currency Forward), with verified formulas, two worked examples, and three practice MCQs.

## Concept Explanation & Institutional Framework

Dealer Bid-Ask Cross-Rate Rules (Price / Base) (Multiply Rules: (A/B)_Bid = (A/C)_Bid × (C/B)_Bid ; (A/B)_Ask = (A/C)_Ask × (C/B)_Ask ; Inversion Rule: (B/A)_Bid = 1 / (A/B)_Ask ; (B/A)_Ask = 1 / (A/B)_Bid) and Mark-to-Market Value of an Existing Currency Forward Contract (V_t (per 1 Base Currency) = [ (F_t − F_0) / (1 + r_Price × Days_Remaining / 360) ] × Notional_Base) govern calculating dealer Bid and Ask cross-exchange rates, triangular currency arbitrage, Covered Interest Rate Parity (CIRP) forward rates, and marking a seasoned currency forward contract to market using bid/ask quotes.

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: Dealer Bid-Ask Cross-Rate Rules (Price / Base)

```formula
Multiply Rules: (A/B)_Bid = (A/C)_Bid × (C/B)_Bid

(A/B)_Ask = (A/C)_Ask × (C/B)_Ask

Inversion Rule: (B/A)_Bid = 1 / (A/B)_Ask

(B/A)_Ask = 1 / (A/B)_Bid
```

**Institutional Context & Variable Breakdown:** When inverting a currency quote, ALWAYS flip Bid and Ask: the new Bid is 1 divided by the old Ask, and the new Ask is 1 divided by the old Bid!.

### Formula 2: Mark-to-Market Value of an Existing Currency Forward Contract

```formula
V_t (per 1 Base Currency) = [ (F_t − F_0) / (1 + r_Price × Days_Remaining / 360) ] × Notional_Base
```

**Institutional Context & Variable Breakdown:**

- To close out an existing Long Base currency forward at time t, use the dealer's new forward BID price for F_t.

- to close out a Short Base forward, use the dealer's new forward ASK price for F_t!.

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Calculating Dealer Bid-Ask Cross Rates and Checking for Triangular Arbitrage

**Problem & Given Scenario:**
An interbank dealer quotes: USD/EUR = 1.0800 Bid / 1.0810 Ask, and USD/GBP = 1.2600 Bid / 1.2620 Ask. Compute the implied dealer Bid and Ask cross-rates for EUR/GBP (Price = EUR, Base = GBP). If a competing bank quotes EUR/GBP = 1.1685 Bid / 1.1695 Ask, test whether triangular arbitrage exists.

```formula
Multiply Rules: (A/B)_Bid = (A/C)_Bid × (C/B)_Bid

(A/B)_Ask = (A/C)_Ask × (C/B)_Ask

Inversion Rule: (B/A)_Bid = 1 / (A/B)_Ask

(B/A)_Ask = 1 / (A/B)_Bid
```

**Step-by-Step Substitution & Calculation:**

Step 1: We need EUR/GBP = (EUR / USD) × (USD / GBP). First invert USD/EUR to get EUR/USD (flipping Bid and Ask!): (EUR/USD)_Bid = 1 / 1.0810 = 0.925069; (EUR/USD)_Ask = 1 / 1.0800 = 0.925926. Step 2: Multiply Bids and Multiply Asks: (EUR/GBP)_Bid = 0.925069 × 1.2600 = 1.165587 ≈ 1.1656; (EUR/GBP)_Ask = 0.925926 × 1.2620 = 1.168519 ≈ 1.1685. Implied Interbank Quote = 1.1656 Bid / 1.1685 Ask. Step 3 (Arbitrage Check): The competing bank's Bid (1.1685) does NOT exceed our implied Ask (1.168519), and its Ask (1.1695) is NOT below our implied Bid (1.1656)—so the bid-ask bands overlap and NO arbitrage profit exists!

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Triangular arbitrage exists ONLY if Market2_Bid > Implied_Ask (or Market2_Ask < Implied_Bid)—i.e., the two bid-ask spreads must not overlap at all.

### Worked Example 2: Marking a Seasoned Currency Forward to Market Using Bid-Ask Forward Points

**Problem & Given Scenario:**
Three months ago (t = 0), a US fund sold (went SHORT) €10,000,000 (Base currency = EUR) 6 months forward at a locked-in forward rate of F_0 = 1.0950 USD/EUR. Today (t = 3m, with 90 days remaining until settlement), the spot USD/EUR quote is 1.0820 / 1.0826, the 90-day forward points are +30 / +34 (in pips of 0.0001), and the 90-day USD interest rate is r_USD = 4.80% (Actual/360). Calculate the mark-to-market value of the fund's Short EUR forward position.

```formula
V_t (per 1 Base Currency) = [ (F_t − F_0) / (1 + r_Price × Days_Remaining / 360) ] × Notional_Base
```

**Step-by-Step Substitution & Calculation:**

Step 1 (Identify Closing Side — Buy Back EUR at Dealer's 90-Day Forward ASK!): Because the fund is Short EUR, closing the position requires BUYING EUR 90 days forward at the dealer's ASK price. Step 2 (Compute 90-Day Forward Ask F_t): Spot Ask = 1.0826 + Forward Ask Points (+0.0034) = 1.0860 USD/EUR. Step 3 (Discount Gain to Today at r_Price = r_USD = 4.80%): V_t = €10,000,000 × (1.0950 − 1.0860) / [1 + 0.0480 × (90 / 360)] = €10,000,000 × 0.0090 / 1.0120 = $90,000 / 1.0120 = +$88,932.81.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Three rules for Level II FX Forward Valuation: (1) Short Base closes at Dealer Forward Ask (Long Base closes at Dealer Forward Bid); (2) Divide forward points by 10,000 (or 100 for JPY); (3) Discount using the PRICE currency interest rate (USD)!

## Comparison & Reference Analysis

| Original Position Held | Offsetting Trade to Close at Time t | Dealer Quote Used for F_t | Discount Rate Used for (T − t) |
|---|---|---|---|
| Long Base Currency Forward | Sell Base Currency Forward (T−t) | Dealer (T−t) Forward BID | Price Currency Rate (r_Price) |
| Short Base Currency Forward | Buy Base Currency Forward (T−t) | Dealer (T−t) Forward ASK | Price Currency Rate (r_Price) |
| Inverting (P/B) to (B/P) | New Bid = 1 / Old Ask | New Ask = 1 / Old Bid | Keep Bid < Ask strictly |
| Adding Forward Points | Bid_Fwd = Bid_Spot + Bid_Pts | Ask_Fwd = Ask_Spot + Ask_Pts | Ask_Pts > Bid_Pts widens spread |

## Real-World Financial Applications

Analysts apply Dealer Bid-Ask Cross-Rate Rules (Price / Base) and Mark-to-Market Value of an Existing Currency Forward Contract across Economics valuation and risk management.

## CFA Examination Perspective & Testing Patterns

Tested on the CFA Level II exam (LM 1: Currency Exchange Rates: Understanding Equilibrium Value — Dealer Bid-Ask Cross Rates, Covered Interest Rate Parity (CIRP), Forward Premium/Discount, Mark-to-Market Value of a Currency Forward) via quantitative and conceptual MCQs.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** An interbank dealer quotes spot USD/AUD = 0.6500 Bid / 0.6510 Ask, and spot MXN/USD = 17.0000 Bid / 17.0200 Ask. The implied dealer Bid and Ask cross-rates for MXN/AUD (Price = MXN, Base = AUD) are:

- **[A]** 11.0500 Bid / 11.0800 Ask

- **[B]** 11.0630 Bid / 11.0670 Ask

- **[C]** 26.1137 Bid / 26.1846 Ask

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** Since USD cancels directly via multiplication [(MXN/USD) × (USD/AUD) = MXN/AUD]: Bid = 17.0000 × 0.6500 = 11.0500; Ask = 17.0200 × 0.6510 = 11.08002 ≈ 11.0800.

### Practice Question 2

**Question:** A corporate treasurer entered a LONG 180-day forward contract on £5,000,000 (Base = GBP, Price = USD) at F_0 = 1.2500 USD/GBP. Sixty days later (120 days remaining), the spot USD/GBP quote is 1.2680 / 1.2690, the 120-day forward points are −20 / −15, and the 120-day interest rates are r_USD = 5.10% and r_GBP = 5.60% (Actual/360). The mark-to-market value of the long forward contract today is closest to:

- **[A]** +$78,663

- **[B]** +$81,121

- **[C]** +$88,496

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** To close a LONG GBP forward, sell GBP 120 days forward at the dealer's 120-day Forward BID: F_t_Bid = Spot Bid (1.2680) + Bid Points (−0.0020) = 1.2660 USD/GBP. Discount using the Price currency (USD) rate (5.10% for 120 days): V_t = £5,000,000 × (1.2660 − 1.2500) / [1 + 0.0510 × (120/360)] = $80,000 / 1.0170 = +$78,662.73.

### Practice Question 3

**Question:** Why does Covered Interest Rate Parity (CIRP) hold almost exactly in liquid currencies with free capital mobility, whereas Uncovered Interest Rate Parity (UIRP) often fails over short and medium horizons?

- **[A]** Because CIRP is enforced by riskless, self-financing arbitrage using a forward contract signed today, whereas UIRP relies on risk-neutral expectations without a forward hedge (leaving investors exposed to currency risk and enabling the FX carry trade)

- **[B]** Because forward contracts are illegal in developed markets

- **[C]** Because central banks fix forward points

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** CIRP locks in the future exchange rate via a forward contract (riskless arbitrage), whereas UIRP leaves the exchange rate unhedged, allowing high-yield currencies to outperform low-yield funding currencies in calm regimes (the FX carry trade).

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in Dealer Bid-Ask Cross-Rate Rules (Price / Base).**

- **Timing Errors: Mixing beginning and ending balances in Mark-to-Market Value of an Existing Currency Forward Contract.**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Dealer Bid-Ask Cross-Rate Rules (Price / Base): Multiply Rules: (A/B)_Bid = (A/C)_Bid × (C/B)_Bid ; (A/B)_Ask = (A/C)_Ask × (C/B)_Ask ; Inversion Rule: (B/A)_Bid = 1 / (A/B)_Ask ; (B/A)_Ask = 1 / (A/B)_Bid.**

- **Takeaway 2: Mark-to-Market Value of an Existing Currency Forward Contract: V_t (per 1 Base Currency) = [ (F_t − F_0) / (1 + r_Price × Days_Remaining / 360) ] × Notional_Base.**

- **Takeaway 3: Triangular arbitrage exists ONLY if Market2_Bid > Implied_Ask (or Market2_Ask < Implied_Bi.**

- **Takeaway 4: Three rules for Level II FX Forward Valuation: (1) Short Base closes at Dealer Forward.**

## Frequently Asked Questions (FAQs)

### What is the primary formula for interest rate parity forward exchange rate cfa in Level II Economics?

The primary equations for How to Calculate Forward Exchange Rates Using Interest Rate Parity govern Economics calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is interest rate parity forward exchange rate cfa tested on the CFA Level II exam?

On the CFA exam, How to Calculate Forward Exchange Rates Using Interest Rate Parity is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level II · Economics).

### Related CFA Study Guides

- [CFA Level 2 Economics: Complete Notes and Important Formulas](/blog/cfa/cfa-level-2-economics-complete-notes-and-formulas/)

- [Purchasing Power Parity vs Interest Rate Parity: CFA Questions](/blog/cfa/cfa-level-2-purchasing-power-parity-vs-interest-rate-parity/)

- [How to Analyse Currency Appreciation and Depreciation](/blog/cfa/cfa-level-2-analyse-currency-appreciation-and-depreciation/)

