const ORIGIN = "https://aniket.app";
const PERSON_ID = `${ORIGIN}/#person`;
const WEBSITE_ID = `${ORIGIN}/#website`;

const person = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Aniket Thakur",
  url: `${ORIGIN}/author/aniket-thakur/`,
  image: `${ORIGIN}/assets/img/aniket-portrait.png`,
  description:
    "AI engineering, backend systems, product development and financial engineering.",
  sameAs: [
    "https://github.com/07anishu12",
    "https://www.linkedin.com/in/aniket-thakur-a23a9b372",
  ],
};

const website = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${ORIGIN}/`,
  name: "Aniket Thakur",
  description:
    "Personal portfolio, projects, research, learnings, and articles by Aniket Thakur.",
  publisher: { "@id": PERSON_ID },
  inLanguage: "en",
};

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function SiteStructuredData() {
  return (
    <JsonLd
      data={{ "@context": "https://schema.org", "@graph": [person, website] }}
    />
  );
}

export function WebPageStructuredData({
  url,
  name,
  description,
}: {
  url: string;
  name: string;
  description: string;
}) {
  const canonical = `${ORIGIN}${url}`;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name,
        description,
        inLanguage: "en",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
      }}
    />
  );
}

export function BlogPostingStructuredData({
  url,
  title,
  description,
  datePublished,
  dateModified,
  category,
  image,
  imageWidth,
  imageHeight,
  wordCount,
  keywords,
}: {
  url: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
  category: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  wordCount: number;
  keywords: string;
}) {
  const canonical = `${ORIGIN}${url}`;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${canonical}#article`,
        headline: title,
        description,
        url: canonical,
        mainEntityOfPage: { "@id": `${canonical}#webpage` },
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
        image: {
          "@type": "ImageObject",
          url: `${ORIGIN}${image}`,
          width: imageWidth,
          height: imageHeight,
        },
        datePublished,
        dateModified,
        articleSection: category,
        keywords,
        inLanguage: "en",
        wordCount,
      }}
    />
  );
}

export function CreativeWorkStructuredData({
  url,
  name,
  description,
}: {
  url: string;
  name: string;
  description: string;
}) {
  const canonical = `${ORIGIN}${url}`;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "@id": `${canonical}#work`,
        url: canonical,
        name,
        description,
        creator: { "@id": PERSON_ID },
        author: { "@id": PERSON_ID },
        isPartOf: { "@id": WEBSITE_ID },
        inLanguage: "en",
      }}
    />
  );
}

export function BreadcrumbStructuredData({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: `${ORIGIN}${item.url}`,
        })),
      }}
    />
  );
}

export function CollectionPageStructuredData({
  url,
  name,
  description,
  items,
}: {
  url: string;
  name: string;
  description: string;
  items?: { name: string; url: string; description?: string }[];
}) {
  const canonical = `${ORIGIN}${url}`;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": `${canonical}#collection`,
        url: canonical,
        name,
        description,
        inLanguage: "en",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
        ...(items?.length
          ? {
              mainEntity: {
                "@type": "ItemList",
                itemListElement: items.map((item, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  name: item.name,
                  url: `${ORIGIN}${item.url}`,
                  description: item.description,
                })),
              },
            }
          : {}),
      }}
    />
  );
}
