import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import manifestData from "../../../generated/articles_manifest.json";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { ArticleTableOfContents } from "../../../components/ArticleTableOfContents";
import {
  ArticleHeader,
  ArticleHero,
  ArticleOverview,
  ArticleAuthorInformation,
} from "../../../components/ArticleEditorial";
import { ArticleBody } from "../../../components/ArticleBody";
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
    (a) => a.slug === slug,
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
  const primaryKw =
    manifestItem?.primaryKeyword || post.tags[0] || "AI Engineering";

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
        <div className="article-series-banner">
          <span>{partLabel}</span>
          <span>Keyword: {primaryKw}</span>
          <Link href="/writing/">← Back to 23 Practical AI Guides</Link>
        </div>

        <ArticleHeader post={post} />
        <div className="article-reading-layout">
          <ArticleTableOfContents headings={post.headings} />
          <div className="article-reading-main">
            <ArticleHero post={post} />
            <ArticleOverview summary={post.quickAnswer} />
            <ArticleBody post={post} />

            {/* 10. Verified Sources & References */}
            {post.sources.length > 0 && (
              <section id="article-sources" className="article-sources-section">
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
            <aside className="article-project-bridge">
              <h2>Connected Engineering Systems on Aniket.app</h2>
              <p>
                Explore verified production codebases: review the{" "}
                <Link href="/projects/signal-desk/">
                  Signal Desk Lead Agent
                </Link>{" "}
                for transactional outbox reliability, the{" "}
                <Link href="/projects/finance-tools/">
                  Finance Tools DCF Engine
                </Link>{" "}
                for deterministic workbook reconciliation,{" "}
                <Link href="/projects/prompt-bi/">Prompt BI</Link> for
                AST-validated SQL generation, and{" "}
                <Link href="/projects/fastcharger/">FastCharger</Link> for
                PostGIS geospatial infrastructure.
              </p>
            </aside>

            {/* 12. Series Pagination */}
            <nav
              className="article-series-navigation"
              aria-label="Series Navigation"
            >
              <div>
                {prevArticle && (
                  <Link href={`/writing/${prevArticle.slug}/`}>
                    <span>
                      ← PREVIOUS GUIDE ({prevArticle.articleNumber}/23)
                    </span>
                    <p>{prevArticle.title}</p>
                  </Link>
                )}
              </div>
              <div>
                {nextArticle && (
                  <Link href={`/writing/${nextArticle.slug}/`}>
                    <span>NEXT GUIDE ({nextArticle.articleNumber}/23) →</span>
                    <p>{nextArticle.title}</p>
                  </Link>
                )}
              </div>
            </nav>
            <ArticleAuthorInformation post={post} />
          </div>
        </div>
      </article>
    </main>
  );
}
