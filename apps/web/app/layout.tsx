import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import dynamic from "next/dynamic";
import { Plus_Jakarta_Sans } from "next/font/google";

import "./globals.css";
import { InquiryProvider } from "../components/InquiryContext";
import { SiteHeader } from "../components/SiteHeader";
import { InquiryModalLazy } from "../components/InquiryModalLazy";
import { InquiryFloatingTrigger } from "../components/InquiryFloatingTrigger";
import { SiteStructuredData } from "../components/StructuredData";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Aniket Thakur — AI × Product × Finance",
  description:
    "AI engineering, backend systems, product development and financial engineering. Projects and writing by Aniket Thakur.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://aniket.app",
  ),
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Aniket Thakur",
    title: "Aniket Thakur — AI × Product × Finance",
    description:
      "AI engineering, backend systems, product development and financial engineering. Projects and writing by Aniket Thakur.",
    images: [
      {
        url: "/assets/img/aniket-portrait.webp",
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
    images: ["/assets/img/aniket-portrait.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const publicApiUrl = process.env.NEXT_PUBLIC_API_URL || "";

  return (
    <html lang="en" className={plusJakarta.variable}>
      <head>
        {/* Synchronous inline configuration eliminates render-blocking network request */}
        <script
          id="site-config"
          dangerouslySetInnerHTML={{
            __html: `window.PORTFOLIO_CONFIG=Object.freeze({measurementId:'G-JB7DKFEC0Q',requireAnalyticsConsent:false,apiBaseUrl:${JSON.stringify(publicApiUrl)},whatsapp:'817012905081'});`,
          }}
        />
      </head>
      <body>
        <InquiryProvider>
          <a className="skip-link" href="#content">
            Skip to content
          </a>
          <div className="site-shell">
            <SiteHeader />
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
          <InquiryModalLazy />
          <InquiryFloatingTrigger />
          <SiteStructuredData />
          <Script src="/assets/js/analytics.js" strategy="afterInteractive" />
        </InquiryProvider>
      </body>
    </html>
  );
}
