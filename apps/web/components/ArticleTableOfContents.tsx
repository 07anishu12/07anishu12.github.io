export interface HeadingItem {
  id: string;
  text: string;
  level: string; // "h2" | "h3"
}

export function ArticleTableOfContents({
  headings,
}: {
  headings: HeadingItem[];
}) {
  if (!headings || headings.length === 0) return null;

  // Filter to h2 and h3
  const tocHeadings = headings.filter(
    (h) => h.level === "h2" || h.level === "h3",
  );

  if (tocHeadings.length === 0) return null;

  return (
    <nav className="article-toc-wrapper" aria-label="Table of contents">
      <details className="article-toc-details">
        <summary className="article-toc-summary">
          <span className="toc-title-group">
            <svg
              className="toc-icon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
            <span className="toc-title">On this page</span>
            <span className="toc-badge">{tocHeadings.length}</span>
          </span>
          <svg
            className="toc-chevron"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </summary>
        <ol className="article-toc-list">
          {tocHeadings.map((h) => (
            <li
              key={h.id}
              className={`article-toc-item article-toc-${h.level}`}
            >
              <a href={`#${h.id}`} className="article-toc-link">
                {h.text}
              </a>
            </li>
          ))}
        </ol>
      </details>
    </nav>
  );
}
