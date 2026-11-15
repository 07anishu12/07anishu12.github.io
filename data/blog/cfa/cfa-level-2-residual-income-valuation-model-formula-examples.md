---
title: "Residual Income Valuation Model: Formula and Numerical Examples"
seoTitle: "Residual Income Valuation Model: Formula and Numerical Examples — CFA Level II"
slug: cfa-level-2-residual-income-valuation-model-formula-examples
description: "Master Residual Income Valuation Model: Formula and Numerical Examples for CFA Level II (Equity Investments). Includes verified curriculum formulas, worked numerical examples, and exam review notes."
category: cfa
tags:
  - "CFA"
  - "Level II"
  - "Equity Investments"
  - "residual income valuation model cfa"
  - "residual income valuation model cfa formula"
author: Aniket Thakur
datePublished: "2026-11-13"
dateModified: "2026-11-13"
coverImage: /assets/images/blog/cfa-level-2-residual-income-valuation-model-formula-examples/cover.svg
coverImageAlt: "Illustrative guide to Residual Income Valuation Model: Formula and Numerical Examples"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for Residual Income Valuation Model: Formula and Numerical Examples."
draft: false
featured: false
sources:
  - title: "CFA Institute 2026–2027 Program Curriculum: Equity Investments"
    url: https://www.cfainstitute.org/en/programs/cfa/curriculum
  - title: "CFA Institute Candidate Study Resources & Topic Outlines"
    url: https://www.cfainstitute.org/en/programs/cfa/candidate
showSources: true
enquiry: false
quickAnswer:
  question: "Residual Income Valuation Model: Formula and Numerical Examples: Key Summary & Verdict"
  answer: "Residual Income Valuation Model: Formula and Numerical Examples covers calculating Residual Income (RI_t = E_t − r × B_{t−1} = (ROE_t − r) × B_{t−1}), single-stage and multistage RI valuation with persistence factor ω, and adjusting for clean surplus."
  facts:
    - label: "CFA Level"
      value: "Level II"
    - label: "Curriculum Subject"
      value: "Equity Investments"
    - label: "Topic Focus"
      value: "residual income valuation model cfa"
    - label: "Syllabus Standard"
      value: "2026–2027 Curriculum"
  goodFor:
    - "Candidates preparing for CFA Level II (Equity Investments) exam questions."
    - "Financial analysts requiring verified formulas and worked calculations."
  watchFor:
    - "Verify compounding periodicity, sign conventions, and calculator mode (BGN vs END)."
    - "Review boundary conditions and common exam distractor traps."
  note: "2026–2027 CFA Program Curriculum Series · Aniket Thakur"
faqItems:
  - question: "What is the primary formula for residual income valuation model cfa in Level II Equity Investments?"
    answer: "The primary equations for Residual Income Valuation Model: Formula and Numerical Examples govern Equity Investments calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is residual income valuation model cfa tested on the CFA Level II exam?"
    answer: "On the CFA exam, Residual Income Valuation Model: Formula and Numerical Examples is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
---

## Introduction

Residual Income Valuation Model: Formula and Numerical Examples covers calculating Residual Income (RI_t = E_t − r × B_{t−1} = (ROE_t − r) × B_{t−1}), single-stage and multistage RI valuation with persistence factor ω, and adjusting for clean surplus violations in Level II Equity Investments (LM 7: Residual Income Valuation — Residual Income (RI) formula, EVA vs RI, Single-Stage RI model, Multistage RI model with persistence factor (ω), Clean Surplus Violations), with verified formulas, two worked examples, and three practice MCQs.

## Concept Explanation & Institutional Framework

Residual Income (RI) & Single-Stage RI Valuation Formula (RI_t = E_t − (r × B_{t−1}) = (ROE_t − r) × B_{t−1} ; V_0 = B_0 + [(ROE − r) / (r − g)] × B_0) and Multistage Continuing Residual Income with Persistence Factor (ω) (PV_T(Continuing RI) = RI_T / (1 + r − ω) (or if RI fades to industry ROE at t = T: V_T − B_T = (P_T − B_T))) govern calculating Residual Income (RI_t = E_t − r × B_{t−1} = (ROE_t − r) × B_{t−1}), single-stage and multistage RI valuation with persistence factor ω, and adjusting for clean surplus violations.

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: Residual Income (RI) & Single-Stage RI Valuation Formula

