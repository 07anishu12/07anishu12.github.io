---
title: "CFA Fixed Income Practice Questions: Bond Pricing and Yield Calculations"
seoTitle: "CFA Fixed Income Practice Questions: Bond Pricing and Yield Calculations — CFA Level I"
slug: cfa-level-1-fixed-income-practice-questions
description: "Master cfa level 1 fixed income practice questions for Level I (Fixed Income). Includes verified CFA formulas, 2 step-by-step solved numerical examples, comp."
category: cfa
tags:
  - "CFA"
  - "Level I"
  - "Fixed Income"
  - "cfa level 1 fixed income practice questions"
  - "cfa level 1 fixed income practice questions formula"
author: Aniket Thakur
datePublished: "2026-11-09"
dateModified: "2026-11-09"
coverImage: /assets/images/blog/cfa-level-1-fixed-income-practice-questions/cover.svg
coverImageAlt: "Illustrative guide to CFA Fixed Income Practice Questions: Bond Pricing and Yield Calculations"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for CFA Fixed Income Practice Questions: Bond Pricing and Yield Calculations."
draft: false
featured: true
sources:
  - title: "CFA Institute 2026–2027 Program Curriculum: Fixed Income"
    url: https://www.cfainstitute.org/en/programs/cfa/curriculum
  - title: "CFA Institute Candidate Study Resources & Topic Outlines"
    url: https://www.cfainstitute.org/en/programs/cfa/candidate
showSources: true
enquiry: false
quickAnswer:
  question: "CFA Fixed Income Practice Questions: Bond Pricing and Yield Calculations: Key Summary & Verdict"
  answer: "CFA Fixed Income Practice Questions: Bond Pricing and Yield Calculations is a core Level I Fixed Income topic (LM 1–19: Comprehensive Fixed Income Synthesis — Matrix pricing, repo rates, duration immunization, ABS/MBS securitization, and spread calculations)."
  facts:
    - label: "CFA Level"
      value: "Level I"
    - label: "Curriculum Subject"
      value: "Fixed Income"
    - label: "Topic Focus"
      value: "cfa level 1 fixed income practice q"
    - label: "Syllabus Standard"
      value: "2026–2027 Curriculum"
  goodFor:
    - "Candidates preparing for CFA Level I (Fixed Income) exam questions."
    - "Financial analysts requiring verified formulas and worked calculations."
  watchFor:
    - "Verify compounding periodicity, sign conventions, and calculator mode (BGN vs END)."
    - "Review boundary conditions and common exam distractor traps."
  note: "2026–2027 CFA Program Curriculum Series · Aniket Thakur"
faqItems:
  - question: "What is the primary formula for cfa level 1 fixed income practice questions in Level I Fixed Income?"
    answer: "The primary equations for CFA Fixed Income Practice Questions: Bond Pricing and Yield Calculations govern Fixed Income calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is cfa level 1 fixed income practice questions tested on the CFA Level I exam?"
    answer: "On the CFA exam, CFA Fixed Income Practice Questions: Bond Pricing and Yield Calculations is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
  - question: "How does Matrix Pricing Linear Yield Interpolation & Repo Dollar Interest connect to related topics in Fixed Income?"
    answer: "Within Fixed Income, Matrix Pricing Linear Yield Interpolation & Repo Dollar Interest links directly to What Is the Yield Curve? Normal, Inv within the standard CFA Fixed Income curriculum framework."
---

## Introduction

CFA Fixed Income Practice Questions: Bond Pricing and Yield Calculations is a core Level I Fixed Income topic (LM 1–19: Comprehensive Fixed Income Synthesis — Matrix pricing, repo rates, duration immunization, ABS/MBS securitization, and spread calculations) focusing on integrated fixed-income exam problem-solving: linear interpolation matrix pricing, repo hair-cuts, portfolio duration weighting, and MBS prepayment risk. This guide covers the governing equations (Matrix Pricing Linear Yield Interpolation & Repo Dollar Interest and Portfolio Duration & Securitization Prepayment Risk), two verified numerical examples, a comparison table, and three original CFA-style practice questions.

## Concept Explanation & Institutional Framework

From first principles, integrated fixed-income exam problem-solving: linear interpolation matrix pricing, repo hair-cuts, portfolio duration weighting, and MBS prepayment risk links theoretical valuation and risk mechanics to practical decisions in Fixed Income. Matrix Pricing Linear Yield Interpolation & Repo Dollar Interest (Interpolated Yield = Y_short + [(T_target − T_short) / (T_long − T_short)] × (Y_long − Y_short) ; Repo Interest = Principal × Repo Rate × (Days / 360)) establishes the primary relationship (Prices illiquid corporate bonds via maturity interpolation and computes short-term repurchase agreement financing costs.), while Portfolio Duration & Securitization Prepayment Risk (ModDur_Portfolio = ∑ (w_i × ModDur_i) where w_i = Market Value_i / Total Portfolio Market Value) governs Weights each bond's duration by its market value share (never par value share); in MBS, falling rates trigger contraction risk and rising rates trigger extension risk.

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: Matrix Pricing Linear Yield Interpolation & Repo Dollar Interest

