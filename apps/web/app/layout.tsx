import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import "./globals.css";
import { InquiryProvider } from "../components/InquiryContext";
import { InquiryNavButton } from "../components/InquiryNavButton";
import { InquiryModal } from "../components/InquiryModal";
import { InquiryFloatingTrigger } from "../components/InquiryFloatingTrigger";
import { SiteStructuredData } from "../components/StructuredData";

export const metadata: Metadata = {
  title: "Aniket Thakur — AI × Product × Finance",
  description:
    "AI engineering, backend systems, product development and financial engineering. Projects and writing by Aniket Thakur.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://aniket.app",
  ),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Aniket Thakur",
    title: "Aniket Thakur — AI × Product × Finance",
    description:
      "AI engineering, backend systems, product development and financial engineering. Projects and writing by Aniket Thakur.",
    images: [
      {
        url: "/assets/img/aniket-portrait.png",
        width: 1086,
        height: 1448,
        alt: "Aniket Thakur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aniket Thakur — AI × Product × Finance",
    description:
      "AI engineering, backend systems, product development and financial engineering. Projects and writing by Aniket Thakur.",
    images: ["/assets/img/aniket-portrait.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <InquiryProvider>
          <a className="skip-link" href="#content">
            Skip to content
          </a>
          <div className="site-shell">
            <header className="site-header">
              <div className="container nav">
                <Link className="brand" href="/" aria-label="Aniket Thakur home">
                  <strong>Aniket Thakur</strong>
                  <span>AI × Product × Finance</span>
                </Link>
                <nav className="nav-links" aria-label="Primary navigation">
                  <Link href="/">Home</Link>
                  <Link href="/about/">About</Link>
                  <Link href="/projects/">Projects</Link>
                  <Link href="/research/">Research</Link>
                  <Link href="/blog/">Writing</Link>
                  <Link href="/contact/">Contact</Link>
                </nav>
                <InquiryNavButton />
              </div>
            </header>
            <div id="content">{children}</div>
            <footer className="site-footer">
              <div className="container footer-row">
                <span>© 2026 Aniket Thakur</span>
                <span>
                  <Link href="/privacy/">Privacy notice</Link> ·{" "}
                  <Link href="/contact/">Contact</Link>
                </span>
              </div>
            </footer>
          </div>
          <InquiryModal />
          <InquiryFloatingTrigger />
          <SiteStructuredData />
          <Script src="/assets/js/site-config.js" strategy="beforeInteractive" />
          <Script src="/assets/js/analytics.js" strategy="afterInteractive" />
        </InquiryProvider>
      </body>
    </html>
  );
}