```formula
RI_t = E_t − (r × B_{t−1}) = (ROE_t − r) × B_{t−1}

V_0 = B_0 + [(ROE − r) / (r − g)] × B_0
```

**Institutional Context & Variable Breakdown:** Values a stock as current Book Value per share (B_0) plus the present value of future economic profits above the equity capital charge (r × B_{t−1}).

### Formula 2: Multistage Continuing Residual Income with Persistence Factor (ω)

```formula
PV_T(Continuing RI) = RI_T / (1 + r − ω) (or if RI fades to industry ROE at t = T: V_T − B_T = (P_T − B_T))
```

**Institutional Context & Variable Breakdown:**

- ω ∈ [0, 1] is the persistence factor: ω = 1 means RI_T continues at a constant level forever (PV = RI_T / r).

- ω = 0 means RI drops to zero immediately after Year T.

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Three-Year Explicit Residual Income Valuation Table

**Problem & Given Scenario:**
A company has current Book Value per share B_0 = $20.00, required return on equity r = 10.0%, and pays out 50% of earnings as dividends. Return on Equity (ROE) will be 18.0% in Years 1 and 2, and then drop to the competitive cost of equity (10.0%, so RI = $0) from Year 3 onward. Calculate Intrinsic Value V_0.

```formula
RI_t = E_t − (r × B_{t−1}) = (ROE_t − r) × B_{t−1}

V_0 = B_0 + [(ROE − r) / (r − g)] × B_0
```

**Step-by-Step Substitution & Calculation:**

Year 1: E_1 = 18% × $20.00 = $3.60; D_1 = $1.80; Equity Charge = 10% × $20.00 = $2.00; RI_1 = $3.60 − $2.00 = +$1.60; Ending Book Value B_1 = $20.00 + $3.60 − $1.80 = $21.80. Year 2: E_2 = 18% × $21.80 = $3.924; D_2 = $1.962; Equity Charge = 10% × $21.80 = $2.180; RI_2 = $3.924 − $2.180 = +$1.744; Ending B_2 = $23.762. Year 3+: Since ROE = r = 10.0%, all future RI = $0.00! Intrinsic Value V_0 = B_0 + RI_1 / 1.10 + RI_2 / 1.10^2 = $20.00 + ($1.60 / 1.10) + ($1.744 / 1.21) = $20.00 + $1.4545 + $1.4413 = $22.8958 ≈ $22.90.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Always multiply r by BEGINNING Book Value B_{t−1} (not Ending Book Value B_t!) when computing each year's equity charge and Residual Income.

### Worked Example 2: Single-Stage Residual Income Valuation and Implied Growth Rate

**Problem & Given Scenario:**
A bank has B_0 = $30.00, constant ROE = 14.0%, constant growth g = 4.0%, and required return r = 9.0%. Compute Intrinsic Value V_0 and verify its implied P/B ratio.

```formula
PV_T(Continuing RI) = RI_T / (1 + r − ω) (or if RI fades to industry ROE at t = T: V_T − B_T = (P_T − B_T))
```

**Step-by-Step Substitution & Calculation:**

V_0 = B_0 + [(ROE − r) / (r − g)] × B_0 = $30.00 + [(0.14 − 0.09) / (0.09 − 0.04)] × $30.00 = $30.00 + (0.05 / 0.05) × $30.00 = $30.00 + $30.00 = $60.00 (Implied P/B = $60 / $30 = 2.00x).

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Notice that dividing the single-stage RI equation by B_0 yields V_0 / B_0 = 1 + (ROE − r)/(r − g) = (ROE − g)/(r − g)—the exact Justified P/B formula!

## Comparison & Reference Analysis

| Persistence Scenario (after Year T) | Persistence Factor (ω) | Continuing Value Formula at t = T−1 | Economic Industry Condition |
|---|---|---|---|
| RI drops immediately to zero | ω = 0.00 | CV_{T−1} = 0 | Patent expiration / fierce competition |
| RI decays gradually toward zero | 0 < ω < 1 (typically 0.62) | RI_T / (1 + r − ω) | Gradual competitive erosion of moat |
| RI stays constant forever | ω = 1.00 | RI_T / r | Permanent dollar economic moat |
| RI grows at rate g forever | ω = 1 + g | RI_T / (r − g) | Perpetual expanding franchise |

## Real-World Financial Applications

