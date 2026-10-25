import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import "./globals.css";

export const metadata: Metadata = {
  title: "Aniket Thakur — AI × Product × Finance",
  description:
    "AI engineering, backend systems, product development and financial engineering. Projects and writing by Aniket Thakur.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://aniket.app",
  ),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
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
                <Link href="/about">About</Link>
                <Link href="/projects">Projects</Link>
                <Link href="/research">Research</Link>
                <Link href="/blog">Writing</Link>
                <Link href="/contact">Contact</Link>
              </nav>
              <Link className="nav-cta" href="/contact">
                Start a conversation
              </Link>
            </div>
          </header>
          <div id="content">{children}</div>
          <footer className="site-footer">
            <div className="container footer-row">
              <span>© 2026 Aniket Thakur</span>
              <span>
                <Link href="/privacy">Privacy notice</Link> ·{" "}
                <Link href="/contact">Contact</Link>
              </span>
            </div>
          </footer>
        </div>
        <Script src="/assets/js/site-config.js" strategy="beforeInteractive" />
        <Script src="/assets/js/analytics.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
