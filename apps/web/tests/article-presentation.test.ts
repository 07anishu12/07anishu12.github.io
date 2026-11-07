import { test } from "node:test";
import assert from "node:assert/strict";
import { load } from "cheerio";
import { listPosts, getPost } from "../lib/blog";
import {
  presentArticleHtml,
  missingFaqItems,
} from "../lib/article-presentation";

test("presentation preserves all published article text, anchors, links and table values", () => {
  for (const entry of listPosts()) {
    const post = getPost(entry.category, entry.slug)!;
    const before = load(post.html);
    const after = load(presentArticleHtml(post.html, post.faqItems));
    const text = (s: string) => s.replace(/\s+/g, " ").trim();
    assert.equal(text(after.text()), text(before.text()), entry.slug);
    for (const [selector, attribute] of [
      ["[id]", "id"],
      ["a", "href"],
    ]) {
      assert.deepEqual(
        after(selector)
          .map((_, el) => after(el).attr(attribute))
          .get(),
        before(selector)
          .map((_, el) => before(el).attr(attribute))
          .get(),
        `${entry.slug}: ${attribute}`,
      );
    }
    assert.deepEqual(
      after("td,th")
        .map((_, el) => after(el).text())
        .get(),
      before("td,th")
        .map((_, el) => before(el).text())
        .get(),
      entry.slug,
    );
    assert.equal(after("h1").length, 0);
  }
});

test("missing optional data leaves body unchanged and emits no FAQ placeholders", () => {
  const html =
    '<h2 id="section-example">Synthetic example</h2><p>Example only.</p>';
  assert.equal(presentArticleHtml(html), html);
  assert.deepEqual(missingFaqItems(html), []);
});

test("FAQ enhancement preserves heading IDs, answer links and no-JS visibility", () => {
  const faq = [
    { question: "Synthetic question?", answer: "Synthetic answer." },
  ];
  const html =
    '<h2 id="faq">FAQ</h2><h3 id="question">Synthetic question?</h3><p>Synthetic <a href="#faq">answer</a>.</p><h2 id="next">Next</h2>';
  const $ = load(presentArticleHtml(html, faq));
  assert.equal($("details[open] summary h3#question").length, 1);
  assert.equal($("details a").attr("href"), "#faq");
  assert.equal($("details #next").length, 0);
  assert.deepEqual(missingFaqItems(html, faq), []);
  assert.deepEqual(missingFaqItems("", faq), faq);
});

test("numeric alignment preserves signs, currency, precision and percentages", () => {
  const values = ["−₹1,234.50", "(12.25%)", "$0.00", "15 bps"];
  const html = `<table><tbody><tr>${values.map((value) => `<td>${value}</td>`).join("")}<td>Revenue assumptions</td></tr></tbody></table>`;
  const $ = load(presentArticleHtml(html));
  assert.deepEqual(
    $("[data-numeric]")
      .map((_, el) => $(el).text())
      .get(),
    values,
  );
});
