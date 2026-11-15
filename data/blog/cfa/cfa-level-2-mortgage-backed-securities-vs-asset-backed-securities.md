---
title: "Mortgage-Backed Securities vs Asset-Backed Securities Explained"
seoTitle: "Mortgage-Backed Securities vs Asset-Backed Securities Explained — CFA Level II"
slug: cfa-level-2-mortgage-backed-securities-vs-asset-backed-securities
description: "Master mortgage backed securities vs asset backed securities for Level II (Fixed Income). Includes verified CFA formulas, 2 step-by-step solved numerical exa."
category: cfa
tags:
  - "CFA"
  - "Level II"
  - "Fixed Income"
  - "mortgage backed securities vs asset backed securities"
  - "mortgage backed securities vs asset backed securities formula"
author: Aniket Thakur
datePublished: "2026-11-13"
dateModified: "2026-11-13"
coverImage: /assets/images/blog/cfa-level-2-mortgage-backed-securities-vs-asset-backed-securities/cover.svg
coverImageAlt: "Illustrative guide to Mortgage-Backed Securities vs Asset-Backed Securities Explained"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for Mortgage-Backed Securities vs Asset-Backed Securities Explained."
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
  question: "Mortgage-Backed Securities vs Asset-Backed Securities Explained: Key Summary & Verdict"
  answer: "Mortgage-Backed Securities vs Asset-Backed Securities Explained is a core Level II Fixed Income topic (LM 3 & Level I Securitization: RMBS (Pass-throughs, CMOs, PAC/Support, IO/PO strips), CMBS (DSCR, LTV, Call Protection, Defeasance), Auto/Credit Card ABS."
  facts:
    - label: "CFA Level"
      value: "Level II"
    - label: "Curriculum Subject"
      value: "Fixed Income"
    - label: "Topic Focus"
      value: "mortgage backed securities vs asset"
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
  - question: "What is the primary formula for mortgage backed securities vs asset backed securities in Level II Fixed Income?"
    answer: "The primary equations for Mortgage-Backed Securities vs Asset-Backed Securities Explained govern Fixed Income calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is mortgage backed securities vs asset backed securities tested on the CFA Level II exam?"
    answer: "On the CFA exam, Mortgage-Backed Securities vs Asset-Backed Securities Explained is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
  - question: "How does Single Monthly Mortality (SMM) & Conditional Prepayment Rate (CPR) connect to related topics in Fixed Income?"
    answer: "Within Fixed Income, Single Monthly Mortality (SMM) & Conditional Prepayment Rate (CPR) links directly to How to Calculate Credit Spreads an within the standard CFA Fixed Income curriculum framework."
---

## Introduction

Mortgage-Backed Securities vs Asset-Backed Securities Explained is a core Level II Fixed Income topic (LM 3 & Level I Securitization: RMBS (Pass-throughs, CMOs, PAC/Support, IO/PO strips), CMBS (DSCR, LTV, Call Protection, Defeasance), Auto/Credit Card ABS, Collateralized Debt/Loan Obligations (CDOs/CLOs)) focusing on comparing RMBS (prepayment contraction/extension risk, PSA speed, PAC vs Support tranches, IO vs PO strips), CMBS (call protection, defeasance, balloon risk), and Auto/Card ABS & CLOs. This guide covers the governing equations (Single Monthly Mortality (SMM) & Conditional Prepayment Rate (CPR) and Interest-Only (IO) Strip vs. Principal-Only (PO) Strip Rate Sensitivity), two verified numerical examples, a comparison table, and three original CFA-style practice questions.

## Concept Explanation & Institutional Framework

From first principles, comparing RMBS (prepayment contraction/extension risk, PSA speed, PAC vs Support tranches, IO vs PO strips), CMBS (call protection, defeasance, balloon risk), and Auto/Card ABS & CLOs links theoretical valuation and risk mechanics to practical decisions in Fixed Income. Single Monthly Mortality (SMM) & Conditional Prepayment Rate (CPR) (SMM = 1 − (1 − CPR)^(1/12) ; Prepayment_$ = SMM × (Beginning Mortgage Balance − Scheduled Principal)) establishes the primary relationship (Converts annualized Conditional Prepayment Rate (CPR, benchmarked to 100 PSA = 6% CPR after Month 30) into monthly unscheduled principal prepayment.), while Interest-Only (IO) Strip vs. Principal-Only (PO) Strip Rate Sensitivity (PO Strip: Deep Discount -> Prices RISE when interest rates fall (accelerated prepayments return par early) ; IO Strip: Prices FALL when interest rates fall sharply (prepayments destroy future interest stream -> Negative Effective Duration!)) governs IO strips are one of the only fixed-income instruments with NEGATIVE Effective Duration: when rates fall and homeowners refinance, the principal balance vanishes and IO cash flows collapse!

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: Single Monthly Mortality (SMM) & Conditional Prepayment Rate (CPR)

```formula
SMM = 1 − (1 − CPR)^(1/12)

Prepayment_$ = SMM × (Beginning Mortgage Balance − Scheduled Principal)
```

