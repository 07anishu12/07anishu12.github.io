---
title: "Active vs Passive Portfolio Management: Risk and Return Analysis"
seoTitle: "Active vs Passive Portfolio Management: Risk and Return Analysis — CFA Level II"
slug: cfa-level-2-active-vs-passive-portfolio-management-risk-return
description: "Master active vs passive portfolio management cfa for Level II (Portfolio Management). Includes verified CFA formulas, 2 step-by-step solved numerical exampl."
category: cfa
tags:
  - "CFA"
  - "Level II"
  - "Portfolio Management"
  - "active vs passive portfolio management cfa"
  - "active vs passive portfolio management cfa formula"
author: Aniket Thakur
datePublished: "2026-11-14"
dateModified: "2026-11-14"
coverImage: /assets/images/blog/cfa-level-2-active-vs-passive-portfolio-management-risk-return/cover.svg
coverImageAlt: "Illustrative guide to Active vs Passive Portfolio Management: Risk and Return Analysis"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for Active vs Passive Portfolio Management: Risk and Return Analysis."
draft: false
featured: false
sources:
  - title: "CFA Institute 2026–2027 Program Curriculum: Portfolio Management"
    url: https://www.cfainstitute.org/en/programs/cfa/curriculum
  - title: "CFA Institute Candidate Study Resources & Topic Outlines"
    url: https://www.cfainstitute.org/en/programs/cfa/candidate
showSources: true
enquiry: false
quickAnswer:
  question: "Active vs Passive Portfolio Management: Risk and Return Analysis: Key Summary & Verdict"
  answer: "Active vs Passive Portfolio Management: Risk and Return Analysis covers comparing Active Share and Active Risk (Tracking Error) across Pure Indexing, Closet Indexing, Sector Rotators, and Concentrated Stock Pickers, plus ETF vs Mutual Fund Total Cost of."
  facts:
    - label: "CFA Level"
      value: "Level II"
    - label: "Curriculum Subject"
      value: "Portfolio Management"
    - label: "Topic Focus"
      value: "active vs passive portfolio managem"
    - label: "Syllabus Standard"
      value: "2026–2027 Curriculum"
  goodFor:
    - "Candidates preparing for CFA Level II (Portfolio Management) exam questions."
    - "Financial analysts requiring verified formulas and worked calculations."
  watchFor:
    - "Verify compounding periodicity, sign conventions, and calculator mode (BGN vs END)."
    - "Review boundary conditions and common exam distractor traps."
  note: "2026–2027 CFA Program Curriculum Series · Aniket Thakur"
faqItems:
  - question: "What is the primary formula for active vs passive portfolio management cfa in Level II Portfolio Management?"
    answer: "The primary equations for Active vs Passive Portfolio Management: Risk and Return Analysis govern Portfolio Management calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is active vs passive portfolio management cfa tested on the CFA Level II exam?"
    answer: "On the CFA exam, Active vs Passive Portfolio Management: Risk and Return Analysis is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
---

## Introduction

Active vs Passive Portfolio Management: Risk and Return Analysis covers comparing Active Share and Active Risk (Tracking Error) across Pure Indexing, Closet Indexing, Sector Rotators, and Concentrated Stock Pickers, plus ETF vs Mutual Fund Total Cost of Ownership in Level II Portfolio Management (LM 2 & LM 3: Analysis of Active Portfolio Management & ETFs — Active Return, Active Risk (Tracking Error), Closet Indexing (Low Active Share & Low Tracking Error), ETF Total Cost of Ownership (Holding Period vs Trading Costs)), with verified formulas, two worked examples, and three practice MCQs.

## Concept Explanation & Institutional Framework

Active Share vs. Active Risk (Tracking Error) (Active Share = 0.5 × ∑ |w_{P,i} − w_{B,i}| ∈ [0%, 100%] ; Active Risk (Tracking Error) = σ(R_P − R_B)) and ETF Total Cost of Ownership (TCO) over Holding Horizon T (TCO = Round-Trip Trading Cost + (Annual Holding Cost × T) = [Commission % + Bid-Ask Spread % + |Premium/Discount %|] + [(Expense Ratio % + Tracking Diff %) × T]) govern comparing Active Share and Active Risk (Tracking Error) across Pure Indexing, Closet Indexing, Sector Rotators, and Concentrated Stock Pickers, plus ETF vs Mutual Fund Total Cost of Ownership.

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: Active Share vs. Active Risk (Tracking Error)

