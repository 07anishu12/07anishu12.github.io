---
title: "How to Calculate Portfolio Performance and Risk-Adjusted Returns"
seoTitle: "How to Calculate Portfolio Performance and Risk-Adjusted Returns — CFA Level II"
slug: cfa-level-2-calculate-portfolio-performance-risk-adjusted-returns
description: "Master risk adjusted returns portfolio performance cfa for Level II (Portfolio Management). Includes verified CFA formulas, 2 step-by-step solved numerical e."
category: cfa
tags:
  - "CFA"
  - "Level II"
  - "Portfolio Management"
  - "risk adjusted returns portfolio performance cfa"
  - "risk adjusted returns portfolio performance cfa formula"
author: Aniket Thakur
datePublished: "2026-11-14"
dateModified: "2026-11-14"
coverImage: /assets/images/blog/cfa-level-2-calculate-portfolio-performance-risk-adjusted-returns/cover.svg
coverImageAlt: "Illustrative guide to How to Calculate Portfolio Performance and Risk-Adjusted Returns"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for How to Calculate Portfolio Performance and Risk-Adjusted Returns."
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
  question: "How to Calculate Portfolio Performance and Risk-Adjusted Returns: Key Summary & Verdict"
  answer: "How to Calculate Portfolio Performance and Risk-Adjusted Returns covers intertemporal rate of substitution pricing kernel, combining benchmark Sharpe Ratio and active Information Ratio, scaling active risk via cash/leverage, and comparing VaR, CVaR, and."
  facts:
    - label: "CFA Level"
      value: "Level II"
    - label: "Curriculum Subject"
      value: "Portfolio Management"
    - label: "Topic Focus"
      value: "risk adjusted returns portfolio per"
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
  - question: "What is the primary formula for risk adjusted returns portfolio performance cfa in Level II Portfolio Management?"
    answer: "The primary equations for How to Calculate Portfolio Performance and Risk-Adjusted Returns govern Portfolio Management calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is risk adjusted returns portfolio performance cfa tested on the CFA Level II exam?"
    answer: "On the CFA exam, How to Calculate Portfolio Performance and Risk-Adjusted Returns is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
---

## Introduction

How to Calculate Portfolio Performance and Risk-Adjusted Returns covers intertemporal rate of substitution pricing kernel, combining benchmark Sharpe Ratio and active Information Ratio, scaling active risk via cash/leverage, and comparing VaR, CVaR, and Maximum Drawdown in Level II Portfolio Management (LM 1, LM 2 & LM 5: Economics and Investment Markets (Intertemporal Rate of Substitution), Sharpe Ratio & Information Ratio Combinations, Value at Risk (VaR), Conditional VaR, Incremental/Marginal VaR, Scenario Stress Testing), with verified formulas, two worked examples, and three practice MCQs.

## Concept Explanation & Institutional Framework

Intertemporal Rate of Substitution & Risk-Free Rate / Risk Premium (P_0 = E(P_1) / (1 + R_F) + Cov(P_1, m_1) ; Real Risk-Free Rate R_F = [1 / E(m_1)] − 1) and Combined Portfolio Sharpe Ratio & Cash Scaling Invariance (SR_P^2 = SR_B^2 + IR^2 (at optimal active risk σ_A*) ; Information Ratio (IR) is INVARIANT to adding Cash or Leverage to the Active Portfolio!) govern intertemporal rate of substitution pricing kernel, combining benchmark Sharpe Ratio and active Information Ratio, scaling active risk via cash/leverage, and comparing VaR, CVaR, and Maximum Drawdown.

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: Intertemporal Rate of Substitution & Risk-Free Rate / Risk Premium

```formula
P_0 = E(P_1) / (1 + R_F) + Cov(P_1, m_1)

Real Risk-Free Rate R_F = [1 / E(m_1)] − 1
```

**Institutional Context & Variable Breakdown:** m_1 = u'(C_1) / u'(C_0) is the stochastic discount factor (marginal utility of consumption tomorrow vs today). Assets that pay off high P_1 when the economy is in a recession (when marginal utility m_1 is HIGH, so Cov(P_1, m_1) > 0) trade at a high price and require a LOW risk premium (e.g., government bonds)!.

### Formula 2: Combined Portfolio Sharpe Ratio & Cash Scaling Invariance

