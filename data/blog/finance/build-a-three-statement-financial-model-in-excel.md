---
title: How to Build a Three-Statement Financial Model in Excel
seoTitle: Build a Three-Statement Financial Model in Excel
slug: build-a-three-statement-financial-model-in-excel
description: Connect profit, balance-sheet movements and cash flow with
  schedules and model checks.
category: finance
tags:
  - Excel and financial modelling
  - three statement model Excel
  - financial model accounting
author: Aniket Thakur
datePublished: 2026-10-22
dateModified: 2026-10-22
coverImage: /assets/images/blog/build-a-three-statement-financial-model-in-excel/cover.svg
coverImageAlt: Educational diagram explaining three statement model Excel
imageCaption: Proposed explanatory diagram showing three statement model Excel
  with clearly labelled illustrative figures.
draft: false
featured: false
sources:
  - title: IFRS Foundation IAS 7 overview
    url: https://www.ifrs.org/issued-standards/list-of-standards/ias-7-statement-of-cash-flows.html/?trk=article-ssr-frontend-pulse_little-text-block
showSources: true
enquiry: false
quickAnswer:
  question: "How to Build a Three-Statement Financial Model in Excel: Key Verdict
    & Summary"
  answer: A three-statement model links the income statement, balance sheet and
    cash flow statement so that operating assumptions explain profit, investment
    and financing.
  facts:
    - label: Category & Focus
      value: Excel and financial modelling
    - label: Verified Word Count
      value: 861 words
  goodFor:
    - Readers evaluating Excel and financial modelling.
    - Practitioners needing verified benchmarks and calculations.
  watchFor:
    - Verify dated prices and regional specifications before committing.
    - Review primary source disclosures and product documentation.
  note: 2026 Reference Edition · Verified Secondary Research
---

A three-statement model links the income statement, balance sheet and cash flow statement so that operating assumptions explain profit, investment and financing. Build supporting schedules before linking outputs. The balance sheet must balance because the accounting links are correct, not because a hidden plug forces the difference to zero.

## Set up history and operating assumptions

Import several relevant historical periods with consistent units, accounting definitions and fiscal dates. Preserve a source reference beside each reported figure. Separate actuals from forecasts and identify restatements, discontinued operations or unusual events that make periods difficult to compare.

Forecast revenue using a suitable driver, such as units multiplied by price, rather than applying one growth rate to every business. Forecast operating costs using a mix of variable relationships and explicit fixed costs. Show depreciation from the asset schedule and interest from the debt schedule, rather than hardcoding both independently.

For a hypothetical first forecast year, assume revenue ₹1,000 lakh, cash operating costs ₹700 lakh and depreciation ₹50 lakh. EBIT is ₹250 lakh. With interest ₹30 lakh and an illustrative 25% tax assumption applied to positive pre-tax earnings, net profit is ₹165 lakh. The tax percentage is synthetic, not a current Indian statutory rate.

## Build the balance-sheet schedules

Receivables can be linked to revenue through days sales outstanding, inventory to cost of sales through inventory days, and payables to relevant purchases or costs through payable days. Choose denominators that match the business; not every payable finances cost of goods sold.

A simple receivables estimate is `Revenue/365*ReceivableDays` for a 365-day annual model. It is an approximation using a closing-balance convention. Seasonal businesses may need monthly schedules because a year-end snapshot can misrepresent peak working-capital needs.

Roll forward net fixed assets as opening net assets plus capital expenditure minus depreciation, with separate adjustments for disposals or impairments where relevant. Roll forward retained earnings as opening retained earnings plus profit less dividends and applicable adjustments. Keep share issues and debt movements in their own schedules.

## Turn accounting profit into cash

Under a simplified indirect approach, start with profit, add back non-cash charges and adjust for operating working-capital movements. A rise in receivables uses cash because recorded sales have not yet been collected. A rise in payables can release cash because relevant costs have not yet been paid.

Continuing the hypothetical example, net profit ₹165 lakh plus depreciation ₹50 lakh minus a ₹40 lakh increase in operating working capital gives ₹175 lakh cash flow before other adjustments. Capital expenditure of ₹100 lakh leaves ₹75 lakh before financing movements.

[IAS 7's official overview](https://www.ifrs.org/issued-standards/list-of-standards/ias-7-statement-of-cash-flows.html/?trk=article-ssr-frontend-pulse_little-text-block) explains operating, investing and financing classifications and reconciliation of cash balances. Actual reporting must follow the company's applicable standards and effective requirements; this teaching model is not a complete Ind AS or IFRS reporting template.

## Link cash, financing and checks

If the business repays ₹20 lakh of principal and pays ₹15 lakh dividends, net cash increases by ₹40 lakh in this illustration. With opening cash ₹60 lakh, closing cash becomes ₹100 lakh. Debt declines by the principal repaid, while retained earnings reflect profit and dividends.

Check assets minus liabilities minus equity in every period. Also check opening cash plus net cash movement equals closing cash and opening debt plus drawdowns minus principal repayments equals closing debt. Each control should be visible and close to zero within a defined rounding tolerance.

Interest based on average debt can create circularity if debt depends on cash available after interest. Begin with a clearly documented simpler convention, or implement controlled iteration only when needed and understood. Do not switch on iterative calculation merely to hide a broken formula.

Test a slower collection period, lower sales and higher capital expenditure. Explain why cash changes even where profit barely moves. The Excel logic here has not been executed in an application. Build a minimal linked model, validate each roll-forward, then add detail that affects the actual decision. A more elaborate workbook is not automatically a more reliable forecast.

## Quick questions, clear answers

### Why does profit rise while cash falls?

Customers may pay later, inventory may increase or capital expenditure may consume cash. Profit recognises activity under accounting rules, while cash flow records collections and payments. Trace working-capital and investment schedules before assuming that a profitable company must have surplus cash.

### Can cash be the balancing plug?

Cash should result from the cash flow and financing schedules. A designed revolver can fund an identified shortfall, subject to limits, but a hidden cash plug merely conceals missing links. Reconcile the movements and make any financing requirement explicit.

### How detailed should a first model be?

Include enough detail to explain major economic drivers and risks. A small business may need customer collections and inventory more than dozens of valuation outputs. Start with transparent schedules and add complexity only where it changes forecast accuracy, financing needs or the decision being made.

## About this guide

Aniket Thakur prepared this educational guide from secondary research checked on 22 October 2026. All numerical illustrations are hypothetical unless stated otherwise. No investment product was tested, and no individual financial circumstances were assessed. Read the cited primary material and relevant product documents before acting.