```formula
Active Share = 0.5 × ∑ |w_{P,i} − w_{B,i}| ∈ [0%, 100%]

Active Risk (Tracking Error) = σ(R_P − R_B)
```

**Institutional Context & Variable Breakdown:**

- Active Share measures weight differences from the benchmark.

- Active Risk measures return volatility differences ( affected by cross-stock correlations!).

### Formula 2: ETF Total Cost of Ownership (TCO) over Holding Horizon T

```formula
TCO = Round-Trip Trading Cost + (Annual Holding Cost × T) = [Commission % + Bid-Ask Spread % + |Premium/Discount %|] + [(Expense Ratio % + Tracking Diff %) × T]
```

**Institutional Context & Variable Breakdown:**

- Short-term tactical traders prioritize low Bid-Ask Spreads and high liquidity.

- long-term buy-and-hold investors prioritize low annual Expense Ratios.

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Calculating Active Share and Classifying Manager Style (Closet Indexer vs. Concentrated Stock Picker)

**Problem & Given Scenario:**
A benchmark index consists of 4 stocks with equal 25% weights: A (Tech), B (Tech), C (Healthcare), D (Healthcare). Manager 1 holds w_A = 28%, w_B = 22%, w_C = 23%, w_D = 27%. Manager 2 holds w_A = 50%, w_B = 0%, w_C = 50%, w_D = 0% (matching the benchmark's 50% Tech / 50% Healthcare sector weights!). Compute Active Share for both.

```formula
Active Share = 0.5 × ∑ |w_{P,i} − w_{B,i}| ∈ [0%, 100%]

Active Risk (Tracking Error) = σ(R_P − R_B)
```

**Step-by-Step Substitution & Calculation:**

Manager 1 Active Share = 0.5 × (|28−25| + |22−25| + |23−25| + |27−25|) = 0.5 × (3% + 3% + 2% + 2%) = 5.0% (and very low Tracking Error -> Manager 1 is a 'Closet Indexer'!). Manager 2 Active Share = 0.5 × (|50−25| + |0−25| + |50−25| + |0−25|) = 0.5 × (25% + 25% + 25% + 25%) = 50.0% (high Active Share, moderate Tracking Error because sector weights are matched -> Manager 2 is a 'Diversified Stock Picker'!).

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Active Share = 0.5 × ∑|w_{P,i} − w_{B,i}| divides by 2 so that replacing a 100% benchmark with 100% non-benchmark stocks equals 100% Active Share (not 200%).

### Worked Example 2: Comparing ETF Total Cost of Ownership for a 3-Month Tactical Trade vs. 3-Year Core Holding

**Problem & Given Scenario:**
Compare ETF Liquid-Large (Annual Expense Ratio = 0.20%, Round-Trip Bid-Ask Spread = 0.04%, Commission = 0%) vs. ETF Cheap-Thin (Annual Expense Ratio = 0.06%, Round-Trip Bid-Ask Spread = 0.36%, Commission = 0%) over (A) a 3-month (0.25 yr) tactical trade and (B) a 3-year (3.0 yr) core allocation.

```formula
TCO = Round-Trip Trading Cost + (Annual Holding Cost × T) = [Commission % + Bid-Ask Spread % + |Premium/Discount %|] + [(Expense Ratio % + Tracking Diff %) × T]
```

**Step-by-Step Substitution & Calculation:**

- **Step 1. Over 3 Months (T = 0.25 yr): TCO(Liquid-Large) = 0.04% + (0.25 × 0.20%) = 0.09% (Cheaper for 3m trade!). TCO(Cheap-Thin) = 0.36% + (0.25 × 0.06%) = 0.375%.**

- **Step 2. Over 3 Years (T = 3.0 yrs): TCO(Liquid-Large) = 0.04% + (3.0 × 0.20%) = 0.64%. TCO(Cheap-Thin) = 0.36% + (3.0 × 0.06%) = 0.54% (Cheaper for 3-yr hold!). Crossover Holding Period = (0.36% − 0.04%) / (0.20% − 0.06%) = 0.32% / 0.14% = 2.29 years.**

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> For holding periods shorter than 2.29 years, bid-ask spread trading costs dominate; for horizons longer than 2.29 years, annual management fees dominate.

## Comparison & Reference Analysis

| Manager Classification | Active Share | Active Risk (Tracking Error) | Economic Assessment |
|---|---|---|---|
| Pure Index Fund / ETF | ≈ 0% | ≈ 0% | Low-cost beta benchmark exposure |
| Closet Indexer | Low (< 20%–30%) | Low (< 2%) | Worst value: charges active fees for index hug |
| Factor / Sector Rotator | Low to High | High (driven by factor beta) | Takes big macro/sector correlation bets |
| Concentrated Stock Picker | Very High (> 80%) | High (idiosyncratic + factor) | True high-conviction active management |

## Real-World Financial Applications

Analysts apply Active Share vs. Active Risk (Tracking Error) and ETF Total Cost of Ownership (TCO) over Holding Horizon T across Portfolio Management valuation and risk management.

## CFA Examination Perspective & Testing Patterns

Tested on the CFA Level II exam (LM 2 & LM 3: Analysis of Active Portfolio Management & ETFs — Active Return, Active Risk (Tracking Error), Closet Indexing (Low Active Share & Low Tracking Error), ETF Total Cost of Ownership (Holding Period vs Trading Costs)) via quantitative and conceptual MCQs.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** A mutual fund charges an active management fee of 1.10% per year, yet its portfolio exhibits an Active Share of only 14% and an annualized Active Risk (tracking error) of 1.2% relative to the S&P 500. This fund is best characterized as a:

- **[A]** Concentrated stock picker

- **[B]** Closet indexer (which is likely to underperform the benchmark net of fees because its active bets are too small to overcome its 1.10% fee drag)

- **[C]** Sector rotator

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** Low Active Share combined with low Tracking Error defines a 'closet indexer'—a fund that closely hugs the benchmark while charging high active fees.

### Practice Question 2

**Question:** An institutional trader needs to park $50 million in an S&P 500 ETF for just 15 days (equitizing cash during a manager transition). When selecting between two S&P 500 ETFs, which cost component is most critical for minimizing Total Cost of Ownership over this 15-day horizon?

- **[A]** The annual management expense ratio

- **[B]** The round-trip bid-ask spread and market impact liquidity cost

- **[C]** The 5-year tracking error

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** Over a 15-day holding period (15/365 of a year), the annual expense ratio is negligible (< 1 bp), whereas the one-time round-trip bid-ask spread and market impact dominate total cost.

### Practice Question 3

**Question:** In the Fundamental Law of Active Management [IR = TC × IC × √BR], what does the Transfer Coefficient (TC) measure?

- **[A]** The correlation between the manager's forecasted returns and the actual realized returns

- **[B]** The correlation between the manager's unconstrained optimal active weights (or risk-weighted forecasts) and the actual constrained active portfolio weights implemented

- **[C]** The number of securities in the benchmark

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** IC measures forecast skill (correlation of forecasts with realized returns); TC measures portfolio construction freedom (correlation of risk-adjusted forecasts with actual implemented active weights, where TC = 1.0 when unconstrained).

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in Active Share vs. Active Risk (Tracking Error).**

- **Timing Errors: Mixing beginning and ending balances in ETF Total Cost of Ownership (TCO) over Holding Horizon T.**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Active Share vs. Active Risk (Tracking Error): Active Share = 0.5 × ∑ |w_{P,i} − w_{B,i}| ∈ [0%, 100%] ; Active Risk (Tracking Error) = σ(R_P − R_B).**

- **Takeaway 2: ETF Total Cost of Ownership (TCO) over Holding Horizon T: TCO = Round-Trip Trading Cost + (Annual Holding Cost × T) = [Commission % + Bid-Ask Spread % + |Premium/Discount %|] + [(Expense Ratio % + Tracking Diff %) × T].**

- **Takeaway 3: Active Share = 0.5 × ∑|w_{P,i} − w_{B,i}| divides by 2 so that replacing a 100% benchmark.**

- **Takeaway 4: For holding periods shorter than 2.29 years, bid-ask spread trading costs dominate; for.**

## Frequently Asked Questions (FAQs)

### What is the primary formula for active vs passive portfolio management cfa in Level II Portfolio Management?

The primary equations for Active vs Passive Portfolio Management: Risk and Return Analysis govern Portfolio Management calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is active vs passive portfolio management cfa tested on the CFA Level II exam?

On the CFA exam, Active vs Passive Portfolio Management: Risk and Return Analysis is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level II · Portfolio Management).

### Related CFA Study Guides

- [Multifactor Models Explained: How to Interpret Factor Exposures](/blog/cfa/cfa-level-2-multifactor-models-interpret-factor-exposures/)

- [How to Calculate Portfolio Performance and Risk-Adjusted Returns](/blog/cfa/cfa-level-2-calculate-portfolio-performance-risk-adjusted-returns/)

- [How to Calculate Portfolio Return Attribution](/blog/cfa/cfa-level-2-calculate-portfolio-return-attribution/)

