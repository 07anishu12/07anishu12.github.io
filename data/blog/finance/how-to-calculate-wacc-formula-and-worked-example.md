---
title: "How to Calculate WACC: Cost of Equity, Cost of Debt and Capital Weights"
seoTitle: "How to Calculate WACC: Formula and Worked Example"
slug: how-to-calculate-wacc-formula-and-worked-example
description: Calculate WACC from market-value weights, cost of equity and
  after-tax cost of debt.
category: finance
tags:
  - Excel and financial modelling
  - calculate WACC
  - cost of equity
author: Aniket Thakur
datePublished: 2026-10-22
dateModified: 2026-10-22
coverImage: /assets/images/blog/how-to-calculate-wacc-formula-and-worked-example/cover.svg
coverImageAlt: Educational diagram explaining calculate WACC
imageCaption: Proposed explanatory diagram showing calculate WACC with clearly
  labelled illustrative figures.
draft: false
featured: false
sources:
  - title: Damodaran DCF input lecture
    url: https://pages.stern.nyu.edu/~adamodar/New_Home_Page/lectures/dcfinput.html
  - title: Damodaran cost of capital notes
    url: https://pages.stern.nyu.edu/~adamodar/pdfiles/inv.pdf
showSources: true
enquiry: false
quickAnswer:
  question: "How to Calculate WACC: Cost of Equity, Cost of Debt and Capital
    Weights: Key Verdict & Summary"
  answer: WACC is the weighted average required return on a company's financing,
    commonly equity and debt.
  facts:
    - label: Category & Focus
      value: Excel and financial modelling
    - label: Verified Word Count
      value: 831 words
  goodFor:
    - Readers evaluating Excel and financial modelling.
    - Practitioners needing verified benchmarks and calculations.
  watchFor:
    - Verify dated prices and regional specifications before committing.
    - Review primary source disclosures and product documentation.
  note: 2026 Reference Edition · Verified Secondary Research
---

WACC is the weighted average required return on a company's financing, commonly equity and debt. For a simple structure, `WACC = E/(D+E)*Ke + D/(D+E)*Kd*(1-T)`. Use market-value weights and a discount rate consistent with the cash flows. WACC is an estimate of opportunity cost, not the historical average interest paid.

## Define every input consistently

E is the market value of equity, D the market value of debt, Ke the required equity return, Kd the current pre-tax debt cost and T the applicable marginal tax assumption for deductible interest. Preferred capital or other financing can require additional terms.

[Damodaran's WACC lecture](https://pages.stern.nyu.edu/~adamodar/New_Home_Page/lectures/dcfinput.html) defines financing weights using market values and distinguishes the after-tax cost of debt. Book equity records accounting history and can differ sharply from the value investors currently place on the equity claim.

For traded equity, market capitalisation supplies a starting point, subject to the appropriate share and valuation-date treatment. Debt may not trade frequently, so its market value can require estimation from contractual cash flows and a current borrowing yield. If book debt is used as an approximation, state why and test materiality.

## Estimate the cost of equity

A standard CAPM expression is `Ke = Risk-free rate + Beta*Equity risk premium`. The risk-free input must match the cash-flow currency and valuation convention. Beta represents exposure to systematic market risk under the model; it is not a measure of every business risk.

In a hypothetical calculation, use a 6% risk-free rate, beta 1.2 and equity risk premium 5%. Ke is `6%+1.2*5%`, or 12%. These are synthetic assumptions, not current Indian market estimates or a recommended rate for any company.

Review how beta was estimated, the market benchmark, observation period and leverage. A noisy historical estimate may require comparison with suitable peers and an explicit capital-structure adjustment. Do not mechanically add a country premium twice if it is already embedded in the selected equity-risk framework.

## Estimate debt cost and the tax adjustment

Use the rate at which the business could borrow today for a comparable currency, maturity and credit risk. An old low-coupon bond is not evidence that the company can still obtain money at that coupon. A traded bond's yield may be relevant if liquidity and embedded features are understood.

Suppose the hypothetical pre-tax debt cost is 8% and the tax assumption is 25%. The simplified after-tax cost is `8%*(1-25%)`, or 6%. The adjustment assumes the interest deduction actually provides that tax benefit. Losses, deduction restrictions and financing details can limit or defer it.

Do not use the synthetic 25% as a current Indian statutory rate. For a live model, check the entity's applicable regime, interest deductibility and ability to use the benefit. A mechanically correct formula can still overstate tax shields when those assumptions are wrong.

## Combine the weights and test the result

Assume market equity ₹600 crore and market debt ₹400 crore. Equity weight is 60%, debt weight 40%, and together they sum to 100%. WACC is `60%*12%+40%*6%`, or 9.6%.

In Excel, place E, D, Ke, Kd and T in B2:B6. Enter `=B2/(B2+B3)*B4+B3/(B2+B3)*B5*(1-B6)`. Keep the input definitions and sources beside the calculation. The formula has not been executed in Excel, so check it against the manual arithmetic in the target workbook.

Use WACC for cash flows to the firm, not automatically for dividends or equity cash flows. Match nominal rates with nominal cash flows and real rates with real cash flows. If leverage or business risk changes substantially, a constant WACC may be inadequate; model the transition or use another appropriate framework.

Present sensitivity to reasonable input changes and explain the largest judgement calls. WACC should express the risk and financing of the asset being valued. Choosing the rate backwards from a desired acquisition price produces a circular argument, not independent valuation evidence.

## Quick questions, clear answers

### Is WACC the same for every project?

No. A project's currency, business risk and financing context may differ from the company's existing activities. Applying one corporate WACC to a materially different venture can misprice risk. Establish whether the project resembles the assets underlying the estimated rate before using it.

### Does adding debt always reduce WACC?

Not indefinitely. Debt can provide tax benefits, but increasing leverage can raise default risk, borrowing costs and equity risk. The simple weighted formula must be updated as financing risk changes; holding both component costs fixed while increasing debt can create a misleading result.

### Can I use an industry WACC table unchanged?

Treat it as a reference, not a substitute for company analysis. Check the table's date, country, currency, sector composition and capital structure. A stale foreign-market average may be unsuitable for a current rupee valuation even if the industry label appears similar.

## About this guide

Aniket Thakur prepared this educational guide from secondary research checked on 22 October 2026. All numerical illustrations are hypothetical unless stated otherwise. No investment product was tested, and no individual financial circumstances were assessed. Read the cited primary material and relevant product documents before acting.
