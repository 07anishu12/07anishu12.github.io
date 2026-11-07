"use client";

import { useEffect, useState } from "react";

export interface HeadingItem {
  id: string;
  text: string;
  level: string;
}

export function ArticleTableOfContents({
  headings,
}: {
  headings: HeadingItem[];
}) {
  const [activeId, setActiveId] = useState("");
  useEffect(() => {
    const targets = headings
      .map((h) => document.getElementById(h.id))
      .filter((h): h is HTMLElement => !!h);
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = targets[0]?.id || "";
      for (const target of targets) {
        if (target.getBoundingClientRect().top <= 160) current = target.id;
        else break;
      }
      setActiveId(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    // Opening the containing FAQ keeps old deep links usable after readers collapse it.
    const revealHash = () => {
      let id: string;
      try {
        id = decodeURIComponent(location.hash.slice(1));
      } catch {
        return;
      }
      const target = document.getElementById(id);
      const details = target?.closest("details");
      if (details && !details.open) {
        details.open = true;
        target?.scrollIntoView();
      }
      onScroll();
    };
    update();
    revealHash();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("hashchange", revealHash);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("hashchange", revealHash);
    };
  }, [headings]);

  const groups: { heading: HeadingItem; children: HeadingItem[] }[] = [];
  for (const heading of headings) {
    if (heading.level === "h2" || (heading.level === "h3" && !groups.length))
      groups.push({ heading, children: [] });
    else if (heading.level === "h3")
      groups[groups.length - 1].children.push(heading);
  }
  if (!groups.length) return null;
  const link = (heading: HeadingItem) => (
    <a
      className="article-toc-link"
      href={`#${heading.id}`}
      aria-current={activeId === heading.id ? "location" : undefined}
      onClick={() => {
        const details = document.getElementById(heading.id)?.closest("details");
        if (details) details.open = true;
      }}
    >
      {heading.text}
    </a>
  );

  return (
    <nav className="article-toc-wrapper" aria-label="On this page">
      <details className="article-toc-details" open>
        <summary className="article-toc-summary">
          On this page{" "}
          <span aria-hidden="true" className="toc-chevron">
            ⌄
          </span>
        </summary>
        <ol className="article-toc-list">
          {groups.map(({ heading, children }) => (
            <li key={heading.id}>
              {link(heading)}
              {!!children.length && (
                <ol>
                  {children.map((child) => (
                    <li key={child.id}>{link(child)}</li>
                  ))}
                </ol>
              )}
            </li>
          ))}
        </ol>
      </details>
    </nav>
  );
}
