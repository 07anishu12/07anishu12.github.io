---
title: "How to Calculate EMI in Excel: Formula, Amortisation Schedule and Example"
seoTitle: "Calculate EMI in Excel: Formula and Amortisation"
slug: calculate-emi-in-excel-formula-and-amortisation
description: Build a loan payment and amortisation schedule with principal,
  interest and balance checks.
category: finance
tags:
  - Corporate finance, markets and Indian financial products
  - EMI calculation Excel
  - PMT formula
author: Aniket Thakur
datePublished: 2026-10-22
dateModified: 2026-10-22
coverImage: /assets/images/blog/calculate-emi-in-excel-formula-and-amortisation/cover.svg
coverImageAlt: Educational diagram explaining EMI calculation Excel
imageCaption: Proposed explanatory diagram showing EMI calculation Excel with
  clearly labelled illustrative figures.
draft: false
featured: false
sources:
  - title: Microsoft PMT
    url: https://support.microsoft.com/en-gb/excel/functions/pmt-function?ad=gb&rs=en-gb&ui=en-us
showSources: true
enquiry: false
quickAnswer:
  question: "How to Calculate EMI in Excel: Formula, Amortisation Schedule and
    Example: Key Verdict & Summary"
  answer: For a standard fixed-rate reducing-balance loan with equal end-of-month
    payments, use Excel's PMT function or the EMI formula.
  facts:
    - label: Category & Focus
      value: Corporate finance, markets and Indian financial products
    - label: Verified Word Count
      value: 847 words
  goodFor:
    - Readers evaluating Corporate finance, markets and Indian financial
      products.
    - Practitioners needing verified benchmarks and calculations.
  watchFor:
    - Verify dated prices and regional specifications before committing.
    - Review primary source disclosures and product documentation.
  note: 2026 Reference Edition · Verified Secondary Research
---

For a standard fixed-rate reducing-balance loan with equal end-of-month payments, use Excel's PMT function or the EMI formula. Match the rate to the payment period and build an amortisation schedule to see principal and interest separately. The result excludes charges and assumes a stable rate, so it is not automatically the lender's final repayment quote.

## Define the inputs and assumptions

Let P be the principal borrowed, r the monthly interest rate and n the number of monthly payments. The standard formula is `EMI = P*r/(1-(1+r)^(-n))`. If the rate is zero, payment is simply `P/n`; the ordinary expression otherwise divides by zero.

For a nominal annual rate quoted with monthly accrual, the simple model uses annual rate divided by twelve. If the source rate is an effective annual rate, convert consistently, for example `(1+effective annual rate)^(1/12)-1`. Do not mix conventions.

[Microsoft's PMT documentation](https://support.microsoft.com/en-gb/excel/functions/pmt-function?ad=gb&rs=en-gb&ui=en-us) specifies constant payments and a constant interest rate. Actual loans can involve daily interest, irregular first periods, resets or additional charges that require a more detailed model.

## Calculate a hypothetical payment

Assume a synthetic ₹5,00,000 principal, 10% nominal annual interest and five years of monthly payments. Monthly rate is `10%/12` and n is 60. EMI is approximately ₹10,623.52.

Put principal in B2, annual rate in B3 and years in B4. Enter `=-PMT(B3/12,B4*12,B2)` to display a positive payment. Excel's sign convention treats borrowed funds and repayments as opposite-direction cash flows; the minus sign changes the displayed direction, not the economic cost.

The equivalent direct formula is `=B2*(B3/12)/(1-(1+B3/12)^(-B4*12))`. Keeping both methods temporarily provides a useful cross-check. With full-precision payments, total interest in this simplified case is about ₹1,37,411.34, calculated as `EMI*60-500000`.

These figures are teaching arithmetic, not an offered borrowing rate. Actual payment rounding may alter the last instalment. Keep precision in the schedule and explain presentation rounding rather than forcing every row to a rounded number without checking the closing balance.

## Build the amortisation schedule

Use columns Payment number, Opening balance, Payment, Interest, Principal and Closing balance. In the first row, opening balance is the original principal. Interest equals opening balance multiplied by monthly rate. Principal equals payment minus interest. Closing balance equals opening balance minus principal.

In the example, first-month interest is ₹4,166.67 and principal repayment about ₹6,456.86. The next opening balance is approximately ₹4,93,543.14. Interest then falls as the principal declines, assuming the rate and payment remain unchanged.

Copy the logic down for sixty periods, linking each opening balance to the previous closing balance. For the final payment, use a cap such as `MIN(regular payment,opening balance+interest)` where appropriate, to avoid a negative closing balance from rounding or early repayment.

Add control totals: principal repaid should equal the original principal, closing balance should be approximately zero, and total payments should equal principal plus interest under the stated exclusions. A visible residual is a prompt to investigate, not an amount to overwrite manually.

## Adapt the model before making a borrowing decision

Add actual payment dates, charges and any moratorium only when their treatment is clear. A processing fee reduces net funds received but may not reduce the contractual principal. It therefore affects borrowing cost differently from a principal repayment.

For a floating rate, calculate a new schedule from the outstanding balance at each reset. If the EMI stays fixed, solve the remaining tenure and check that payment exceeds periodic interest. Otherwise the balance may fail to amortise as expected.

Prepayments require a separate column and an explicit choice about reducing tenure or EMI. Confirm the lender's operational treatment and applicable charges before assuming your spreadsheet strategy will be applied automatically.

The payment arithmetic here was independently checked, but the tutorial was not executed in Excel. Validate cell references, rate conventions and dates in the target workbook, then compare the schedule with the lender's statement. A correct EMI calculation is one part of affordability; insurance, household commitments and cash reserves still matter.

## Quick questions, clear answers

### Why does Excel return a negative PMT?

Its cash-flow convention gives opposite signs to money received and money paid. If principal is positive, repayments commonly appear negative. Use a consistent convention or negate the output for presentation; do not change the rate or term merely to remove the sign.

### Does a longer tenure reduce total interest?

Usually it reduces the monthly payment but increases total interest when principal and rate are unchanged. Compare both affordability and total payments. A lower EMI should not be described as a cheaper loan without checking the full repayment period.

### Why differs my schedule from the bank's?

Possible reasons include daily accrual, different payment dates, fees, rate resets, rounding or an irregular first period. Obtain the contract's calculation basis and reconcile the difference. Do not assume the lender or spreadsheet is wrong solely because a simplified monthly model differs.

## About this guide

Aniket Thakur prepared this educational guide from secondary research checked on 22 October 2026. All numerical illustrations are hypothetical unless stated otherwise. No investment product was tested, and no individual financial circumstances were assessed. Read the cited primary material and relevant product documents before acting.
