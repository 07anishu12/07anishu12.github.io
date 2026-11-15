---
title: "Present Value vs Future Value: CFA Numerical Questions With Solutions"
seoTitle: "Present Value vs Future Value: CFA Numerical Questions With Solutions — CFA Level I"
slug: cfa-level-1-present-value-vs-future-value-questions
description: "Master Present Value vs Future Value: CFA Numerical Questions With Solutions for CFA Level I (Quantitative Methods). Includes verified curriculum formulas, worked numerical examples, and exam review notes."
category: cfa
tags:
  - "CFA"
  - "Level I"
  - "Quantitative Methods"
  - "present value vs future value cfa"
  - "present value vs future value cfa formula"
author: Aniket Thakur
datePublished: "2026-11-08"
dateModified: "2026-11-08"
coverImage: /assets/images/blog/cfa-level-1-present-value-vs-future-value-questions/cover.svg
coverImageAlt: "Illustrative guide to Present Value vs Future Value: CFA Numerical Questions With Solutions"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for Present Value vs Future Value: CFA Numerical Questions With Solutions."
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
  question: "Present Value vs Future Value: CFA Numerical Questions With Solutions: Key Summary & Verdict"
  answer: "Present Value vs Future Value: CFA Numerical Questions With Solutions is a core Level I Quantitative Methods topic (LM 2: The Time Value of Money in Finance — Present value, future value, implied growth rate, and period calculation) focusing on reciprocal."
  facts:
    - label: "CFA Level"
      value: "Level I"
    - label: "Curriculum Subject"
      value: "Quantitative Methods"
    - label: "Topic Focus"
      value: "present value vs future value cfa"
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
  - question: "What is the primary formula for present value vs future value cfa in Level I Quantitative Methods?"
    answer: "The primary equations for Present Value vs Future Value: CFA Numerical Questions With Solutions govern Quantitative Methods calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is present value vs future value cfa tested on the CFA Level I exam?"
    answer: "On the CFA exam, Present Value vs Future Value: CFA Numerical Questions With Solutions is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
  - question: "How does Single-Sum PV and FV Reciprocity connect to related topics in Quantitative Methods?"
    answer: "Within Quantitative Methods, Single-Sum PV and FV Reciprocity links directly to How to Calculate Time Value of Money in CFA With Solved Exam within the standard CFA Quantitative Methods curriculum framework."
---

## Introduction

Present Value vs Future Value: CFA Numerical Questions With Solutions is a core Level I Quantitative Methods topic (LM 2: The Time Value of Money in Finance — Present value, future value, implied growth rate, and period calculation) focusing on reciprocal compounding and discounting factors, timeline index shifts, implied CAGR, and logarithmic horizon solving. This guide covers the governing equations (Single-Sum PV and FV Reciprocity and Implied Growth Rate (g) and Horizon (N)), two verified numerical examples, a comparison table, and three original CFA-style practice questions.

## Concept Explanation & Institutional Framework

From first principles, reciprocal compounding and discounting factors, timeline index shifts, implied CAGR, and logarithmic horizon solving links theoretical valuation and risk mechanics to practical decisions in Quantitative Methods. Single-Sum PV and FV Reciprocity (FV_N = PV_0 × (1 + r)^N ; PV_0 = FV_N × (1 + r)^(−N)) establishes the primary relationship (Moves single cash flows forward via compounding factor (1+r)^N or backward via discount factor (1+r)^(−N).), while Implied Growth Rate (g) and Horizon (N) (g = (FV_N / PV_0)^(1/N) − 1 ; N = ln(FV_N / PV_0) / ln(1 + r)) governs Inverts the TVM equation to solve for compound periodic return g or required compounding periods N.

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: Single-Sum PV and FV Reciprocity

```formula
FV_N = PV_0 × (1 + r)^N

PV_0 = FV_N × (1 + r)^(−N)
```

**Institutional Context & Variable Breakdown:** Moves single cash flows forward via compounding factor (1+r)^N or backward via discount factor (1+r)^(−N).

### Formula 2: Implied Growth Rate (g) and Horizon (N)

```formula
g = (FV_N / PV_0)^(1/N) − 1

N = ln(FV_N / PV_0) / ln(1 + r)
```

**Institutional Context & Variable Breakdown:** Inverts the TVM equation to solve for compound periodic return g or required compounding periods N.

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Multi-Stage Pension Liability Funding Deposit

**Problem & Given Scenario:**
Liability due at t = 12 is FV_12 = $4,500,000; initial deposit at t = 0 is $1,500,000; annual return r = 6.50%; find required second deposit at t = 4.

```formula
FV_N = PV_0 × (1 + r)^N

PV_0 = FV_N × (1 + r)^(−N)
```

**Step-by-Step Substitution & Calculation:**

PV_0 of liability = $4,500,000 / 1.065^12 = $2,113,572.96; Shortfall at t = 0 = $2,113,572.96 − $1,500,000 = $613,572.96; Required Deposit at t = 4 = $613,572.96 × 1.065^4 = $789,341.05.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Deferring the $613,572.96 shortfall contribution by 4 years requires depositing $789,341.05 at Year 4 to reach $4,500,000 at Year 12.

### Worked Example 2: Implied CAGR and Exact Doubling Horizon

**Problem & Given Scenario:**
Free cash flow rose from PV_0 = $180M to FV_6 = $315M over N = 6 years; find CAGR and time to double from $315M to $630M.

