---
title: "DCF Valuation in Excel: A Step-by-Step Discounted Cash Flow Model"
seoTitle: "DCF Valuation in Excel: A Step-by-Step Model"
slug: dcf-valuation-in-excel-a-step-by-step-model
description: Forecast free cash flow, discount terminal value and bridge
  enterprise to equity value.
category: finance
tags:
  - Excel and financial modelling
  - DCF valuation Excel
  - free cash flow to firm
author: Aniket Thakur
datePublished: 2026-10-22
dateModified: 2026-10-22
coverImage: /assets/images/blog/dcf-valuation-in-excel-a-step-by-step-model/cover.svg
coverImageAlt: Educational diagram explaining DCF valuation Excel
imageCaption: Proposed explanatory diagram showing DCF valuation Excel with
  clearly labelled illustrative figures.
draft: false
featured: false
sources:
  - title: Damodaran valuation lecture
    url: https://pages.stern.nyu.edu/~adamodar/pdfiles/execs/val2day2022.pdf
showSources: true
enquiry: false
quickAnswer:
  question: "DCF Valuation in Excel: A Step-by-Step Discounted Cash Flow Model:
    Key Verdict & Summary"
  answer: A discounted cash flow model values a business from the present value of
    expected future cash flows.
  facts:
    - label: Category & Focus
      value: Excel and financial modelling
    - label: Verified Word Count
      value: 807 words
  goodFor:
    - Readers evaluating Excel and financial modelling.
    - Practitioners needing verified benchmarks and calculations.
  watchFor:
    - Verify dated prices and regional specifications before committing.
    - Review primary source disclosures and product documentation.
  note: 2026 Reference Edition · Verified Secondary Research
---

A discounted cash flow model values a business from the present value of expected future cash flows. Forecast free cash flow to the firm, discount it at a consistent WACC, add discounted terminal value and bridge operating enterprise value to equity. The output is conditional on assumptions, so present a range rather than a supposedly exact fair price.

## Define the cash flow and valuation date

Use free cash flow to the firm, or FCFF, for operating cash available to capital providers before financing payments. A common simplified formula is `EBIT*(1-tax rate) + Depreciation - Capital expenditure - Increase in operating working capital`.

[Damodaran's valuation lecture material](https://pages.stern.nyu.edu/~adamodar/pdfiles/execs/val2day2022.pdf) sets out the operating earnings, reinvestment and discounting framework. Match the treatment of leases, taxes and non-operating assets across cash flow, discount rate and valuation bridge. A bank or insurer generally needs a framework adapted to its financial business.

Set the valuation date and period convention explicitly. This illustration assumes annual cash flows arriving at year-end and a valuation immediately before year one. Mid-year conventions or a partial first year change discount factors; do not mix them without explanation.

## Forecast FCFF from business drivers

Use revenue drivers, margins, taxes and reinvestment assumptions that fit the company. Do not forecast cash flows independently from the operational story. Rapid growth with minimal capital investment may be plausible for some businesses and impossible for others.

In a hypothetical year, revenue ₹1,000 lakh with a 20% EBIT margin gives EBIT ₹200 lakh. An illustrative 25% tax rate leaves ₹150 lakh after-tax operating profit. Add ₹40 lakh depreciation, deduct ₹70 lakh capital expenditure and ₹20 lakh additional working capital: FCFF is ₹100 lakh.

Interest is not deducted in this FCFF calculation because financing costs enter through WACC. Deducting interest in cash flow and using a debt-inclusive WACC would mix frameworks. A free-cash-flow-to-equity model follows different financing and discount-rate treatment.

## Discount the explicit forecast

Suppose the synthetic FCFF forecast is ₹100, ₹110 and ₹120 lakh for years one to three, with WACC 10%. Calculate each present value as `FCFF/(1+WACC)^Year`. The three present values are approximately ₹90.91, ₹90.91 and ₹90.16 lakh.

In Excel, put the rate in B1, years in B3:D3 and cash flows in B4:D4. Use `=B4/(1+$B$1)^B3` and copy across. Alternatively, `=NPV(B1,B4:D4)` discounts end-of-period flows; any valuation-date cash flow must be added separately rather than included as the first future flow.

Keep currency consistent. Nominal rupee cash flows need a nominal rupee discount rate. A foreign-currency risk-free rate cannot simply be inserted because it is easier to obtain. Current market inputs must be dated and supported, not lifted from a generic template.

## Add terminal value and the equity bridge

Assume perpetual growth of 4% after year three. Year-four FCFF is `120*1.04`, or ₹124.8 lakh. Terminal value at the end of year three is `124.8/(10%-4%)`, or ₹2,080 lakh. Discount it for three years: approximately ₹1,562.73 lakh.

Adding explicit-flow present values gives operating enterprise value around ₹1,834.71 lakh. If cash is ₹100 lakh and debt ₹400 lakh, simplified equity value is ₹1,534.71 lakh. Other non-operating assets, non-controlling interests, preferred claims and dilution may require further adjustments.

The terminal value dominates this short teaching model. A real forecast should run long enough for the business to approach sustainable economics. Growth must be below WACC in the standard perpetuity formula and supported by the reinvestment required to maintain that growth.

Test WACC and terminal growth together, then challenge revenue, margin and capital assumptions separately. A narrow sensitivity grid cannot cover every business risk. The Excel examples were not executed in Excel, and this hypothetical valuation is educational rather than a recommendation to trade any security.

## Quick questions, clear answers

### Is EBITDA the same as free cash flow?

No. EBITDA excludes depreciation and financing expenses but does not deduct capital expenditure, working-capital investment or taxes. Those items can consume substantial cash. A cash-generative business must be assessed after the spending needed to support its operations and growth.

### Why does increasing WACC reduce value?

A higher required return reduces the present value of a given future cash flow. It also increases the denominator of a growing-perpetuity terminal value. Interpret the change alongside risk and financing assumptions rather than selecting a lower rate merely to reach a preferred valuation.

### Should I buy below the DCF output?

The model is only as credible as its assumptions and information. Price below one scenario does not establish a safe investment. Consider downside cases, governance, liquidity, balance-sheet risk and the uncertainty in the estimated cash flows before making any personal decision.

## About this guide

Aniket Thakur prepared this educational guide from secondary research checked on 22 October 2026. All numerical illustrations are hypothetical unless stated otherwise. No investment product was tested, and no individual financial circumstances were assessed. Read the cited primary material and relevant product documents before acting.
