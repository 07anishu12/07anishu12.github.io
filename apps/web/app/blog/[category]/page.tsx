export const revalidate = 600;
import { notFound } from "next/navigation";
import {
  listPosts,
  getPaginatedPosts,
  categoryDescriptions,
} from "../../../lib/blog";
import { BlogIndex } from "../../../components/BlogIndex";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import {
  BreadcrumbStructuredData,
  CollectionPageStructuredData,
} from "../../../components/StructuredData";

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
    title: `${name} Articles & Guides — Aniket Thakur`,
    description:
      categoryDescriptions[category] ||
      `Published ${category} articles, implementation guides, and analyses by Aniket Thakur.`,
    alternates: { canonical: `/blog/${category}/` },
    openGraph: {
      title: `${name} Articles & Guides — Aniket Thakur`,
      description:
        categoryDescriptions[category] ||
        `Published ${category} articles, implementation guides, and analyses by Aniket Thakur.`,
      url: `/blog/${category}/`,
      images: ["/assets/img/aniket-portrait.png"],
    },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams?: Promise<{ page?: string; q?: string }>;
}) {
  const { category } = await params;
  const resolvedParams = searchParams ? await searchParams : {};
  const page = Math.max(1, parseInt(resolvedParams.page || "1", 10) || 1);
  const query = resolvedParams.q || "";

  const {
    posts: categoryPosts,
    total,
    totalPages,
    pageSize,
    categories,
    categoryCounts,
  } = getPaginatedPosts({
    category,
    page,
    pageSize: 12,
    query,
  });

  if (!total && !query) notFound();

  const name = `${category.charAt(0).toUpperCase()}${category.slice(1)}`;
  const description =
    categoryDescriptions[category] ||
    `Published ${category} articles and deep dives by Aniket Thakur.`;

  const structuredItems = categoryPosts.slice(0, 30).map((p) => ({
    name: p.title,
    url: `/blog/${p.category}/${p.slug}/`,
    description: p.description,
  }));

  return (
    <main className="section blog-category-page">
      <CollectionPageStructuredData
        url={`/blog/${category}/`}
        name={`${name} Articles — Aniket Thakur`}
        description={description}
        items={structuredItems}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "/" },
          { name: "Writing", url: "/blog/" },
          { name, url: `/blog/${category}/` },
        ]}
      />

      <div className="container">
        {/* Breadcrumb nav */}
        <Breadcrumbs
          items={[
            { name: "Home", url: "/" },
            { name: "Writing", url: "/blog/" },
            { name },
          ]}
        />

        {/* Hero Section */}
        <header className="blog-hero">
          <p className="eyebrow">Writing / {name} Pillar</p>
          <h1 className="page-title">
            Explore <em className="serif">{name}.</em>
          </h1>
          <p className="intro">{description}</p>

          <div className="blog-library-stats">
            <div className="stat-pill">
              <strong>{total}</strong> {name} Articles
            </div>
            <div className="stat-pill">
              Part of the <strong>{categoryCounts.all || 562}-article</strong>{" "}
              Technical Library
            </div>
          </div>
        </header>

        {/* Interactive Library Filtered to Category */}
        <BlogIndex
          initialPosts={categoryPosts}
          totalPosts={total}
          currentPage={page}
          totalPages={totalPages}
          pageSize={pageSize}
          categories={categories}
          categoryCounts={categoryCounts}
          activeCategory={category}
          basePath={`/blog/${category}/`}
        />
      </div>
    </main>
  );
}