```formula
Interpolated Yield = Y_short + [(T_target − T_short) / (T_long − T_short)] × (Y_long − Y_short)

Repo Interest = Principal × Repo Rate × (Days / 360)
```

**Institutional Context & Variable Breakdown:** Prices illiquid corporate bonds via maturity interpolation and computes short-term repurchase agreement financing costs.

### Formula 2: Portfolio Duration & Securitization Prepayment Risk

```formula
ModDur_Portfolio = ∑ (w_i × ModDur_i) where w_i = Market Value_i / Total Portfolio Market Value
```

**Institutional Context & Variable Breakdown:**

- Weights each bond's duration by its market value share (never par value share).

- in MBS, falling rates trigger contraction risk and rising rates trigger extension risk.

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Matrix Pricing an Illiquid 6-Year Corporate Bond via Yield Interpolation

**Problem & Given Scenario:**
An analyst must price a newly issued, illiquid 6-year, 5.0% annual coupon BBB bond ($100 par). Actively traded BBB peer bonds with 4-year and 9-year maturities trade at yields of 4.60% and 5.60%, respectively.

```formula
Interpolated Yield = Y_short + [(T_target − T_short) / (T_long − T_short)] × (Y_long − Y_short)

Repo Interest = Principal × Repo Rate × (Days / 360)
```

**Step-by-Step Substitution & Calculation:**

Step 1: Linearly interpolate the 6-year required YTM: Y_6 = 4.60% + [(6 − 4) / (9 − 4)] × (5.60% − 4.60%) = 4.60% + (2 / 5) × 1.00% = 4.60% + 0.40% = 5.00%. Step 2: Since the interpolated required YTM (5.00%) equals the bond's 5.00% annual coupon rate, the matrix-estimated price is exactly $100.00 (par).

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Matrix pricing linearly interpolates yields (or spreads over benchmark Treasuries) across surrounding maturities of the same credit rating.

### Worked Example 2: Portfolio Modified Duration and Repurchase Agreement (Repo) Margin Calculation

**Problem & Given Scenario:**
A dealer holds $60M market value of Bond X (ModDur = 3.5) and $40M market value of Bond Y (ModDur = 8.5). The dealer finances the $40M Bond Y position in an overnight 30-day term repo with a 5.0% initial margin (haircut = 1 − 1/1.05 or 5% haircut -> $38M loan) at a 4.50% repo rate (Actual/360).

```formula
ModDur_Portfolio = ∑ (w_i × ModDur_i) where w_i = Market Value_i / Total Portfolio Market Value
```

**Step-by-Step Substitution & Calculation:**

Portfolio ModDur = (0.60 × 3.5) + (0.40 × 8.5) = 2.10 + 3.40 = 5.50. Repo Loan Principal (with 5% haircut on $40M collateral) = $40M × (1 − 0.05) = $38,000,000. 30-Day Repo Interest = $38,000,000 × 0.045 × (30 / 360) = $142,500; Repurchase Price = $38,142,500.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Portfolio duration always uses market-value weights (60%/40%), assuming parallel yield shifts across all holdings.

## Comparison & Reference Analysis

| MBS / Securitization Concept | Rate Environment | Prepayment / Cash Flow Behavior | Impact on MBS Investor |
|---|---|---|---|
| Contraction Risk | Interest rates fall sharply | Homeowners refinance early (PSA spikes) | Principal returned early at low reinvestment rates |
| Extension Risk | Interest rates rise sharply | Prepayments slow below expectations | Cash flows locked in longer at below-market coupon |
| Time Tranching (CMO Sequential) | Sequential A, B, C tranches | Redistributes contraction/extension risk | PAC tranches protected by Support tranches |
| Credit Tranching (Subordination) | Senior / Mezzanine / Equity | Losses absorbed bottom-up by First-Loss Equity | Credit enhancement creates AAA Senior tranche |

## Real-World Financial Applications

In institutional Fixed Income practice, analysts apply Matrix Pricing Linear Yield Interpolation & Repo Dollar Interest and Portfolio Duration & Securitization Prepayment Risk to value securities, audit financial statements, and manage portfolio risk.

## CFA Examination Perspective & Testing Patterns

