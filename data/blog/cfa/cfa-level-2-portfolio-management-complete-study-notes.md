---
title: "CFA Level 2 Portfolio Management: Complete Study Notes"
seoTitle: "CFA Level 2 Portfolio Management: Complete Study Notes — CFA Level II"
slug: cfa-level-2-portfolio-management-complete-study-notes
description: "Master CFA Level 2 Portfolio Management: Complete Study Notes for CFA Level II (Portfolio Management). Includes verified curriculum formulas, worked numerical examples, and exam review notes."
category: cfa
tags:
  - "CFA"
  - "Level II"
  - "Portfolio Management"
  - "cfa level 2 portfolio management"
  - "cfa level 2 portfolio management formula"
author: Aniket Thakur
datePublished: "2026-11-14"
dateModified: "2026-11-14"
coverImage: /assets/images/blog/cfa-level-2-portfolio-management-complete-study-notes/cover.svg
coverImageAlt: "Illustrative guide to CFA Level 2 Portfolio Management: Complete Study Notes"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for CFA Level 2 Portfolio Management: Complete Study Notes."
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
  question: "CFA Level 2 Portfolio Management: Complete Study Notes: Key Summary & Verdict"
  answer: "CFA Level 2 Portfolio Management: Complete Study Notes is a core Level II Portfolio Management topic (LM 1–5: Economics and Investment Markets, Analysis of Active Portfolio Management, Exchange-Traded Funds: Mechanics and Applications, Using Multifactor."
  facts:
    - label: "CFA Level"
      value: "Level II"
    - label: "Curriculum Subject"
      value: "Portfolio Management"
    - label: "Topic Focus"
      value: "cfa level 2 portfolio management"
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
  - question: "What is the primary formula for cfa level 2 portfolio management in Level II Portfolio Management?"
    answer: "The primary equations for CFA Level 2 Portfolio Management: Complete Study Notes govern Portfolio Management calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is cfa level 2 portfolio management tested on the CFA Level II exam?"
    answer: "On the CFA exam, CFA Level 2 Portfolio Management: Complete Study Notes is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
  - question: "How does Fundamental Law of Active Portfolio Management (Grinold-Kahn) connect to related topics in Portfolio Management?"
    answer: "Within Portfolio Management, Fundamental Law of Active Portfolio Management (Grinold-Kahn) links directly to How to Calculate Portfolio Retu within the standard CFA Portfolio Management curriculum framework."
---

## Introduction

CFA Level 2 Portfolio Management: Complete Study Notes is a core Level II Portfolio Management topic (LM 1–5: Economics and Investment Markets, Analysis of Active Portfolio Management, Exchange-Traded Funds: Mechanics and Applications, Using Multifactor Models, Measuring and Managing Market Risk) focusing on the Fundamental Law of Active Management (Information Ratio, Information Coefficient, Breadth, Transfer Coefficient), ETF primary/secondary creation-redemption mechanics, Parametric/Historical/Monte Carlo VaR, and macro discount factor pricing. This guide covers the governing equations (Fundamental Law of Active Portfolio Management (Grinold-Kahn) and Optimal Active Risk (σ_A*) & Maximum Combined Sharpe Ratio), two verified numerical examples, a comparison table, and three original CFA-style practice questions.

## Concept Explanation & Institutional Framework

From first principles, the Fundamental Law of Active Management (Information Ratio, Information Coefficient, Breadth, Transfer Coefficient), ETF primary/secondary creation-redemption mechanics, Parametric/Historical/Monte Carlo VaR, and macro discount factor pricing links theoretical valuation and risk mechanics to practical decisions in Portfolio Management. Fundamental Law of Active Portfolio Management (Grinold-Kahn) (E(R_A) = TC × IC × √BR × σ_A ; Information Ratio (IR) = TC × IC × √BR (Unconstrained IR* = IC × √BR where TC = 1)) establishes the primary relationship (IC = Information Coefficient (skill correlation between forecasts and realized returns); BR = Breadth (number of independent active bets per year); TC = Transfer Coefficient (constraint correlation ∈ [0, 1]).), while Optimal Active Risk (σ_A*) & Maximum Combined Sharpe Ratio (σ_A* = (IR / SR_Benchmark) × σ_Benchmark ; SR_Combined^2 = SR_Benchmark^2 + IR^2) governs Finds the exact level of active tracking risk σ_A* that maximizes the total portfolio Sharpe Ratio; at σ_A*, the combined squared Sharpe Ratio equals Benchmark SR^2 + Active IR^2!

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: Fundamental Law of Active Portfolio Management (Grinold-Kahn)

```formula
E(R_A) = TC × IC × √BR × σ_A

Information Ratio (IR) = TC × IC × √BR (Unconstrained IR* = IC × √BR where TC = 1)
```

**Institutional Context & Variable Breakdown:**

- IC = Information Coefficient (skill correlation between forecasts and realized returns).

- BR = Breadth (number of independent active bets per year).

