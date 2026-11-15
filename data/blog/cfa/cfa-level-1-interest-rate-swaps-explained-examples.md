---
title: "Interest Rate Swaps Explained With Numerical Examples"
seoTitle: "Interest Rate Swaps Explained With Numerical Examples — CFA Level I"
slug: cfa-level-1-interest-rate-swaps-explained-examples
description: "Master interest rate swaps cfa for Level I (Derivatives). Includes verified CFA formulas, 2 step-by-step solved numerical examples, comparison table, and 3 p."
category: cfa
tags:
  - "CFA"
  - "Level I"
  - "Derivatives"
  - "interest rate swaps cfa"
  - "interest rate swaps cfa formula"
author: Aniket Thakur
datePublished: "2026-11-11"
dateModified: "2026-11-11"
coverImage: /assets/images/blog/cfa-level-1-interest-rate-swaps-explained-examples/cover.svg
coverImageAlt: "Illustrative guide to Interest Rate Swaps Explained With Numerical Examples"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for Interest Rate Swaps Explained With Numerical Examples."
draft: false
featured: true
sources:
  - title: "CFA Institute 2026–2027 Program Curriculum: Derivatives"
    url: https://www.cfainstitute.org/en/programs/cfa/curriculum
  - title: "CFA Institute Candidate Study Resources & Topic Outlines"
    url: https://www.cfainstitute.org/en/programs/cfa/candidate
showSources: true
enquiry: false
quickAnswer:
  question: "Interest Rate Swaps Explained With Numerical Examples: Key Summary & Verdict"
  answer: "Interest Rate Swaps Explained With Numerical Examples is a core Level I Derivatives topic (LM 7: Pricing and Valuation of Swaps — Plain-vanilla fixed-for-floating interest rate swaps, swap par rate vs forward rate series, net periodic settlement payments."
  facts:
    - label: "CFA Level"
      value: "Level I"
    - label: "Curriculum Subject"
      value: "Derivatives"
    - label: "Topic Focus"
      value: "interest rate swaps cfa"
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
  - question: "What is the primary formula for interest rate swaps cfa in Level I Derivatives?"
    answer: "The primary equations for Interest Rate Swaps Explained With Numerical Examples govern Derivatives calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is interest rate swaps cfa tested on the CFA Level I exam?"
    answer: "On the CFA exam, Interest Rate Swaps Explained With Numerical Examples is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
  - question: "How does Periodic Net Swap Settlement Payment (Pay-Fixed / Receive-Floating) connect to related topics in Derivatives?"
    answer: "Within Derivatives, Periodic Net Swap Settlement Payment (Pay-Fixed / Receive-Floating) links directly to How to Calculate Profit and Loss i within the standard CFA Derivatives curriculum framework."
---

## Introduction

Interest Rate Swaps Explained With Numerical Examples is a core Level I Derivatives topic (LM 7: Pricing and Valuation of Swaps — Plain-vanilla fixed-for-floating interest rate swaps, swap par rate vs forward rate series, net periodic settlement payments, pay-fixed vs receive-fixed valuation) focusing on plain-vanilla interest rate swap structure, replication as a series of off-market FRAs or a Fixed Bond vs Floating Bond pair, net periodic settlement calculations, and duration impact. This guide covers the governing equations (Periodic Net Swap Settlement Payment (Pay-Fixed / Receive-Floating) and Bond Replication of Swap Value), two verified numerical examples, a comparison table, and three original CFA-style practice questions.

## Concept Explanation & Institutional Framework

From first principles, plain-vanilla interest rate swap structure, replication as a series of off-market FRAs or a Fixed Bond vs Floating Bond pair, net periodic settlement calculations, and duration impact links theoretical valuation and risk mechanics to practical decisions in Derivatives. Periodic Net Swap Settlement Payment (Pay-Fixed / Receive-Floating) (Net Cash Flow to Fixed Payer = Notional × (MRR_{t−1} − Fixed Swap Rate s) × (Days / 360 or Period Fraction)) establishes the primary relationship (Interest rate swaps do NOT exchange notional principal; counterparties exchange only the net interest difference on each settlement date.), while Bond Replication of Swap Value (V_Swap(Pay-Fixed) = V_Floating_Bond − V_Fixed_Bond ; V_Swap(Receive-Fixed) = V_Fixed_Bond − V_Floating_Bond) governs A Receive-Fixed swap is economically equivalent to being Long a Fixed-Rate Bond and Short a Floating-Rate Note (increasing portfolio duration).

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: Periodic Net Swap Settlement Payment (Pay-Fixed / Receive-Floating)

```formula
Net Cash Flow to Fixed Payer = Notional × (MRR_{t−1} − Fixed Swap Rate s) × (Days / 360 or Period Fraction)
```

