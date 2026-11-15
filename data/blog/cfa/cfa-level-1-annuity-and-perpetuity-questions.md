---
title: "How to Solve Annuity and Perpetuity Questions in CFA Level 1"
seoTitle: "How to Solve Annuity and Perpetuity Questions in CFA Level 1 — CFA Level I"
slug: cfa-level-1-annuity-and-perpetuity-questions
description: "Master How to Solve Annuity and Perpetuity Questions in CFA Level 1 for CFA Level I (Quantitative Methods). Includes verified curriculum formulas, worked numerical examples, and exam review notes."
category: cfa
tags:
  - "CFA"
  - "Level I"
  - "Quantitative Methods"
  - "annuity and perpetuity cfa level 1"
  - "annuity and perpetuity cfa level 1 formula"
author: Aniket Thakur
datePublished: "2026-11-08"
dateModified: "2026-11-08"
coverImage: /assets/images/blog/cfa-level-1-annuity-and-perpetuity-questions/cover.svg
coverImageAlt: "Illustrative guide to How to Solve Annuity and Perpetuity Questions in CFA Level 1"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for How to Solve Annuity and Perpetuity Questions in CFA Level 1."
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
  question: "How to Solve Annuity and Perpetuity Questions in CFA Level 1: Key Summary & Verdict"
  answer: "How to Solve Annuity and Perpetuity Questions in CFA Level 1 is a core Level I Quantitative Methods topic (LM 2: The Time Value of Money in Finance — Ordinary annuities, annuities due, perpetuities, deferred annuities, loan amortization) focusing on ordinary."
  facts:
    - label: "CFA Level"
      value: "Level I"
    - label: "Curriculum Subject"
      value: "Quantitative Methods"
    - label: "Topic Focus"
      value: "annuity and perpetuity cfa level 1"
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
  - question: "What is the primary formula for annuity and perpetuity cfa level 1 in Level I Quantitative Methods?"
    answer: "The primary equations for How to Solve Annuity and Perpetuity Questions in CFA Level 1 govern Quantitative Methods calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is annuity and perpetuity cfa level 1 tested on the CFA Level I exam?"
    answer: "On the CFA exam, How to Solve Annuity and Perpetuity Questions in CFA Level 1 is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
  - question: "How does Ordinary Annuity vs. Annuity Due Present Value connect to related topics in Quantitative Methods?"
    answer: "Within Quantitative Methods, Ordinary Annuity vs. Annuity Due Present Value links directly to Present Value vs Future Value: CFA Numerical Q within the standard CFA Quantitative Methods curriculum framework."
---

## Introduction

How to Solve Annuity and Perpetuity Questions in CFA Level 1 is a core Level I Quantitative Methods topic (LM 2: The Time Value of Money in Finance — Ordinary annuities, annuities due, perpetuities, deferred annuities, loan amortization) focusing on ordinary annuity vs annuity due timing, deferred annuities, constant and growing perpetuities, and mortgage principal amortization. This guide covers the governing equations (Ordinary Annuity vs. Annuity Due Present Value and Level and Growing Perpetuity Present Value), two verified numerical examples, a comparison table, and three original CFA-style practice questions.

## Concept Explanation & Institutional Framework

From first principles, ordinary annuity vs annuity due timing, deferred annuities, constant and growing perpetuities, and mortgage principal amortization links theoretical valuation and risk mechanics to practical decisions in Quantitative Methods. Ordinary Annuity vs. Annuity Due Present Value (PV_ord = PMT × [1 − (1 + r)^(−N)] / r ; PV_due = PV_ord × (1 + r)) establishes the primary relationship (PV_ord values N level end-of-period payments one period before the first cash flow; PV_due values beginning-of-period payments.), while Level and Growing Perpetuity Present Value (PV_perp = PMT / r ; PV_growing_perp = CF_1 / (r − g) (for r > g)) governs Values an infinite series of level or constant-growth cash flows one period prior to CF_1.

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: Ordinary Annuity vs. Annuity Due Present Value