```formula
SR_P^2 = SR_B^2 + IR^2 (at optimal active risk σ_A*)

Information Ratio (IR) is INVARIANT to adding Cash or Leverage to the Active Portfolio!
```

**Institutional Context & Variable Breakdown:** Unlike the Sharpe Ratio (which is invariant to mixing with the Risk-Free Asset), the Information Ratio (IR) is invariant to mixing the active portfolio with the BENCHMARK portfolio!.

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Pricing Assets Using the Intertemporal Rate of Substitution (m_1)

**Problem & Given Scenario:**
If the expected marginal rate of substitution across a 1-year period is E(m_1) = 0.961538, calculate the 1-year real risk-free rate R_F. Furthermore, if Equity X has an expected 1-year payoff of E(P_1) = $110.00 and a covariance with the marginal rate of substitution of Cov(P_1, m_1) = −$4.20 (negative because stocks crash in recessions when m_1 is high!), compute Equity X's current price P_0 and required return.

```formula
P_0 = E(P_1) / (1 + R_F) + Cov(P_1, m_1)

Real Risk-Free Rate R_F = [1 / E(m_1)] − 1
```

**Step-by-Step Substitution & Calculation:**

Step 1 (Real Risk-Free Rate): R_F = [1 / E(m_1)] − 1 = (1 / 0.961538) − 1 = 1.0400 − 1 = 4.00%. Step 2 (Current Price of Equity X): P_0 = [E(P_1) / (1 + R_F)] + Cov(P_1, m_1) = ($110.00 / 1.0400) + (−$4.20) = $105.77 − $4.20 = $101.57. Step 3 (Required Return & Risk Premium): E(R_X) = ($110.00 / $101.57) − 1 = 8.30% (Risk Premium = 8.30% − 4.00% = +4.30%).

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Equities have a NEGATIVE covariance with the marginal utility of consumption m_1 (they perform poorly in recessions when an extra dollar of consumption is most valuable), so investors demand a positive risk premium (+4.30%) to hold equities.

### Worked Example 2: Adjusting Active Risk Using a Benchmark Overlay While Preserving the Information Ratio

**Problem & Given Scenario:**
An active Fund X has an Information Ratio of IR = 0.60 and an Active Risk (tracking error) of σ_A = 8.0% (so Expected Active Return E(R_A) = 0.60 × 8.0% = +4.80%). A pension client wants to limit Active Risk to σ_Target = 5.0%. How should the client blend Fund X and the Passive Benchmark Index?

```formula
SR_P^2 = SR_B^2 + IR^2 (at optimal active risk σ_A*)

Information Ratio (IR) is INVARIANT to adding Cash or Leverage to the Active Portfolio!
```

**Step-by-Step Substitution & Calculation:**

Step 1 (Weight in Active Fund X): w_X = Target Active Risk / Fund X Active Risk = 5.0% / 8.0% = 62.5% in Active Fund X, and 37.5% in the Passive Benchmark Index. Step 2 (New Active Return): E(R_A_new) = 0.625 × 4.80% = +3.00%. Step 3 (New Information Ratio): IR_new = 3.00% / 5.00% = 0.60 (Completely Unchanged!).

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Blending an active fund with the passive benchmark scales both Active Return and Active Risk proportionally, leaving the Information Ratio (0.60) completely unchanged!

## Comparison & Reference Analysis

| Economic / Risk Concept | Covariance with Marginal Utility m_1 | Equilibrium Risk Premium | Asset Class Example |
|---|---|---|---|
| Default-Free Short T-Bill | Cov(P_1, m_1) = 0 | Zero (Earns real risk-free rate R_F) | Inflation-protected short bill |
| Pro-Cyclical Risky Asset | Cov(P_1, m_1) < 0 (Payoff low in recession) | Positive Risk Premium (> R_F) | Equities, High-Yield Bonds, Commercial RE |
| Counter-Cyclical Hedge Asset | Cov(P_1, m_1) > 0 (Payoff high in recession) | Negative Risk Premium (< R_F) | Long Nominal Govt Bonds (in deflation shock), Gold, Put Options |

## Real-World Financial Applications

Analysts apply Intertemporal Rate of Substitution & Risk-Free Rate / Risk Premium and Combined Portfolio Sharpe Ratio & Cash Scaling Invariance across Portfolio Management valuation and risk management.

