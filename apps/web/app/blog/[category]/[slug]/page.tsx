import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "../../../../components/Breadcrumbs";
import { ArticleTableOfContents } from "../../../../components/ArticleTableOfContents";
import { LeadCaptureForm } from "../../../../components/LeadCaptureForm";
import { InquiryButton } from "../../../../components/InquiryButton";
import {
  BlogPostingStructuredData,
  BreadcrumbStructuredData,
  WebPageStructuredData,
} from "../../../../components/StructuredData";
import { getPost, isLeadCapturePost, listPosts } from "../../../../lib/blog";

type RouteProps = { params: Promise<{ category: string; slug: string }> };

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

        {/* 2. Category label */}
        <div className="article-category-wrap">
          <Link
            href={`/blog/${post.category}/`}
            className={`article-category-badge badge-${post.category.toLowerCase()}`}
          >
            {categoryName}
          </Link>
        </div>

        {/* 3. Article Title */}
        <h1 className="article-headline">{post.title}</h1>

        {/* 4. Publication date, modified date, author */}
        <div className="article-header-meta">
          <div className="article-author-info">
            <img
              src="/assets/img/aniket-portrait.png"
              alt="Aniket Thakur"
              width={40}
              height={40}
              className="article-author-avatar"
            />
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

        {/* 5. Short, useful introduction */}
        <p className="article-lead">{post.description}</p>

        {/* 6. Featured image with responsive sizing and caption */}
        {post.coverImage && (
          <figure className="article-cover-figure">
            <div className="article-cover-wrapper">
              <img
                src={post.coverImage}
                alt={post.coverImageAlt || post.title}
                width={post.width || 1200}
                height={post.height || 675}
                className="article-cover-image"
              />
            </div>
            {(post.imageCaption || post.imageCredit) && (
              <figcaption className="article-image-caption">
                {post.imageCaption}{" "}
                {post.imageSourceUrl ? (
                  <a
                    href={post.imageSourceUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {post.imageCredit || "Image source"}
                  </a>
                ) : (
                  post.imageCredit
                )}
              </figcaption>
            )}
          </figure>
        )}

        {/* 7. Quick Answer (if available) */}
        {post.quickAnswer && (
          <aside className="prose quick-answer">
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
            {post.quickAnswer.note && <p>{post.quickAnswer.note}</p>}
          </aside>
        )}

        {/* 8. Table of Contents */}
        {post.headings.length > 0 && (
          <ArticleTableOfContents headings={post.headings} />
        )}

        {/* 9. Article Body */}
        <div
          className="prose article-prose"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        {/* 10. Sources and References */}
        {post.sources.length > 0 && (
          <section className="article-sources-section">
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
          <aside className="article-project-bridge" style={{ marginTop: 32, padding: "16px 20px", background: "rgba(0, 0, 0, 0.02)", borderRadius: 8, border: "1px solid rgba(0, 0, 0, 0.08)" }}>
            <p style={{ margin: 0, fontSize: "0.95rem" }}>
              <strong>Verified Engineering Systems:</strong> Explore production architectures in{" "}
              <Link href="/projects/" style={{ textDecoration: "underline" }}>Projects</Link>, including the{" "}
              <Link href="/projects/finance-tools/" style={{ textDecoration: "underline" }}>Finance Tools DCF Engine</Link>,{" "}
              <Link href="/projects/invoice-ocr/" style={{ textDecoration: "underline" }}>Invoice Document Parser</Link>, and{" "}
              <Link href="/projects/seojev-laya/" style={{ textDecoration: "underline" }}>SEOJEV / Laya Agent</Link>.
            </p>
          </aside>
        )}
        {post.category === "auto" && (
          <aside className="article-project-bridge" style={{ marginTop: 32, padding: "16px 20px", background: "rgba(0, 0, 0, 0.02)", borderRadius: 8, border: "1px solid rgba(0, 0, 0, 0.08)" }}>
            <p style={{ margin: 0, fontSize: "0.95rem" }}>
              <strong>Finance &amp; Affordability Review:</strong> Planning a two-wheeler purchase? Check out the{" "}
              <Link href="/finance/bikes/" style={{ textDecoration: "underline" }}>Bike Finance, Ownership Cost &amp; On-Road Price Calculator</Link>{" "}
              to calculate real monthly commitments before dealership visits.
            </p>
          </aside>
        )}
        {post.category === "finance" && (
          <aside className="article-project-bridge" style={{ marginTop: 32, padding: "16px 20px", background: "rgba(0, 0, 0, 0.02)", borderRadius: 8, border: "1px solid rgba(0, 0, 0, 0.08)" }}>
            <p style={{ margin: 0, fontSize: "0.95rem" }}>
              <strong>Quantitative Modeling:</strong> Review our deterministic DCF valuation tool in{" "}
              <Link href="/projects/finance-tools/" style={{ textDecoration: "underline" }}>Finance Tools Case Study</Link>{" "}
              or plan vehicle budgets with the <Link href="/finance/bikes/" style={{ textDecoration: "underline" }}>Bike Finance Calculator</Link>.
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
                  score += p.tags.filter((t) => post.tags.includes(t)).length * 5;
                }
                const offset = Math.abs(idx - (currentPostIndex >= 0 ? currentPostIndex : 0));
                score += Math.max(0, 10 - offset);
                return { post: p, score };
              });
              scored.sort((a, b) => b.score - a.score);
              return scored.slice(0, 4).map(({ post: p }) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.category}/${p.slug}/`}>{p.title}</Link>
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
            information, not personalised financial, tax, or investment advice.
          </aside>
        )}

        {/* 13. Lead capture panel */}
        {isLeadCapturePost(post) && (
          <section className="lead-panel">
            <div>
              <p className="eyebrow">A practical next step</p>
              <h2>Want a focused comparison?</h2>
              <p>
                Share a few basics. This form does not approve a loan or promise
                a product recommendation.
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
      </article>
    </main>
  );
}
