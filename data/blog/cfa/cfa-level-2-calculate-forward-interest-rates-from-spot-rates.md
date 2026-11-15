---
title: "How to Calculate Forward Interest Rates From Spot Rates"
seoTitle: "How to Calculate Forward Interest Rates From Spot Rates — CFA Level II"
slug: cfa-level-2-calculate-forward-interest-rates-from-spot-rates
description: "Master calculate forward rates from spot rates cfa for Level II (Fixed Income). Includes verified CFA formulas, 2 step-by-step solved numerical examples, com."
category: cfa
tags:
  - "CFA"
  - "Level II"
  - "Fixed Income"
  - "calculate forward rates from spot rates cfa"
  - "calculate forward rates from spot rates cfa formula"
author: Aniket Thakur
datePublished: "2026-11-13"
dateModified: "2026-11-13"
coverImage: /assets/images/blog/cfa-level-2-calculate-forward-interest-rates-from-spot-rates/cover.svg
coverImageAlt: "Illustrative guide to How to Calculate Forward Interest Rates From Spot Rates"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for How to Calculate Forward Interest Rates From Spot Rates."
draft: false
featured: false
sources:
  - title: "CFA Institute 2026–2027 Program Curriculum: Fixed Income"
    url: https://www.cfainstitute.org/en/programs/cfa/curriculum
  - title: "CFA Institute Candidate Study Resources & Topic Outlines"
    url: https://www.cfainstitute.org/en/programs/cfa/candidate
showSources: true
enquiry: false
quickAnswer:
  question: "How to Calculate Forward Interest Rates From Spot Rates: Key Summary & Verdict"
  answer: "How to Calculate Forward Interest Rates From Spot Rates is a core Level II Fixed Income topic (LM 1: Forward Rate Equations (exact compounding and linear approximation), Forward Pricing Model (P_B = P_A × F_{A,B−A}), Active Bond Portfolio Management against."
  facts:
    - label: "CFA Level"
      value: "Level II"
    - label: "Curriculum Subject"
      value: "Fixed Income"
    - label: "Topic Focus"
      value: "calculate forward rates from spot r"
    - label: "Syllabus Standard"
      value: "2026–2027 Curriculum"
  goodFor:
    - "Candidates preparing for CFA Level II (Fixed Income) exam questions."
    - "Financial analysts requiring verified formulas and worked calculations."
  watchFor:
    - "Verify compounding periodicity, sign conventions, and calculator mode (BGN vs END)."
    - "Review boundary conditions and common exam distractor traps."
  note: "2026–2027 CFA Program Curriculum Series · Aniket Thakur"
faqItems:
  - question: "What is the primary formula for calculate forward rates from spot rates cfa in Level II Fixed Income?"
    answer: "The primary equations for How to Calculate Forward Interest Rates From Spot Rates govern Fixed Income calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is calculate forward rates from spot rates cfa tested on the CFA Level II exam?"
    answer: "On the CFA exam, How to Calculate Forward Interest Rates From Spot Rates is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
  - question: "How does Exact & Approximate Implied Forward Rate Formulas connect to related topics in Fixed Income?"
    answer: "Within Fixed Income, Exact & Approximate Implied Forward Rate Formulas links directly to Spot Rates vs Forward Rates vs Par Rates: Numerical within the standard CFA Fixed Income curriculum framework."
---

## Introduction

How to Calculate Forward Interest Rates From Spot Rates is a core Level II Fixed Income topic (LM 1: Forward Rate Equations (exact compounding and linear approximation), Forward Pricing Model (P_B = P_A × F_{A,B−A}), Active Bond Portfolio Management against Forward Rates) focusing on calculating multi-year implied forward rates from spot rates (exact and linear approximation), the Forward Pricing Model using zero-coupon discount factors, and trading active rate views against the forward curve. This guide covers the governing equations (Exact & Approximate Implied Forward Rate Formulas and Zero-Coupon Discount Factor Forward Pricing Model), two verified numerical examples, a comparison table, and three original CFA-style practice questions.

## Concept Explanation & Institutional Framework

From first principles, calculating multi-year implied forward rates from spot rates (exact and linear approximation), the Forward Pricing Model using zero-coupon discount factors, and trading active rate views against the forward curve links theoretical valuation and risk mechanics to practical decisions in Fixed Income. Exact & Approximate Implied Forward Rate Formulas (Exact: [1 + f(A, B−A)]^(B−A) = (1 + z_B)^B / (1 + z_A)^A ; Linear Approx: f(A, B−A) ≈ [(B × z_B) − (A × z_A)] / (B − A)) establishes the primary relationship (Computes the annualized implied forward rate starting A years from today and lasting for (B − A) years.), while Zero-Coupon Discount Factor Forward Pricing Model (P_B = P_A × F(A, B−A) => F(A, B−A) = P_B / P_A where P_T = 1 / (1 + z_T)^T) governs The forward discount factor F(A, B−A) equals the ratio of the B-year zero-coupon price P_B to the A-year zero-coupon price P_A.

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: Exact & Approximate Implied Forward Rate Formulas

