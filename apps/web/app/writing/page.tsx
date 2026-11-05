export const revalidate = 600;

import type { Metadata } from "next";
import { getPaginatedPosts } from "../../lib/blog";
import { BlogIndex } from "../../components/BlogIndex";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import {
  BreadcrumbStructuredData,
  CollectionPageStructuredData,
} from "../../components/StructuredData";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  const { total } = getPaginatedPosts({ category: "all", page: 1, pageSize: 1 });
  return {
    title: `Writing & Technical Library (${total} Publications) — Aniket Thakur`,
    description: `${total} comprehensive engineering guides, quantitative valuation models, systems architecture analyses, and automotive economics by Aniket Thakur.`,
    alternates: { canonical: "/blog/" },
    openGraph: {
      title: "Writing & Technical Library — Aniket Thakur",
      description: `${total} technical guides, financial models, and engineering deep dives by Aniket Thakur.`,
      url: "/writing/",
      images: ["/assets/img/aniket-portrait.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: "Writing & Technical Library — Aniket Thakur",
      description: `${total} original technical guides, quantitative models, and system architectures.`,
      images: ["/assets/img/aniket-portrait.png"],
    },
  };
}

export default async function WritingPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string; q?: string }>;
}) {
  const resolvedParams = searchParams ? await searchParams : {};
  const page = Math.max(1, parseInt(resolvedParams.page || "1", 10) || 1);
  const query = resolvedParams.q || "";

  const {
    posts: pagePosts,
    total,
    totalPages,
    pageSize,
    categories,
    categoryCounts,
  } = getPaginatedPosts({
    category: "all",
    page,
    pageSize: 12,
    query,
  });

  const structuredItems = pagePosts.slice(0, 30).map((p) => ({
    name: p.title,
    url: `/blog/${p.category}/${p.slug}/`,
    description: p.description,
  }));

  return (
    <main className="section writing-index-page blog-page">
      <CollectionPageStructuredData
        url="/writing/"
        name={`Writing & Technical Library — Aniket Thakur`}
        description={`${total} in-depth technical guides, valuation models, and engineering architectures.`}
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
        <header className="blog-hero">
          <p className="eyebrow">The Technical Library · {total} Publications</p>
          <h1 className="page-title">
            Ideas, tested &amp; <em className="serif">explained with care.</em>
          </h1>
          <p className="intro">
            An extensive library of technical guides, valuation models, AI
            implementation patterns, and automotive economics. Written for
            engineers, analysts, and founders who care about verifiable
            mechanics over surface-level commentary.
          </p>

          <div className="blog-library-stats">
            <div className="stat-pill">
              <strong>{total}</strong> Published Guides
            </div>
            <div className="stat-pill">
              <strong>{categories.length}</strong> Core Pillars (Technology,
              Finance, Auto, Product)
            </div>
            <div className="stat-pill">
              <strong>100%</strong> Original Analysis &amp; Implementations
            </div>
          </div>
        </header>

        {/* Featured Curated AI Engineering Series Bridge */}
        <section
          className="writing-case-studies-bridge"
          aria-label="Practical AI Engineering Series"
          style={{
            background: "linear-gradient(145deg, #FAF9F6 0%, #EFF6FF 100%)",
            border: "1px solid #BFDBFE",
            borderRadius: "16px",
            padding: "24px 28px",
            marginBottom: "2.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
              marginBottom: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span
                style={{
                  display: "inline-block",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "#1D4ED8",
                }}
              ></span>
              <h2
                style={{
                  fontSize: "1.2rem",
                  margin: 0,
                  fontWeight: 800,
                  color: "#0F172A",
                  letterSpacing: "-0.02em",
                }}
              >
                Featured Series: Practical AI Engineering (23 Production Guides)
              </h2>
            </div>
            <Link
              href="/blog/technology/"
              className="button button-secondary"
              style={{ padding: "6px 14px", fontSize: "0.82rem" }}
            >
              Browse AI Architecture →
            </Link>
          </div>
          <p
            style={{
              fontSize: "0.92rem",
              color: "#475569",
              margin: 0,
              maxWidth: "850px",
              lineHeight: 1.55,
            }}
          >
            Production-grade autonomous research agents, deterministic spreadsheet analyzers, sub-800ms SIP voice bots, and multimodal accessibility assistants verified with executable Python test suites.
          </p>
        </section>

        {/* Interactive Library & Grid */}
        <BlogIndex
          initialPosts={pagePosts}
          totalPosts={total}
          currentPage={page}
          totalPages={totalPages}
          pageSize={pageSize}
          categories={categories}
          categoryCounts={categoryCounts}
          activeCategory="all"
          basePath="/writing/"
        />
      </div>
    </main>
  );
}
