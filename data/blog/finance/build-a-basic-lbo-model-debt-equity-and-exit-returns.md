---
title: "How to Build a Basic LBO Model: Sources and Uses, Debt Paydown and Exit
  Returns"
seoTitle: "Build a Basic LBO Model: Debt, Equity and Exit Returns"
slug: build-a-basic-lbo-model-debt-equity-and-exit-returns
description: Understand LBO sources and uses, operating cash, debt repayment and
  sponsor returns.
category: finance
tags:
  - Valuation, investment banking and private equity
  - basic LBO model
  - sources and uses
author: Aniket Thakur
datePublished: 2026-10-22
dateModified: 2026-10-22
coverImage: /assets/images/blog/build-a-basic-lbo-model-debt-equity-and-exit-returns/cover.svg
coverImageAlt: Educational diagram explaining basic LBO model
imageCaption: Proposed explanatory diagram showing basic LBO model with clearly
  labelled illustrative figures.
draft: false
featured: false
sources:
  - title: Damodaran LBO material
    url: https://people.stern.nyu.edu/adamodar/pdfiles/country/LBO.pdf
  - title: Damodaran leverage and value
    url: https://pages.stern.nyu.edu/~adamodar/pdfiles/country/levvalue.pdf
showSources: true
enquiry: false
quickAnswer:
  question: "How to Build a Basic LBO Model: Sources and Uses, Debt Paydown and
    Exit Returns: Key Verdict & Summary"
  answer: A basic LBO model estimates whether an acquisition financed with debt
    and equity can service its obligations and generate an acceptable equity
    return.
  facts:
    - label: Category & Focus
      value: Valuation, investment banking and private equity
    - label: Verified Word Count
      value: 858 words
  goodFor:
    - Readers evaluating Valuation, investment banking and private equity.
    - Practitioners needing verified benchmarks and calculations.
  watchFor:
    - Verify dated prices and regional specifications before committing.
    - Review primary source disclosures and product documentation.
  note: 2026 Reference Edition · Verified Secondary Research
---

A basic LBO model estimates whether an acquisition financed with debt and equity can service its obligations and generate an acceptable equity return. Build sources and uses, operating cash flow, debt schedules and an exit bridge. Leverage can amplify gains and losses; an attractive modelled IRR does not establish that financing or operational assumptions are achievable.

## Reconcile acquisition funding

Uses describe where money goes: payment for the acquired equity, refinancing of debt where required, fees and any minimum cash injection. Sources describe the debt, sponsor equity, rollover equity or other funding used. Sources must equal uses at closing.

For a simplified hypothetical cash-free, debt-free acquisition, assume enterprise purchase value ₹500 crore and transaction fees ₹20 crore. Total uses are ₹520 crore. New debt of ₹300 crore and sponsor equity of ₹220 crore fund the transaction. Existing target debt is assumed absent in this teaching case.

Do not confuse enterprise purchase value with equity purchase value when the actual target has debt or retained cash. Reconstruct the acquisition bridge before adding debt refinancing. Otherwise the model may count the same obligation twice or omit a material use of funds.

## Forecast cash available for debt service

Start with an operating model: revenue, costs, taxes, working capital and capital expenditure. EBITDA alone cannot repay debt. Deduct the cash needed to maintain operations, fund growth and meet financing obligations, while respecting minimum liquidity.

Suppose synthetic EBITDA is ₹80 crore, capital expenditure ₹20 crore, additional working capital ₹5 crore, cash tax ₹10 crore and cash interest ₹24 crore. Simplified cash available before principal repayment is `80-20-5-10-24`, or ₹21 crore, assuming no other relevant cash adjustments.

The tax and interest amounts are illustrative, not current Indian tax treatment or a quoted loan offer. Real models need interest-deductibility analysis, repayment terms, financing fees and restrictions. A business may produce accounting profit while lacking cash to meet a scheduled principal payment.

[Damodaran's LBO teaching material](https://people.stern.nyu.edu/adamodar/pdfiles/country/LBO.pdf) provides a framework for analysing buyout financing. The practical exercise is to understand cash generation under leverage rather than treat debt as free funding.

## Roll debt forward transparently

For each debt tranche, show opening balance, drawdowns, interest, mandatory repayment, optional repayment and closing balance. A simple cash sweep cannot exceed the remaining debt or the permitted cash available. Separate contractual amortisation from discretionary paydown.

If opening debt is ₹300 crore and the available ₹21 crore is fully applied to principal, closing debt becomes ₹279 crore. Interest in subsequent years depends on the chosen balance convention and actual loan terms. Using average debt can create circularity when cash available itself depends on interest.

Add checks for negative debt, minimum cash, undrawn facility limits and covenant compliance where relevant. A revolver can address timing needs only within its committed availability; it is not an unlimited plug. Model a downside in which interest costs rise or EBITDA falls before assuming excess cash will always repay debt.

## Calculate exit value and returns

Assume hypothetical exit-year EBITDA ₹100 crore and an 8× exit EV/EBITDA multiple. Exit EV is ₹800 crore. If exit net debt is ₹180 crore and there are no other claims or fees, sponsor equity proceeds are ₹620 crore.

Against initial sponsor equity ₹220 crore and no interim distributions, MOIC is `620/220`, about 2.82×. Over exactly five years, IRR is `(620/220)^(1/5)-1`, approximately 23.03%. Dated interim investments or distributions require a cash-flow calculation rather than this single-entry shortcut.

[Damodaran's leverage notes](https://pages.stern.nyu.edu/~adamodar/pdfiles/country/levvalue.pdf) discuss changing debt ratios and using operating cash flow to reduce leverage. In the model, separate returns from EBITDA growth, debt reduction and multiple changes. A favourable exit multiple is not operational value creation.

Test lower EBITDA, slower cash conversion, higher interest and a lower exit multiple together. The Excel model has not been executed here, and the synthetic case omits legal structuring and detailed financing. A viable investment must survive liquidity and covenant checks, not merely achieve a target return in the base case.

## Quick questions, clear answers

### Why does leverage increase equity returns?

If enterprise value and cash generation perform sufficiently well, debt financing reduces the initial equity required and repayment leaves more value for shareholders. The same structure magnifies downside: fixed obligations remain when operating results weaken, potentially eliminating the equity value.

### Is the highest entry debt always best?

No. More borrowing can increase financing costs, restrict flexibility and create covenant or refinancing risk. The capital structure must support adverse conditions and necessary investment. A spreadsheet that assumes unlimited debt and constant borrowing rates misses the central risk of an LBO.

### Can I assume the entry and exit multiples match?

That is a scenario, not a fact. The business, market and financing environment can change during ownership. Compare several exit multiples and explain the selected base case. Returns driven mainly by multiple expansion deserve particular scrutiny because the sponsor cannot control future market pricing.

## About this guide

Aniket Thakur prepared this educational guide from secondary research checked on 22 October 2026. All numerical illustrations are hypothetical unless stated otherwise. No investment product was tested, and no individual financial circumstances were assessed. Read the cited primary material and relevant product documents before acting.
