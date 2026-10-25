import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LeadCaptureForm } from "../../../../components/LeadCaptureForm";
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
            },
          ],
        },
        twitter: {
          card: "summary_large_image",
          images: [post.socialImage || post.coverImage],
        },
      }
    : {};
}

export default async function BlogPostPage({ params }: RouteProps) {
  const { category, slug } = await params;
  const post = getPost(category, slug);
  if (!post) notFound();

  return (
    <main className="section">
      <article
        data-article-slug={post.slug}
        data-article-category={post.category}
        className="container"
        style={{ maxWidth: 860 }}
      >
        <p className="eyebrow">
          {post.category} · {post.datePublished}
        </p>
        <h1
          style={{
            maxWidth: 760,
            margin: "14px 0 18px",
            fontSize: "clamp(2.5rem, 7vw, 5.4rem)",
            lineHeight: 0.98,
            letterSpacing: "-.07em",
          }}
        >
          {post.title}
        </h1>
        <p
          style={{ maxWidth: 680, color: "var(--muted)", fontSize: "1.15rem" }}
        >
          {post.description}
        </p>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.title,
              description: post.description,
              datePublished: post.datePublished,
              dateModified: post.dateModified || post.datePublished,
              author: { "@type": "Person", name: post.author },
              image: `https://07anishu12.github.io${post.coverImage}`,
              mainEntityOfPage: `https://07anishu12.github.io/blog/${post.category}/${post.slug}/`,
            }).replace(/</g, "\\u003c"),
          }}
        />
        <img
          src={post.coverImage}
          alt={post.coverImageAlt}
          width={post.width}
          height={post.height}
          style={{ width: "100%", height: "auto", marginTop: 24 }}
        />
        {(post.imageCaption || post.imageCredit) && (
          <p className="image-caption">
            {post.imageCaption}{" "}
            {post.imageSourceUrl ? (
              <a href={post.imageSourceUrl} rel="noreferrer">
                {post.imageCredit || "Image source"}
              </a>
            ) : (
              post.imageCredit
            )}
          </p>
        )}
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
        {post.headings.length > 0 && (
          <nav className="prose" aria-label="On this page">
            <h2>On this page</h2>
            <ul>
              {post.headings
                .filter((h) => h.level === "h2")
                .map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`}>{h.text}</a>
                  </li>
                ))}
            </ul>
          </nav>
        )}
        <div
          className="prose"
          style={{ marginTop: 42 }}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        {post.sources.length > 0 && (
          <section className="prose">
            <h2>Sources</h2>
            <ul>
              {post.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} rel="noreferrer">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
        <nav className="prose" aria-label="Related articles">
          <h2>Continue reading</h2>
          <ul>
            {listPosts()
              .filter(
                (p) => p.category === post.category && p.slug !== post.slug,
              )
              .slice(0, 3)
              .map((p) => (
                <li key={p.slug}>
                  <a href={`/blog/${p.category}/${p.slug}/`}>{p.title}</a>
                </li>
              ))}
          </ul>
          <a href={`/blog/${post.category}/`}>All {post.category} articles →</a>
        </nav>
        {post.category === "finance" && (
          <aside
            style={{
              marginTop: 36,
              borderLeft: "3px solid #b45309",
              background: "#fffbeb",
              padding: "14px 18px",
              color: "#78350f",
            }}
          >
            <strong>Educational content:</strong> This article is general
            information, not personalised financial, tax, or investment advice.
          </aside>
        )}
        {isLeadCapturePost(post) && (
          <section className="lead-panel" style={{ marginTop: 48 }}>
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
        {post.enquiry && (
          <p style={{ marginTop: 36 }}>
            <a
              className="button button-secondary"
              href="/contact"
              rel="noreferrer"
            >
              Contact Aniket ↗
            </a>
          </p>
        )}
      </article>
    </main>
  );
}
