import { Background } from "../../components/Background";
import { WebPageStructuredData } from "../../components/StructuredData";
export const metadata = {
  title: "About — Aniket Thakur",
  description:
    "About Aniket Thakur: AI engineering, backend systems, product delivery, financial workflows and ecological graph research.",
  alternates: { canonical: "/about/" },
};
const skills = {
  "Frontend Engineering": [
    "React",
    "Next.js",
    "TypeScript",
    "Responsive interfaces",
  ],
  "Backend Engineering": [
    "Node.js",
    "Hono",
    "FastAPI",
    "PostgreSQL",
    "API contracts",
  ],
  "AI & Data Engineering": [
    "Python",
    "Graph neural networks",
    "PyTorch",
    "Structured model outputs",
  ],
  "Finance & Analytics": [
    "DCF valuation",
    "Excel financial modelling",
    "SQL analytics",
    "Financial engineering",
  ],
  "Product & Research": [
    "Product delivery",
    "Stakeholder management",
    "Scientific literature",
    "Experiment design",
  ],
};
export default function About() {
  return (
    <main>
      <WebPageStructuredData
        url="/about/"
        name={metadata.title}
        description={metadata.description}
      />
      <section className="section">
        <div className="container">
          <p className="eyebrow">About Aniket</p>
          <h1 className="page-title">
            Across models, products <em className="serif">and decisions.</em>
          </h1>
          <p className="intro">
            I work where AI engineering meets practical product delivery. My
            background connects financial workflows, data analytics and
            ecological graph research.
          </p>
          <h2 className="section-title">What I bring to a team</h2>
          <div className="skills-grid">
            {Object.entries(skills).map(([title, items]) => (
              <section key={title}>
                <h3>{title}</h3>
                <p>{items.join(" · ")}</p>
              </section>
            ))}
          </div>
        </div>
      </section>
      <Background />
    </main>
  );
}
