import Link from "next/link";

import { LeadCaptureForm } from "../../../components/LeadCaptureForm";

export const metadata = {
  title: "Bike buying enquiries \u2014 Aniket Thakur",
  alternates: { canonical: "/finance/bikes/" },
};
export default function BikeFinancePage() {
  return (
    <main className="section">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Bike finance</p>
            <h1>
              Choose the number before you choose the{" "}
              <span className="serif">badge.</span>
            </h1>
          </div>
          <p>
            Start with affordability, total ownership cost, and the exact
            on-road quote—not a headline EMI.
          </p>
        </div>
        <div className="lead-panel">
          <div>
            <p className="eyebrow">Optional follow-up</p>
            <h2>Want a focused comparison?</h2>
            <p>
              Tell me your PIN code and preference. Your enquiry is confirmed
              only after it is securely saved.
            </p>
          </div>
          <LeadCaptureForm source="bike-finance" campaign="bike-finance" />
        </div>
        <div className="prose" style={{ maxWidth: 760, marginTop: 64 }}>
          <h2>Start with the essentials</h2>
          <p>A few guides to help you compare costs and plan your next step:</p>
          <ul>
            <li>
              <a
                href="/blog/auto/bike-emi-calculator-down-payment-and-loan-tenure/"
                rel="noreferrer"
              >
                Bike EMI calculator and down payment guide
              </a>
            </li>
            <li>
              <a
                href="/blog/auto/two-wheeler-loan-eligibility-in-india-documents-guide/"
                rel="noreferrer"
              >
                Two-wheeler loan eligibility and documents
              </a>
            </li>
            <li>
              <a
                href="/blog/auto/bike-on-road-prices-in-delhi-ncr-ex-showroom-price-rto-and-insurance/"
                rel="noreferrer"
              >
                On-road bike prices in Delhi NCR
              </a>
            </li>
          </ul>
          <p>
            <Link href="/privacy">Read the privacy notice →</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
