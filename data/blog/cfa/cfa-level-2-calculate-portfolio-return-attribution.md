---
title: "How to Calculate Portfolio Return Attribution"
seoTitle: "How to Calculate Portfolio Return Attribution — CFA Level II"
slug: cfa-level-2-calculate-portfolio-return-attribution
description: "Master portfolio return attribution cfa level 2 for Level II (Portfolio Management). Includes verified CFA formulas, 2 step-by-step solved numerical examples."
category: cfa
tags:
  - "CFA"
  - "Level II"
  - "Portfolio Management"
  - "portfolio return attribution cfa level 2"
  - "portfolio return attribution cfa level 2 formula"
author: Aniket Thakur
datePublished: "2026-11-14"
dateModified: "2026-11-14"
coverImage: /assets/images/blog/cfa-level-2-calculate-portfolio-return-attribution/cover.svg
coverImageAlt: "Illustrative guide to How to Calculate Portfolio Return Attribution"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for How to Calculate Portfolio Return Attribution."
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
  question: "How to Calculate Portfolio Return Attribution: Key Summary & Verdict"
  answer: "How to Calculate Portfolio Return Attribution is a core Level II Portfolio Management topic (LM 2 & LM 4: Analysis of Active Portfolio Management & Multifactor Models — Active Return Decomposition (Value Added = Allocation Effect + Security Selection Effect)."
  facts:
    - label: "CFA Level"
      value: "Level II"
    - label: "Curriculum Subject"
      value: "Portfolio Management"
    - label: "Topic Focus"
      value: "portfolio return attribution cfa le"
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
  - question: "What is the primary formula for portfolio return attribution cfa level 2 in Level II Portfolio Management?"
    answer: "The primary equations for How to Calculate Portfolio Return Attribution govern Portfolio Management calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is portfolio return attribution cfa level 2 tested on the CFA Level II exam?"
    answer: "On the CFA exam, How to Calculate Portfolio Return Attribution is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
  - question: "How does Brinson-Fachler / CFA Active Return Attribution (Allocation + Selection) connect to related topics in Portfolio Management?"
    answer: "Within Portfolio Management, Brinson-Fachler / CFA Active Return Attribution (Allocation + Selection) links directly to CFA Level 2 Portfoli within the standard CFA Portfolio Management curriculum framework."
---

## Introduction

How to Calculate Portfolio Return Attribution is a core Level II Portfolio Management topic (LM 2 & LM 4: Analysis of Active Portfolio Management & Multifactor Models — Active Return Decomposition (Value Added = Allocation Effect + Security Selection Effect), Factor Return Attribution, Active Risk Squared Decomposition) focusing on decomposing Value Added (Active Return R_P − R_B) into Sector Allocation Effect, Security Selection Effect, and Interaction Effect, plus Multifactor Active Return Attribution. This guide covers the governing equations (Brinson-Fachler / CFA Active Return Attribution (Allocation + Selection) and Multifactor Active Return Attribution), two verified numerical examples, a comparison table, and three original CFA-style practice questions.

## Concept Explanation & Institutional Framework

From first principles, decomposing Value Added (Active Return R_P − R_B) into Sector Allocation Effect, Security Selection Effect, and Interaction Effect, plus Multifactor Active Return Attribution links theoretical valuation and risk mechanics to practical decisions in Portfolio Management. Brinson-Fachler / CFA Active Return Attribution (Allocation + Selection) (Active Return (R_P − R_B) = ∑ [(w_{P,i} − w_{B,i}) × (R_{B,i} − R_B)] (Allocation) + ∑ [w_{P,i} × (R_{P,i} − R_{B,i})] (Security Selection)) establishes the primary relationship (Pure Allocation weights the sector active weight (w_{P,i} − w_{B,i}) by sector benchmark return; Pure Selection weights the active security return (R_{P,i} − R_{B,i}) by w_{B,i}, with Interaction = (w_{P,i} − w_{B,i})(R_{P,i} − R_{B,i}).), while Multifactor Active Return Attribution (Active Return = ∑ [(β_{P,k} − β_{B,k}) × Factor_Return_k] (Factor Tilt Return) + Security Selection Alpha) governs Separates active outperformance driven by deliberate macroeconomic/style factor tilts (β_P − β_B) from pure idiosyncratic stock-picking alpha.

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: Brinson-Fachler / CFA Active Return Attribution (Allocation + Selection)

```formula
Active Return (R_P − R_B) = ∑ [(w_{P,i} − w_{B,i}) × (R_{B,i} − R_B)] (Allocation) + ∑ [w_{P,i} × (R_{P,i} − R_{B,i})] (Security Selection)
```

**Institutional Context & Variable Breakdown:**

- Pure Allocation weights the sector active weight (w_{P,i} − w_{B,i}) by sector benchmark return.

- Pure Selection weights the active security return (R_{P,i} − R_{B,i}) by w_{B,i}, with Interaction = (w_{P,i} − w_{B,i})(R_{P,i} − R_{B,i}).