```formula
Exact: [1 + f(A, B−A)]^(B−A) = (1 + z_B)^B / (1 + z_A)^A

Linear Approx: f(A, B−A) ≈ [(B × z_B) − (A × z_A)] / (B − A)
```

**Institutional Context & Variable Breakdown:** Computes the annualized implied forward rate starting A years from today and lasting for (B − A) years.

### Formula 2: Zero-Coupon Discount Factor Forward Pricing Model

```formula
P_B = P_A × F(A, B−A) => F(A, B−A) = P_B / P_A where P_T = 1 / (1 + z_T)^T
```

**Institutional Context & Variable Breakdown:** The forward discount factor F(A, B−A) equals the ratio of the B-year zero-coupon price P_B to the A-year zero-coupon price P_A.

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Calculating a 3-Year Forward Rate Starting 2 Years from Now [f(2,3)]

**Problem & Given Scenario:**
Given annual zero-coupon spot rates: 2-year spot rate z_2 = 3.50% and 5-year spot rate z_5 = 4.70%. Compute both the exact annualized forward rate f(2,3) (the 3-year rate starting in 2 years) and the linear approximation.

```formula
Exact: [1 + f(A, B−A)]^(B−A) = (1 + z_B)^B / (1 + z_A)^A

Linear Approx: f(A, B−A) ≈ [(B × z_B) − (A × z_A)] / (B − A)
```

**Step-by-Step Substitution & Calculation:**

Step 1 (Exact Formula, where A = 2, B = 5, B − A = 3): (1 + f(2,3))^3 = (1.0470)^5 / (1.0350)^2 = 1.258153 / 1.071225 = 1.174500. Take the cube root (1/3 power): 1 + f(2,3) = (1.174500)^(1/3) = 1.055078 => Exact f(2,3) = 5.51% per annum. Step 2 (Linear Approximation): f(2,3) ≈ [(5 × 4.70%) − (2 × 3.50%)] / (5 − 2) = (23.50% − 7.00%) / 3 = 16.50% / 3 = 5.50% per annum.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> The linear approximation [(B×z_B − A×z_A)/(B − A)] = 5.50% provides an instant sanity check on the exact compound result (5.51%) during exam calculations!

### Worked Example 2: Using the Zero-Coupon Forward Pricing Model (F = P_B / P_A)

**Problem & Given Scenario:**
A 2-year zero-coupon bond ($1 par) trades at a discount factor of P_2 = 0.924556, and a 4-year zero-coupon bond ($1 par) trades at a discount factor of P_4 = 0.822702. Find the 2-year forward price factor F(2,2) and the annualized forward rate f(2,2).

```formula
P_B = P_A × F(A, B−A) => F(A, B−A) = P_B / P_A where P_T = 1 / (1 + z_T)^T
```

**Step-by-Step Substitution & Calculation:**

Step 1: Forward Price Factor F(2,2) = P_4 / P_2 = 0.822702 / 0.924556 = 0.889835 ($88.98 per $100 par). Step 2: Since F(2,2) = 1 / [1 + f(2,2)]^2, solve for f(2,2): [1 + f(2,2)]^2 = 1 / 0.889835 = 1.123804 => f(2,2) = √1.123804 − 1 = 6.01% per annum.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Dividing discount factors P_B / P_A is the fastest way to price a forward contract on a zero-coupon bond.

## Comparison & Reference Analysis

| Investor Rate Expectation vs. Forward Rate | Expected Future Spot Price vs. Forward Price | Optimal Active Bond Strategy | Realized 1-Period Return vs. Risk-Free z_1 |
|---|---|---|---|
| Expected Spot < Implied Forward f(1, T−1) | Expected Bond Price > Forward Price | Buy Long-Term Bonds / Receive Fixed | Exceeds 1-period risk-free rate (> z_1) |
| Expected Spot = Implied Forward f(1, T−1) | Expected Bond Price = Forward Price | Neutral across all maturities | Equals 1-period risk-free rate (= z_1) |
| Expected Spot > Implied Forward f(1, T−1) | Expected Bond Price < Forward Price | Short Long-Term Bonds / Hold 1-yr Cash | Underperforms 1-period risk-free rate (< z_1) |

## Real-World Financial Applications

In institutional Fixed Income practice, analysts apply Exact & Approximate Implied Forward Rate Formulas and Zero-Coupon Discount Factor Forward Pricing Model to value securities, audit financial statements, and manage portfolio risk.

## CFA Examination Perspective & Testing Patterns

