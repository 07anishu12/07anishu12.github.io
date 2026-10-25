import Link from "next/link";
import { projects } from "../lib/projects";
export function ProjectList({ limit }: { limit?: number }) {
  return (
    <div className="project-grid">
      {projects.slice(0, limit).map((p, i) => (
        <article className="project" key={p.slug}>
          <div>
            <small>{String(i + 1).padStart(2, "0")} / Engineering study</small>
            <h3>
              <Link href={`/projects/${p.slug}`}>{p.title}</Link>
            </h3>
            <p>{p.problem}</p>
          </div>
          <Link href={`/projects/${p.slug}`}>Explore the system →</Link>
        </article>
      ))}
    </div>
  );
}
