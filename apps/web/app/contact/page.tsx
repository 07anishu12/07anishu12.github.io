import Link from "next/link";

import { LeadCaptureForm } from "../../components/LeadCaptureForm";
import { WHATSAPP_DISPLAY, whatsappHref } from "../../lib/contact";

export const metadata = {
  title: "Contact \u2014 Aniket Thakur",
  alternates: { canonical: "/contact/" },
};
export default function ContactPage() {
  return (
    <main className="section">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Start a conversation</p>
            <h1>
              Let’s build <span className="serif">together.</span>
            </h1>
          </div>
          <p>
            For general AI, product, research, or finance conversations, use the
            existing direct channels. For bike-buying questions, the structured
            form keeps the first follow-up focused.
          </p>
        </div>
        <div className="lead-panel">
          <div>
            <p className="eyebrow">Bike enquiry</p>
            <h2>Compare a practical next ride.</h2>
            <p>
              No account required. This form does not approve a loan or promise
              a product recommendation.
            </p>
            <p>
              <a
                className="button button-secondary"
                href={whatsappHref()}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp {WHATSAPP_DISPLAY} ↗
              </a>
            </p>
          </div>
          <LeadCaptureForm source="contact" />
        </div>
        <p style={{ marginTop: 32, color: "var(--muted)" }}>
          For engineering, product or research collaborations,{" "}
          <a href="mailto:kumaraniketn@gmail.com">
            email kumaraniketn@gmail.com
          </a>{" "}
          or <a href="/assets/Aniket_Thakur_Resume.pdf">download my résumé</a>.
        </p>
        <p style={{ marginTop: 12, color: "var(--muted)" }}>
          Read the <Link href="/privacy">privacy notice</Link> before
          submitting.
        </p>
      </div>
    </main>
  );
}
