---
title: "NPV vs IRR: Numerical Questions and Answers for CFA"
seoTitle: "NPV vs IRR: Numerical Questions and Answers for CFA — CFA Level I"
slug: cfa-level-1-npv-vs-irr-numerical-questions-answers
description: "Master npv vs irr cfa for Level I (Corporate Issuers). Includes verified CFA formulas, 2 step-by-step solved numerical examples, comparison table, and 3 prac."
category: cfa
tags:
  - "CFA"
  - "Level I"
  - "Corporate Issuers"
  - "npv vs irr cfa"
  - "npv vs irr cfa formula"
author: Aniket Thakur
datePublished: "2026-11-10"
dateModified: "2026-11-10"
coverImage: /assets/images/blog/cfa-level-1-npv-vs-irr-numerical-questions-answers/cover.svg
coverImageAlt: "Illustrative guide to NPV vs IRR: Numerical Questions and Answers for CFA"
imageCaption: "Original explanatory diagram, curriculum models, and quantitative benchmarks for NPV vs IRR: Numerical Questions and Answers for CFA."
draft: false
featured: false
sources:
  - title: "CFA Institute 2026–2027 Program Curriculum: Corporate Issuers"
    url: https://www.cfainstitute.org/en/programs/cfa/curriculum
  - title: "CFA Institute Candidate Study Resources & Topic Outlines"
    url: https://www.cfainstitute.org/en/programs/cfa/candidate
showSources: true
enquiry: false
quickAnswer:
  question: "NPV vs IRR: Numerical Questions and Answers for CFA: Key Summary & Verdict"
  answer: "NPV vs IRR: Numerical Questions and Answers for CFA covers calculating Net Present Value (NPV) and Internal Rate of Return (IRR), resolving mutually exclusive ranking conflicts (scale vs timing), reinvestment rate assumptions, and capital allocation cash flow."
  facts:
    - label: "CFA Level"
      value: "Level I"
    - label: "Curriculum Subject"
      value: "Corporate Issuers"
    - label: "Topic Focus"
      value: "npv vs irr cfa"
    - label: "Syllabus Standard"
      value: "2026–2027 Curriculum"
  goodFor:
    - "Candidates preparing for CFA Level I (Corporate Issuers) exam questions."
    - "Financial analysts requiring verified formulas and worked calculations."
  watchFor:
    - "Verify compounding periodicity, sign conventions, and calculator mode (BGN vs END)."
    - "Review boundary conditions and common exam distractor traps."
  note: "2026–2027 CFA Program Curriculum Series · Aniket Thakur"
faqItems:
  - question: "What is the primary formula for npv vs irr cfa in Level I Corporate Issuers?"
    answer: "The primary equations for NPV vs IRR: Numerical Questions and Answers for CFA govern Corporate Issuers calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions."
  - question: "How is npv vs irr cfa tested on the CFA Level I exam?"
    answer: "On the CFA exam, NPV vs IRR: Numerical Questions and Answers for CFA is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps."
---

## Introduction

NPV vs IRR: Numerical Questions and Answers for CFA covers calculating Net Present Value (NPV) and Internal Rate of Return (IRR), resolving mutually exclusive ranking conflicts (scale vs timing), reinvestment rate assumptions, and capital allocation cash flow rules in Level I Corporate Issuers (LM 5: Capital Investments and Capital Allocation — Net Present Value (NPV), Internal Rate of Return (IRR), ROIC, mutually exclusive project ranking conflicts, multiple IRRs, sunk costs and externalities), with verified formulas, two worked examples, and three practice MCQs.

## Concept Explanation & Institutional Framework

Net Present Value (NPV) & Internal Rate of Return (IRR) (NPV = CF_0 + ∑ [CF_t / (1 + WACC)^t] ; 0 = CF_0 + ∑ [CF_t / (1 + IRR)^t]) and Crossover Rate for Mutually Exclusive Projects A and B (0 = (CF_{A,0} − CF_{B,0}) + ∑ [(CF_{A,t} − CF_{B,t}) / (1 + r_crossover)^t]) govern calculating Net Present Value (NPV) and Internal Rate of Return (IRR), resolving mutually exclusive ranking conflicts (scale vs timing), reinvestment rate assumptions, and capital allocation cash flow rules.

## Core Formulas & Mathematical Equations

> [!NOTE]
> The following analytical equations govern problem-solving and numerical questions across this curriculum reading.

### Formula 1: Net Present Value (NPV) & Internal Rate of Return (IRR)

```formula
NPV = CF_0 + ∑ [CF_t / (1 + WACC)^t]

0 = CF_0 + ∑ [CF_t / (1 + IRR)^t]
```

**Institutional Context & Variable Breakdown:**

