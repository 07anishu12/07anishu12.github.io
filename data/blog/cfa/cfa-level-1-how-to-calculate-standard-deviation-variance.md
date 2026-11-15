---
title: "How to Calculate Standard Deviation and Variance in CFA"
seoTitle: "How to Calculate Standard Deviation and Variance in CFA — CFA Level I"
slug: cfa-level-1-how-to-calculate-standard-deviation-variance
description: "Master How to Calculate Standard Deviation and Variance in CFA for CFA Level I (Quantitative Methods). Includes verified curriculum formulas, worked numerical examples, and exam review notes."
category: cfa
tags:
  - "CFA"
  - "Level I"
  - "Quantitative Methods"
  - "how to calculate standard deviation in cfa"
  - "how to calculate standard deviation in cfa formula"
author: Aniket Thakur
datePublished: "2026-11-08"
dateModified: "2026-11-08"
coverImage: /assets/images/blog/cfa-level-1-how-to-calculate-standard-deviation-variance/cover.svg
coverImageAlt: "Illustrative guide to How to Calculate Standard Deviation and Variance in CFA"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for How to Calculate Standard Deviation and Variance in CFA."
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
  question: "How to Calculate Standard Deviation and Variance in CFA: Key Summary & Verdict"
  answer: "How to Calculate Standard Deviation and Variance in CFA is a core Level I Quantitative Methods topic (LM 3: Statistical Measures of Asset Returns — Population vs."
  facts:
    - label: "CFA Level"
      value: "Level I"
    - label: "Curriculum Subject"
      value: "Quantitative Methods"
    - label: "Topic Focus"
      value: "how to calculate standard deviation"
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
  - question: "What is the primary formula for how to calculate standard deviation in cfa in Level I Quantitative Methods?"
    answer: "The primary equations for How to Calculate Standard Deviation and Variance in CFA govern Quantitative Methods calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is how to calculate standard deviation in cfa tested on the CFA Level I exam?"
    answer: "On the CFA exam, How to Calculate Standard Deviation and Variance in CFA is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
  - question: "How does Sample Variance & Standard Deviation connect to related topics in Quantitative Methods?"
    answer: "Within Quantitative Methods, Sample Variance & Standard Deviation links directly to Arithmetic Mean vs Geometric Mean: How to Calculate in C within the standard CFA Quantitative Methods curriculum framework."
---

## Introduction