**Institutional Context & Variable Breakdown:** Converts annualized Conditional Prepayment Rate (CPR, benchmarked to 100 PSA = 6% CPR after Month 30) into monthly unscheduled principal prepayment.

### Formula 2: Interest-Only (IO) Strip vs. Principal-Only (PO) Strip Rate Sensitivity

```formula
PO Strip: Deep Discount -> Prices RISE when interest rates fall (accelerated prepayments return par early)

IO Strip: Prices FALL when interest rates fall sharply (prepayments destroy future interest stream -> Negative Effective Duration!)
```

**Institutional Context & Variable Breakdown:** IO strips are one of the only fixed-income instruments with NEGATIVE Effective Duration: when rates fall and homeowners refinance, the principal balance vanishes and IO cash flows collapse!.

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Calculating PSA Benchmark CPR, SMM, and Monthly Prepayment Cash Flow

**Problem & Given Scenario:**
A season-adjusted mortgage pool is in Month 20 and is prepaying at 150 PSA. Its beginning-of-month balance is $80,000,000 and scheduled principal amortization for the month is $200,000. Calculate (1) the annualized CPR, (2) the monthly SMM, and (3) the dollar prepayment for Month 20.

```formula
SMM = 1 − (1 − CPR)^(1/12)

Prepayment_$ = SMM × (Beginning Mortgage Balance − Scheduled Principal)
```

**Step-by-Step Substitution & Calculation:**

Step 1 (100 PSA in Month t < 30): Base 100 PSA CPR rises by 0.20% per month from Month 1 to Month 30 => At Month 20, 100 PSA = 20 × 0.20% = 4.00% CPR. At 150 PSA: CPR = 1.50 × 4.00% = 6.00%. Step 2 (Monthly SMM): SMM = 1 − (1 − 0.0600)^(1/12) = 1 − (0.94)^(0.083333) = 1 − 0.994856 = 0.005144 (0.5144%). Step 3 (Dollar Prepayment): 0.005144 × ($80,000,000 − $200,000) = 0.005144 × $79,800,000 = $410,491.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Under the standard PSA benchmark, 100 PSA starts at 0.2% CPR in Month 1, increases by 0.2% per month until reaching 6.0% CPR in Month 30, and remains constant at 6.0% CPR thereafter.

### Worked Example 2: Comparing Interest-Only (IO) and Principal-Only (PO) Mortgage Strips When Rates Drop

**Problem & Given Scenario:**
Suppose mortgage rates drop by 150 bps, causing PSA prepayment speeds to jump from 100 PSA to 350 PSA.

```formula
PO Strip: Deep Discount -> Prices RISE when interest rates fall (accelerated prepayments return par early)

IO Strip: Prices FALL when interest rates fall sharply (prepayments destroy future interest stream -> Negative Effective Duration!)
```

**Step-by-Step Substitution & Calculation:**

- **Step 1. Principal-Only (PO) Strip: Purchased at a deep discount (e.g., $65 per $100 par). Receiving the $100 principal in 3 years instead of 12 years dramatically increases its present value -> PO price surges!**

- **Step 2. Interest-Only (IO) Strip: Receives only interest on the remaining principal balance. When homeowners pay off their mortgages early, the principal balance drops to zero and future interest payments disappear -> IO price plunges (exhibiting negative effective duration)!**

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Adding an IO strip to a fixed-income portfolio acts as a natural hedge against falling interest rates (reducing portfolio duration).

## Comparison & Reference Analysis

| Securitized Sector | Underlying Collateral | Prepayment Protection? | Primary Investor Risk |
|---|---|---|---|
| Agency RMBS Pass-Through | Conforming residential mortgages | None (free homeowner refinancing) | Prepayment Contraction & Extension Risk |
| CMBS (Commercial Mortgage) | Office, retail, hotel, industrial loans | Strong (Lockouts, Defeasance, Yield Maint.) | Balloon Extension Risk at maturity |
| Credit Card Receivable ABS | Revolving credit card balances | Revolving period (principal reinvested) | Early Amortization trigger risk |
| Collateralized Loan Obligation | Leveraged corporate bank loans (FRNs) | Call period (1–2 yr) then callable | Default correlation & tranche subordination |

## Real-World Financial Applications

In institutional Fixed Income practice, analysts apply Single Monthly Mortality (SMM) & Conditional Prepayment Rate (CPR) and Interest-Only (IO) Strip vs. Principal-Only (PO) Strip Rate Sensitivity to value securities, audit financial statements, and manage portfolio risk.

## CFA Examination Perspective & Testing Patterns

On the CFA Level II exam (LM 3 & Level I Securitization: RMBS (Pass-throughs, CMOs, PAC/Support, IO/PO strips), CMBS (DSCR, LTV, Call Protection, Defeasance), Auto/Credit Card ABS, Collateralized Debt/Loan Obligations (CDOs/CLOs)), mortgage backed securities vs asset backed securities is tested via 4-question vignette item sets combining Single Monthly Mortality (SMM) & Conditional Prepayment Rate (CPR) calculations with economic interpretation.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** How does the value of a Mortgage-Backed Interest-Only (IO) strip typically respond when market mortgage interest rates decline sharply?