```formula
PV_ord = PMT × [1 − (1 + r)^(−N)] / r

PV_due = PV_ord × (1 + r)
```

**Institutional Context & Variable Breakdown:**

- PV_ord values N level end-of-period payments one period before the first cash flow.

- PV_due values beginning-of-period payments.

### Formula 2: Level and Growing Perpetuity Present Value

```formula
PV_perp = PMT / r

PV_growing_perp = CF_1 / (r − g) (for r > g)
```

**Institutional Context & Variable Breakdown:** Values an infinite series of level or constant-growth cash flows one period prior to CF_1.

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Deferred Retirement Annuity Valuation (Two-Step Timeline Method)

**Problem & Given Scenario:**
An investor wants 20 annual withdrawals of $60,000 starting exactly 15 years from today (first withdrawal at t = 15, last at t = 34). Discount rate r = 6.0% annually.

```formula
PV_ord = PMT × [1 − (1 + r)^(−N)] / r

PV_due = PV_ord × (1 + r)
```

**Step-by-Step Substitution & Calculation:**

Step 1: Treat the 20 withdrawals (t = 15 to 34) as an ordinary annuity valued at t = 14: PV_14 = $60,000 × [1 − 1.06^(−20)] / 0.06 = $688,195.27. Step 2: Discount PV_14 back 14 years to t = 0: PV_0 = $688,195.27 / 1.06^14 = $304,389.49.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Because the first cash flow is at t = 15, the ordinary annuity formula anchors at t = 14 (one period before CF_1), requiring 14 periods of discounting to t = 0.

### Worked Example 2: Valuing Preferred Stock and Deferred Growing Perpetuity

**Problem & Given Scenario:**
Issue A pays a level $4.50 annual dividend forever starting at t = 1 (r = 7.5%). Issue B pays its first dividend of $3.20 at t = 4, growing at g = 2.5% forever (r = 7.5%).

```formula
PV_perp = PMT / r

PV_growing_perp = CF_1 / (r − g) (for r > g)
```

**Step-by-Step Substitution & Calculation:**

PV_A(t=0) = $4.50 / 0.075 = $60.00. For Issue B, value at t = 3 is PV_3 = $3.20 / (0.075 − 0.025) = $64.00; discounting to t = 0 gives PV_B(t=0) = $64.00 / 1.075^3 = $51.51.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> A perpetuity starting at t = K has its formula value anchored at t = K − 1.

## Comparison & Reference Analysis

| Cash Flow Structure | First Cash Flow Date | PV Anchor Date | Present Value Formula |
|---|---|---|---|
| Ordinary Annuity (N periods) | t = 1 | t = 0 | PMT × [1 − (1 + r)^(−N)] / r |
| Annuity Due (N periods) | t = 0 | t = 0 | PV_ordinary × (1 + r) |
| Deferred Ordinary Annuity | t = K (where K > 1) | t = K − 1 (then × (1+r)^−(K−1)) | [PMT × (1 − (1+r)^−N)/r] / (1+r)^(K−1) |
| Level Perpetuity | t = 1 (infinite) | t = 0 | PMT / r |
| Growing Perpetuity | t = 1 (grows at g < r) | t = 0 | CF_1 / (r − g) |

## Real-World Financial Applications

In institutional Quantitative Methods practice, analysts apply Ordinary Annuity vs. Annuity Due Present Value and Level and Growing Perpetuity Present Value to value securities, audit financial statements, and manage portfolio risk.

## CFA Examination Perspective & Testing Patterns

On the CFA Level I exam (LM 2: The Time Value of Money in Finance — Ordinary annuities, annuities due, perpetuities, deferred annuities, loan amortization), annuity and perpetuity cfa level 1 is tested via standalone 90-second MCQs combining Ordinary Annuity vs. Annuity Due Present Value calculations with economic interpretation.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** A lease requires 8 annual payments of $25,000, with the first payment due immediately today (t = 0). At an annual discount rate of 5.5%, the present value of the lease is closest to:

