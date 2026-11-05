export const revalidate = 600;

import type { Metadata } from "next";
import { archiveState, type ArchiveParams } from "../../lib/archive";
import { BlogIndex } from "../../components/BlogIndex";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import {
  BreadcrumbStructuredData,
  CollectionPageStructuredData,
} from "../../components/StructuredData";

export async function generateMetadata({ searchParams }: { searchParams?: Promise<ArchiveParams> }): Promise<Metadata> {
  const { total, canonical, query } = archiveState("all", await searchParams);
  return {
    title: `Writing & Technical Library (${total} Publications) — Aniket Thakur`,
    description: `${total} in-depth technical guides, valuation models, systems architecture analyses, and automotive economics by Aniket Thakur.`,
    alternates: { canonical },
    robots: query ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      title: "Writing & Technical Library — Aniket Thakur",
      description: `${total} technical guides, financial models, and engineering deep dives by Aniket Thakur.`,
      url: canonical,
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

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: Promise<ArchiveParams>;
}) {
  const { posts: pagePosts, total, totalPages, pageSize, categories, categoryCounts, page, canonical } = archiveState("all", await searchParams);

  const structuredItems = pagePosts.slice(0, 30).map((p) => ({
    name: p.title,
    url: `/blog/${p.category}/${p.slug}/`,
    description: p.description,
  }));

  return (
    <main className="section blog-page">
      <CollectionPageStructuredData
        url={canonical}
        name={`Writing & Technical Library — Aniket Thakur`}
        description={`${total} in-depth technical guides, valuation models, and engineering architectures.`}
        items={structuredItems}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "/" },
          { name: "Writing", url: "/blog/" },
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
          <p className="eyebrow">Technical Library · {total} Publications</p>
          <h1 className="page-title">
            Research, ideas &amp; <em className="serif">engineering insights.</em>
          </h1>
          <p className="intro">
            A curated library of technical guides, AI implementations, financial
            research, product insights and automotive analysis.
          </p>
        </header>

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
          basePath="/blog/"
        />
      </div>
    </main>
  );
}
