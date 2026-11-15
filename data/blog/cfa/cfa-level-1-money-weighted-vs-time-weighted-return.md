---
title: "Money Weighted vs Time Weighted Rate of Return: Examples and Questions"
seoTitle: "Money Weighted vs Time Weighted Rate of Return: Examples and Questions — CFA Level I"
slug: cfa-level-1-money-weighted-vs-time-weighted-return
description: "Master Money Weighted vs Time Weighted Rate of Return: Examples and Questions for CFA Level I (Quantitative Methods). Includes verified curriculum formulas, worked numerical examples, and exam review notes."
category: cfa
tags:
  - "CFA"
  - "Level I"
  - "Quantitative Methods"
  - "money weighted vs time weighted return cfa"
  - "money weighted vs time weighted return cfa formula"
author: Aniket Thakur
datePublished: "2026-11-08"
dateModified: "2026-11-08"
coverImage: /assets/images/blog/cfa-level-1-money-weighted-vs-time-weighted-return/cover.svg
coverImageAlt: "Illustrative guide to Money Weighted vs Time Weighted Rate of Return: Examples and Questions"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for Money Weighted vs Time Weighted Rate of Return: Examples and Questions."
draft: false
featured: false
sources:
  - title: "CFA Institute 2026–2027 Program Curriculum: Quantitative Methods"
    url: https://www.cfainstitute.org/en/programs/cfa/curriculum
  - title: "CFA Institute Candidate Study Resources & Topic Outlines"
    url: https://www.cfainstitute.org/en/programs/cfa/candidate
showSources: true
enquiry: false
quickAnswer:
  question: "Money Weighted vs Time Weighted Rate of Return: Examples and Questions: Key Summary & Verdict"
  answer: "Money Weighted vs Time Weighted Rate of Return: Examples and Questions is a core Level I Quantitative Methods topic (LM 1: Rates and Returns — Money-weighted return (IRR) vs."
  facts:
    - label: "CFA Level"
      value: "Level I"
    - label: "Curriculum Subject"
      value: "Quantitative Methods"
    - label: "Topic Focus"
      value: "money weighted vs time weighted ret"
    - label: "Syllabus Standard"
      value: "2026–2027 Curriculum"
  goodFor:
    - "Candidates preparing for CFA Level I (Quantitative Methods) exam questions."
    - "Financial analysts requiring verified formulas and worked calculations."
  watchFor:
    - "Verify compounding periodicity, sign conventions, and calculator mode (BGN vs END)."
    - "Review boundary conditions and common exam distractor traps."
  note: "2026–2027 CFA Program Curriculum Series · Aniket Thakur"
faqItems:
  - question: "What is the primary formula for money weighted vs time weighted return cfa in Level I Quantitative Methods?"
    answer: "The primary equations for Money Weighted vs Time Weighted Rate of Return: Examples and Questions govern Quantitative Methods calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is money weighted vs time weighted return cfa tested on the CFA Level I exam?"
    answer: "On the CFA exam, Money Weighted vs Time Weighted Rate of Return: Examples and Questions is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
  - question: "How does Money-Weighted Rate of Return (MWRR) connect to related topics in Quantitative Methods?"
    answer: "Within Quantitative Methods, Money-Weighted Rate of Return (MWRR) links directly to How to Solve Annuity and Perpetuity Questions in CFA Lev within the standard CFA Quantitative Methods curriculum framework."
---

## Introduction

Money Weighted vs Time Weighted Rate of Return: Examples and Questions is a core Level I Quantitative Methods topic (LM 1: Rates and Returns — Money-weighted return (IRR) vs. time-weighted return (geometric linking), GIPS compliance) focusing on internal rate of return (MWRR) sensitivity to client cash flows vs. geometric sub-period linking (TWRR) for investment manager evaluation. This guide covers the governing equations (Money-Weighted Rate of Return (MWRR) and Time-Weighted Rate of Return (TWRR)), two verified numerical examples, a comparison table, and three original CFA-style practice questions.

## Concept Explanation & Institutional Framework

