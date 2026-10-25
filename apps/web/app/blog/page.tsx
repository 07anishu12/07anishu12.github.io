import { listPosts } from "../../lib/blog";
import { BlogIndex } from "../../components/BlogIndex";
import { WebPageStructuredData } from "../../components/StructuredData";
export const metadata = {
  title: "Writing — Aniket Thakur",
  description:
    "Articles by Aniket Thakur on AI, technology, product management, automotive topics and finance.",
  alternates: { canonical: "/blog/" },
};
export default function Blog() {
  const posts = listPosts();
  return (
    <main className="section">
      <WebPageStructuredData
        url="/blog/"
        name={metadata.title}
        description={metadata.description}
      />
      <div className="container reading">
        <p className="eyebrow">The writing library</p>
        <h1 className="page-title">
          Ideas, explained <em className="serif">with care.</em>
        </h1>
        <BlogIndex
          posts={posts.map(
            ({ title, description, category, slug, datePublished }) => ({
              title,
              description,
              category,
              slug,
              datePublished,
            }),
          )}
          categories={[...new Set(posts.map((p) => p.category))]}
        />
      </div>
    </main>
  );
}
