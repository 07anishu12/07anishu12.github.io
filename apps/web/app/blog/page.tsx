import { listPosts } from "../../lib/blog";
import { BlogIndex } from "../../components/BlogIndex";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import {
  BreadcrumbStructuredData,
  CollectionPageStructuredData,
} from "../../components/StructuredData";

export const metadata = {
  title: "Writing & Technical Library — Aniket Thakur",
  description:
    "326 in-depth articles by Aniket Thakur covering AI engineering, quantitative finance, systems architecture, product discovery, and automotive technology.",
  alternates: { canonical: "/blog/" },
  openGraph: {
    title: "Writing & Technical Library — Aniket Thakur",
    description:
      "326 technical guides, financial models, and engineering deep dives by Aniket Thakur.",
    url: "/blog/",
    images: ["/assets/img/aniket-portrait.png"],
  },
};

export default function BlogPage() {
  const posts = listPosts();
  const categories = [...new Set(posts.map((p) => p.category))];

  const structuredItems = posts.slice(0, 30).map((p) => ({
    name: p.title,
    url: `/blog/${p.category}/${p.slug}/`,
    description: p.description,
  }));

  return (
    <main className="section blog-page">
      <CollectionPageStructuredData
        url="/blog/"
        name={metadata.title}
        description={metadata.description}
        items={structuredItems}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "/" },
          { name: "Writing", url: "/blog/" },
        ]}
      />

      <div className="container">
        {/* Breadcrumb nav */}
        <Breadcrumbs
          items={[
            { name: "Home", url: "/" },
            { name: "Writing" },
          ]}
        />

        {/* Hero Section */}
        <header className="blog-hero">
          <p className="eyebrow">The Technical Library · 326 Publications</p>
          <h1 className="page-title">
            Ideas, tested &amp; <em className="serif">explained with care.</em>
          </h1>
          <p className="intro">
            An extensive library of technical guides, valuation models, AI
            implementation patterns, and automotive economics. Written for
            engineers, analysts, and founders who care about verifiable
            mechanics over surface-level commentary.
          </p>

          <div className="blog-library-stats">
            <div className="stat-pill">
              <strong>326</strong> Published Guides
            </div>
            <div className="stat-pill">
              <strong>4</strong> Core Pillars (Technology, Finance, Auto,
              Product)
            </div>
            <div className="stat-pill">
              <strong>100%</strong> Original Analysis &amp; Implementations
            </div>
          </div>
        </header>

        {/* Interactive Library & Grid */}
        <BlogIndex
          posts={posts.map(
            ({
              title,
              description,
              category,
              slug,
              datePublished,
              coverImage,
              coverImageAlt,
              readingTime,
              featured,
            }) => ({
              title,
              description,
              category,
              slug,
              datePublished,
              coverImage,
              coverImageAlt,
              readingTime,
              featured,
            }),
          )}
          categories={categories}
        />
      </div>
    </main>
  );
}