On the CFA Level I exam (LM 1–19: Comprehensive Fixed Income Synthesis — Matrix pricing, repo rates, duration immunization, ABS/MBS securitization, and spread calculations), cfa level 1 fixed income practice questions is tested via standalone 90-second MCQs combining Matrix Pricing Linear Yield Interpolation & Repo Dollar Interest calculations with economic interpretation.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** In an agency Residential Mortgage-Backed Security (RMBS) structured with Planned Amortization Class (PAC) tranches and Support (Companion) tranches, when interest rates drop sharply and prepayments accelerate, the Support tranches:

- **[A]** Absorb the excess prepayments first (contracting in average life) to keep the PAC tranche on its scheduled amortization collar

- **[B]** Are immune to prepayment risk

- **[C]** Transfer credit default losses to the PAC tranches

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** Support tranches act as a sponge for prepayment volatility: they absorb excess prepayments when rates fall (protecting PACs from contraction risk) and defer principal when rates rise (protecting PACs from extension risk).

### Practice Question 2

**Question:** A fixed-income portfolio consists of Bond A (Par = $10M, Market Value = $12M, ModDur = 4.0) and Bond B (Par = $10M, Market Value = $8M, ModDur = 9.0). The portfolio's Modified Duration is closest to:

- **[A]** 6.00

- **[B]** 6.50

- **[C]** 7.00

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** Total Market Value = $12M + $8M = $20M. Market value weights are w_A = 12/20 = 0.60 and w_B = 8/20 = 0.40. Portfolio ModDur = (0.60 × 4.0) + (0.40 × 9.0) = 2.40 + 3.60 = 6.00. (Using par weights 50/50 gives the trap answer 6.50).

### Practice Question 3

**Question:** A 5-year BBB bond does not trade actively. If a 3-year BBB bond yields 4.80% and an 8-year BBB bond yields 6.05%, the matrix-interpolated yield for the 5-year BBB bond is:

- **[A]** 5.30%

- **[B]** 5.43%

- **[C]** 5.55%

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** Y_5 = 4.80% + [(5 − 3) / (8 − 3)] × (6.05% − 4.80%) = 4.80% + (2 / 5) × 1.25% = 4.80% + 0.50% = 5.30%.

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in Matrix Pricing Linear Yield Interpolation & Repo Dollar Interest.**

- **Timing Errors: Mixing beginning and ending balances in Portfolio Duration & Securitization Prepayment Risk.**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Curriculum Scope: LM 1–19: Comprehensive Fixed Income Synthesis — Matrix pricing, repo rates, duration immunization, ABS/MBS securitization, and spread calculations (Level I · Fixed Income).**

- **Takeaway 2: Primary Formula (Matrix Pricing Linear Yield Interpolation & Repo Dollar Interest): Interpolated Yield = Y_short + [(T_target − T_short) / (T_long − T_short)] × (Y_long − Y_short) ; Repo Interest = Principal × Repo Rate × (Days / 360).**

- **Takeaway 3: Secondary Formula (Portfolio Duration & Securitization Prepayment Risk): ModDur_Portfolio = ∑ (w_i × ModDur_i) where w_i = Market Value_i / Total Portfolio Market Value.**

- **Takeaway 4: Key Insight 1: Matrix pricing linearly interpolates yields (or spreads over benchmark Treasuries) across surrounding maturities of the same credit rating.**

- **Takeaway 5: Key Insight 2: Portfolio duration always uses market-value weights (60%/40%), assuming parallel yield shifts across all holdings.**

## Frequently Asked Questions (FAQs)

### What is the primary formula for cfa level 1 fixed income practice questions in Level I Fixed Income?

The primary equations for CFA Fixed Income Practice Questions: Bond Pricing and Yield Calculations govern Fixed Income calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is cfa level 1 fixed income practice questions tested on the CFA Level I exam?

On the CFA exam, CFA Fixed Income Practice Questions: Bond Pricing and Yield Calculations is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

### How does Matrix Pricing Linear Yield Interpolation & Repo Dollar Interest connect to related topics in Fixed Income?

Within Fixed Income, Matrix Pricing Linear Yield Interpolation & Repo Dollar Interest links directly to What Is the Yield Curve? Normal, Inv within the standard CFA Fixed Income curriculum framework.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level I · Fixed Income).

### Related CFA Study Guides

- [What Is the Yield Curve? Normal, Inverted and Flat Yield Curves](/blog/cfa/cfa-level-1-what-is-yield-curve-normal-inverted-flat/)

- [Bond Credit Ratings Explained: Investment Grade vs Junk Bonds](/blog/cfa/cfa-level-1-bond-credit-ratings-investment-grade-vs-junk/)

- [Zero Coupon Bonds: How to Calculate Price and Yield](/blog/cfa/cfa-level-1-zero-coupon-bonds-price-and-yield/)

