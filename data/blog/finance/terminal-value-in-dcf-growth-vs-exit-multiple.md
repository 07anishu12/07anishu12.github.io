---
title: "Terminal Value in DCF: Perpetuity Growth vs Exit Multiple Method"
seoTitle: "Terminal Value in DCF: Growth vs Exit Multiple"
slug: terminal-value-in-dcf-growth-vs-exit-multiple
description: Compare perpetuity growth and exit multiples, including
  reinvestment and sensitivity checks.
category: finance
tags:
  - Excel and financial modelling
  - terminal value DCF
  - perpetuity growth
author: Aniket Thakur
datePublished: 2026-10-22
dateModified: 2026-10-22
coverImage: /assets/images/blog/terminal-value-in-dcf-growth-vs-exit-multiple/cover.svg
coverImageAlt: Educational diagram explaining terminal value DCF
imageCaption: Proposed explanatory diagram showing terminal value DCF with
  clearly labelled illustrative figures.
draft: false
featured: false
sources:
  - title: Damodaran terminal value discussion
    url: https://aswathdamodaran.blogspot.com/2016/11/myth-51-if-you-don-believe-in-forever.html
  - title: Damodaran valuation resources
    url: https://pages.stern.nyu.edu/~adamodar/New_Home_Page/valuation/val.htm
showSources: true
enquiry: false
quickAnswer:
  question: "Terminal Value in DCF: Perpetuity Growth vs Exit Multiple Method: Key
    Verdict & Summary"
  answer: Terminal value estimates cash flows beyond the explicit forecast in a DCF.
  facts:
    - label: Category & Focus
      value: Excel and financial modelling
    - label: Verified Word Count
      value: 838 words
  goodFor:
    - Readers evaluating Excel and financial modelling.
    - Practitioners needing verified benchmarks and calculations.
  watchFor:
    - Verify dated prices and regional specifications before committing.
    - Review primary source disclosures and product documentation.
  note: 2026 Reference Edition · Verified Secondary Research
---

Terminal value estimates cash flows beyond the explicit forecast in a DCF. The perpetuity-growth method extends a sustainable cash flow; the exit-multiple method applies a market-based valuation multiple to a terminal metric. Both require economic consistency. A large terminal value is not automatically wrong, but it makes the valuation particularly sensitive to assumptions about the distant future.

## Put terminal value at the correct date

A five-year DCF normally forecasts cash flows for years one through five, then places terminal value at the end of year five. That terminal value must still be discounted to the valuation date. Adding an undiscounted future value to present values mixes dates.

The [Damodaran discussion of terminal value](https://aswathdamodaran.blogspot.com/2016/11/myth-51-if-you-don-believe-in-forever.html) explains its role in valuing cash flows beyond the detailed forecast. The explicit period should extend until the business can reasonably be described using stable economics, rather than stopping at an arbitrary year while margins and risk remain abnormal.

Keep the valuation framework aligned. FCFF discounted at WACC needs an enterprise operating terminal value. Equity cash flow discounted at the cost of equity needs an equity terminal value. Mixing these conventions produces an output that can look sensible while valuing different claims.

## Calculate the growing perpetuity

For an FCFF model, `TVn = FCFFn+1/(WACC-g)`, where g is sustainable perpetual growth and FCFFn+1 is the following year's normalised cash flow. Standard application requires WACC greater than g. A denominator near zero creates extreme sensitivity rather than strong evidence of value.

Suppose hypothetical year-five FCFF is ₹100 crore, growth 4% and WACC 10%. Year-six FCFF is ₹104 crore. Terminal value is `104/(10%-4%)`, about ₹1,733.33 crore at the end of year five. Its present value is `1733.33/(1.10^5)`, about ₹1,076.26 crore.

Do not use year-five cash flow directly if the formula assumes growth begins in year six. Conversely, do not add growth twice. In Excel, a clear formula is `=FCFF_Year5*(1+g)/(WACC-g)` followed by a separate discount factor.

## Make growth pay for its reinvestment

Perpetual growth is not free. A growing business usually requires investment in operating assets or working capital. A terminal forecast that raises revenue indefinitely while capital expenditure merely matches depreciation and working capital never changes needs a defensible business explanation.

A useful stable-state relationship is `Reinvestment rate = g/Return on capital`, subject to consistent definitions and sustainable economics. With hypothetical growth 4% and return on capital 10%, the implied reinvestment rate is 40% of after-tax operating earnings. Only the remainder is available as free cash flow.

Match terminal growth with the model currency and inflation assumptions. A nominal rupee growth assumption cannot be evaluated independently of nominal rupee discount rates and the business's long-run market. No particular long-run growth rate is verified as universally appropriate in this guide.

## Cross-check with an exit multiple

The exit-multiple approach might use `Terminal enterprise value = Terminal EBITDA × EV/EBITDA multiple`. If hypothetical year-five EBITDA is ₹200 crore and the selected multiple is 8×, terminal enterprise value is ₹1,600 crore, which is then discounted for five years.

Choose the multiple using comparable businesses with relevant growth, margins, risk and capital needs. A current high-growth peer multiple may be unsuitable for a mature terminal business. [Damodaran's relative-valuation material](https://pages.stern.nyu.edu/~adamodar/New_Home_Page/valuation/val.htm) provides the conceptual framework; it does not verify any current company multiple used here.

An exit multiple introduces market pricing into a DCF. Compare its implied growth and cash-flow yield with the perpetuity method. If the methods diverge sharply, investigate the economics rather than averaging the outputs automatically.

Show a sensitivity grid for WACC and g, and a separate range for exit multiples. Report how much total value comes from the terminal component. The calculations here are hypothetical and were not executed in Excel. A useful conclusion explains which assumptions support the valuation and what evidence could invalidate them, rather than presenting one terminal-value number as fact.

## Quick questions, clear answers

### Is the exit-multiple method more objective?

Not automatically. Choosing peers, timing, accounting adjustments and a suitable future multiple requires judgement. Market prices can reflect a temporary cycle or optimism. The method is useful as a cross-check when those limitations are explicit, not as an assumption-free alternative.

### Can growth equal the discount rate?

Not in the standard growing-perpetuity formula. The denominator becomes zero, so the expression does not yield a finite value. Growth above the discount rate is also incompatible with that standard application. Revisit the stable-state assumptions rather than forcing the spreadsheet to calculate.

### What if the business has a finite life?

Model the finite operating cash flows and any justified disposal or recovery value, including closure costs. A perpetual-growth terminal value may be inappropriate for an asset with an exhausted concession, resource or contract and no credible continuation. The model must follow the actual economic life.

## About this guide

Aniket Thakur prepared this educational guide from secondary research checked on 22 October 2026. All numerical illustrations are hypothetical unless stated otherwise. No investment product was tested, and no individual financial circumstances were assessed. Read the cited primary material and relevant product documents before acting.
