import Link from "next/link";
import type { BlogPost } from "../lib/blog";
import { ArticleCardImage } from "./ArticleCardImage";

export function articleDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function ArticleHeader({ post }: { post: BlogPost }) {
  return (
    <header className="article-editorial-header">
      <Link href={`/blog/${post.category}/`} className="article-category-badge">
        {post.category === "auto" ? "Auto" : post.category}
      </Link>
      <h1 className="article-headline">{post.title}</h1>
      {post.description && <p className="article-lead">{post.description}</p>}
      <div className="article-header-meta">
        <div className="article-author-info">
          <img
            src="/assets/img/aniket-author-avatar.webp"
            alt=""
            width={44}
            height={44}
            className="article-author-avatar"
          />
          <div className="article-author-text">
            <Link
              href="/author/aniket-thakur/"
              rel="author"
              className="article-author-name"
            >
              {post.author}
            </Link>
            <div className="article-date-row">
              <span>
                Published{" "}
                <time dateTime={post.datePublished}>
                  {articleDate(post.datePublished)}
                </time>
              </span>
              {post.dateModified &&
                post.dateModified !== post.datePublished && (
                  <span>
                    Updated{" "}
                    <time dateTime={post.dateModified}>
                      {articleDate(post.dateModified)}
                    </time>
                  </span>
                )}
            </div>
          </div>
        </div>
        {post.readingTime && (
          <span className="article-reading-time">
            {post.readingTime} min read
          </span>
        )}
      </div>
    </header>
  );
}

export function ArticleHero({ post }: { post: BlogPost }) {
  return (
    <figure className="article-cover-figure">
      <div className="article-cover-wrapper">
        <ArticleCardImage
          src={post.coverImage}
          alt={post.coverImageAlt || post.title}
          category={post.category}
          priority
          className="article-cover-image"
          width={post.width || 1200}
          height={post.height || 675}
        />
      </div>
      {(post.imageCaption || post.imageCredit) && (
        <figcaption className="article-image-caption">
          {post.imageCaption}{" "}
          {post.imageSourceUrl ? (
            <a href={post.imageSourceUrl} rel="noreferrer" target="_blank">
              {post.imageCredit || "Image source"}
            </a>
          ) : (
            post.imageCredit
          )}
        </figcaption>
      )}
    </figure>
  );
}

export function ArticleOverview({
  summary,
}: {
  summary: BlogPost["quickAnswer"];
}) {
  if (!summary) return null;
  return (
    <div className="article-overview">
      <section
        className="article-summary"
        aria-labelledby="article-summary-heading"
      >
        <h2 id="article-summary-heading" className="article-kicker">
          Executive summary
        </h2>
        <h3>{summary.question}</h3>
        <p>{summary.answer}</p>
        {!!summary.facts?.length && (
          <dl className="article-facts">
            {summary.facts.map((fact, index) => (
              <div key={index}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        )}
        {summary.note && <p className="article-summary-note">{summary.note}</p>}
      </section>
      {(!!summary.goodFor?.length || !!summary.watchFor?.length) && (
        <div className="article-audience">
          {!!summary.goodFor?.length && (
            <section>
              <h2>Who This Guide Is For</h2>
              <ul>
                {summary.goodFor.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>
          )}
          {!!summary.watchFor?.length && (
            <section className="article-considerations">
              <h2>Important Considerations</h2>
              <ul>
                {summary.watchFor.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

export function ArticleAuthorInformation({ post }: { post: BlogPost }) {
  return (
    <footer className="article-author-footer">
      <h2>About the author</h2>
      <Link href="/author/aniket-thakur/" rel="author">
        {post.author}
      </Link>
      <p>
        Published{" "}
        <time dateTime={post.datePublished}>
          {articleDate(post.datePublished)}
        </time>
        {post.dateModified && post.dateModified !== post.datePublished && (
          <>
            {" "}
            · Updated{" "}
            <time dateTime={post.dateModified}>
              {articleDate(post.dateModified)}
            </time>
          </>
        )}
      </p>
      {!!post.sources.length && (
        <a href="#article-sources">View sources and references</a>
      )}
    </footer>
  );
}