How to Calculate Standard Deviation and Variance in CFA is a core Level I Quantitative Methods topic (LM 3: Statistical Measures of Asset Returns — Population vs. sample variance, standard deviation, target downside deviation (semideviation), Chebyshev's inequality) focusing on sample vs population dispersion, target downside deviation (Sortino denominator), Mean Absolute Deviation (MAD), and Chebyshev's interval bounds. This guide covers the governing equations (Sample Variance & Standard Deviation and Target Semideviation & Chebyshev's Inequality), two verified numerical examples, a comparison table, and three original CFA-style practice questions.

## Concept Explanation & Institutional Framework

From first principles, sample vs population dispersion, target downside deviation (Sortino denominator), Mean Absolute Deviation (MAD), and Chebyshev's interval bounds links theoretical valuation and risk mechanics to practical decisions in Quantitative Methods. Sample Variance & Standard Deviation (s^2 = [∑ (R_i − R_bar)^2] / (n − 1) ; s = √(s^2)) establishes the primary relationship (Quantifies total return dispersion around the sample mean using (n − 1) degrees of freedom.), while Target Semideviation & Chebyshev's Inequality (s_target = √ [ ∑_{R_i < B} (R_i − B)^2 / (n − 1) ] ; P(|X − μ| ≤ kσ) ≥ 1 − 1/k^2) governs Target semideviation measures downside risk below benchmark B; Chebyshev guarantees minimum proportion of observations within k standard deviations for any distribution.

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: Sample Variance & Standard Deviation

```formula
s^2 = [∑ (R_i − R_bar)^2] / (n − 1)

s = √(s^2)
```

**Institutional Context & Variable Breakdown:** Quantifies total return dispersion around the sample mean using (n − 1) degrees of freedom.

### Formula 2: Target Semideviation & Chebyshev's Inequality

```formula
s_target = √ [ ∑_{R_i < B} (R_i − B)^2 / (n − 1) ]

P(|X − μ| ≤ kσ) ≥ 1 − 1/k^2
```

**Institutional Context & Variable Breakdown:**

- Target semideviation measures downside risk below benchmark B.

- Chebyshev guarantees minimum proportion of observations within k standard deviations for any distribution.

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Step-by-Step Sample Variance, MAD, and Target Downside Deviation

**Problem & Given Scenario:**
4 annual returns for a credit fund: +8.0%, −2.0%, +12.0%, +2.0%. Target return B = +3.0%.

```formula
s^2 = [∑ (R_i − R_bar)^2] / (n − 1)

s = √(s^2)
```

**Step-by-Step Substitution & Calculation:**

Sample Mean R_bar = (8 − 2 + 12 + 2)/4 = +5.0%. MAD = (|8−5| + |−2−5| + |12−5| + |2−5|)/4 = (3 + 7 + 7 + 3)/4 = 5.00%. Sample Variance s^2 = [(8−5)^2 + (−2−5)^2 + (12−5)^2 + (2−5)^2] / (4 − 1) = (9 + 49 + 49 + 9) / 3 = 116 / 3 = 38.6667 (%^2). Sample s = √38.6667 = 6.2183% ≈ 6.22%. For Target Semideviation below B = 3.0%, only −2.0% and +2.0% fall below 3.0%: s_target = √[ ((−2 − 3)^2 + (2 − 3)^2) / (4 − 1) ] = √[ (25 + 1) / 3 ] = √8.6667 = 2.9439% ≈ 2.94%.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> While total standard deviation is 6.22%, downside semideviation below the 3.0% target is only 2.94% because most volatility came from upside returns (+8% and +12%).

### Worked Example 2: Applying Chebyshev's Inequality to Non-Normal Return Distributions

**Problem & Given Scenario:**
A strategy has mean monthly return R_bar = 1.0% and standard deviation s = 2.5% across 1,200 observations (unknown distribution shape). Find the minimum number of observations lying between −4.0% and +6.0%.

```formula
s_target = √ [ ∑_{R_i < B} (R_i − B)^2 / (n − 1) ]

P(|X − μ| ≤ kσ) ≥ 1 − 1/k^2
```

**Step-by-Step Substitution & Calculation:**

Interval [−4.0%, +6.0%] is 1.0% ± 5.0%, so k = 5.0% / 2.5% = 2.0 standard deviations. By Chebyshev's inequality, minimum proportion = 1 − (1 / 2^2) = 1 − 0.25 = 75.0%. Minimum observations = 0.75 × 1,200 = 900.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Regardless of skewness or kurtosis, at least 75% of observations fall within ±2s and 88.89% within ±3s.

## Comparison & Reference Analysis

| Dispersion Metric | Denominator | Penalizes Upside Volatility? | Primary Analytical Role |
|---|---|---|---|
| Population Variance (σ^2) | N | Yes (symmetric squared deviations) | Full theoretical population dispersion |
| Sample Variance (s^2) | n − 1 | Yes (symmetric squared deviations) | Standard historical volatility estimator |
| Mean Absolute Deviation (MAD) | n | Yes (linear absolute deviations) | Less sensitive to extreme outliers than s |
| Target Semideviation (s_B) | n − 1 (all n in denominator) | No (only R_i < B squared) | Downside risk & Sortino ratio denominator |

## Real-World Financial Applications

In institutional Quantitative Methods practice, analysts apply Sample Variance & Standard Deviation and Target Semideviation & Chebyshev's Inequality to value securities, audit financial statements, and manage portfolio risk.

## CFA Examination Perspective & Testing Patterns

On the CFA Level I exam (LM 3: Statistical Measures of Asset Returns — Population vs. sample variance, standard deviation, target downside deviation (semideviation), Chebyshev's inequality), how to calculate standard deviation in cfa is tested via standalone 90-second MCQs combining Sample Variance & Standard Deviation calculations with economic interpretation.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** Over 4 quarters, a hedge fund posts returns of +6%, −4%, +10%, and +0%. Its unbiased sample standard deviation is closest to:

- **[A]** 5.22%

- **[B]** 6.00%

- **[C]** 6.22%

> [!TIP]
> **Correct Answer: Option C.**
>
> **Explanation:** Mean = (6 − 4 + 10 + 0)/4 = +3.0%. Squared deviations: (6−3)^2 + (−4−3)^2 + (10−3)^2 + (0−3)^2 = 9 + 49 + 49 + 9 = 116. Sample variance s^2 = 116 / (4 − 1) = 38.667. Sample standard deviation s = √38.667 = 6.22%.

### Practice Question 2

**Question:** According to Chebyshev's inequality, for any return distribution with finite variance, the minimum percentage of observations lying within k = 2.5 standard deviations of the mean is closest to:

- **[A]** 75.0%

- **[B]** 84.0%

- **[C]** 88.9%

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** 1 − (1 / k^2) = 1 − (1 / 2.5^2) = 1 − (1 / 6.25) = 1 − 0.16 = 0.84 = 84.0%.

### Practice Question 3

**Question:** When calculating target downside deviation (target semideviation) across a sample of n = 10 annual returns where only 4 returns fall below the target threshold B, the sum of squared downside deviations is divided by:

- **[A]** 3

- **[B]** 4

- **[C]** 9

> [!TIP]
> **Correct Answer: Option C.**
>
> **Explanation:** CFA Institute defines sample target semideviation using the full sample degrees of freedom (n − 1) = 10 − 1 = 9 in the denominator, not the count of negative observations.

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in Sample Variance & Standard Deviation.**

- **Timing Errors: Mixing beginning and ending balances in Target Semideviation & Chebyshev's Inequality.**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Curriculum Scope: LM 3: Statistical Measures of Asset Returns — Population vs. sample variance, standard deviation, target downside deviation (semideviation), Chebyshev's inequality (Level I · Quantitative Methods).**

- **Takeaway 2: Primary Formula (Sample Variance & Standard Deviation): s^2 = [∑ (R_i − R_bar)^2] / (n − 1) ; s = √(s^2).**

- **Takeaway 3: Secondary Formula (Target Semideviation & Chebyshev's Inequality): s_target = √ [ ∑_{R_i < B} (R_i − B)^2 / (n − 1) ] ; P(|X − μ| ≤ kσ) ≥ 1 − 1/k^2.**

- **Takeaway 4: Key Insight 1: While total standard deviation is 6.22%, downside semideviation below the 3.0% target is only 2.94% because most volatility came from upside.**

- **Takeaway 5: Key Insight 2: Regardless of skewness or kurtosis, at least 75% of observations fall within ±2s and 88.89% within ±3s.**

## Frequently Asked Questions (FAQs)

### What is the primary formula for how to calculate standard deviation in cfa in Level I Quantitative Methods?

The primary equations for How to Calculate Standard Deviation and Variance in CFA govern Quantitative Methods calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is how to calculate standard deviation in cfa tested on the CFA Level I exam?

On the CFA exam, How to Calculate Standard Deviation and Variance in CFA is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

### How does Sample Variance & Standard Deviation connect to related topics in Quantitative Methods?

Within Quantitative Methods, Sample Variance & Standard Deviation links directly to Arithmetic Mean vs Geometric Mean: How to Calculate in C within the standard CFA Quantitative Methods curriculum framework.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level I · Quantitative Methods).

### Related CFA Study Guides

- [Arithmetic Mean vs Geometric Mean: How to Calculate in CFA](/blog/cfa/cfa-level-1-arithmetic-mean-vs-geometric-mean/)

- [Probability Questions for CFA Level 1 With Step-by-Step Solutions](/blog/cfa/cfa-level-1-probability-questions-with-solutions/)

- [Money Weighted vs Time Weighted Rate of Return: Examples and Questions](/blog/cfa/cfa-level-1-money-weighted-vs-time-weighted-return/)