Analysts apply Residual Income (RI) & Single-Stage RI Valuation Formula and Multistage Continuing Residual Income with Persistence Factor (ω) across Equity Investments valuation and risk management.

## CFA Examination Perspective & Testing Patterns

Tested on the CFA Level II exam (LM 7: Residual Income Valuation — Residual Income (RI) formula, EVA vs RI, Single-Stage RI model, Multistage RI model with persistence factor (ω), Clean Surplus Violations) via quantitative and conceptual MCQs.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** A company has a beginning Book Value per share (B_0) of $25.00, expects Year 1 Earnings per share (E_1) of $4.25, and expects to pay a Year 1 Dividend (D_1) of $1.50. If the required return on equity is 11.0%, the company's Year 1 Residual Income per share (RI_1) is:

- **[A]** $1.25

- **[B]** $1.50

- **[C]** $2.75

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** Equity charge = r × B_0 = 11.0% × $25.00 = $2.75. Residual Income RI_1 = E_1 − (r × B_0) = $4.25 − $2.75 = $1.50. (Dividends $1.50 affect Ending Book Value B_1 = $25 + $4.25 − $1.50 = $27.75, not RI_1!).

### Practice Question 2

**Question:** In a multistage Residual Income model, an analyst estimates Year 3 Residual Income (RI_3) at $2.40 per share and assumes that from Year 3 onward, residual income will decay with a persistence factor of ω = 0.70. At a required return on equity of r = 10.0%, the present value of continuing residual income as of the end of Year 2 (t = 2) is:

- **[A]** $6.00

- **[B]** $8.00

- **[C]** $24.00

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** Continuing Value at t = T − 1 (end of Year 2) = RI_3 / (1 + r − ω) = $2.40 / (1 + 0.10 − 0.70) = $2.40 / 0.40 = $6.00.

### Practice Question 3

**Question:** The Residual Income model relies on the 'clean surplus relation' (B_t = B_{t−1} + E_t − D_t). Which accounting practice violates clean surplus accounting and requires analyst adjustment if expected to be non-zero in the future?

- **[A]** Recognizing recurring foreign currency translation adjustments, pension remeasurements, or FVOCI security gains directly in Other Comprehensive Income (OCI) bypassing Net Income

- **[B]** Using straight-line depreciation instead of accelerated depreciation

- **[C]** Paying cash dividends

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** Items that bypass the income statement and flow directly into shareholders' equity via OCI violate the clean surplus relation; if non-zero in expectation, the analyst should use Total Comprehensive Income instead of Net Income.

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in Residual Income (RI) & Single-Stage RI Valuation Formula.**

- **Timing Errors: Mixing beginning and ending balances in Multistage Continuing Residual Income with Persistence Factor (ω).**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Residual Income (RI) & Single-Stage RI Valuation Formula: RI_t = E_t − (r × B_{t−1}) = (ROE_t − r) × B_{t−1} ; V_0 = B_0 + [(ROE − r) / (r − g)] × B_0.**

- **Takeaway 2: Multistage Continuing Residual Income with Persistence Factor (ω): PV_T(Continuing RI) = RI_T / (1 + r − ω) (or if RI fades to industry ROE at t = T: V_T − B_T = (P_T − B_T)).**

- **Takeaway 3: Always multiply r by BEGINNING Book Value B_{t−1} (not Ending Book Value B_t!) when comput.**

- **Takeaway 4: Notice that dividing the single-stage RI equation by B_0 yields V_0 / B_0 = 1 + (ROE − r)/.**

## Frequently Asked Questions (FAQs)

### What is the primary formula for residual income valuation model cfa in Level II Equity Investments?

The primary equations for Residual Income Valuation Model: Formula and Numerical Examples govern Equity Investments calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is residual income valuation model cfa tested on the CFA Level II exam?

On the CFA exam, Residual Income Valuation Model: Formula and Numerical Examples is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level II · Equity Investments).

### Related CFA Study Guides

- [Dividend Discount Model: How to Solve Multistage Valuation Questions](/blog/cfa/cfa-level-2-dividend-discount-model-multistage-valuation/)

- [Enterprise Value vs Equity Value: How to Calculate Both](/blog/cfa/cfa-level-2-enterprise-value-vs-equity-value-calculate-both/)

- [How to Build a DCF Valuation Model Step by Step](/blog/cfa/cfa-level-2-build-dcf-valuation-model-step-by-step/)