From first principles, internal rate of return (MWRR) sensitivity to client cash flows vs. geometric sub-period linking (TWRR) for investment manager evaluation links theoretical valuation and risk mechanics to practical decisions in Quantitative Methods. Money-Weighted Rate of Return (MWRR) (∑ [CF_t / (1 + MWRR)^t] = 0 for t = 0 to T) establishes the primary relationship (Solves for the internal rate of return (IRR) equating net client contributions, withdrawals, and ending portfolio value to zero.), while Time-Weighted Rate of Return (TWRR) (TWRR = [(1 + HPR_1) × (1 + HPR_2) × ... × (1 + HPR_T)]^(1/T) − 1) governs Geometrically links holding period returns across sub-periods bounded by external cash flows, eliminating cash flow timing bias.

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: Money-Weighted Rate of Return (MWRR)

```formula
∑ [CF_t / (1 + MWRR)^t] = 0 for t = 0 to T
```

**Institutional Context & Variable Breakdown:** Solves for the internal rate of return (IRR) equating net client contributions, withdrawals, and ending portfolio value to zero.

### Formula 2: Time-Weighted Rate of Return (TWRR)

```formula
TWRR = [(1 + HPR_1) × (1 + HPR_2) × ... × (1 + HPR_T)]^(1/T) − 1
```

**Institutional Context & Variable Breakdown:** Geometrically links holding period returns across sub-periods bounded by external cash flows, eliminating cash flow timing bias.

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Computing MWRR and TWRR for a Two-Year Equity Account

**Problem & Given Scenario:**
t = 0: Investor buys 1 share of Stock Z at $100. t = 1: Stock Z rises to $120, pays a $4 dividend, and investor buys 2 additional shares at $120 each ($240 outlay). t = 2: Stock Z falls to $110 and pays a $4 dividend per share (3 shares × $114 = $342 terminal value).

```formula
∑ [CF_t / (1 + MWRR)^t] = 0 for t = 0 to T
```

**Step-by-Step Substitution & Calculation:**

Cash flows for MWRR: CF_0 = −$100; CF_1 = +$4 − $240 = −$236; CF_2 = +$342. Solving −100 − 236/(1+r) + 342/(1+r)^2 = 0 yields MWRR = 1.38%. For TWRR: HPR_1 = (120 + 4 − 100)/100 = +24.00%; HPR_2 = (342 − 360)/360 = −5.00%; Annualized TWRR = [(1.24)(0.95)]^(1/2) − 1 = (1.1780)^0.5 − 1 = +8.54%.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Because the investor tripled capital right before the Year 2 downturn (−5.0%), MWRR (+1.38%) is heavily dragged below TWRR (+8.54%).

### Worked Example 2: Sub-Period Valuation with Mid-Quarter Institutional Cash Inflow

**Problem & Given Scenario:**
A $50M mandate grows to $55M by Mid-Quarter (+10%), receives a $45M client contribution (new base = $100M), and grows to $105M by Quarter-End (+5%).

```formula
TWRR = [(1 + HPR_1) × (1 + HPR_2) × ... × (1 + HPR_T)]^(1/T) − 1
```

**Step-by-Step Substitution & Calculation:**

HPR_sub1 = (55 − 50)/50 = 10.0%; HPR_sub2 = (105 − 100)/100 = 5.0%; Quarterly TWRR = (1.10 × 1.05) − 1 = 15.50%.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> TWRR removes the distortion of the $45M mid-quarter contribution and reflects pure portfolio management skill (+15.50%).

## Comparison & Reference Analysis

| Feature | Money-Weighted Return (MWRR) | Time-Weighted Return (TWRR) | GIPS & CFA Standard |
|---|---|---|---|
| Mathematical Basis | Internal Rate of Return (IRR) | Geometric mean of sub-period HPRs | Both tested in Level I LM 1 |
| Cash Flow Sensitivity | Heavily weighted by dollar size & timing | Immune to external cash flow timing | GIPS mandates TWRR for public composites |
| When MWRR > TWRR | Large inflow before strong performance | Large inflow before poor performance | Favorite conceptual exam test |
| Ideal Use Case | Private equity LP / personal wealth | Discretionary asset manager evaluation | Manager does not control client inflows |

## Real-World Financial Applications

In institutional Quantitative Methods practice, analysts apply Money-Weighted Rate of Return (MWRR) and Time-Weighted Rate of Return (TWRR) to value securities, audit financial statements, and manage portfolio risk.