**Institutional Context & Variable Breakdown:**

- Interest rate swaps do NOT exchange notional principal.

- counterparties exchange only the net interest difference on each settlement date.

### Formula 2: Bond Replication of Swap Value

```formula
V_Swap(Pay-Fixed) = V_Floating_Bond − V_Fixed_Bond

V_Swap(Receive-Fixed) = V_Fixed_Bond − V_Floating_Bond
```

**Institutional Context & Variable Breakdown:** A Receive-Fixed swap is economically equivalent to being Long a Fixed-Rate Bond and Short a Floating-Rate Note (increasing portfolio duration).

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Calculating Net Quarterly Settlement Cash Flows on a $50M Interest Rate Swap

**Problem & Given Scenario:**
Corporate Issuer A enters a $50,000,000 notional plain-vanilla interest rate swap as the Fixed-Rate Payer at a fixed swap rate of s = 4.20% per annum, receiving 3-month SOFR quarterly (using exact 0.25 year / 90/360 quarterly fractions). Calculate Issuer A's net cash flow for Quarter 1 (when 3-month SOFR reset at 4.80%) and Quarter 2 (when 3-month SOFR reset at 3.60%).

```formula
Net Cash Flow to Fixed Payer = Notional × (MRR_{t−1} − Fixed Swap Rate s) × (Days / 360 or Period Fraction)
```

**Step-by-Step Substitution & Calculation:**

Quarter 1 (SOFR = 4.80% > 4.20% fixed): Net Cash Flow to Fixed Payer = $50,000,000 × (0.0480 − 0.0420) × 0.25 = $50,000,000 × (+0.0060) × 0.25 = +$75,000 net inflow received by Issuer A. Quarter 2 (SOFR = 3.60% < 4.20% fixed): Net Cash Flow = $50,000,000 × (0.0360 − 0.0420) × 0.25 = $50,000,000 × (−0.0060) × 0.25 = −$75,000 net outflow paid by Issuer A.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Remember that the floating rate (MRR/SOFR) is set at the beginning of each period (in advance) and paid at the end of the period (in arrears), netted against the fixed leg.

### Worked Example 2: Converting a Floating-Rate Corporate Loan into a Fixed-Rate Liability Using a Swap

**Problem & Given Scenario:**
A borrower has a $100M floating-rate bank loan paying SOFR + 150 bps. To eliminate rising interest rate risk, the borrower enters a $100M Pay-Fixed, Receive-SOFR swap at a fixed swap rate of 4.10%.

```formula
V_Swap(Pay-Fixed) = V_Floating_Bond − V_Fixed_Bond

V_Swap(Receive-Fixed) = V_Fixed_Bond − V_Floating_Bond
```

**Step-by-Step Substitution & Calculation:**

Loan Outflow: −(SOFR + 1.50%). Swap Floating Inflow: +SOFR. Swap Fixed Outflow: −4.10%. Net Synthetic Fixed Borrowing Rate = −SOFR − 1.50% + SOFR − 4.10% = −5.60% fixed!

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> By paying fixed (4.10%) and receiving floating (SOFR) on the swap, the borrower cancels out its floating SOFR loan exposure and locks in a synthetic fixed rate of 5.60%.

## Comparison & Reference Analysis

| Swap Position | Equivalent Bond Portfolio | Net Duration (ModDur) Impact | Profits When Market Rates... |
|---|---|---|---|
| Pay-Fixed, Receive-Floating | Long FRN + Short Fixed-Rate Bond | Negative Duration (ModDur < 0) | RISE (floating receipts increase) |
| Receive-Fixed, Pay-Floating | Long Fixed-Rate Bond + Short FRN | Positive Duration (ModDur > 0) | FALL (locked-in fixed coupon rises in PV) |
| At Inception (t = 0 Par Swap) | Par Fixed Rate s_0 set so V_0 = $0 | Price = Par on both legs at t = 0 | Zero upfront payment required |
| Portfolio Immunization Use | Overlay without selling cash bonds | Shifts portfolio Money Duration | Capital-efficient duration management |

## Real-World Financial Applications

In institutional Derivatives practice, analysts apply Periodic Net Swap Settlement Payment (Pay-Fixed / Receive-Floating) and Bond Replication of Swap Value to value securities, audit financial statements, and manage portfolio risk.

## CFA Examination Perspective & Testing Patterns