```formula
g = (FV_N / PV_0)^(1/N) − 1

N = ln(FV_N / PV_0) / ln(1 + r)
```

**Step-by-Step Substitution & Calculation:**

g = (315 / 180)^(1/6) − 1 = 1.75^(0.166667) − 1 = 9.7757% ≈ 9.78%; N_double = ln(2) / ln(1.097757) = 0.693147 / 0.093269 = 7.43 years.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> At 9.78% compound annual growth, free cash flow expands 75% in 6 years and doubles every 7.43 years.

## Comparison & Reference Analysis

| Comparison Dimension | Present Value (PV) | Future Value (FV) | CFA Exam Timeline Rule |
|---|---|---|---|
| Timeline Direction | Backward (t = N to t = 0) | Forward (t = 0 to t = N) | Align cash flows to identical date t |
| Valuation Operation | Discounting at opportunity cost r | Compounding at reinvestment rate r | Discount factor × Compound factor = 1 |
| Impact of Higher Rate r | Decreases PV (convex curve) | Increases FV (exponential curve) | Higher r penalizes long-dated flows |
| Impact of Longer Horizon N | Reduces PV when r > 0 | Expands FV when r > 0 | Zero-coupon bond price = PV of par |

## Real-World Financial Applications

In institutional Quantitative Methods practice, analysts apply Single-Sum PV and FV Reciprocity and Implied Growth Rate (g) and Horizon (N) to value securities, audit financial statements, and manage portfolio risk.

## CFA Examination Perspective & Testing Patterns

On the CFA Level I exam (LM 2: The Time Value of Money in Finance — Present value, future value, implied growth rate, and period calculation), present value vs future value cfa is tested via standalone 90-second MCQs combining Single-Sum PV and FV Reciprocity calculations with economic interpretation.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** An investor needs $500,000 at Year 10. She invests $200,000 today earning 7.0% annually for the first 4 years. What annual return must she earn during Years 5–10 (6 years) to reach $500,000?

- **[A]** 11.02%

- **[B]** 11.36%

- **[C]** 12.05%

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** FV_4 = $200,000 × 1.07^4 = $262,159.20. Required rate over remaining 6 years: r = ($500,000 / $262,159.20)^(1/6) − 1 = (1.907238)^(1/6) − 1 = 11.36%.

### Practice Question 2

**Question:** If the annual discount rate rises from 5.0% to 8.0%, the present value of $1,000 due in 15 years declines by an amount closest to:

- **[A]** $165.78

- **[B]** $300.00

- **[C]** $315.24

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** PV(5%) = $1,000 / 1.05^15 = $481.02; PV(8%) = $1,000 / 1.08^15 = $315.24. Decline = $481.02 − $315.24 = $165.78.

### Practice Question 3

**Question:** How many years are required for an initial $80,000 investment to triple to $240,000 at an annual compound rate of 9.20%?

- **[A]** 11.95 years

- **[B]** 12.48 years

- **[C]** 13.10 years

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** N = ln(3) / ln(1.092) = 1.098612 / 0.088011 = 12.48 years.

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in Single-Sum PV and FV Reciprocity.**

- **Timing Errors: Mixing beginning and ending balances in Implied Growth Rate (g) and Horizon (N).**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Curriculum Scope: LM 2: The Time Value of Money in Finance — Present value, future value, implied growth rate, and period calculation (Level I · Quantitative Methods).**

- **Takeaway 2: Primary Formula (Single-Sum PV and FV Reciprocity): FV_N = PV_0 × (1 + r)^N ; PV_0 = FV_N × (1 + r)^(−N).**

- **Takeaway 3: Secondary Formula (Implied Growth Rate (g) and Horizon (N)): g = (FV_N / PV_0)^(1/N) − 1 ; N = ln(FV_N / PV_0) / ln(1 + r).**

- **Takeaway 4: Key Insight 1: Deferring the $613,572.96 shortfall contribution by 4 years requires depositing $789,341.05 at Year 4 to reach $4,500,000 at Year 12.**

- **Takeaway 5: Key Insight 2: At 9.78% compound annual growth, free cash flow expands 75% in 6 years and doubles every 7.43 years.**

## Frequently Asked Questions (FAQs)

### What is the primary formula for present value vs future value cfa in Level I Quantitative Methods?

The primary equations for Present Value vs Future Value: CFA Numerical Questions With Solutions govern Quantitative Methods calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is present value vs future value cfa tested on the CFA Level I exam?

On the CFA exam, Present Value vs Future Value: CFA Numerical Questions With Solutions is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

### How does Single-Sum PV and FV Reciprocity connect to related topics in Quantitative Methods?

Within Quantitative Methods, Single-Sum PV and FV Reciprocity links directly to How to Calculate Time Value of Money in CFA With Solved Exam within the standard CFA Quantitative Methods curriculum framework.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level I · Quantitative Methods).

### Related CFA Study Guides

- [How to Calculate Time Value of Money in CFA With Solved Examples](/blog/cfa/cfa-level-1-how-to-calculate-time-value-of-money/)

- [How to Solve Annuity and Perpetuity Questions in CFA Level 1](/blog/cfa/cfa-level-1-annuity-and-perpetuity-questions/)

- [CFA Level 1 Quantitative Methods: Important Formulas and Concepts Explained](/blog/cfa/cfa-level-1-quantitative-methods-formulas-concepts/)

