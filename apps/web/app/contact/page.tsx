import Link from "next/link";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { GeneralContactForm } from "../../components/GeneralContactForm";
import { InquiryButton } from "../../components/InquiryButton";
import { WHATSAPP_DISPLAY, whatsappHref } from "../../lib/contact";
import {
  BreadcrumbStructuredData,
  WebPageStructuredData,
} from "../../components/StructuredData";

export const metadata = {
  title: "Contact — Aniket Thakur | AI Engineering, Product & Research",
  description:
    "Get in touch with Aniket Thakur for AI engineering collaborations, product management leadership, scientific AI research, or quantitative systems.",
  alternates: { canonical: "/contact/" },
  openGraph: {
    title: "Contact Aniket Thakur",
    description:
      "Start a conversation around AI systems architecture, product discovery, graph representation learning, or financial engineering.",
    url: "/contact/",
    images: ["/assets/img/aniket-portrait.png"],
  },
};

export default function ContactPage() {
  return (
    <main className="section contact-page">
      <WebPageStructuredData
        url="/contact/"
        name={metadata.title}
        description={metadata.description}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact/" },
        ]}
      />

      <div className="container">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { name: "Home", url: "/" },
            { name: "Contact" },
          ]}
        />

        {/* Hero Section */}
        <header className="contact-hero">
          <p className="eyebrow">START A CONVERSATION</p>
          <h1 className="page-title">
            Let’s work on a <em className="serif">useful problem.</em>
          </h1>
          <p className="intro">
            I’m interested in conversations around AI engineering, product
            development, applied research, and analytical systems. Share the
            problem you are working on and the kind of support you need.
          </p>
        </header>

        {/* Three Structured Enquiry Pathways */}
        <section className="pathways-section" aria-label="Enquiry Pathways">
          <div className="section-title-wrap">
            <span className="eyebrow">CHOOSE A FOCUS AREA</span>
            <h2 className="section-title">
              How Can We <em className="serif">Collaborate?</em>
            </h2>
          </div>

          <div className="pathways-grid">
            <div className="pathway-card">
              <div className="pathway-header">
                <span className="pathway-badge badge-ai">Pathway 01</span>
                <h3>AI Engineering &amp; Automation</h3>
              </div>
              <p className="pathway-desc">
                For AI applications, LLM integrations, agent workflows, data
                pipelines, and backend systems. Focused on deterministic safety
                and high-throughput performance.
              </p>
              <div className="pathway-action">
                <InquiryButton
                  className="button button-primary pathway-btn"
                  category="general"
                  labelOverride="Open AI Project Enquiry →"
                />
              </div>
            </div>

            <div className="pathway-card">
              <div className="pathway-header">
                <span className="pathway-badge badge-pm">Pathway 02</span>
                <h3>Product &amp; Technical Collaboration</h3>
              </div>
              <p className="pathway-desc">
                For product discovery, technical planning, implementation
                coordination, banking integrations, and early-stage systems
                delivery.
              </p>
              <div className="pathway-action">
                <InquiryButton
                  className="button button-primary pathway-btn"
                  category="general"
                  labelOverride="Open Product Enquiry →"
                />
              </div>
            </div>

            <div className="pathway-card">
              <div className="pathway-header">
                <span className="pathway-badge badge-research">Pathway 03</span>
                <h3>Research &amp; Analytics</h3>
              </div>
              <p className="pathway-desc">
                For graph neural networks, non-Euclidean systems modeling,
                scientific AI evaluation, quantitative analysis, and financial
                engineering.
              </p>
              <div className="pathway-action">
                <InquiryButton
                  className="button button-primary pathway-btn"
                  category="general"
                  labelOverride="Open Research Enquiry →"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Direct Contact Form & Channel Details */}
        <section className="contact-main-grid" aria-label="Direct Contact Form">
          {/* Form Column */}
          <div className="contact-form-column">
            <div className="form-card-wrapper">
              <div className="form-header-row">
                <h3>Direct Message</h3>
                <span className="form-secure-badge">Verified Lead Channel</span>
              </div>
              <p className="form-instruction">
                Fill in your details below. Messages are recorded securely and
                followed up within one business day.
              </p>
              <GeneralContactForm />
            </div>
          </div>

          {/* Direct Channels Column */}
          <div className="contact-channels-column">
            <div className="channels-card">
              <span className="eyebrow">DIRECT REACH</span>
              <h3>Verified Contact Channels</h3>
              <p className="channels-subtext">
                Prefer email or instant messaging? Reach out directly via these
                verified endpoints:
              </p>

              <div className="channel-list">
                <a
                  href="mailto:kumaraniketn@gmail.com"
                  className="channel-item"
                >
                  <div className="channel-icon" aria-hidden="true">
                    ✉
                  </div>
                  <div className="channel-info">
                    <span className="channel-label">Direct Email</span>
                    <strong className="channel-val">kumaraniketn@gmail.com</strong>
                  </div>
                  <span className="channel-arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>

                <a
                  href={whatsappHref("Hi Aniket, I'd like to connect regarding an engineering or product role.")}
                  target="_blank"
                  rel="noreferrer"
                  className="channel-item"
                >
                  <div className="channel-icon" aria-hidden="true">
                    💬
                  </div>
                  <div className="channel-info">
                    <span className="channel-label">WhatsApp (International)</span>
                    <strong className="channel-val">{WHATSAPP_DISPLAY}</strong>
                  </div>
                  <span className="channel-arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>

                <a
                  href="/assets/Aniket_Thakur_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="channel-item"
                >
                  <div className="channel-icon" aria-hidden="true">
                    📄
                  </div>
                  <div className="channel-info">
                    <span className="channel-label">Official Résumé</span>
                    <strong className="channel-val">Download PDF Document</strong>
                  </div>
                  <span className="channel-arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>

                <a
                  href="https://github.com/07anishu12"
                  target="_blank"
                  rel="noreferrer"
                  className="channel-item"
                >
                  <div className="channel-icon" aria-hidden="true">
                    ⌘
                  </div>
                  <div className="channel-info">
                    <span className="channel-label">GitHub Profile</span>
                    <strong className="channel-val">github.com/07anishu12</strong>
                  </div>
                  <span className="channel-arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </div>

              <div className="privacy-reassurance">
                <span className="shield-icon" aria-hidden="true">
                  🛡
                </span>
                <p>
                  Your details are never shared with third-party advertisers.
                  Submissions are governed by the{" "}
                  <Link href="/privacy/">Privacy Policy</Link>.
                </p>
              </div>

              {/* Retail Vehicle Enquiries Routing */}
              <div className="retail-routing-note">
                <span className="note-title">Looking for two-wheeler showroom pricing?</span>
                <p>
                  If you arrived looking for vehicle loan estimates or on-road
                  costs, visit the dedicated{" "}
                  <Link href="/finance/bikes/">Bike Buying Enquiry Portal →</Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