- NPV measures absolute dollar wealth added to shareholders (discounting/reinvesting at WACC).

- IRR is the discount rate where NPV = $0.

### Formula 2: Crossover Rate for Mutually Exclusive Projects A and B

```formula
0 = (CF_{A,0} − CF_{B,0}) + ∑ [(CF_{A,t} − CF_{B,t}) / (1 + r_crossover)^t]
```

**Institutional Context & Variable Breakdown:** The crossover rate is the IRR of the incremental cash flows (A − B) where NPV_A = NPV_B.

## Step-by-Step Worked Numerical Examples

### Worked Example 1: Resolving a Scale & Timing Conflict Between Mutually Exclusive Projects

**Problem & Given Scenario:**
A firm with WACC = 10.0% must choose ONE of two mutually exclusive 2-year projects: Project Small-Fast requires CF_0 = −$100M and pays CF_1 = +$90M, CF_2 = +$60M. Project Large-Deferred requires CF_0 = −$200M and pays CF_1 = +$40M, CF_2 = +$260M.

```formula
NPV = CF_0 + ∑ [CF_t / (1 + WACC)^t]

0 = CF_0 + ∑ [CF_t / (1 + IRR)^t]
```

**Step-by-Step Substitution & Calculation:**

Project Small-Fast: NPV @ 10% = −100 + 90/1.10 + 60/1.10^2 = −100 + 81.82 + 49.59 = +$31.40M; IRR = 34.40%. Project Large-Deferred: NPV @ 10% = −200 + 40/1.10 + 260/1.10^2 = −200 + 36.36 + 214.88 = +$51.24M; IRR = 24.49%. Crossover Rate (IRR of Large − Small: CF_0 = −100, CF_1 = −50, CF_2 = +200): Solve −100 − 50/(1+r) + 200/(1+r)^2 = 0 => Crossover Rate = 18.61%.

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Although Project Small-Fast has a higher IRR (34.40% vs 24.49%), at the firm's 10.0% WACC (< 18.61% crossover rate), Project Large-Deferred adds +$51.24M of shareholder wealth vs +$31.40M. Always select the project with the highest positive NPV!

### Worked Example 2: Identifying Relevant Incremental Cash Flows (Sunk Costs, Cannibalization, Financing)

**Problem & Given Scenario:**
To evaluate a new product line, a firm spent $2.0M last year on market research. Launching today requires $30.0M equipment plus $4.0M initial working capital. The new product will generate $15.0M/year in after-tax operating cash flows but will cannibalize $3.0M/year of after-tax cash flows from an existing brand. Annual interest on debt issued for the project is $1.8M.

```formula
0 = (CF_{A,0} − CF_{B,0}) + ∑ [(CF_{A,t} − CF_{B,t}) / (1 + r_crossover)^t]
```

**Step-by-Step Substitution & Calculation:**

- **Step 1. Sunk Cost ($2.0M past research): Exclude ($0).**

- **Step 2. Initial t = 0 Outlay: Include Equipment + Working Capital = −$34.0M.**

- **Step 3. Annual Incremental Operating CF: $15.0M − $3.0M cannibalization = +$12.0M/year.**

- **Step 4. Interest Expense ($1.8M): Exclude from cash flows because financing costs are already embedded inside the WACC discount rate!**

> [!TIP]
> **Financial Interpretation & Exam Takeaway:**
> Never deduct interest expense from capital budgeting cash flows—doing so double-counts financing costs once in the numerator and again in the WACC denominator.

## Comparison & Reference Analysis

| Comparison Dimension | Net Present Value (NPV) | Internal Rate of Return (IRR) | CFA Decision Rule |
|---|---|---|---|
| Reinvestment Assumption | Opportunity cost of capital (WACC) | Project's own IRR (often unrealistic) | NPV is economically superior |
| Mutually Exclusive Conflict | Correctly measures dollar wealth added | Biased toward small or early-payoff | Always follow NPV when NPV & IRR conflict |
| Non-Conventional Cash Flows | Always yields a single unique NPV | Multiple IRRs or No IRR when signs flip | Rely exclusively on NPV |
| Impact on Stock Price | ΔEquity Value = NPV (+$NPV / Shares) | Percentage rate (ignores project scale) | Accept independent projects if NPV > 0 |

## Real-World Financial Applications

Analysts apply Net Present Value (NPV) & Internal Rate of Return (IRR) and Crossover Rate for Mutually Exclusive Projects A and B across Corporate Issuers valuation and risk management.

## CFA Examination Perspective & Testing Patterns

Tested on the CFA Level I exam (LM 5: Capital Investments and Capital Allocation — Net Present Value (NPV), Internal Rate of Return (IRR), ROIC, mutually exclusive project ranking conflicts, multiple IRRs, sunk costs and externalities) via quantitative and conceptual MCQs.