- TC = Transfer Coefficient (constraint correlation ∈ [0, 1]).

### Formula 2: Optimal Active Risk (σ_A*) & Maximum Combined Sharpe Ratio

```formula
σ_A* = (IR / SR_Benchmark) × σ_Benchmark

SR_Combined^2 = SR_Benchmark^2 + IR^2
```

**Institutional Context & Variable Breakdown:**

- Finds the exact level of active tracking risk σ_A* that maximizes the total portfolio Sharpe Ratio.

- at σ_A*, the combined squared Sharpe Ratio equals Benchmark SR^2 + Active IR^2!.

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Applying the Fundamental Law of Active Management and Optimal Active Risk

**Problem & Given Scenario:**
An active equity manager makes independent quarterly stock-selection forecasts across 100 uncorrelated stocks (so annual Breadth BR = 4 × 100 = 400 independent bets/year). The manager's Information Coefficient is IC = 0.05, and portfolio long-only constraints yield a Transfer Coefficient of TC = 0.75. The benchmark index has an expected Sharpe Ratio of SR_B = 0.40 and volatility of σ_B = 16.0%. Calculate (1) the manager's Information Ratio (IR), (2) the expected Active Return at σ_A = 6.0%, (3) the Optimal Active Risk σ_A*, and (4) the Maximum Combined Sharpe Ratio.

```formula
E(R_A) = TC × IC × √BR × σ_A

Information Ratio (IR) = TC × IC × √BR (Unconstrained IR* = IC × √BR where TC = 1)
```

**Step-by-Step Substitution & Calculation:**

Step 1 (Information Ratio): IR = TC × IC × √BR = 0.75 × 0.05 × √400 = 0.0375 × 20 = 0.750. Step 2 (Expected Active Return at σ_A = 6.0%): E(R_A) = IR × σ_A = 0.750 × 6.0% = +4.50%. Step 3 (Optimal Active Risk σ_A*): σ_A* = (IR / SR_B) × σ_B = (0.750 / 0.40) × 16.0% = 1.875 × 16.0% = 30.0%. Step 4 (Maximum Combined Sharpe Ratio): SR_P = √(SR_B^2 + IR^2) = √(0.40^2 + 0.75^2) = √(0.16 + 0.5625) = √0.7225 = 0.850!

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Notice how combining a 0.40 Sharpe benchmark with a 0.75 Information Ratio active overlay satisfies the Pythagorean relationship SR_P = √(0.40^2 + 0.75^2) = 0.85!

### Worked Example 2: Calculating Parametric Daily and Monthly Value at Risk (VaR)

**Problem & Given Scenario:**
A $200,000,000 portfolio has an expected annual return of 10.0% (0.04% daily) and an annual standard deviation of 16.0% (1.00% daily, assuming 250 trading days since 16% / √250 ≈ 1.01%). Compute the 1-day 95% (one-tailed Z = 1.65) and 99% (one-tailed Z = 2.33) Parametric Dollar Value at Risk.

```formula
σ_A* = (IR / SR_Benchmark) × σ_Benchmark

SR_Combined^2 = SR_Benchmark^2 + IR^2
```

**Step-by-Step Substitution & Calculation:**

1-Day 95% Percentage VaR = [(1.65 × 1.00%) − 0.04%] = 1.61%; Dollar VaR_95% = 1.61% × $200,000,000 = $3,220,000. 1-Day 99% Percentage VaR = [(2.33 × 1.00%) − 0.04%] = 2.29%; Dollar VaR_99% = 2.29% × $200,000,000 = $4,580,000.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Remember that Value at Risk (VaR) is always a ONE-TAILED left-tail test: 5% VaR uses Z = 1.65 (not 1.96!), and 1% VaR uses Z = 2.33 (not 2.58!). Conditional VaR (CVaR / Expected Shortfall) measures the average loss given that the VaR threshold is breached.

## Comparison & Reference Analysis

| Portfolio Module Concept | Key Mechanism / Equation | Advantage | Limitation / Trap |
|---|---|---|---|
| Fundamental Law (IR) | IR = TC × IC × √BR | Separates skill (IC), breadth (BR), constraints (TC) | Correlated bets reduce true Breadth BR |
| ETF Creation / Redemption | Authorized Participant (AP) in-kind basket | Eliminates capital gains tax distributions; tight arbitrage | Illiquid underlying bonds widen ETF premium/discount |
| Parametric VaR | VaR = [Z_α × σ − E(R)] × Value | Fast analytical calculation | Fails on non-normal options & fat tails |
| Conditional VaR (CVaR) | Average loss beyond VaR cutoff | Quantifies tail-loss severity | Requires simulation or tail modeling |

## Real-World Financial Applications

In institutional Portfolio Management practice, analysts apply Fundamental Law of Active Portfolio Management (Grinold-Kahn) and Optimal Active Risk (σ_A*) & Maximum Combined Sharpe Ratio to value securities, audit financial statements, and manage portfolio risk.

