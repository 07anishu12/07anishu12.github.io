---
title: "XIRR vs CAGR: Which Formula Should You Use for Your Portfolio?"
seoTitle: "XIRR vs CAGR: Choose the Right Portfolio Formula"
slug: xirr-vs-cagr-choose-the-right-portfolio-formula
description: Use CAGR for one holding and XIRR for dated contributions,
  withdrawals and portfolio value.
category: finance
tags:
  - Personal finance and investing
  - XIRR vs CAGR
  - portfolio return Excel
author: Aniket Thakur
datePublished: 2026-10-22
dateModified: 2026-10-22
coverImage: /assets/images/blog/xirr-vs-cagr-choose-the-right-portfolio-formula/cover.svg
coverImageAlt: Educational diagram explaining XIRR vs CAGR
imageCaption: Proposed explanatory diagram showing XIRR vs CAGR with clearly
  labelled illustrative figures.
draft: true
featured: false
sources:
  - title: Microsoft XIRR
    url: https://support.microsoft.com/en-us/excel/functions/xirr-function
showSources: true
enquiry: false
quickAnswer:
  question: "XIRR vs CAGR: Which formula should you use for your portfolio?"
  answer: CAGR calculates geometric annualised returns for a single lump-sum
    period; XIRR calculates annualised returns for multiple, irregular, dated
    cash inflows and outflows such as SIPs and withdrawals.
  facts:
    - label: CAGR input
      value: Start date & end date only
    - label: XIRR input
      value: Dated cash flow schedule
  goodFor:
    - "XIRR: Evaluating SIP investments, multiple equity tranches, and dividend
      flows."
    - "CAGR: Assessing point-to-point index returns or a single fixed deposit."
  watchFor:
    - XIRR numerical approximation errors when cash flows switch signs rapidly.
    - Annualising short holding periods under 12 months with XIRR or CAGR.
  note: Excel and Sheets require positive values for inflows and negative for
    outflows.
---

Use CAGR when one initial investment becomes one final value without intervening cash flows. Use XIRR when money enters or leaves on different dates. CAGR measures an endpoint growth rate; XIRR measures a money-weighted annual return. Neither by itself describes volatility, liquidity or whether your investment decisions were appropriate.

## Identify the cash-flow pattern

A ₹1,00,000 deposit held unchanged for five years is a straightforward CAGR problem. A SIP, additional purchase, partial withdrawal or dividend taken out of the account changes the pattern. Applying CAGR to the final balance divided by total contributions ignores how long each contribution was invested.

CAGR is `(Final/Initial)^(1/Years)-1`. XIRR instead finds the annual discount rate that makes the present value of all dated flows equal zero. [Microsoft's XIRR documentation](https://support.microsoft.com/en-us/excel/functions/xirr-function) specifies a 365-day basis, corresponding value and date arrays, and at least one positive and one negative flow.

Choose the measurement boundary before entering data. For an individual fund, a switch out is a withdrawal. For an entire portfolio, moving money between two funds inside that portfolio is an internal transfer, not an external contribution. Inconsistent boundaries can distort the reported result.

## Build a correct Excel ledger

Create Date, Description and Cash flow columns. Enter investments as negative numbers from the investor's viewpoint. Enter withdrawals and distributed income as positive numbers. On the valuation date, add the remaining portfolio value as a positive closing flow, even if no sale occurs.

For a hypothetical example, invest ₹1,00,000 on 1 January of year one and another ₹50,000 exactly 365 days later. Value the portfolio at ₹1,76,000 another 365 days later. The cash flows are minus ₹1,00,000, minus ₹50,000 and plus ₹1,76,000.

Enter the actual corresponding dates in A2:A4 and flows in C2:C4, then use `=XIRR(C2:C4,A2:A4)`. With those exactly 365-day intervals, 10% solves the calculation because ₹1,00,000 grows for two years to ₹1,21,000 and ₹50,000 grows for one year to ₹55,000.

Do not annualise the overall gain of ₹26,000 on ₹1,50,000 using a two-year CAGR. That approach treats the second contribution as if it had been present from the beginning. The arithmetic is easy, but the economic assumption is wrong.

## Diagnose common errors

Real Excel dates are essential. A date that looks right but is stored as text can produce errors or inconsistencies. Confirm that dates and cash flows have the same number of entries, and that the first entry supplies the correct starting date.

A missing final value often leaves only negative flows, making a return impossible to calculate. A missing withdrawal understates what the investor received. Reinvested distributions inside the measured portfolio should not be counted as an external cash payment and then also included in the final balance without the corresponding reinvestment logic.

Some unusual cash-flow patterns can have multiple mathematical roots or no useful root. XIRR is iterative, so changing the guess may produce a different solution where the economics are ambiguous. Investigate rather than accepting the first plausible percentage. A reconciliation to statements is more valuable than cosmetically fixing an error cell.

## Interpret the return alongside the investment story

A money-weighted return reflects both investment performance and the timing and size of your contributions. Large investments before a decline can make your XIRR worse than a fund's published time-weighted performance. That does not automatically prove the fund's report is wrong.

For a portfolio review, show XIRR, net contributions, final value and absolute profit in rupees. Add the date range and whether charges or taxes are included. If comparing managers independently of investor cash timing, a properly constructed time-weighted return may answer the question better.

Keep the raw ledger and formulas visible. Validate the example by discounting each cash flow at the computed rate and checking that the present values approximately sum to zero. For meaningful advice, also examine goal progress, risk exposure and ability to withstand losses rather than ranking every holding by one return percentage.

## Quick questions, clear answers

### Should all SIP investors use XIRR?

It is a useful personal-return measure because each contribution has its own date. Include withdrawals and the closing valuation too. A scheme's advertised CAGR still describes a valid hypothetical lump-sum holding, but it is not necessarily the return earned on your own SIP.

### Can I compare XIRRs over different periods?

The figures are annualised, but different market periods and cash-flow patterns limit the comparison. A very short-period XIRR can be especially unstable. Compare overlapping dates and similar exposures where possible, and show the invested amount and actual rupee gain alongside the rate.

### Does XIRR include tax automatically?

No. It reflects only the flows and values you supply. A pre-tax closing valuation yields a different economic result from actual after-tax sale proceeds. Define the reporting basis clearly and avoid estimating current tax rules without checking the applicable holding and year.

## About this guide

Aniket Thakur prepared this educational guide from secondary research checked on 22 October 2026. All numerical illustrations are hypothetical unless stated otherwise. No investment product was tested, and no individual financial circumstances were assessed. Read the cited primary material and relevant product documents before acting.
