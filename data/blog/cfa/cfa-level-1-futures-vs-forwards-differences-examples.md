---
title: "Futures vs Forwards: Differences, Examples and CFA Questions"
seoTitle: "Futures vs Forwards: Differences, Examples and CFA Questions — CFA Level I"
slug: cfa-level-1-futures-vs-forwards-differences-examples
description: "Master futures vs forwards cfa for Level I (Derivatives). Includes verified CFA formulas, 2 step-by-step solved numerical examples, comparison table, and 3 p."
category: cfa
tags:
  - "CFA"
  - "Level I"
  - "Derivatives"
  - "futures vs forwards cfa"
  - "futures vs forwards cfa formula"
author: Aniket Thakur
datePublished: "2026-11-11"
dateModified: "2026-11-11"
coverImage: /assets/images/blog/cfa-level-1-futures-vs-forwards-differences-examples/cover.svg
coverImageAlt: "Illustrative guide to Futures vs Forwards: Differences, Examples and CFA Questions"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for Futures vs Forwards: Differences, Examples and CFA Questions."
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
  question: "Futures vs Forwards: Differences, Examples and CFA Questions: Key Summary & Verdict"
  answer: "Futures vs Forwards: Differences, Examples and CFA Questions is a core Level I Derivatives topic (LM 1 & LM 6: Forward vs Futures Market Mechanics — Daily mark-to-market (MTM) settlement, initial and maintenance margin, clearinghouse novation, forward vs."
  facts:
    - label: "CFA Level"
      value: "Level I"
    - label: "Curriculum Subject"
      value: "Derivatives"
    - label: "Topic Focus"
      value: "futures vs forwards cfa"
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
  - question: "What is the primary formula for futures vs forwards cfa in Level I Derivatives?"
    answer: "The primary equations for Futures vs Forwards: Differences, Examples and CFA Questions govern Derivatives calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is futures vs forwards cfa tested on the CFA Level I exam?"
    answer: "On the CFA exam, Futures vs Forwards: Differences, Examples and CFA Questions is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
  - question: "How does Daily Futures Mark-to-Market Valuation vs. Forward Valuation connect to related topics in Derivatives?"
    answer: "Within Derivatives, Daily Futures Mark-to-Market Valuation vs. Forward Valuation links directly to CFA Derivatives Level 1: Complete Notes a within the standard CFA Derivatives curriculum framework."
---

## Introduction

Futures vs Forwards: Differences, Examples and CFA Questions is a core Level I Derivatives topic (LM 1 & LM 6: Forward vs Futures Market Mechanics — Daily mark-to-market (MTM) settlement, initial and maintenance margin, clearinghouse novation, forward vs futures price divergence) focusing on comparing OTC forwards and exchange-traded futures across customization, central clearinghouse novation, daily mark-to-market margin resets, and interest rate correlation price divergence. This guide covers the governing equations (Daily Futures Mark-to-Market Valuation vs. Forward Valuation and Futures Margin Replenishment Rule (Unlike Stock Margin!)), two verified numerical examples, a comparison table, and three original CFA-style practice questions.

## Concept Explanation & Institutional Framework

From first principles, comparing OTC forwards and exchange-traded futures across customization, central clearinghouse novation, daily mark-to-market margin resets, and interest rate correlation price divergence links theoretical valuation and risk mechanics to practical decisions in Derivatives. Daily Futures Mark-to-Market Valuation vs. Forward Valuation (V_t(Futures) = 0 after daily MTM settlement ; V_t(Forward) = S_t − PV(Benefits_{t,T}) + PV(Costs_{t,T}) − [F_0(T) / (1 + R_F)^(T−t)]) establishes the primary relationship (Futures reset contract value to zero every afternoon by paying/collecting daily price changes in cash; forwards accumulate gains/losses until maturity T.), while Futures Margin Replenishment Rule (Unlike Stock Margin!) (If Margin Balance < Maintenance Margin => Deposit Cash back to FULL INITIAL MARGIN (not Maintenance Margin)) governs In futures trading, a variation margin call requires restoring the account all the way back to the Initial Margin level.

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: Daily Futures Mark-to-Market Valuation vs. Forward Valuation

```formula
V_t(Futures) = 0 after daily MTM settlement

V_t(Forward) = S_t − PV(Benefits_{t,T}) + PV(Costs_{t,T}) − [F_0(T) / (1 + R_F)^(T−t)]
```

