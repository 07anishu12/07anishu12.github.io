import Link from "next/link";
export default function NotFound() {
  return (
    <main className="section">
      <div className="container">
        <p className="eyebrow">404</p>
        <h1 className="page-title">This page isn’t here.</h1>
        <p>Try the writing library or return home.</p>
        <Link className="button button-primary" href="/blog">
          Browse articles
        </Link>
      </div>
    </main>
  );
}
