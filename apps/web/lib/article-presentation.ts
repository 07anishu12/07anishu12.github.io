// Presentation-only transforms of the publisher's trusted, Markdown-generated HTML.
// Preserve every text node, link and heading ID; never infer or rewrite article facts.
const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );

export function presentArticleHtml(
  html: string,
  faqItems: { question: string; answer: string }[] = [],
) {
  const questions = new Set(faqItems.map((item) => escapeHtml(item.question)));
  return html
    .replace(/<pre(?![^>]*\btabindex=)([^>]*)>/g, '<pre$1 tabindex="0">')
    .replace(
      /(<h3\b[^>]*>)([\s\S]*?)(<\/h3>)([\s\S]*?)(?=<h[23]\b|$)/g,
      (original, open, question, close, answer) => {
        if (!questions.has(question)) return original;
        // Open by default: search, printing, no-JS use and existing deep links all work.
        return `<details class="article-faq-item" open><summary>${open}${question}${close}</summary><div class="article-faq-answer">${answer}</div></details>\n`;
      },
    )
    .replace(/<td([^>]*)>([^<]*)<\/td>/g, (original, attributes, value) => {
      // Only unambiguously numeric cells. Preserve currency, units, signs and precision.
      if (
        !/^[\s(]*[−–+\-]?[₹$€£¥]?\s*\d[\d,.\s]*(?:%|bps|[kKmMbB])?\)?\s*$/.test(
          value,
        )
      )
        return original;
      return `<td${attributes} data-numeric="true">${value}</td>`;
    });
}

export function missingFaqItems(
  html: string,
  items: { question: string; answer: string }[] = [],
) {
  return items.filter((item) => !html.includes(escapeHtml(item.question)));
}
