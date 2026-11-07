import type { BlogPost } from "../lib/blog";
import {
  missingFaqItems,
  presentArticleHtml,
} from "../lib/article-presentation";

export function ArticleBody({ post }: { post: BlogPost }) {
  const missing = missingFaqItems(post.html, post.faqItems);
  return (
    <>
      <div
        className="prose article-prose"
        dangerouslySetInnerHTML={{
          __html: presentArticleHtml(post.html, post.faqItems),
        }}
      />
      {!!missing.length && (
        <section className="article-faq-section">
          <h2 className="article-subheading">Frequently asked questions</h2>
          {missing.map((item, index) => (
            <details className="article-faq-item" open key={index}>
              <summary>
                <h3>{item.question}</h3>
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </section>
      )}
    </>
  );
}
