import Link from "next/link";
import { WebPageStructuredData } from "../../components/StructuredData";

export const metadata = {
  title: "Privacy \u2014 Aniket Thakur",
  description:
    "Privacy notice for the portfolio's bike enquiry form, analytics, retention and contact channels.",
  alternates: { canonical: "/privacy/" },
};
export default function PrivacyPage() {
  return (
    <main className="section">
      <WebPageStructuredData
        url="/privacy/"
        name={metadata.title}
        description={metadata.description}
      />
      <div className="container" style={{ maxWidth: 820 }}>
        <p className="eyebrow">Privacy notice</p>
        <h1>A short, plain-language explanation.</h1>
        <div className="prose">
          <h2>What the lead form collects</h2>
          <p>
            The optional bike enquiry form asks for your name, Indian PIN code,
            mobile number, bike brand preference, and consent to be contacted.
            Do not submit identity documents, account numbers, passwords, or
            sensitive financial records.
          </p>
          <h2>How delivery works</h2>
          <p>
            The browser sends the form to the separately deployed portfolio API.
            The API validates it, applies spam/rate limits, records the source
            page without query parameters, and saves the enquiry in a private
            PostgreSQL database. A private Google Sheet receives an operational
            copy and the owner receives a WhatsApp notification when those
            integrations are configured. A failed notification does not delete
            your enquiry.
          </p>
          <h2>Consent and retention</h2>
          <p>
            Policy version: 2026-10-25. Your consent covers follow-up about your
            enquiry. It does not authorize automated marketing or calling. A PIN
            code is not proof of your current location. Enquiries are reviewed
            for deletion after 90 days unless an active request or legal
            obligation requires retention. Email the address below to request
            access, correction, deletion, or withdraw consent; copies in the
            database and operational services are included.
          </p>
          <h2>Analytics</h2>
          <p>
            The site uses Google Analytics for page usage. Form details are not
            included in analytics events. Do not include personal information in
            page URLs.
          </p>
          <h2>External links</h2>
          <p>
            WhatsApp and other contact destinations are external services. A
            WhatsApp link opens a draft message; it does not send until you
            review and press Send.
          </p>
          <h2>Questions</h2>
          <p>
            For questions about an enquiry, use the{" "}
            <Link href="/contact/">contact page</Link> or the existing{" "}
            <a href="mailto:kumaraniketn@gmail.com">email address</a>.
          </p>
        </div>
      </div>
    </main>
  );
}