## CFA Examination Perspective & Testing Patterns

Tested on the CFA Level II exam (LM 1, LM 2 & LM 5: Economics and Investment Markets (Intertemporal Rate of Substitution), Sharpe Ratio & Information Ratio Combinations, Value at Risk (VaR), Conditional VaR, Incremental/Marginal VaR, Scenario Stress Testing) via quantitative and conceptual MCQs.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** In the consumption-based asset pricing model (Economics and Investment Markets), why do pro-cyclical equities command a positive risk premium over the risk-free rate?

- **[A]** Because equities have a positive covariance with the intertemporal rate of substitution (marginal utility of consumption)

- **[B]** Because equities have a NEGATIVE covariance with the intertemporal rate of substitution (m_1)—meaning equity payoffs are low during economic recessions when investor consumption is low and the marginal utility of an extra dollar (m_1) is high

- **[C]** Because equity dividends are tax-exempt

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** During recessions, consumption falls and marginal utility of consumption (m_1) spikes; because stocks fall at the exact time m_1 is high, Cov(P_1, m_1) < 0, reducing P_0 and requiring a positive risk premium.

### Practice Question 2

**Question:** An active equity fund has an expected active return of 3.6% and an active risk (tracking error) of 6.0% (Information Ratio = 0.60). If an investor allocates 75% of capital to this active fund and 25% to the passive benchmark index, the combined portfolio's Active Risk and Information Ratio are:

- **[A]** Active Risk = 4.5%; Information Ratio = 0.45

- **[B]** Active Risk = 4.5%; Information Ratio = 0.60

- **[C]** Active Risk = 6.0%; Information Ratio = 0.60

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** Mixing an active portfolio with the benchmark scales active risk linearly (0.75 × 6.0% = 4.5%) and active return linearly (0.75 × 3.6% = 2.7%), leaving the Information Ratio unchanged at 2.7% / 4.5% = 0.60.

### Practice Question 3

**Question:** Which risk metric measures the expected (average) portfolio loss conditional on the loss exceeding the Value at Risk (VaR) threshold?

- **[A]** Incremental VaR

- **[B]** Conditional VaR (CVaR, also known as Expected Tail Loss or Expected Shortfall)

- **[C]** Modified Duration

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** While VaR states the minimum loss at a given tail percentile (e.g., 5%), Conditional VaR (CVaR / Expected Shortfall) averages all tail losses beyond the VaR cutoff.

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in Intertemporal Rate of Substitution & Risk-Free Rate / Risk Premium.**

- **Timing Errors: Mixing beginning and ending balances in Combined Portfolio Sharpe Ratio & Cash Scaling Invariance.**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Intertemporal Rate of Substitution & Risk-Free Rate / Risk Premium: P_0 = E(P_1) / (1 + R_F) + Cov(P_1, m_1) ; Real Risk-Free Rate R_F = [1 / E(m_1)] − 1.**

- **Takeaway 2: Combined Portfolio Sharpe Ratio & Cash Scaling Invariance: SR_P^2 = SR_B^2 + IR^2 (at optimal active risk σ_A*) ; Information Ratio (IR) is INVARIANT to adding Cash or Leverage to the Active Portfolio!**

- **Takeaway 3: Equities have a NEGATIVE covariance with the marginal utility of consumption m_1 (they.**

- **Takeaway 4: Blending an active fund with the passive benchmark scales both Active Return and Active.**

## Frequently Asked Questions (FAQs)

### What is the primary formula for risk adjusted returns portfolio performance cfa in Level II Portfolio Management?

The primary equations for How to Calculate Portfolio Performance and Risk-Adjusted Returns govern Portfolio Management calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is risk adjusted returns portfolio performance cfa tested on the CFA Level II exam?

On the CFA exam, How to Calculate Portfolio Performance and Risk-Adjusted Returns is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level II · Portfolio Management).

### Related CFA Study Guides

- [Active vs Passive Portfolio Management: Risk and Return Analysis](/blog/cfa/cfa-level-2-active-vs-passive-portfolio-management-risk-return/)

- [Multifactor Models Explained: How to Interpret Factor Exposures](/blog/cfa/cfa-level-2-multifactor-models-interpret-factor-exposures/)

- [How to Calculate Portfolio Return Attribution](/blog/cfa/cfa-level-2-calculate-portfolio-return-attribution/)