## CFA Practice Questions & Detailed Solutions

### Practice Question 1

**Question:** Two mutually exclusive projects, Project X and Project Y, have a crossover discount rate of 13.5%. Project X has a higher IRR (22%) but smaller scale, while Project Y has a lower IRR (18%) but larger scale. If the company's WACC is 9.0%, which statement is correct?

- **[A]** Both NPV and IRR recommend Project X

- **[B]** NPV recommends Project Y (higher dollar NPV at 9.0% < 13.5% crossover) while IRR recommends Project X, and the company should choose Project Y

- **[C]** NPV recommends Project X while IRR recommends Project Y

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** Below the 13.5% crossover rate (at WACC = 9.0%), the larger/later cash flow project (Project Y) has the higher NPV. When evaluating mutually exclusive projects, always follow the NPV rule.

### Practice Question 2

**Question:** Which of the following items should be EXCLUDED from the incremental cash flows when calculating the Net Present Value (NPV) of a new factory?

- **[A]** The opportunity cost of company-owned land that could otherwise be sold today for $8 million

- **[B]** The $3 million consulting fee paid six months ago for the environmental feasibility study AND the annual interest payments on bonds issued to fund the factory

- **[C]** The recovery of net working capital at the end of the project's life

> [!TIP]
> **Correct Answer: Option B.**
>
> **Explanation:** Past consulting fees are sunk costs, and interest payments are financing flows already accounted for in the WACC discount rate; Opportunity costs, externalities (cannibalization), and working capital recovery ARE included.

### Practice Question 3

**Question:** A project has cash flows of CF_0 = −$100, CF_1 = +$230, and CF_2 = −$132 (a non-conventional cash flow stream with two sign changes). How many positive Internal Rates of Return (IRRs) does this project have?

- **[A]** Zero

- **[B]** Exactly one (15.0%)

- **[C]** Two positive IRRs (10.0% and 20.0%)

> [!TIP]
> **Correct Answer: Option C.**
>
> **Explanation:** Check r = 10%: −100 + 230/1.10 − 132/1.21 = −100 + 209.09 − 109.09 = 0! Check r = 20%: −100 + 230/1.20 − 132/1.44 = −100 + 191.67 − 91.67 = 0! Non-conventional cash flows with 2 sign changes can have up to 2 IRRs.

## Common Mistakes & Exam Traps to Avoid

- **Periodicity Mismatch: Failing to align compounding frequency in Net Present Value (NPV) & Internal Rate of Return (IRR).**

- **Timing Errors: Mixing beginning and ending balances in Crossover Rate for Mutually Exclusive Projects A and B.**

- **Distractor Traps: Stopping at an unadjusted intermediate step.**

## Key Takeaways & Revision Notes

- **Takeaway 1: Net Present Value (NPV) & Internal Rate of Return (IRR): NPV = CF_0 + ∑ [CF_t / (1 + WACC)^t] ; 0 = CF_0 + ∑ [CF_t / (1 + IRR)^t].**

- **Takeaway 2: Crossover Rate for Mutually Exclusive Projects A and B: 0 = (CF_{A,0} − CF_{B,0}) + ∑ [(CF_{A,t} − CF_{B,t}) / (1 + r_crossover)^t].**

- **Takeaway 3: Although Project Small-Fast has a higher IRR (34.40% vs 24.49%), at the firm's 10.0% WACC.**

- **Takeaway 4: Never deduct interest expense from capital budgeting cash flows—doing so double-counts.**

## Frequently Asked Questions (FAQs)

### What is the primary formula for npv vs irr cfa in Level I Corporate Issuers?

The primary equations for NPV vs IRR: Numerical Questions and Answers for CFA govern Corporate Issuers calculations across the CFA curriculum. Candidates must master these formulas alongside their underlying assumptions and variable definitions.

### How is npv vs irr cfa tested on the CFA Level I exam?

On the CFA exam, NPV vs IRR: Numerical Questions and Answers for CFA is tested through computational problem-solving and conceptual scenario questions. Candidates are evaluated on formula recall, calculator speed, and avoiding common distractor traps.

## Curriculum Alignment & Related Library Articles

This guide is part of the **2026–2027 CFA Program Preparation Series** (Level I · Corporate Issuers).

### Related CFA Study Guides

- [How to Calculate Financial Leverage and Operating Leverage](/blog/cfa/cfa-level-1-calculate-financial-leverage-operating-leverage/)

- [How to Calculate the Break-Even Point in Corporate Finance](/blog/cfa/cfa-level-1-calculate-break-even-point-corporate-finance/)

- [Debt vs Equity Financing: Advantages, Disadvantages and CFA Questions](/blog/cfa/cfa-level-1-debt-vs-equity-financing-advantages-disadvantages/)

