import { ProjectList } from "../../components/ProjectList";
export const metadata = {
  title: "Projects — Aniket Thakur",
  alternates: { canonical: "/projects/" },
};
export default function Projects() {
  return (
    <main className="section">
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
          <a href="/research">Explore OIST graph neural network research →</a>
        </p>
      </div>
    </main>
  );
}