### Formula 2: Multifactor Active Return Attribution

```formula
Active Return = ∑ [(β_{P,k} − β_{B,k}) × Factor_Return_k] (Factor Tilt Return) + Security Selection Alpha
```

**Institutional Context & Variable Breakdown:** Separates active outperformance driven by deliberate macroeconomic/style factor tilts (β_P − β_B) from pure idiosyncratic stock-picking alpha.

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Decomposing Portfolio Active Return into Asset Allocation and Security Selection

**Problem & Given Scenario:**
A portfolio and its benchmark invest across Equities and Bonds: Benchmark weights are w_{B,Eq} = 60% (R_{B,Eq} = +10.0%) and w_{B,Fi} = 40% (R_{B,Fi} = +4.0%). Portfolio weights are w_{P,Eq} = 70% (R_{P,Eq} = +12.0%) and w_{P,Fi} = 30% (R_{P,Fi} = +3.0%). Decompose total Value Added (R_P − R_B).

```formula
Active Return (R_P − R_B) = ∑ [(w_{P,i} − w_{B,i}) × (R_{B,i} − R_B)] (Allocation) + ∑ [w_{P,i} × (R_{P,i} − R_{B,i})] (Security Selection)
```

**Step-by-Step Substitution & Calculation:**

Step 1 (Total Returns): Benchmark R_B = 0.60(10.0%) + 0.40(4.0%) = 7.60%. Portfolio R_P = 0.70(12.0%) + 0.30(3.0%) = 8.40% + 0.90% = 9.30%. Total Value Added (Active Return) = 9.30% − 7.60% = +1.70% (+170 bps). Step 2 (Asset Allocation Effect = ∑ (w_{P,i} − w_{B,i}) × R_{B,i}): (+0.10 × 10.0%) + (−0.10 × 4.0%) = +1.00% − 0.40% = +0.60% (+60 bps from overweighting Equities and underweighting Bonds!). Step 3 (Security Selection + Interaction Effect = ∑ w_{P,i} × (R_{P,i} − R_{B,i})): 0.70 × (12.0% − 10.0%) + 0.30 × (3.0% − 4.0%) = +1.40% − 0.30% = +1.10% (+110 bps). Check: +0.60% (Allocation) + 1.10% (Selection) = +1.70% Total Value Added!

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> In the CFA Level II Active Portfolio Management reading, Security Selection is defined with portfolio weight w_{P,i} (absorbing the interaction term), so Allocation + Selection sums cleanly to 100% of Value Added.

### Worked Example 2: Multifactor Return Attribution (Factor Tilts vs. Security Selection)

**Problem & Given Scenario:**
A fund returns R_P = 11.50% vs Benchmark R_B = 9.50% (Active Return = +2.00%). A 2-factor attribution shows: Factor 1 (Market): β_P = 1.10, β_B = 1.00, Factor 1 Return = +8.0%; Factor 2 (Small-Cap SMB): β_P = 0.50, β_B = 0.10, Factor 2 Return = +3.0%.

```formula
Active Return = ∑ [(β_{P,k} − β_{B,k}) × Factor_Return_k] (Factor Tilt Return) + Security Selection Alpha
```

**Step-by-Step Substitution & Calculation:**

Factor 1 Tilt Contribution = (1.10 − 1.00) × 8.0% = +0.80%. Factor 2 Tilt Contribution = (0.50 − 0.10) × 3.0% = +1.20%. Total Factor Tilt Return = +0.80% + 1.20% = +2.00%. Pure Security Selection Return = Total Active Return (+2.00%) − Factor Tilt Return (+2.00%) = 0.00%!

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Multifactor attribution reveals that 100% of the manager's +200 bps 'alpha' actually came from taking higher Market Beta (+80 bps) and Small-Cap tilt (+120 bps), with zero pure stock-selection skill!

## Comparison & Reference Analysis

| Attribution Component | Formula Expression | Skill Measured | Transfer Coefficient Impact |
|---|---|---|---|
| Asset / Sector Allocation | ∑ (w_{P,i} − w_{B,i}) × R_{B,i} | Top-down macro/sector weighting | High if sector ETFs are unconstrained |
| Security Selection (CFA form) | ∑ w_{P,i} × (R_{P,i} − R_{B,i}) | Bottom-up stock picking within sectors | Reduced by long-only weight limits |
| Factor Tilt Return | ∑ (β_{P,k} − β_{B,k}) × F_k | Style / macroeconomic beta timing | Replicable cheaply via smart-beta ETFs |
| Idiosyncratic Selection Alpha | R_A − ∑ (Δβ_k × F_k) | True security-specific alpha | Justifies active management fees |

## Real-World Financial Applications

In institutional Portfolio Management practice, analysts apply Brinson-Fachler / CFA Active Return Attribution (Allocation + Selection) and Multifactor Active Return Attribution to value securities, audit financial statements, and manage portfolio risk.

## CFA Examination Perspective & Testing Patterns

