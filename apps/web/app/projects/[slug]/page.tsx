import { notFound } from "next/navigation";
import { projects } from "../../../lib/projects";
import {
  BreadcrumbStructuredData,
  CreativeWorkStructuredData,
  WebPageStructuredData,
} from "../../../components/StructuredData";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.problem,
    alternates: { canonical: `/projects/${slug}/` },
  };
}
export default async function Project({ params }: Props) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  return (
    <main className="section">
      <WebPageStructuredData
        url={`/projects/${slug}/`}
        name={p.title}
        description={p.problem}
      />
      <CreativeWorkStructuredData
        url={`/projects/${slug}/`}
        name={p.title}
        description={p.problem}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "/" },
          { name: "Projects", url: "/projects/" },
          { name: p.title, url: `/projects/${slug}/` },
        ]}
      />
      <article className="container reading">
        <nav aria-label="Breadcrumb" className="prose">
          <ol>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/projects/">Projects</a>
            </li>
            <li aria-current="page">{p.title}</li>
          </ol>
        </nav>
        <p className="eyebrow">Engineering case study</p>
        <h1 className="page-title">{p.title}</h1>
        <p className="intro">{p.problem}</p>
        <div className="prose">
          <h2>Problem</h2>
          <p>{p.problem}</p>
          <h2>Contribution</h2>
          <p>{p.contribution}</p>
          <h2>Architecture and data flow</h2>
          <p className="flow">{p.flow}</p>
          <h2>Verified implementation</h2>
          <p>
            {p.evidence} Verification here means source inspection, not an
            independent execution of the project’s test suite.
          </p>
          <h2>Limitations</h2>
          <p>{p.limitations}</p>
          <h2>Technology</h2>
          <p>{p.stack}</p>
        </div>
        <a
          className="button button-primary"
          href={
            p.repo
              ? `https://github.com/07anishu12/${p.repo}`
              : "/research/graph-neural-networks-ecological-modeling.html"
          }
        >
          {p.repo ? "Inspect the repository ↗" : "Read the research account →"}
        </a>
      </article>
    </main>
  );
}
