---
title: "Weak Form vs Semi-Strong Form vs Strong Form Market Efficiency"
seoTitle: "Weak Form vs Semi-Strong Form vs Strong Form Market Efficiency — CFA Level I"
slug: cfa-level-1-weak-form-vs-semi-strong-vs-strong-market-efficiency
description: "Master weak form vs semi strong vs strong form market efficiency for Level I (Equity Investments). Includes verified CFA formulas, 2 step-by-step solved nume."
category: cfa
tags:
  - "CFA"
  - "Level I"
  - "Equity Investments"
  - "weak form vs semi strong vs strong form market efficiency"
  - "weak form vs semi strong vs strong form market efficiency formula"
author: Aniket Thakur
datePublished: "2026-11-10"
dateModified: "2026-11-10"
coverImage: /assets/images/blog/cfa-level-1-weak-form-vs-semi-strong-vs-strong-market-efficiency/cover.svg
coverImageAlt: "Illustrative guide to Weak Form vs Semi-Strong Form vs Strong Form Market Efficiency"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for Weak Form vs Semi-Strong Form vs Strong Form Market Efficiency."
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
  question: "Weak Form vs Semi-Strong Form vs Strong Form Market Efficiency: Key Summary & Verdict"
  answer: "Weak Form vs Semi-Strong Form vs Strong Form Market Efficiency is a core Level I Equity Investments topic (LM 3: Market Efficiency — Fama's three forms of EMH, market pricing anomalies (calendar, momentum, value), behavioral finance biases (loss aversion."
  facts:
    - label: "CFA Level"
      value: "Level I"
    - label: "Curriculum Subject"
      value: "Equity Investments"
    - label: "Topic Focus"
      value: "weak form vs semi strong vs strong"
    - label: "Syllabus Standard"
      value: "2026–2027 Curriculum"
  goodFor:
    - "Candidates preparing for CFA Level I (Equity Investments) exam questions."
    - "Financial analysts requiring verified formulas and worked calculations."
  watchFor:
    - "Verify compounding periodicity, sign conventions, and calculator mode (BGN vs END)."
    - "Review boundary conditions and common exam distractor traps."
  note: "2026–2027 CFA Program Curriculum Series · Aniket Thakur"
faqItems:
  - question: "What is the primary formula for weak form vs semi strong vs strong form market efficiency in Level I Equity Investments?"
    answer: "The primary equations for Weak Form vs Semi-Strong Form vs Strong Form Market Efficiency govern Equity Investments calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is weak form vs semi strong vs strong form market efficiency tested on the CFA Level I exam?"
    answer: "On the CFA exam, Weak Form vs Semi-Strong Form vs Strong Form Market Efficiency is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
  - question: "How does Abnormal Return (Event Study Residual) & Information Nested Sets connect to related topics in Equity Investments?"
    answer: "Within Equity Investments, Abnormal Return (Event Study Residual) & Information Nested Sets links directly to Price Weighted vs Market Cap W within the standard CFA Equity Investments curriculum framework."
---

## Introduction