**Institutional Context & Variable Breakdown:**

- Futures reset contract value to zero every afternoon by paying/collecting daily price changes in cash.

- forwards accumulate gains/losses until maturity T.

### Formula 2: Futures Margin Replenishment Rule (Unlike Stock Margin!)

```formula
If Margin Balance < Maintenance Margin => Deposit Cash back to FULL INITIAL MARGIN (not Maintenance Margin)
```

**Institutional Context & Variable Breakdown:** In futures trading, a variation margin call requires restoring the account all the way back to the Initial Margin level.

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Tracking a Futures Account and Variation Margin Call vs. Forward Accumulation

**Problem & Given Scenario:**
A trader goes Long 10 gold futures contracts (100 oz per contract = 1,000 oz total) at F_0 = $2,400/oz ($2,400,000 notional). Initial Margin is $12,000/contract ($120,000 total) and Maintenance Margin is $9,000/contract ($90,000 total). On Day 1, gold futures drop by $35/oz to $2,365/oz.

```formula
V_t(Futures) = 0 after daily MTM settlement

V_t(Forward) = S_t − PV(Benefits_{t,T}) + PV(Costs_{t,T}) − [F_0(T) / (1 + R_F)^(T−t)]
```

**Step-by-Step Substitution & Calculation:**

Step 1: Day 1 MTM Loss = 1,000 oz × (−$35/oz) = −$35,000. Step 2: Ending Day 1 Margin Balance = $120,000 − $35,000 = $85,000. Step 3: Because $85,000 < $90,000 Maintenance Margin, the trader receives a Variation Margin Call. Step 4: Required Cash Deposit to restore FULL Initial Margin ($120,000) = $120,000 − $85,000 = $35,000! (In an OTC forward without CSA collateral, $0 cash changes hands on Day 1).

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> In futures markets, variation margin calls restore the balance to Initial Margin ($120,000), whereas equity margin calls only restore to Maintenance Margin.

### Worked Example 2: When Futures Prices Exceed or Fall Below Forward Prices

**Problem & Given Scenario:**
Compare a 1-year Futures Price and a 1-year Forward Price on the exact same underlying asset under three interest rate regimes: (1) Constant/deterministic interest rates; (2) Underlying asset price is positively correlated with interest rates; (3) Underlying asset price is negatively correlated with interest rates (e.g., fixed-income bonds).

```formula
If Margin Balance < Maintenance Margin => Deposit Cash back to FULL INITIAL MARGIN (not Maintenance Margin)
```

**Step-by-Step Substitution & Calculation:**

- **Step 1. Constant interest rates: Futures Price = Forward Price.**

- **Step 2. Positive correlation Corr(S, r) > 0: Long futures holders receive daily MTM cash gains when rates are high (reinvesting at high rates) and fund MTM losses when rates are low -> Futures is more attractive -> Futures Price > Forward Price.**

- **Step 3. Negative correlation Corr(S, r) < 0: Futures gains occur when rates are low and losses occur when rates are high -> Forward is preferred -> Forward Price > Futures Price.**

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> This correlation rule between daily MTM cash flows and interest rates is a classic CFA Level I & II conceptual test item.

## Comparison & Reference Analysis

| Feature | Exchange-Traded Futures | Over-the-Counter (OTC) Forwards | Risk & Operational Impact |
|---|---|---|---|
| Contract Terms | Standardized (size, quality, dates) | Customized to exact client need | Forwards avoid basis/tail mismatch |
| Counterparty Credit Risk | Central Clearinghouse (near zero) | Bilateral counterparty default risk | Clearinghouse novates every trade |
| Settlement & Margin | Daily Mark-to-Market (MTM) cash reset | Settled at expiration T (or CSA) | Futures resets V_t = $0 daily |
| Margin Call Replenishment | Restore to FULL Initial Margin | Negotiated Credit Support Annex | Differs from equity maintenance margin |

## Real-World Financial Applications

In institutional Derivatives practice, analysts apply Daily Futures Mark-to-Market Valuation vs. Forward Valuation and Futures Margin Replenishment Rule (Unlike Stock Margin!) to value securities, audit financial statements, and manage portfolio risk.

## CFA Examination Perspective & Testing Patterns