On the CFA Level II exam (LM 2 & LM 4: Analysis of Active Portfolio Management & Multifactor Models — Active Return Decomposition (Value Added = Allocation Effect + Security Selection Effect), Factor Return Attribution, Active Risk Squared Decomposition), portfolio return attribution cfa level 2 is tested via 4-question vignette item sets combining Brinson-Fachler / CFA Active Return Attribution (Allocation + Selection) calculations with economic interpretation.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** A portfolio has a 65% weight in Equities and 35% in Bonds, while its benchmark has 50% in Equities and 50% in Bonds. During the year, the Equity benchmark returned +12.0% and the Bond benchmark returned +4.0%. The portfolio's active return attributable to Asset Allocation is:

- **[A]** +0.60%

- **[B]** +1.20%

- **[C]** +1.80%

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** Allocation Effect = ∑ (w_{P,i} − w_{B,i}) × R_{B,i} = (0.65 − 0.50)(12.0%) + (0.35 − 0.50)(4.0%) = (+0.15 × 12.0%) + (−0.15 × 4.0%) = +1.80% − 0.60% = +1.20%.

### Practice Question 2

**Question:** An active equity manager claims to be a 'pure bottom-up stock picker' with zero macro factor bets, yet a multifactor return attribution reveals that 90% of his active return came from a +0.60 active sensitivity to the Value (HML) factor and only 10% came from security selection. This indicates that:

- **[A]** The manager's outperformance was driven primarily by an unacknowledged Value style factor tilt rather than stock-specific selection skill

- **[B]** The manager has a high Information Coefficient on individual stocks

- **[C]** The benchmark is invalid

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** Multifactor attribution exposes 'closet factor tilters' whose returns can be replicated much more cheaply using passive factor/smart-beta ETFs.

### Practice Question 3

**Question:** In the decomposition of Active Risk Squared [σ^2(R_P − R_B) = Active Factor Risk + Active Specific Risk], a 'sector rotator' who invests исключительно in passive sector ETFs with different weights than the benchmark will have:

- **[A]** 100% Active Factor/Sector Risk and 0% Active Security-Specific Risk

- **[B]** 0% Active Factor Risk and 100% Active Specific Risk

- **[C]** Zero total active risk

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** Because the sector rotator holds diversified passive sector baskets with no individual stock bets inside the sectors, 100% of active variance comes from Active Factor/Sector Risk.

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in Brinson-Fachler / CFA Active Return Attribution (Allocation + Selection).**

- **Timing Errors: Mixing beginning and ending balances in Multifactor Active Return Attribution.**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Curriculum Scope: LM 2 & LM 4: Analysis of Active Portfolio Management & Multifactor Models — Active Return Decomposition (Value Added = Allocation Effect + Security Selection Effect), Factor Return Attribution, Active Risk Squared Decomposition (Level II · Portfolio Management).**

- **Takeaway 2: Primary Formula (Brinson-Fachler / CFA Active Return Attribution (Allocation + Selection)): Active Return (R_P − R_B) = ∑ [(w_{P,i} − w_{B,i}) × (R_{B,i} − R_B)] (Allocation) + ∑ [w_{P,i} × (R_{P,i} − R_{B,i})] (Security Selection).**

- **Takeaway 3: Secondary Formula (Multifactor Active Return Attribution): Active Return = ∑ [(β_{P,k} − β_{B,k}) × Factor_Return_k] (Factor Tilt Return) + Security Selection Alpha.**

- **Takeaway 4: Key Insight 1: In the CFA Level II Active Portfolio Management reading, Security Selection is defined with portfolio weight w_{P,i} (absorbing the interact.**

- **Takeaway 5: Key Insight 2: Multifactor attribution reveals that 100% of the manager's +200 bps 'alpha' actually came from taking higher Market Beta (+80 bps) and Small.**

## Frequently Asked Questions (FAQs)

### What is the primary formula for portfolio return attribution cfa level 2 in Level II Portfolio Management?

The primary equations for How to Calculate Portfolio Return Attribution govern Portfolio Management calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is portfolio return attribution cfa level 2 tested on the CFA Level II exam?

On the CFA exam, How to Calculate Portfolio Return Attribution is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

### How does Brinson-Fachler / CFA Active Return Attribution (Allocation + Selection) connect to related topics in Portfolio Management?

Within Portfolio Management, Brinson-Fachler / CFA Active Return Attribution (Allocation + Selection) links directly to CFA Level 2 Portfoli within the standard CFA Portfolio Management curriculum framework.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level II · Portfolio Management).

### Related CFA Study Guides

- [CFA Level 2 Portfolio Management: Complete Study Notes](/blog/cfa/cfa-level-2-portfolio-management-complete-study-notes/)

- [Multifactor Models Explained: How to Interpret Factor Exposures](/blog/cfa/cfa-level-2-multifactor-models-interpret-factor-exposures/)

- [Active vs Passive Portfolio Management: Risk and Return Analysis](/blog/cfa/cfa-level-2-active-vs-passive-portfolio-management-risk-return/)

