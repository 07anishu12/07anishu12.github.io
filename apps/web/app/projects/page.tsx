import { ProjectList } from "../../components/ProjectList";
import { WebPageStructuredData } from "../../components/StructuredData";
export const metadata = {
  title: "Projects — Aniket Thakur",
  description:
    "Engineering case studies covering financial tools, operational workflows, AI products and research systems by Aniket Thakur.",
  alternates: { canonical: "/projects/" },
};
export default function Projects() {
  return (
    <main className="section">
      <WebPageStructuredData
        url="/projects/"
        name={metadata.title}
        description={metadata.description}
      />
      <div className="container">
        <p className="eyebrow">Selected engineering</p>
        <h1 className="page-title">
          Systems with a <em className="serif">clear purpose.</em>
        </h1>
        <p className="intro">
          Financial models, operational workflows and AI products. Each study
          separates implemented capabilities from external dependencies.
        </p>
        <ProjectList />
        <p>
          <a href="/research/">Explore OIST graph neural network research →</a>
        </p>
      </div>
    </main>
  );
}