- **[A]** $158,364

- **[B]** $167,074

- **[C]** $175,428

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** First compute PV of an 8-year ordinary annuity: PV_ord = $25,000 × [1 − 1.055^(−8)] / 0.055 = $158,364.26. Multiply by (1 + 0.055) for annuity due: PV_due = $158,364.26 × 1.055 = $167,074.29.

### Practice Question 2

**Question:** A British gilt console pays £120 per year forever, with the first payment occurring 5 years from today (at t = 5). If the required annual yield is 6.0%, its present value today (t = 0) is closest to:

- **[A]** £1,494.52

- **[B]** £1,584.19

- **[C]** £2,000.00

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** At t = 4 (one period before the first payment at t = 5), PV_4 = £120 / 0.06 = £2,000.00. Discounting back 4 years to t = 0: PV_0 = £2,000 / (1.06)^4 = £1,584.19.

### Practice Question 3

**Question:** A borrower takes a $300,000, 30-year fixed-rate mortgage at 6.0% APR compounded monthly (360 monthly payments). The scheduled monthly payment is $1,798.65. In Month 1, the portion of the payment applied to principal reduction is closest to:

- **[A]** $298.65

- **[B]** $1,500.00

- **[C]** $1,798.65

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** Month 1 interest = $300,000 × (0.06 / 12) = $300,000 × 0.005 = $1,500.00. Principal reduction = Total PMT − Interest = $1,798.65 − $1,500.00 = $298.65.

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in Ordinary Annuity vs. Annuity Due Present Value.**

- **Timing Errors: Mixing beginning and ending balances in Level and Growing Perpetuity Present Value.**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Curriculum Scope: LM 2: The Time Value of Money in Finance — Ordinary annuities, annuities due, perpetuities, deferred annuities, loan amortization (Level I · Quantitative Methods).**

- **Takeaway 2: Primary Formula (Ordinary Annuity vs. Annuity Due Present Value): PV_ord = PMT × [1 − (1 + r)^(−N)] / r ; PV_due = PV_ord × (1 + r).**

- **Takeaway 3: Secondary Formula (Level and Growing Perpetuity Present Value): PV_perp = PMT / r ; PV_growing_perp = CF_1 / (r − g) (for r > g).**

- **Takeaway 4: Key Insight 1: Because the first cash flow is at t = 15, the ordinary annuity formula anchors at t = 14 (one period before CF_1), requiring 14 periods of.**

- **Takeaway 5: Key Insight 2: A perpetuity starting at t = K has its formula value anchored at t = K − 1.**

## Frequently Asked Questions (FAQs)

### What is the primary formula for annuity and perpetuity cfa level 1 in Level I Quantitative Methods?

The primary equations for How to Solve Annuity and Perpetuity Questions in CFA Level 1 govern Quantitative Methods calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is annuity and perpetuity cfa level 1 tested on the CFA Level I exam?

On the CFA exam, How to Solve Annuity and Perpetuity Questions in CFA Level 1 is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

### How does Ordinary Annuity vs. Annuity Due Present Value connect to related topics in Quantitative Methods?

Within Quantitative Methods, Ordinary Annuity vs. Annuity Due Present Value links directly to Present Value vs Future Value: CFA Numerical Q within the standard CFA Quantitative Methods curriculum framework.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level I · Quantitative Methods).

### Related CFA Study Guides

- [Present Value vs Future Value: CFA Numerical Questions With Solutions](/blog/cfa/cfa-level-1-present-value-vs-future-value-questions/)

- [Money Weighted vs Time Weighted Rate of Return: Examples and Questions](/blog/cfa/cfa-level-1-money-weighted-vs-time-weighted-return/)

- [How to Calculate Time Value of Money in CFA With Solved Examples](/blog/cfa/cfa-level-1-how-to-calculate-time-value-of-money/)

