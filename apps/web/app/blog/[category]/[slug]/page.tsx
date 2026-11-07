import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "../../../../components/Breadcrumbs";
import { ArticleTableOfContents } from "../../../../components/ArticleTableOfContents";
import {
  ArticleHeader,
  ArticleHero,
  ArticleOverview,
  ArticleAuthorInformation,
  articleDate,
} from "../../../../components/ArticleEditorial";
import { ArticleBody } from "../../../../components/ArticleBody";
import { LeadCaptureForm } from "../../../../components/LeadCaptureForm";
import { InquiryButton } from "../../../../components/InquiryButton";
import {
  BlogPostingStructuredData,
  BreadcrumbStructuredData,
  WebPageStructuredData,
} from "../../../../components/StructuredData";
import { getPost, isLeadCapturePost, listPosts } from "../../../../lib/blog";

type RouteProps = { params: Promise<{ category: string; slug: string }> };

export function generateStaticParams() {
  return listPosts().map((post) => ({
    category: post.category,
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: RouteProps): Promise<Metadata> {
  const { category, slug } = await params;
  const post = getPost(category, slug);
  return post
    ? {
        title: post.seoTitle || post.title,
        description: post.description,
        alternates: { canonical: `/blog/${category}/${slug}/` },
        openGraph: {
          type: "article",
          title: post.title,
          description: post.description,
          images: [
            {
              url: post.socialImage || post.coverImage,
              alt: post.socialImageAlt || post.coverImageAlt,
              width: post.socialWidth,
              height: post.socialHeight,
            },
          ],
        },
        twitter: {
          card: "summary_large_image",
          title: post.title,
          description: post.description,
          images: [post.socialImage || post.coverImage],
        },
      }
    : {};
}

export default async function BlogPostPage({ params }: RouteProps) {
  const { category, slug } = await params;
  const post = getPost(category, slug);
  if (!post) notFound();

  const categoryName =
    post.category.charAt(0).toUpperCase() + post.category.slice(1);

  return (
    <main className="section article-page-section">
      <article
        data-article-slug={post.slug}
        data-article-category={post.category}
        className="article-container"
      >
        <WebPageStructuredData
          url={`/blog/${category}/${slug}/`}
          name={post.title}
          description={post.description}
        />
        <BlogPostingStructuredData
          url={`/blog/${category}/${slug}/`}
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
            { name: "Writing", url: "/blog/" },
            { name: categoryName, url: `/blog/${post.category}/` },
            { name: post.title, url: `/blog/${category}/${slug}/` },
          ]}
        />

        {/* 1. Coherent, accessible Breadcrumbs */}
        <Breadcrumbs
          items={[
            { name: "Home", url: "/" },
            { name: "Writing", url: "/blog/" },
            { name: categoryName, url: `/blog/${post.category}/` },
            { name: post.title },
          ]}
        />

        <ArticleHeader post={post} />
        <div className="article-reading-layout">
          <ArticleTableOfContents headings={post.headings} />
          <div className="article-reading-main">
            <ArticleHero post={post} />
            <ArticleOverview summary={post.quickAnswer} />
            <ArticleBody post={post} />

            {/* 10. Sources and References */}
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

            {/* 11. Contextual Architecture Bridge */}
            {post.category === "technology" && (
              <aside className="article-project-bridge">
                <p>
                  <strong>Verified Engineering Systems:</strong> Explore
                  production architectures in{" "}
                  <Link href="/projects/">Projects</Link>, including the{" "}
                  <Link href="/projects/finance-tools/">
                    Finance Tools DCF Engine
                  </Link>
                  ,{" "}
                  <Link href="/projects/invoice-ocr/">
                    Invoice Document Parser
                  </Link>
                  , and{" "}
                  <Link href="/projects/seojev-laya/">SEOJEV / Laya Agent</Link>
                  .
                </p>
              </aside>
            )}
            {post.category === "auto" && (
              <aside className="article-project-bridge">
                <p>
                  <strong>Finance &amp; Affordability Review:</strong> Planning
                  a two-wheeler purchase? Check out the{" "}
                  <Link href="/finance/bikes/">
                    Bike Finance, Ownership Cost &amp; On-Road Price Calculator
                  </Link>{" "}
                  to calculate real monthly commitments before dealership
                  visits.
                </p>
              </aside>
            )}
            {post.category === "finance" && (
              <aside className="article-project-bridge">
                <p>
                  <strong>Quantitative Modeling:</strong> Review our
                  deterministic DCF valuation tool in{" "}
                  <Link href="/projects/finance-tools/">
                    Finance Tools Case Study
                  </Link>{" "}
                  or plan vehicle budgets with the{" "}
                  <Link href="/finance/bikes/">Bike Finance Calculator</Link>.
                </p>
              </aside>
            )}

            {/* 12. Continue reading with dynamic contextual selection */}
            <nav className="article-related-nav" aria-label="Related articles">
              <h2 className="article-subheading">Continue reading</h2>
              <ul className="article-related-list">
                {(() => {
                  const allCategoryPosts = listPosts().filter(
                    (p) => p.category === post.category && p.slug !== post.slug,
                  );
                  const currentPostIndex = allCategoryPosts.findIndex(
                    (p) => p.slug === post.slug,
                  );
                  const scored = allCategoryPosts.map((p, idx) => {
                    let score = 0;
                    if (post.tags && p.tags) {
                      score +=
                        p.tags.filter((t) => post.tags.includes(t)).length * 5;
                    }
                    const offset = Math.abs(
                      idx - (currentPostIndex >= 0 ? currentPostIndex : 0),
                    );
                    score += Math.max(0, 10 - offset);
                    return { post: p, score };
                  });
                  scored.sort((a, b) => b.score - a.score);
                  return scored.slice(0, 4).map(({ post: p }) => (
                    <li key={p.slug}>
                      <span className="article-related-meta">
                        {p.category} ·{" "}
                        <time dateTime={p.datePublished}>
                          {articleDate(p.datePublished)}
                        </time>
                      </span>
                      <Link href={`/blog/${p.category}/${p.slug}/`}>
                        {p.title}
                      </Link>
                      {p.description && <p>{p.description}</p>}
                    </li>
                  ));
                })()}
              </ul>
              <Link
                href={`/blog/${post.category}/`}
                className="article-all-category-link"
              >
                All {categoryName} articles →
              </Link>
            </nav>

            {/* 12. Finance educational note */}
            {post.category === "finance" && (
              <aside className="article-disclaimer-card">
                <strong>Educational content:</strong> This article is general
                information, not personalised financial, tax, or investment
                advice.
              </aside>
            )}

            {/* 13. Lead capture panel */}
            {isLeadCapturePost(post) && (
              <section className="lead-panel">
                <div>
                  <p className="eyebrow">A practical next step</p>
                  <h2>Want a focused comparison?</h2>
                  <p>
                    Share a few basics. This form does not approve a loan or
                    promise a product recommendation.
                  </p>
                </div>
                <LeadCaptureForm source={post.slug} campaign={post.category} />
              </section>
            )}

            {/* 14. Contextual Inquiry Trigger */}
            {post.enquiry && (
              <div className="article-enquiry-box">
                <InquiryButton
                  className="button button-primary"
                  category={post.category}
                  sourceSlug={post.slug}
                />
              </div>
            )}
            <ArticleAuthorInformation post={post} />
          </div>
        </div>
      </article>
    </main>
  );
}