## CFA Examination Perspective & Testing Patterns

On the CFA Level II exam (LM 1–5: Economics and Investment Markets, Analysis of Active Portfolio Management, Exchange-Traded Funds: Mechanics and Applications, Using Multifactor Models, Measuring and Managing Market Risk), cfa level 2 portfolio management is tested via 4-question vignette item sets combining Fundamental Law of Active Portfolio Management (Grinold-Kahn) calculations with economic interpretation.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** According to the Fundamental Law of Active Management, an unconstrained portfolio manager (TC = 1.0) has an Information Coefficient (IC) of 0.06 and makes 225 independent active investment decisions per year (BR = 225). The manager's unconstrained Information Ratio (IR*) is:

- **[A]** 0.54

- **[B]** 0.90

- **[C]** 13.50

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** IR* = IC × √BR = 0.06 × √225 = 0.06 × 15 = 0.90.

### Practice Question 2

**Question:** In the Exchange-Traded Fund (ETF) primary market, why are ETFs generally far more tax-efficient than traditional open-end mutual funds for taxable US investors?

- **[A]** Because ETFs are exempt from paying dividends

- **[B]** Because Authorized Participants (APs) redeem ETF shares 'in-kind' (receiving a basket of underlying securities rather than cash), allowing the ETF issuer to hand off low-cost-basis shares without triggering a taxable capital gain inside the fund

- **[C]** Because ETFs only hold municipal bonds

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** In-kind creation and redemption with Authorized Participants (APs) allows the ETF manager to purge low-tax-basis shares during redemptions without realizing taxable capital gains for remaining shareholders.

### Practice Question 3

**Question:** A $100 million portfolio has an expected daily return of 0.05% and a daily standard deviation of 1.20%. Assuming normally distributed returns, the portfolio's 1-day 5% (95% confidence) Parametric Value at Risk (using Z_0.05 = 1.65) is closest to:

- **[A]** $1,930,000

- **[B]** $1,980,000

- **[C]** $2,302,000

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** 5% 1-day VaR = [(1.65 × 1.20%) − 0.05%] × $100,000,000 = (1.98% − 0.05%) × $100,000,000 = 1.93% × $100,000,000 = $1,930,000.

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in Fundamental Law of Active Portfolio Management (Grinold-Kahn).**

- **Timing Errors: Mixing beginning and ending balances in Optimal Active Risk (σ_A*) & Maximum Combined Sharpe Ratio.**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Curriculum Scope: LM 1–5: Economics and Investment Markets, Analysis of Active Portfolio Management, Exchange-Traded Funds: Mechanics and Applications, Using Multifactor Models, Measuring and Managing Market Risk (Level II · Portfolio Management).**

- **Takeaway 2: Primary Formula (Fundamental Law of Active Portfolio Management (Grinold-Kahn)): E(R_A) = TC × IC × √BR × σ_A ; Information Ratio (IR) = TC × IC × √BR (Unconstrained IR* = IC × √BR where TC = 1).**

- **Takeaway 3: Secondary Formula (Optimal Active Risk (σ_A*) & Maximum Combined Sharpe Ratio): σ_A* = (IR / SR_Benchmark) × σ_Benchmark ; SR_Combined^2 = SR_Benchmark^2 + IR^2.**

- **Takeaway 4: Key Insight 1: Notice how combining a 0.40 Sharpe benchmark with a 0.75 Information Ratio active overlay satisfies the Pythagorean relationship SR_P = √(0.**

- **Takeaway 5: Key Insight 2: Remember that Value at Risk (VaR) is always a ONE-TAILED left-tail test: 5% VaR uses Z = 1.65 (not 1.96!), and 1% VaR uses Z = 2.33 (not 2.5.**

## Frequently Asked Questions (FAQs)

### What is the primary formula for cfa level 2 portfolio management in Level II Portfolio Management?

The primary equations for CFA Level 2 Portfolio Management: Complete Study Notes govern Portfolio Management calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is cfa level 2 portfolio management tested on the CFA Level II exam?

On the CFA exam, CFA Level 2 Portfolio Management: Complete Study Notes is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

### How does Fundamental Law of Active Portfolio Management (Grinold-Kahn) connect to related topics in Portfolio Management?

Within Portfolio Management, Fundamental Law of Active Portfolio Management (Grinold-Kahn) links directly to How to Calculate Portfolio Retu within the standard CFA Portfolio Management curriculum framework.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level II · Portfolio Management).

### Related CFA Study Guides

- [How to Calculate Portfolio Return Attribution](/blog/cfa/cfa-level-2-calculate-portfolio-return-attribution/)

- [Multifactor Models Explained: How to Interpret Factor Exposures](/blog/cfa/cfa-level-2-multifactor-models-interpret-factor-exposures/)

- [Active vs Passive Portfolio Management: Risk and Return Analysis](/blog/cfa/cfa-level-2-active-vs-passive-portfolio-management-risk-return/)

