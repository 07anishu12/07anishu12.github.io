import type { Metadata } from "next";
import Link from "next/link";
import manifestData from "../../generated/articles_manifest.json";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import {
  BreadcrumbStructuredData,
  CollectionPageStructuredData,
} from "../../components/StructuredData";

export const metadata: Metadata = {
  title: "Practical AI Engineering: 23 Complete Projects & Implementation Guides — Aniket Thakur",
  description:
    "23 comprehensive, production-grade technical guides covering AI research agents, Excel agents, meeting assistants, SQL agents, WhatsApp bots, and voice AI by Aniket Thakur.",
  alternates: { canonical: "/writing/" },
  openGraph: {
    title: "Practical AI Engineering: 23 Complete Projects & Implementation Guides — Aniket Thakur",
    description:
      "Production-verified AI engineering collection: state machines, deterministic validation loops, real-time voice architectures, and multimodal assistants.",
    url: "/writing/",
    images: ["/assets/img/aniket-portrait.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Practical AI Engineering: 23 Complete Projects & Implementation Guides",
    description:
      "Autonomous agents, real-time voice, and multimodal systems engineered with verifiable Python implementations.",
    images: ["/assets/img/aniket-portrait.png"],
  },
};

interface ArticleItem {
  id: string;
  articleNumber: number;
  part: string;
  title: string;
  slug: string;
  category: string;
  primaryKeyword: string;
  metaTitle: string;
  metaDescription: string;
  publishedAt: string;
  readTime: number;
  wordCount: number;
  tags: string[];
  coverImage: string;
}

export default function WritingIndexPage() {
  const articles = manifestData as ArticleItem[];

  const part1Articles = articles.filter(
    (a) => a.articleNumber >= 1 && a.articleNumber <= 15
  );
  const part2Articles = articles.filter(
    (a) => a.articleNumber >= 16 && a.articleNumber <= 23
  );

  const structuredItems = articles.map((p) => ({
    name: p.title,
    url: `/writing/${p.slug}/`,
    description: p.metaDescription,
  }));

  return (
    <main className="section writing-index-page">
      <CollectionPageStructuredData
        url="/writing/"
        name={metadata.title as string}
        description={metadata.description as string}
        items={structuredItems}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "/" },
          { name: "Writing", url: "/writing/" },
        ]}
      />

      <div className="container">
        {/* Breadcrumb nav */}
        <Breadcrumbs
          items={[
            { name: "Home", url: "/" },
            { name: "Writing" },
          ]}
        />

        {/* Hero Section */}
        <header className="blog-hero" style={{ marginBottom: "2.5rem" }}>
          <p className="eyebrow">
            Technical Library · 23 Complete Implementation Guides
          </p>
          <h1 className="page-title">
            Practical AI Engineering: <em className="serif">Autonomous Agents &amp; Real-Time Multimodal Systems.</em>
          </h1>
          <p className="intro">
            A comprehensive, production-verified collection of 23 hands-on
            implementation guides. Written for senior engineers, architects, and
            technical founders who demand deterministic software contracts,
            verifiable citation loops, SSRF &amp; prompt injection boundaries,
            and production latency guarantees over prompt-engineering hype.
          </p>

          <div className="blog-library-stats" style={{ display: "flex", flexWrap: "wrap", gap: "12px", margin: "1.5rem 0" }}>
            <div className="stat-pill">
              <strong>23</strong> Production Guides
            </div>
            <div className="stat-pill">
              <strong>131</strong> Executable Code Modules
            </div>
            <div className="stat-pill">
              <strong>23</strong> Mermaid Architecture Diagrams
            </div>
            <div className="stat-pill">
              <strong>100%</strong> Deterministic Safety Gated
            </div>
          </div>
        </header>

        {/* Verified Case Studies Showcase */}
        <section
          className="writing-case-studies-bridge"
          aria-label="Verified Case Studies on Aniket.app"
          style={{
            background: "linear-gradient(145deg, #FAF9F6 0%, #EEF2FF 100%)",
            border: "1px solid #C7D2FE",
            borderRadius: "16px",
            padding: "28px",
            marginBottom: "3.5rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <span style={{ display: "inline-block", width: "10px", height: "10px", borderRadius: "50%", background: "#4F46E5" }}></span>
            <h2 style={{ fontSize: "1.25rem", margin: 0, fontWeight: 700, color: "#1E1B4B" }}>
              Verified Production Case Studies on Aniket.app
            </h2>
          </div>
          <p style={{ fontSize: "0.95rem", color: "#4B5563", marginBottom: "20px", maxWidth: "800px" }}>
            Every tutorial in this collection connects to architectural patterns proven across our featured engineering systems:
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "16px",
            }}
          >
            <Link
              href="/projects/signal-desk/"
              style={{
                display: "block",
                background: "#FFFFFF",
                padding: "18px",
                borderRadius: "12px",
                border: "1px solid #E5E7EB",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
            >
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#4F46E5", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Event-Driven Automation
              </span>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "6px 0 8px 0", color: "#111827" }}>
                Signal Desk — Lead Agent
              </h3>
              <p style={{ fontSize: "0.85rem", color: "#4B5563", margin: 0, lineHeight: 1.4 }}>
                PostgreSQL transactional outbox with advisory locks for atomic lead routing and zero dropped messages.
              </p>
            </Link>

            <Link
              href="/projects/finance-tools/"
              style={{
                display: "block",
                background: "#FFFFFF",
                padding: "18px",
                borderRadius: "12px",
                border: "1px solid #E5E7EB",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
            >
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0891B2", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Quantitative Finance
              </span>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "6px 0 8px 0", color: "#111827" }}>
                Finance Tools — DCF Engine
              </h3>
              <p style={{ fontSize: "0.85rem", color: "#4B5563", margin: 0, lineHeight: 1.4 }}>
                Deterministic Python/FastAPI valuation engine reconciling JSON state with Excel workbooks with zero cell drift.
              </p>
            </Link>

            <Link
              href="/projects/prompt-bi/"
              style={{
                display: "block",
                background: "#FFFFFF",
                padding: "18px",
                borderRadius: "12px",
                border: "1px solid #E5E7EB",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
            >
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#7C3AED", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Data Engineering
              </span>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "6px 0 8px 0", color: "#111827" }}>
                Prompt BI — SQL Analytics
              </h3>
              <p style={{ fontSize: "0.85rem", color: "#4B5563", margin: 0, lineHeight: 1.4 }}>
                Natural-language SQL analytics engine with SQLGlot AST query linting blocking unsafe mutations.
              </p>
            </Link>

            <Link
              href="/projects/fastcharger/"
              style={{
                display: "block",
                background: "#FFFFFF",
                padding: "18px",
                borderRadius: "12px",
                border: "1px solid #E5E7EB",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
            >
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#059669", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Geospatial Systems
              </span>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "6px 0 8px 0", color: "#111827" }}>
                FastCharger — EV Locator
              </h3>
              <p style={{ fontSize: "0.85rem", color: "#4B5563", margin: 0, lineHeight: 1.4 }}>
                Sub-50ms EV station search leveraging PostGIS ST_DWithin spatial queries and dynamic filter caches.
              </p>
            </Link>
          </div>
        </section>

        {/* Section Part I */}
        <section style={{ marginBottom: "4rem" }}>
          <div style={{ borderBottom: "2px solid #E5E7EB", paddingBottom: "12px", marginBottom: "24px" }}>
            <span style={{ color: "#4F46E5", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px" }}>
              Collection Phase 1
            </span>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 800, margin: "6px 0 4px 0", color: "#111827" }}>
              Part I: Practical AI Agents (Articles 1–15)
            </h2>
            <p style={{ color: "#6B7280", margin: 0, fontSize: "1rem" }}>
              Autonomous single-agent state graphs, web search planners, spreadsheet analyzers, inbox managers, candidate screeners, and deterministic SQL engines.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: "24px",
            }}
          >
            {part1Articles.map((art) => (
              <article
                key={art.slug}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  borderRadius: "14px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.03)",
                }}
              >
                <div style={{ padding: "20px 22px", flexGrow: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <span style={{ background: "#EEF2FF", color: "#4F46E5", fontSize: "0.75rem", fontWeight: 700, padding: "4px 8px", borderRadius: "6px" }}>
                      AI-ENG-{art.articleNumber.toString().padStart(2, "0")}
                    </span>
                    <span style={{ color: "#6B7280", fontSize: "0.8rem", fontWeight: 500 }}>
                      {art.readTime} min read · {art.wordCount} words
                    </span>
                  </div>

                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700, lineHeight: 1.35, margin: "0 0 10px 0" }}>
                    <Link
                      href={`/writing/${art.slug}/`}
                      style={{ color: "#111827", textDecoration: "none" }}
                    >
                      {art.title}
                    </Link>
                  </h3>

                  <div style={{ marginBottom: "12px" }}>
                    <span style={{ fontSize: "0.75rem", background: "#F3F4F6", color: "#4B5563", padding: "3px 8px", borderRadius: "4px", fontWeight: 600 }}>
                      Target Keyword: {art.primaryKeyword}
                    </span>
                  </div>

                  <p style={{ fontSize: "0.88rem", color: "#4B5563", lineHeight: 1.5, margin: "0 0 16px 0", flexGrow: 1 }}>
                    {art.metaDescription}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "18px" }}>
                    {art.tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        style={{ fontSize: "0.75rem", background: "#FAFAFA", border: "1px solid #E5E7EB", color: "#6B7280", padding: "2px 7px", borderRadius: "4px" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/writing/${art.slug}/`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      color: "#4F46E5",
                      fontWeight: 700,
                      fontSize: "0.88rem",
                      textDecoration: "none",
                      marginTop: "auto",
                    }}
                  >
                    Read Implementation Guide <span>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Section Part II */}
        <section style={{ marginBottom: "4rem" }}>
          <div style={{ borderBottom: "2px solid #E5E7EB", paddingBottom: "12px", marginBottom: "24px" }}>
            <span style={{ color: "#0891B2", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px" }}>
              Collection Phase 2
            </span>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 800, margin: "6px 0 4px 0", color: "#111827" }}>
              Part II: Voice AI and Multimodal Applications (Articles 16–23)
            </h2>
            <p style={{ color: "#6B7280", margin: 0, fontSize: "1rem" }}>
              Real-time conversational audio pipelines, sub-800ms SIP phone receptionists, Hinglish code-switching ASR, live speech translation, and WCAG 2.2 AA multimodal vision assistants.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: "24px",
            }}
          >
            {part2Articles.map((art) => (
              <article
                key={art.slug}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  borderRadius: "14px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.03)",
                }}
              >
                <div style={{ padding: "20px 22px", flexGrow: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <span style={{ background: "#ECFEFF", color: "#0891B2", fontSize: "0.75rem", fontWeight: 700, padding: "4px 8px", borderRadius: "6px" }}>
                      AI-ENG-{art.articleNumber.toString().padStart(2, "0")}
                    </span>
                    <span style={{ color: "#6B7280", fontSize: "0.8rem", fontWeight: 500 }}>
                      {art.readTime} min read · {art.wordCount} words
                    </span>
                  </div>

                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700, lineHeight: 1.35, margin: "0 0 10px 0" }}>
                    <Link
                      href={`/writing/${art.slug}/`}
                      style={{ color: "#111827", textDecoration: "none" }}
                    >
                      {art.title}
                    </Link>
                  </h3>

                  <div style={{ marginBottom: "12px" }}>
                    <span style={{ fontSize: "0.75rem", background: "#F3F4F6", color: "#4B5563", padding: "3px 8px", borderRadius: "4px", fontWeight: 600 }}>
                      Target Keyword: {art.primaryKeyword}
                    </span>
                  </div>

                  <p style={{ fontSize: "0.88rem", color: "#4B5563", lineHeight: 1.5, margin: "0 0 16px 0", flexGrow: 1 }}>
                    {art.metaDescription}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "18px" }}>
                    {art.tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        style={{ fontSize: "0.75rem", background: "#FAFAFA", border: "1px solid #E5E7EB", color: "#6B7280", padding: "2px 7px", borderRadius: "4px" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/writing/${art.slug}/`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      color: "#0891B2",
                      fontWeight: 700,
                      fontSize: "0.88rem",
                      textDecoration: "none",
                      marginTop: "auto",
                    }}
                  >
                    Read Implementation Guide <span>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Global Technical Library Reference */}
        <div
          style={{
            textAlign: "center",
            padding: "36px 20px",
            background: "#FAF9F6",
            borderRadius: "16px",
            border: "1px solid #E5E2D9",
            marginBottom: "3rem",
          }}
        >
          <h3 style={{ fontSize: "1.3rem", fontWeight: 700, margin: "0 0 8px 0" }}>
            Explore the Complete 585+ Article Technical Archive
          </h3>
          <p style={{ color: "#6B7280", maxWidth: "600px", margin: "0 auto 18px auto", fontSize: "0.95rem" }}>
            Looking for quantitative finance models, automotive economics, systems architecture, or product management deep dives? Browse our full catalog.
          </p>
          <Link
            href="/blog/"
            className="btn btn-primary"
            style={{
              display: "inline-block",
              background: "#111827",
              color: "#FFFFFF",
              padding: "10px 24px",
              borderRadius: "8px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Browse All Published Guides →
          </Link>
        </div>
      </div>
    </main>
  );
}
