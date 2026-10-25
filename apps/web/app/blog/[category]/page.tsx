import { notFound } from "next/navigation";
import { listPosts } from "../../../lib/blog";
import { BlogIndex } from "../../../components/BlogIndex";
export function generateStaticParams() {
  return [...new Set(listPosts().map((p) => p.category))].map((category) => ({
    category,
  }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  return {
    title: `${category} articles — Aniket Thakur`,
    alternates: { canonical: `/blog/${category}/` },
  };
}
export default async function Category({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const all = listPosts();
  const posts = all.filter((p) => p.category === category);
  if (!posts.length) notFound();
  return (
    <main className="section">
      <div className="container reading">
        <p className="eyebrow">Writing / {category}</p>
        <h1 className="page-title">Explore {category}.</h1>
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
          categories={[...new Set(all.map((p) => p.category))]}
        />
      </div>
    </main>
  );
}
