import { notFound } from "next/navigation";
import { listPosts } from "../../../lib/blog";
import { BlogIndex } from "../../../components/BlogIndex";
import {
  BreadcrumbStructuredData,
  WebPageStructuredData,
} from "../../../components/StructuredData";
import { categoryDescriptions } from "../../../lib/blog";
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
  const name = `${category.charAt(0).toUpperCase()}${category.slice(1)}`;
  return {
    title: `${name} articles — Aniket Thakur`,
    description:
      categoryDescriptions[category] ||
      `Published ${category} articles by Aniket Thakur.`,
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
  const name = `${category.charAt(0).toUpperCase()}${category.slice(1)}`;
  const description =
    categoryDescriptions[category] ||
    `Published ${category} articles by Aniket Thakur.`;
  return (
    <main className="section">
      <WebPageStructuredData
        url={`/blog/${category}/`}
        name={`${name} articles — Aniket Thakur`}
        description={description}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "/" },
          { name: "Writing", url: "/blog/" },
          { name: name, url: `/blog/${category}/` },
        ]}
      />
      <div className="container reading">
        <nav aria-label="Breadcrumb" className="prose">
          <ol>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/blog/">Writing</a>
            </li>
            <li aria-current="page">{name}</li>
          </ol>
        </nav>
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