On the CFA Level I exam (LM 7: Pricing and Valuation of Swaps — Plain-vanilla fixed-for-floating interest rate swaps, swap par rate vs forward rate series, net periodic settlement payments, pay-fixed vs receive-fixed valuation), interest rate swaps cfa is tested via standalone 90-second MCQs combining Periodic Net Swap Settlement Payment (Pay-Fixed / Receive-Floating) calculations with economic interpretation.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** A pension fund enters a $20,000,000 notional interest rate swap as the Receive-Fixed, Pay-Floating counterparty at an annual fixed swap rate of 4.50%, settled semiannually (period fraction = 0.50). If the 6-month floating reference rate for the first period is 3.80%, the net settlement payment at the end of the first 6-month period is:

- **[A]** The pension fund receives $70,000

- **[B]** The pension fund pays $70,000

- **[C]** The pension fund receives $140,000

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** Net settlement to the Receive-Fixed counterparty = Notional × (Fixed Rate − Floating Rate) × 0.50 = $20,000,000 × (0.0450 − 0.0380) × 0.50 = $20,000,000 × 0.0070 × 0.50 = +$70,000 received.

### Practice Question 2

**Question:** After entering a Pay-Fixed, Receive-Floating plain-vanilla interest rate swap at inception (when V_0 = $0), market interest rates across the entire yield curve rise sharply. The mark-to-market value of the swap to the Pay-Fixed counterparty is now:

- **[A]** Positive, because the present value of the fixed payments owed has fallen below the value of the floating leg

- **[B]** Negative

- **[C]** Zero, because swaps are marked to market daily like futures

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** A Pay-Fixed swap is equivalent to being Long a Floating-Rate Bond (~par) and Short a Fixed-Rate Bond. When interest rates rise, the value of the Fixed-Rate Bond liability falls below par, creating a positive mark-to-market asset value for the Fixed-Rate Payer.

### Practice Question 3

**Question:** A fixed-income portfolio manager wishes to REDUCE the Modified Duration of a long-term corporate bond portfolio without selling the underlying bonds. Which interest rate swap position should the manager enter?

- **[A]** Receive-fixed, pay-floating swap

- **[B]** Pay-fixed, receive-floating swap (which has negative modified duration)

- **[C]** Buy a receiver swaption

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** A Pay-Fixed, Receive-Floating swap has negative duration (ModDur_FRN − ModDur_Fixed < 0), which directly offsets and reduces the positive duration of the cash bond portfolio.

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in Periodic Net Swap Settlement Payment (Pay-Fixed / Receive-Floating).**

- **Timing Errors: Mixing beginning and ending balances in Bond Replication of Swap Value.**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Curriculum Scope: LM 7: Pricing and Valuation of Swaps — Plain-vanilla fixed-for-floating interest rate swaps, swap par rate vs forward rate series, net periodic settlement payments, pay-fixed vs receive-fixed valuation (Level I · Derivatives).**

- **Takeaway 2: Primary Formula (Periodic Net Swap Settlement Payment (Pay-Fixed / Receive-Floating)): Net Cash Flow to Fixed Payer = Notional × (MRR_{t−1} − Fixed Swap Rate s) × (Days / 360 or Period Fraction).**

- **Takeaway 3: Secondary Formula (Bond Replication of Swap Value): V_Swap(Pay-Fixed) = V_Floating_Bond − V_Fixed_Bond ; V_Swap(Receive-Fixed) = V_Fixed_Bond − V_Floating_Bond.**

- **Takeaway 4: Key Insight 1: Remember that the floating rate (MRR/SOFR) is set at the beginning of each period (in advance) and paid at the end of the period (in arrears.**

- **Takeaway 5: Key Insight 2: By paying fixed (4.10%) and receiving floating (SOFR) on the swap, the borrower cancels out its floating SOFR loan exposure and locks in a.**

## Frequently Asked Questions (FAQs)

### What is the primary formula for interest rate swaps cfa in Level I Derivatives?

The primary equations for Interest Rate Swaps Explained With Numerical Examples govern Derivatives calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is interest rate swaps cfa tested on the CFA Level I exam?

On the CFA exam, Interest Rate Swaps Explained With Numerical Examples is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

### How does Periodic Net Swap Settlement Payment (Pay-Fixed / Receive-Floating) connect to related topics in Derivatives?

Within Derivatives, Periodic Net Swap Settlement Payment (Pay-Fixed / Receive-Floating) links directly to How to Calculate Profit and Loss i within the standard CFA Derivatives curriculum framework.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level I · Derivatives).

### Related CFA Study Guides

- [How to Calculate Profit and Loss in Futures Contracts](/blog/cfa/cfa-level-1-calculate-profit-and-loss-in-futures-contracts/)

- [How Do Investors Use Derivatives for Hedging?](/blog/cfa/cfa-level-1-how-investors-use-derivatives-for-hedging/)

- [European vs American Options: Differences With Examples](/blog/cfa/cfa-level-1-european-vs-american-options-differences/)