Weak Form vs Semi-Strong Form vs Strong Form Market Efficiency is a core Level I Equity Investments topic (LM 3: Market Efficiency — Fama's three forms of EMH, market pricing anomalies (calendar, momentum, value), behavioral finance biases (loss aversion, overconfidence, herding)) focusing on Fama's Efficient Market Hypothesis (weak, semi-strong, strong forms), empirical tests (serial correlation, event studies, insider returns), market anomalies, and behavioral biases. This guide covers the governing equations (Abnormal Return (Event Study Residual) & Information Nested Sets and Limits to Arbitrage Cost Hurdle), two verified numerical examples, a comparison table, and three original CFA-style practice questions.

## Concept Explanation & Institutional Framework

From first principles, Fama's Efficient Market Hypothesis (weak, semi-strong, strong forms), empirical tests (serial correlation, event studies, insider returns), market anomalies, and behavioral biases links theoretical valuation and risk mechanics to practical decisions in Equity Investments. Abnormal Return (Event Study Residual) & Information Nested Sets (Abnormal Return AR_{i,t} = Actual Return R_{i,t} − Expected Return E(R_{i,t}) ; Info_Weak ⊂ Info_Semi-Strong ⊂ Info_Strong) establishes the primary relationship (Tests semi-strong efficiency by measuring whether cumulative abnormal returns (CAR) persist after public announcements.), while Limits to Arbitrage Cost Hurdle (Net Arbitrage Alpha = Gross Anomaly Return − (Transaction Costs + Bid-Ask Spread + Short-Borrowing Fees + Tax Drag)) governs If exploiting a statistical anomaly costs more in trading friction than the gross mispricing, the market remains economically efficient.

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: Abnormal Return (Event Study Residual) & Information Nested Sets

```formula
Abnormal Return AR_{i,t} = Actual Return R_{i,t} − Expected Return E(R_{i,t})

Info_Weak ⊂ Info_Semi-Strong ⊂ Info_Strong
```

**Institutional Context & Variable Breakdown:** Tests semi-strong efficiency by measuring whether cumulative abnormal returns (CAR) persist after public announcements.

### Formula 2: Limits to Arbitrage Cost Hurdle

```formula
Net Arbitrage Alpha = Gross Anomaly Return − (Transaction Costs + Bid-Ask Spread + Short-Borrowing Fees + Tax Drag)
```

**Institutional Context & Variable Breakdown:** If exploiting a statistical anomaly costs more in trading friction than the gross mispricing, the market remains economically efficient.

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Evaluating an Event Study Around an M&A Earnings Announcement

**Problem & Given Scenario:**
Stock M has a CAPM beta of 1.20. On announcement day (t = 0), the market index rises +1.0% (risk-free rate ≈ 0% daily), and Stock M jumps +8.2%. Over the subsequent 20 trading days (t = +1 to +20), the market rises +2.0% and Stock M rises +2.4%.

```formula
Abnormal Return AR_{i,t} = Actual Return R_{i,t} − Expected Return E(R_{i,t})

Info_Weak ⊂ Info_Semi-Strong ⊂ Info_Strong
```

**Step-by-Step Substitution & Calculation:**

On Announcement Day (t = 0): Expected Return = 1.20 × 1.0% = +1.2%; Abnormal Return AR_0 = 8.2% − 1.2% = +7.0% (instantaneous price adjustment). Post-Announcement Days (+1 to +20): Expected Return = 1.20 × 2.0% = +2.4%; Actual Return = +2.4%; Post-Event Cumulative Abnormal Return (CAR) = 2.4% − 2.4% = 0.0%.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Because 100% of the +7.0% abnormal gain occurred instantaneously at t = 0 with zero post-announcement drift (CAR = 0.0%), the market is semi-strong-form efficient with respect to this announcement.

### Worked Example 2: Testing Whether a Trading Strategy Violates Weak-Form Efficiency After Costs

**Problem & Given Scenario:**
A quantitative researcher finds a short-term momentum rule that generates +1.80% gross annual excess return before trading costs. However, executing the high-turnover rule incurs 1.15% in annual brokerage commissions and 0.85% in bid-ask spread slippage (total trading cost = 2.00%).

```formula
Net Arbitrage Alpha = Gross Anomaly Return − (Transaction Costs + Bid-Ask Spread + Short-Borrowing Fees + Tax Drag)
```

**Step-by-Step Substitution & Calculation:**

Net Excess Return = +1.80% − 2.00% = −0.20% per year.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Under the CFA curriculum definition of market efficiency, an anomaly that disappears after deducting realistic transaction and short-selling costs does NOT violate market efficiency.

## Comparison & Reference Analysis

| EMH Form | Information Set Priced In | Strategy Ruled Out | Empirical Test Method |
|---|---|---|---|
| Weak Form | Past market prices & trading volume | Technical Analysis / Charting | Serial correlation & runs tests |
| Semi-Strong Form | All publicly available information + Weak | Technical & Fundamental Analysis | Event studies (post-news CAR) |
| Strong Form | All public AND material private/insider info | All active + Insider trading | Corporate insider & specialist returns |
| Passive Implication | Prices reflect intrinsic value (V_0 = P_0) | High-fee active trading | Low-cost index portfolio management |

## Real-World Financial Applications

In institutional Equity Investments practice, analysts apply Abnormal Return (Event Study Residual) & Information Nested Sets and Limits to Arbitrage Cost Hurdle to value securities, audit financial statements, and manage portfolio risk.

## CFA Examination Perspective & Testing Patterns

On the CFA Level I exam (LM 3: Market Efficiency — Fama's three forms of EMH, market pricing anomalies (calendar, momentum, value), behavioral finance biases (loss aversion, overconfidence, herding)), weak form vs semi strong vs strong form market efficiency is tested via standalone 90-second MCQs combining Abnormal Return (Event Study Residual) & Information Nested Sets calculations with economic interpretation.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** Empirical evidence across developed equity markets generally supports the conclusion that markets are:

- **[A]** Strong-form efficient, because corporate insiders cannot earn abnormal returns

- **[B]** Weak-form and largely semi-strong-form efficient, but NOT strong-form efficient because corporate insiders with material nonpublic information can earn abnormal returns

- **[C]** Inefficient in all three forms

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** Empirical studies show corporate insiders trading on nonpublic information earn abnormal profits (refuting strong-form efficiency, which is why insider trading laws exist), while developed markets are largely weak- and semi-strong efficient.

### Practice Question 2

**Question:** Which behavioral finance bias describes investors' tendency to sell winning stocks too early to 'lock in gains' while holding onto losing stocks too long to avoid realizing a loss (the disposition effect)?

- **[A]** Loss aversion (Prospect Theory)

- **[B]** Representativeness bias

- **[C]** Information cascades

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** Kahneman and Tversky's Prospect Theory (loss aversion) shows that investors are risk-averse in the domain of gains and risk-seeking in the domain of losses, driving the disposition effect.

### Practice Question 3

**Question:** Which of the following factors would INCREASE—rather than decrease—the informational efficiency of an equity market?

- **[A]** Imposing a regulatory ban on short selling

- **[B]** Increasing mandatory financial disclosure transparency and lowering trading commissions

- **[C]** Reducing the number of institutional research analysts covering small-cap equities

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** Greater analyst coverage, transparent reporting, lower transaction costs, and unrestricted short selling accelerate price discovery and increase market efficiency.

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in Abnormal Return (Event Study Residual) & Information Nested Sets.**

- **Timing Errors: Mixing beginning and ending balances in Limits to Arbitrage Cost Hurdle.**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Curriculum Scope: LM 3: Market Efficiency — Fama's three forms of EMH, market pricing anomalies (calendar, momentum, value), behavioral finance biases (loss aversion, overconfidence, herding) (Level I · Equity Investments).**

- **Takeaway 2: Primary Formula (Abnormal Return (Event Study Residual) & Information Nested Sets): Abnormal Return AR_{i,t} = Actual Return R_{i,t} − Expected Return E(R_{i,t}) ; Info_Weak ⊂ Info_Semi-Strong ⊂ Info_Strong.**

- **Takeaway 3: Secondary Formula (Limits to Arbitrage Cost Hurdle): Net Arbitrage Alpha = Gross Anomaly Return − (Transaction Costs + Bid-Ask Spread + Short-Borrowing Fees + Tax Drag).**

- **Takeaway 4: Key Insight 1: Because 100% of the +7.0% abnormal gain occurred instantaneously at t = 0 with zero post-announcement drift (CAR = 0.0%), the market is semi.**

- **Takeaway 5: Key Insight 2: Under the CFA curriculum definition of market efficiency, an anomaly that disappears after deducting realistic transaction and short-selling.**

## Frequently Asked Questions (FAQs)

### What is the primary formula for weak form vs semi strong vs strong form market efficiency in Level I Equity Investments?

The primary equations for Weak Form vs Semi-Strong Form vs Strong Form Market Efficiency govern Equity Investments calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is weak form vs semi strong vs strong form market efficiency tested on the CFA Level I exam?

On the CFA exam, Weak Form vs Semi-Strong Form vs Strong Form Market Efficiency is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

### How does Abnormal Return (Event Study Residual) & Information Nested Sets connect to related topics in Equity Investments?

Within Equity Investments, Abnormal Return (Event Study Residual) & Information Nested Sets links directly to Price Weighted vs Market Cap W within the standard CFA Equity Investments curriculum framework.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level I · Equity Investments).

### Related CFA Study Guides

- [Price Weighted vs Market Cap Weighted Index: Numerical Examples](/blog/cfa/cfa-level-1-price-weighted-vs-market-cap-weighted-index/)

- [How to Calculate Market Capitalization and Free Float](/blog/cfa/cfa-level-1-calculate-market-capitalization-free-float/)

- [Market Orders vs Limit Orders: CFA Questions and Answers](/blog/cfa/cfa-level-1-market-orders-vs-limit-orders-questions/)