On the CFA Level II exam (LM 1: Forward Rate Equations (exact compounding and linear approximation), Forward Pricing Model (P_B = P_A × F_{A,B−A}), Active Bond Portfolio Management against Forward Rates), calculate forward rates from spot rates cfa is tested via 4-question vignette item sets combining Exact & Approximate Implied Forward Rate Formulas calculations with economic interpretation.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** If the 3-year annual spot rate is z_3 = 4.00% and the 5-year annual spot rate is z_5 = 5.20%, the implied 2-year annualized forward rate starting 3 years from today, f(3,2), is closest to:

- **[A]** 6.40%

- **[B]** 7.03%

- **[C]** 14.29%

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** Solve [1 + f(3,2)]^2 = (1.052)^5 / (1.040)^3 = 1.288483 / 1.124864 = 1.145457 => f(3,2) = √1.145457 − 1 = 1.07026 − 1 = 7.03%. (Quick check via linear approx: [5(5.2%) − 3(4.0%)] / 2 = [26% − 12%] / 2 = 7.00%!).

### Practice Question 2

**Question:** Today's 1-year spot rate is 4.0% and the implied 1-year forward rate one year from today [f(1,1)] is 5.6%. If an active fixed-income manager believes that the actual 1-year spot rate one year from today will be 4.8% (< 5.6%), the manager should:

- **[A]** Buy a 2-year bond today and sell it after 1 year, because the realized 1-year return will exceed the 4.0% 1-year spot rate

- **[B]** Invest only in a 1-year bond

- **[C]** Short the 2-year bond

> [!TIP]
> **Correct Answer: Option A.**
>
> **Explanation:** Whenever an investor expects future spot rates (4.8%) to be LOWER than today's implied forward rate (5.6%), buying longer-maturity bonds will generate a realized holding-period return higher than the 1-year spot rate (4.0%).

### Practice Question 3

**Question:** A 1-year zero-coupon bond ($1 par) has a discount factor of P_1 = 0.961538, and a 3-year zero-coupon bond ($1 par) has a discount factor of P_3 = 0.863838. The forward pricing factor F(1,2) for a 2-year zero-coupon bond starting in 1 year is closest to:

- **[A]** 0.8306

- **[B]** 0.8984

- **[C]** 1.1131

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** F(A, B−A) = P_B / P_A = P_3 / P_1 = 0.863838 / 0.961538 = 0.89839 ≈ 0.8984.

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in Exact & Approximate Implied Forward Rate Formulas.**

- **Timing Errors: Mixing beginning and ending balances in Zero-Coupon Discount Factor Forward Pricing Model.**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Curriculum Scope: LM 1: Forward Rate Equations (exact compounding and linear approximation), Forward Pricing Model (P_B = P_A × F_{A,B−A}), Active Bond Portfolio Management against Forward Rates (Level II · Fixed Income).**

- **Takeaway 2: Primary Formula (Exact & Approximate Implied Forward Rate Formulas): Exact: [1 + f(A, B−A)]^(B−A) = (1 + z_B)^B / (1 + z_A)^A ; Linear Approx: f(A, B−A) ≈ [(B × z_B) − (A × z_A)] / (B − A).**

- **Takeaway 3: Secondary Formula (Zero-Coupon Discount Factor Forward Pricing Model): P_B = P_A × F(A, B−A) => F(A, B−A) = P_B / P_A where P_T = 1 / (1 + z_T)^T.**

- **Takeaway 4: Key Insight 1: The linear approximation [(B×z_B − A×z_A)/(B − A)] = 5.50% provides an instant sanity check on the exact compound result (5.51%) during exam.**

- **Takeaway 5: Key Insight 2: Dividing discount factors P_B / P_A is the fastest way to price a forward contract on a zero-coupon bond.**

## Frequently Asked Questions (FAQs)

### What is the primary formula for calculate forward rates from spot rates cfa in Level II Fixed Income?

The primary equations for How to Calculate Forward Interest Rates From Spot Rates govern Fixed Income calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is calculate forward rates from spot rates cfa tested on the CFA Level II exam?

On the CFA exam, How to Calculate Forward Interest Rates From Spot Rates is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

### How does Exact & Approximate Implied Forward Rate Formulas connect to related topics in Fixed Income?

Within Fixed Income, Exact & Approximate Implied Forward Rate Formulas links directly to Spot Rates vs Forward Rates vs Par Rates: Numerical within the standard CFA Fixed Income curriculum framework.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level II · Fixed Income).

### Related CFA Study Guides

- [Spot Rates vs Forward Rates vs Par Rates: Numerical Examples](/blog/cfa/cfa-level-2-spot-rates-vs-forward-rates-vs-par-rates/)

- [How to Value Bonds Using Binomial Interest Rate Trees](/blog/cfa/cfa-level-2-value-bonds-binomial-interest-rate-trees/)

- [CFA Level 2 Fixed Income: Important Formulas and Practice Questions](/blog/cfa/cfa-level-2-fixed-income-important-formulas-practice-questions/)

