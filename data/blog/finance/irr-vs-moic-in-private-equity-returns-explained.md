---
title: "IRR vs MOIC in Private Equity: What Do the Two Return Metrics Tell You?"
seoTitle: "IRR vs MOIC in Private Equity: Returns Explained"
slug: irr-vs-moic-in-private-equity-returns-explained
description: Compare return speed with capital growth and understand cash-flow,
  fee and valuation effects.
category: finance
tags:
  - Valuation, investment banking and private equity
  - IRR vs MOIC
  - private equity returns
author: Aniket Thakur
datePublished: 2026-10-22
dateModified: 2026-10-22
coverImage: /assets/images/blog/irr-vs-moic-in-private-equity-returns-explained/cover.svg
coverImageAlt: Educational diagram explaining IRR vs MOIC
imageCaption: Proposed explanatory diagram showing IRR vs MOIC with clearly
  labelled illustrative figures.
draft: false
featured: false
sources:
  - title: Invest Europe performance reporting
    url: https://www.investeurope.eu/investor-reporting-guidelines/performance-measurement-and-reporting/
  - title: ILPA reporting templates presentation
    url: https://ilpa.org/wp-content/uploads/2025/03/ILPA-QRSI-Webcast-March-2025-Deep-Dive-FINAL.pdf
showSources: true
enquiry: false
quickAnswer:
  question: "IRR vs MOIC in Private Equity: What Do the Two Return Metrics Tell You?"
  answer: MOIC measures how many times invested capital has been returned or
    remains in value; IRR measures the annualised return implied by cash-flow
    timing.
  facts:
    - label: Category & Focus
      value: Valuation, investment banking and private equity
    - label: Verified Word Count
      value: 842 words
  goodFor:
    - Readers evaluating Valuation, investment banking and private equity.
    - Practitioners needing verified benchmarks and calculations.
  watchFor:
    - Verify dated prices and regional specifications before committing.
    - Review primary source disclosures and product documentation.
  note: 2026 Reference Edition · Verified Secondary Research
---

MOIC measures how many times invested capital has been returned or remains in value; IRR measures the annualised return implied by cash-flow timing. Read them together. A high annualised rate can accompany modest total profit, while a large multiple can require many years. Neither statistic alone explains risk, fees or the reliability of unrealised valuations.

## Define the calculation boundary

For a simple fully realised investment, `MOIC = Total proceeds / Total invested capital`. If ₹100 crore invested produces ₹200 crore, the multiple is 2.0×. Where an investment is partly unrealised, include the relevant remaining value according to the stated reporting convention and identify it separately from cash received.

IRR is the rate that makes discounted investment cash flows sum to zero. For one initial outflow and one final inflow over an exact number of years, `IRR = (Proceeds/Investment)^(1/Years)-1`. Additional investments and distributions require the full dated cash-flow schedule.

[Invest Europe's reporting guidelines](https://www.investeurope.eu/investor-reporting-guidelines/performance-measurement-and-reporting/) distinguish investment and fund performance measures. Decide whether the numbers describe one deal, the portfolio, or the investor's net experience before comparing them. Similar acronyms can have different cash-flow boundaries.

## Compare time with total wealth created

Consider two hypothetical deals, each investing ₹100 crore and receiving ₹200 crore with no interim flows. Deal A exits after three years; Deal B exits after seven. Both produce 2.0× MOIC and ₹100 crore profit before costs.

Deal A's annualised return is `2^(1/3)-1`, approximately 25.99%. Deal B's is `2^(1/7)-1`, approximately 10.41%. MOIC correctly describes equal capital multiplication, while IRR correctly distinguishes how quickly it occurred. Neither calculation says which deal had greater uncertainty or required more management effort.

Now consider a third synthetic deal returning ₹120 crore after one year. It produces a 20% IRR but only 1.2× MOIC and ₹20 crore profit. An investor seeking a large long-term increase in capital cannot assess that opportunity from the attractive-looking annual percentage alone.

## Include the cash-flow details

Early distributions affect IRR because money returns sooner. A recapitalisation funded by additional company borrowing can increase early distributions without a corresponding operational improvement. Analyse the debt and residual risk rather than interpreting the higher IRR as proof of better business performance.

Additional equity contributions increase invested capital and change both measures. Use consistent treatment for follow-on capital, recycled proceeds and expenses. For dated flows in Excel, XIRR can calculate the annualised money-weighted return; the formula does not decide which flows economically belong inside the chosen measurement boundary.

[ILPA's reporting-template presentation](https://ilpa.org/wp-content/uploads/2025/03/ILPA-QRSI-Webcast-March-2025-Deep-Dive-FINAL.pdf) separates gross portfolio, net portfolio and fund-investor metrics, including treatment of fund-level facilities. That distinction matters because borrowing can delay capital calls and change reported investor timing without changing the underlying investment's cash receipts.

## Review gross, net and unrealised results

Gross deal returns exclude some costs that investors ultimately bear. Net investor returns reflect the relevant fees, expenses and carried-interest treatment under the reporting definition. Do not compare a manager's gross deal IRR with another fund's net investor return as if they were interchangeable.

Separate realised proceeds from remaining valuation. A partly realised 2.0× multiple may include a substantial estimate that has not become cash. Review the valuation date, methodology, debt, subsequent funding needs and uncertainty. A mark based on an old financing round is not automatically an executable exit price.

Build a review table showing invested capital, distributions, remaining value, MOIC, IRR, holding period and gross-versus-net basis. Add the cash-flow schedule and explain material financing effects. A single rank by IRR can reward short duration or cash timing while obscuring total value and risk.

The practical conclusion is to ask two questions: how much value was created, and how long did it take to receive it? Then ask what remains uncertain. The synthetic examples here establish arithmetic, not a target return or a private-fund recommendation. Formula examples require validation in the intended spreadsheet environment.

## Quick questions, clear answers

### Can MOIC be high while IRR is low?

Yes. A large capital multiple earned over a sufficiently long period can translate into a modest annualised return. That is why the holding period belongs beside the multiple. Compare both with the investment's risks and the alternatives available over the same horizon.

### Is unrealised value the same as a distribution?

No. A distribution is cash or another asset actually transferred under the reporting arrangement. Unrealised value is an estimate of a remaining holding. Both may enter a reported total-value multiple, but their liquidity and certainty differ materially and should be shown separately.

### Does IRR guarantee a reinvestment opportunity?

No. It is a mathematical summary of a cash-flow schedule. Receiving money early does not establish that the investor can reinvest it at the same rate. Assess the complete portfolio and future opportunities separately rather than treating the calculated IRR as a guaranteed compounding path.

## About this guide

Aniket Thakur prepared this educational guide from secondary research checked on 22 October 2026. All numerical illustrations are hypothetical unless stated otherwise. No investment product was tested, and no individual financial circumstances were assessed. Read the cited primary material and relevant product documents before acting.