On the CFA Level I exam (LM 1 & LM 6: Forward vs Futures Market Mechanics — Daily mark-to-market (MTM) settlement, initial and maintenance margin, clearinghouse novation, forward vs futures price divergence), futures vs forwards cfa is tested via standalone 90-second MCQs combining Daily Futures Mark-to-Market Valuation vs. Forward Valuation calculations with economic interpretation.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** An investor enters a long position in 5 crude oil futures contracts (1,000 barrels per contract = 5,000 barrels total) at $75.00 per barrel. The initial margin is $5,000 per contract ($25,000 total) and the maintenance margin is $3,500 per contract ($17,500 total). If the futures price falls to $73.20 at the end of Day 1, the investor must deposit variation margin of:

- **[A]** $1,500

- **[B]** $9,000

- **[C]** $17,500

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** Day 1 loss = 5,000 barrels × ($73.20 − $75.00) = −$9,000. Ending balance = $25,000 − $9,000 = $16,000, which is below the $17,500 maintenance margin. Futures margin calls require replenishing back to the full $25,000 initial margin: $25,000 − $16,000 = $9,000.

### Practice Question 2

**Question:** Immediately after the daily mark-to-market settlement payment is made at the end of each trading day, the market value (V_t) of an exchange-traded futures contract is:

- **[A]** Equal to the futures price F_t

- **[B]** Reset to exactly zero

- **[C]** Equal to the initial margin deposit

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** Daily mark-to-market settles all accumulated price gains or losses in cash, resetting the futures contract's market value to $0 at the daily settlement price.

### Practice Question 3

**Question:** If the price of an underlying asset is positively correlated with short-term interest rates, how will the futures price compare to the forward price for the same maturity?

- **[A]** The futures price will be higher than the forward price because daily MTM gains are reinvested at higher interest rates

- **[B]** The futures price will be lower than the forward price

- **[C]** They will be identical regardless of interest rate volatility

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** When asset prices and interest rates are positively correlated, long futures traders receive MTM cash inflows when interest rates are high and pay outflows when rates are low, making futures more desirable and pushing Futures Price > Forward Price.

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in Daily Futures Mark-to-Market Valuation vs. Forward Valuation.**

- **Timing Errors: Mixing beginning and ending balances in Futures Margin Replenishment Rule (Unlike Stock Margin!).**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Curriculum Scope: LM 1 & LM 6: Forward vs Futures Market Mechanics — Daily mark-to-market (MTM) settlement, initial and maintenance margin, clearinghouse novation, forward vs futures price divergence (Level I · Derivatives).**

- **Takeaway 2: Primary Formula (Daily Futures Mark-to-Market Valuation vs. Forward Valuation): V_t(Futures) = 0 after daily MTM settlement ; V_t(Forward) = S_t − PV(Benefits_{t,T}) + PV(Costs_{t,T}) − [F_0(T) / (1 + R_F)^(T−t)].**

- **Takeaway 3: Secondary Formula (Futures Margin Replenishment Rule (Unlike Stock Margin!)): If Margin Balance < Maintenance Margin => Deposit Cash back to FULL INITIAL MARGIN (not Maintenance Margin).**

- **Takeaway 4: Key Insight 1: In futures markets, variation margin calls restore the balance to Initial Margin ($120,000), whereas equity margin calls only restore to.**

- **Takeaway 5: Key Insight 2: This correlation rule between daily MTM cash flows and interest rates is a classic CFA Level I & II conceptual test item.**

## Frequently Asked Questions (FAQs)

### What is the primary formula for futures vs forwards cfa in Level I Derivatives?

The primary equations for Futures vs Forwards: Differences, Examples and CFA Questions govern Derivatives calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is futures vs forwards cfa tested on the CFA Level I exam?

On the CFA exam, Futures vs Forwards: Differences, Examples and CFA Questions is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

### How does Daily Futures Mark-to-Market Valuation vs. Forward Valuation connect to related topics in Derivatives?

Within Derivatives, Daily Futures Mark-to-Market Valuation vs. Forward Valuation links directly to CFA Derivatives Level 1: Complete Notes a within the standard CFA Derivatives curriculum framework.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level I · Derivatives).

### Related CFA Study Guides

- [CFA Derivatives Level 1: Complete Notes and Practice Questions](/blog/cfa/cfa-level-1-derivatives-notes-practice-questions/)

- [Call Options vs Put Options: How Do They Work?](/blog/cfa/cfa-level-1-call-options-vs-put-options-how-they-work/)

- [How to Calculate Call Option and Put Option Payoffs](/blog/cfa/cfa-level-1-calculate-call-option-and-put-option-payoffs/)