## CFA Examination Perspective & Testing Patterns

On the CFA Level I exam (LM 1: Rates and Returns — Money-weighted return (IRR) vs. time-weighted return (geometric linking), GIPS compliance), money weighted vs time weighted return cfa is tested via standalone 90-second MCQs combining Money-Weighted Rate of Return (MWRR) calculations with economic interpretation.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** An investor buys 1 share of an ETF at $50 at t = 0, buys 1 more share at $65 at t = 1, and sells both shares at $70 each at t = 2 (no dividends). The annualized time-weighted rate of return is closest to:

- **[A]** 15.14%

- **[B]** 18.32%

- **[C]** 18.47%

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** HPR_1 = (65 − 50)/50 = +30.00%. HPR_2 = (140 − 130)/130 = +7.6923%. Annualized TWRR = [(1.30)(1.076923)]^0.5 − 1 = (1.40)^0.5 − 1 = 18.32%.

### Practice Question 2

**Question:** If an institutional client deposits a large cash inflow immediately prior to a severe market drawdown, how will the portfolio's money-weighted return (MWRR) compare to its time-weighted return (TWRR)?

- **[A]** MWRR will be lower than TWRR

- **[B]** MWRR will equal TWRR

- **[C]** MWRR will be higher than TWRR

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** Because MWRR weights periods by invested capital, having more dollars invested during the negative return period pulls MWRR below TWRR.

### Practice Question 3

**Question:** Under the Global Investment Performance Standards (GIPS), why is the time-weighted rate of return standardly required for liquid composite reporting?

- **[A]** It is simpler to compute than IRR

- **[B]** Investment managers typically do not control the timing of client contributions and withdrawals

- **[C]** It always produces a higher return than the money-weighted return

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** Because clients—not the portfolio manager—decide when to add or withdraw funds, TWRR isolates the manager's security selection performance.

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in Money-Weighted Rate of Return (MWRR).**

- **Timing Errors: Mixing beginning and ending balances in Time-Weighted Rate of Return (TWRR).**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Curriculum Scope: LM 1: Rates and Returns — Money-weighted return (IRR) vs. time-weighted return (geometric linking), GIPS compliance (Level I · Quantitative Methods).**

- **Takeaway 2: Primary Formula (Money-Weighted Rate of Return (MWRR)): ∑ [CF_t / (1 + MWRR)^t] = 0 for t = 0 to T.**

- **Takeaway 3: Secondary Formula (Time-Weighted Rate of Return (TWRR)): TWRR = [(1 + HPR_1) × (1 + HPR_2) × ... × (1 + HPR_T)]^(1/T) − 1.**

- **Takeaway 4: Key Insight 1: Because the investor tripled capital right before the Year 2 downturn (−5.0%), MWRR (+1.38%) is heavily dragged below TWRR (+8.54%).**

- **Takeaway 5: Key Insight 2: TWRR removes the distortion of the $45M mid-quarter contribution and reflects pure portfolio management skill (+15.50%).**

## Frequently Asked Questions (FAQs)

### What is the primary formula for money weighted vs time weighted return cfa in Level I Quantitative Methods?

The primary equations for Money Weighted vs Time Weighted Rate of Return: Examples and Questions govern Quantitative Methods calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is money weighted vs time weighted return cfa tested on the CFA Level I exam?

On the CFA exam, Money Weighted vs Time Weighted Rate of Return: Examples and Questions is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

### How does Money-Weighted Rate of Return (MWRR) connect to related topics in Quantitative Methods?

Within Quantitative Methods, Money-Weighted Rate of Return (MWRR) links directly to How to Solve Annuity and Perpetuity Questions in CFA Lev within the standard CFA Quantitative Methods curriculum framework.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level I · Quantitative Methods).

### Related CFA Study Guides

- [How to Solve Annuity and Perpetuity Questions in CFA Level 1](/blog/cfa/cfa-level-1-annuity-and-perpetuity-questions/)

- [Arithmetic Mean vs Geometric Mean: How to Calculate in CFA](/blog/cfa/cfa-level-1-arithmetic-mean-vs-geometric-mean/)

- [Present Value vs Future Value: CFA Numerical Questions With Solutions](/blog/cfa/cfa-level-1-present-value-vs-future-value-questions/)

