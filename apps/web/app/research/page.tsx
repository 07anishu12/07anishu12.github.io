export const metadata = {
  title: "Research — Aniket Thakur",
  alternates: { canonical: "/research/" },
};
export default function Research() {
  return (
    <main className="section">
      <article className="container reading">
        <p className="eyebrow">OIST · Ecological modelling</p>
        <h1 className="page-title">
          Learning from <em className="serif">connected ecosystems.</em>
        </h1>
        <p className="intro">
          Graph neural networks offer a way to study relationships and energy
          flow in ecological food webs.
        </p>
        <div className="prose">
          <h2>Research contribution</h2>
          <p>
            My existing research account describes graph modelling and
            scientific-literature pipelines during an AI research internship at
            the Okinawa Institute of Science and Technology.
          </p>
          <h2>Approach</h2>
          <p>
            Ecological relationships become graph structure; node and edge
            representations support learning about the system. Literature
            synthesis helps connect unstructured evidence with structured
            modelling inputs.
          </p>
          <h2>Evidence and boundaries</h2>
          <p>
            This summary is grounded in the existing portfolio research account.
            No private dataset, unpublished implementation, measured accuracy
            gain or publication status is asserted.
          </p>
          <p>
            <a href="/research/graph-neural-networks-ecological-modeling.html">
              Read the preserved research account →
            </a>
          </p>
        </div>
      </article>
    </main>
  );
}
