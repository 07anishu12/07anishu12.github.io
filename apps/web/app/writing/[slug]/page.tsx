import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import manifestData from "../../../generated/articles_manifest.json";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { ArticleTableOfContents } from "../../../components/ArticleTableOfContents";
import {
  BlogPostingStructuredData,
  BreadcrumbStructuredData,
  WebPageStructuredData,
} from "../../../components/StructuredData";
import { getWritingPost } from "../../../lib/blog";

type RouteProps = { params: Promise<{ slug: string }> };

interface ArticleManifestItem {
  id: string;
  articleNumber: number;
  part: string;
  title: string;
  slug: string;
  primaryKeyword: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  publishedAt: string;
  readTime: number;
  wordCount: number;
  tags: string[];
  coverImage: string;
  coverImageAlt: string;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export function generateStaticParams() {
  const articles = manifestData as ArticleManifestItem[];
  return articles.map((art) => ({
    slug: art.slug,
  }));
}

export async function generateMetadata({
  params,
}: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getWritingPost(slug);
  const manifestItem = (manifestData as ArticleManifestItem[]).find(
    (a) => a.slug === slug
  );

  if (!post && !manifestItem) {
    return {};
  }

  const title = manifestItem?.metaTitle || post?.seoTitle || post?.title || "";
  const description = manifestItem?.metaDescription || post?.description || "";
  const keywords = manifestItem?.tags || post?.tags || [];
  const coverImg = manifestItem?.coverImage || post?.coverImage || "";
  const coverAlt = manifestItem?.coverImageAlt || post?.coverImageAlt || title;

  return {
    title: `${title} — Aniket Thakur`,
    description,
    keywords,
    alternates: { canonical: `/writing/${slug}/` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/writing/${slug}/`,
      images: [
        {
          url: coverImg,
          alt: coverAlt,
          width: post?.width || 1200,
          height: post?.height || 675,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [coverImg],
    },
  };
}

export default async function WritingArticlePage({ params }: RouteProps) {
  const { slug } = await params;
  const post = getWritingPost(slug);
  const articles = manifestData as ArticleManifestItem[];
  const manifestItem = articles.find((a) => a.slug === slug);

  if (!post) {
    notFound();
  }

  const currentIdx = articles.findIndex((a) => a.slug === slug);
  const prevArticle = currentIdx > 0 ? articles[currentIdx - 1] : null;
  const nextArticle =
    currentIdx >= 0 && currentIdx < articles.length - 1
      ? articles[currentIdx + 1]
      : null;

  const partLabel = manifestItem?.part || "Practical AI Engineering";
  const primaryKw = manifestItem?.primaryKeyword || post.tags[0] || "AI Engineering";

  return (
    <main className="section article-page-section writing-article-section">
      <article
        data-article-slug={post.slug}
        data-article-category={post.category}
        className="article-container"
      >
        <WebPageStructuredData
          url={`/writing/${slug}/`}
          name={post.title}
          description={post.description}
        />
        <BlogPostingStructuredData
          url={`/writing/${slug}/`}
          title={post.title}
          description={post.description}
          datePublished={post.datePublished}
          dateModified={post.dateModified || post.datePublished}
          category={post.category}
          image={post.coverImage}
          imageWidth={post.width}
          imageHeight={post.height}
          wordCount={post.body.trim().split(/\s+/).length}
          keywords={post.tags.join(", ")}
        />
        <BreadcrumbStructuredData
          items={[
            { name: "Home", url: "/" },
            { name: "Writing", url: "/writing/" },
            { name: post.title, url: `/writing/${slug}/` },
          ]}
        />

        {/* 1. Breadcrumbs */}
        <Breadcrumbs
          items={[
            { name: "Home", url: "/" },
            { name: "Writing", url: "/writing/" },
            { name: post.title },
          ]}
        />

        {/* 2. Series & Category Banner */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px", margin: "16px 0 12px 0" }}>
          <span style={{ background: "#EEF2FF", color: "#4F46E5", fontSize: "0.8rem", fontWeight: 700, padding: "4px 10px", borderRadius: "6px" }}>
            {partLabel}
          </span>
          <span style={{ background: "#F3F4F6", color: "#4B5563", fontSize: "0.8rem", fontWeight: 600, padding: "4px 10px", borderRadius: "6px" }}>
            Keyword: {primaryKw}
          </span>
          <Link
            href="/writing/"
            style={{ fontSize: "0.8rem", color: "#6B7280", textDecoration: "underline", marginLeft: "auto" }}
          >
            ← Back to 23 Practical AI Guides
          </Link>
        </div>

        {/* 3. Title */}
        <h1 className="article-headline">{post.title}</h1>

        {/* 4. Publication date & Author Meta */}
        <div className="article-header-meta">
          <div className="article-author-info">
            <picture>
              <source
                srcSet="/assets/img/aniket-author-avatar.avif"
                type="image/avif"
              />
              <source
                srcSet="/assets/img/aniket-author-avatar.webp"
                type="image/webp"
              />
              <img
                src="/assets/img/aniket-author-avatar.webp"
                alt="Aniket Thakur"
                width={40}
                height={40}
                loading="lazy"
                decoding="async"
                className="article-author-avatar"
              />
            </picture>
            <div className="article-author-text">
              <span className="article-author-name">Aniket Thakur</span>
              <div className="article-date-row">
                <time dateTime={post.datePublished}>
                  Published {formatDate(post.datePublished)}
                </time>
                {post.dateModified && post.dateModified !== post.datePublished && (
                  <>
                    <span className="meta-sep" aria-hidden="true">
                      ·
                    </span>
                    <time dateTime={post.dateModified}>
                      Updated {formatDate(post.dateModified)}
                    </time>
                  </>
                )}
                {post.readingTime && (
                  <>
                    <span className="meta-sep" aria-hidden="true">
                      ·
                    </span>
                    <span>{post.readingTime} min read</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 5. Lead Description */}
        <p className="article-lead">{post.description}</p>

        {/* 6. Featured SVG Cover Image */}
        {post.coverImage && (
          <figure className="article-cover-figure" style={{ margin: "24px 0" }}>
            <div className="article-cover-wrapper" style={{ borderRadius: "14px", overflow: "hidden", border: "1px solid #E5E2D9" }}>
              <img
                src={post.coverImage}
                alt={post.coverImageAlt || post.title}
                width={post.width || 1200}
                height={post.height || 675}
                fetchPriority="high"
                decoding="async"
                className="article-cover-image"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
            {post.imageCaption && (
              <figcaption className="article-image-caption" style={{ fontSize: "0.85rem", color: "#6B7280", marginTop: "8px" }}>
                {post.imageCaption}
              </figcaption>
            )}
          </figure>
        )}

        {/* 7. Quick Answer Summary */}
        {post.quickAnswer && (
          <aside className="prose quick-answer" style={{ marginBottom: "2rem" }}>
            <h2>{post.quickAnswer.question}</h2>
            <p>{post.quickAnswer.answer}</p>
            <dl>
              {post.quickAnswer.facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
            <h3>Good for</h3>
            <ul>
              {post.quickAnswer.goodFor.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <h3>Watch for</h3>
            <ul>
              {post.quickAnswer.watchFor.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </aside>
        )}

        {/* 8. Table of Contents */}
        {post.headings.length > 0 && (
          <ArticleTableOfContents headings={post.headings} />
        )}

        {/* 9. Full Article Body (with Syntax Highlighting & Mermaid Diagrams) */}
        <div
          className="prose article-prose"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        {/* 10. Verified Sources & References */}
        {post.sources.length > 0 && (
          <section className="article-sources-section" style={{ marginTop: "3rem" }}>
            <h2 className="article-subheading">Sources &amp; References</h2>
            <ul className="article-sources-list">
              {post.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} rel="noreferrer" target="_blank">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 11. Contextual Architecture Bridge to Verified Case Studies */}
        <aside
          className="article-project-bridge"
          style={{
            marginTop: "3rem",
            padding: "24px 28px",
            background: "linear-gradient(135deg, #FAF9F6 0%, #EEF2FF 100%)",
            borderRadius: "14px",
            border: "1px solid #C7D2FE",
          }}
        >
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "0 0 10px 0", color: "#1E1B4B" }}>
            Connected Engineering Systems on Aniket.app
          </h3>
          <p style={{ margin: 0, fontSize: "0.95rem", color: "#374151", lineHeight: 1.5 }}>
            Explore verified production codebases: review the{" "}
            <Link href="/projects/signal-desk/" style={{ textDecoration: "underline", fontWeight: 600, color: "#4F46E5" }}>
              Signal Desk Lead Agent
            </Link>{" "}
            for transactional outbox reliability, the{" "}
            <Link href="/projects/finance-tools/" style={{ textDecoration: "underline", fontWeight: 600, color: "#0891B2" }}>
              Finance Tools DCF Engine
            </Link>{" "}
            for deterministic workbook reconciliation,{" "}
            <Link href="/projects/prompt-bi/" style={{ textDecoration: "underline", fontWeight: 600, color: "#7C3AED" }}>
              Prompt BI
            </Link>{" "}
            for AST-validated SQL generation, and{" "}
            <Link href="/projects/fastcharger/" style={{ textDecoration: "underline", fontWeight: 600, color: "#059669" }}>
              FastCharger
            </Link>{" "}
            for PostGIS geospatial infrastructure.
          </p>
        </aside>

        {/* 12. Series Pagination */}
        <nav
          aria-label="Series Navigation"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            marginTop: "3.5rem",
            paddingTop: "24px",
            borderTop: "1px solid #E5E7EB",
          }}
        >
          <div>
            {prevArticle && (
              <Link
                href={`/writing/${prevArticle.slug}/`}
                style={{
                  display: "block",
                  padding: "16px",
                  border: "1px solid #E5E7EB",
                  borderRadius: "10px",
                  textDecoration: "none",
                  background: "#FFFFFF",
                }}
              >
                <span style={{ fontSize: "0.75rem", color: "#6B7280", fontWeight: 600 }}>
                  ← PREVIOUS GUIDE ({prevArticle.articleNumber}/23)
                </span>
                <p style={{ margin: "4px 0 0 0", fontSize: "0.95rem", fontWeight: 700, color: "#111827", lineHeight: 1.3 }}>
                  {prevArticle.title}
                </p>
              </Link>
            )}
          </div>
          <div style={{ textAlign: "right" }}>
            {nextArticle && (
              <Link
                href={`/writing/${nextArticle.slug}/`}
                style={{
                  display: "block",
                  padding: "16px",
                  border: "1px solid #E5E7EB",
                  borderRadius: "10px",
                  textDecoration: "none",
                  background: "#FFFFFF",
                }}
              >
                <span style={{ fontSize: "0.75rem", color: "#6B7280", fontWeight: 600 }}>
                  NEXT GUIDE ({nextArticle.articleNumber}/23) →
                </span>
                <p style={{ margin: "4px 0 0 0", fontSize: "0.95rem", fontWeight: 700, color: "#111827", lineHeight: 1.3 }}>
                  {nextArticle.title}
                </p>
              </Link>
            )}
          </div>
        </nav>
      </article>
    </main>
  );
}