- **[A]** Its price increases more than a regular bond

- **[B]** Its price decreases (exhibiting negative effective duration), because accelerated homeowner prepayments rapidly shrink the outstanding mortgage principal on which interest is paid

- **[C]** Its price remains fixed at par

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** When rates fall and prepayments surge, the mortgage pool's principal balance pays off early, eliminating the future interest payments that the IO strip holder was counting on; this loss of cash flows outweighs the lower discount rate.

### Practice Question 2

**Question:** Unlike residential mortgages in the United States (which generally allow penalty-free prepayment), Commercial Mortgage-Backed Securities (CMBS) provide strong call/prepayment protection at the loan level through all of the following mechanisms EXCEPT:

- **[A]** Prepayment lockout periods and prepayment penalty points

- **[B]** Defeasance (where the borrower purchases a portfolio of US Treasury securities sufficient to replicate all remaining loan cash flows) and Yield Maintenance charges

- **[C]** Planned Amortization Class (PAC) support tranches

> [!TIP]
> **Correct Answer: Option C.**
>
> **Explanation:** Lockouts, penalty points, yield maintenance, and defeasance are loan-level CMBS call protections; PAC/Support tranching is a structure-level redistribution of prepayment risk used in residential CMOs.

### Practice Question 3

**Question:** Because many commercial mortgages underlying a CMBS are non-amortizing or partially amortizing loans that require a large lump-sum principal payment at maturity, if a borrower cannot refinance on the maturity date and the lender extends the workout period, CMBS investors face:

- **[A]** Contraction risk

- **[B]** Balloon risk (a specific form of extension risk)

- **[C]** Defeasance risk

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** Failure to refinance the final lump-sum balloon payment at loan maturity causes 'balloon risk', extending the life of the CMBS tranche.

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in Single Monthly Mortality (SMM) & Conditional Prepayment Rate (CPR).**

- **Timing Errors: Mixing beginning and ending balances in Interest-Only (IO) Strip vs. Principal-Only (PO) Strip Rate Sensitivity.**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Curriculum Scope: LM 3 & Level I Securitization: RMBS (Pass-throughs, CMOs, PAC/Support, IO/PO strips), CMBS (DSCR, LTV, Call Protection, Defeasance), Auto/Credit Card ABS, Collateralized Debt/Loan Obligations (CDOs/CLOs) (Level II · Fixed Income).**

- **Takeaway 2: Primary Formula (Single Monthly Mortality (SMM) & Conditional Prepayment Rate (CPR)): SMM = 1 − (1 − CPR)^(1/12) ; Prepayment_$ = SMM × (Beginning Mortgage Balance − Scheduled Principal).**

- **Takeaway 3: Secondary Formula (Interest-Only (IO) Strip vs. Principal-Only (PO) Strip Rate Sensitivity): PO Strip: Deep Discount -> Prices RISE when interest rates fall (accelerated prepayments return par early) ; IO Strip: Prices FALL when interest rates fall sharply (prepayments destroy future interest stream -> Negative Effective Duration!).**

- **Takeaway 4: Key Insight 1: Under the standard PSA benchmark, 100 PSA starts at 0.2% CPR in Month 1, increases by 0.2% per month until reaching 6.0% CPR in Month 30,.**

- **Takeaway 5: Key Insight 2: Adding an IO strip to a fixed-income portfolio acts as a natural hedge against falling interest rates (reducing portfolio duration).**

## Frequently Asked Questions (FAQs)

### What is the primary formula for mortgage backed securities vs asset backed securities in Level II Fixed Income?

The primary equations for Mortgage-Backed Securities vs Asset-Backed Securities Explained govern Fixed Income calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is mortgage backed securities vs asset backed securities tested on the CFA Level II exam?

On the CFA exam, Mortgage-Backed Securities vs Asset-Backed Securities Explained is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

### How does Single Monthly Mortality (SMM) & Conditional Prepayment Rate (CPR) connect to related topics in Fixed Income?

Within Fixed Income, Single Monthly Mortality (SMM) & Conditional Prepayment Rate (CPR) links directly to How to Calculate Credit Spreads an within the standard CFA Fixed Income curriculum framework.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level II · Fixed Income).

### Related CFA Study Guides

- [How to Calculate Credit Spreads and Analyse Bond Credit Risk](/blog/cfa/cfa-level-2-calculate-credit-spreads-analyse-bond-credit-risk/)

- [Callable vs Putable Bonds: How to Calculate Their Values](/blog/cfa/cfa-level-2-callable-vs-putable-bonds-calculate-values/)

- [Key Rate Duration vs Modified Duration: Differences and Examples](/blog/cfa/cfa-level-2-key-rate-duration-vs-modified-duration/)

