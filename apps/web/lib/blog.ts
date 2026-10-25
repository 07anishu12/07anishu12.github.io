import posts from "../generated/posts.json";

export interface BlogPost {
  title: string;
  seoTitle?: string;
  slug: string;
  description: string;
  category: string;
  tags: string[];
  author: string;
  datePublished: string;
  dateModified?: string;
  coverImage: string;
  coverImageAlt: string;
  draft: boolean;
  enquiry?: boolean;
  sources: { title: string; url: string }[];
  imageCaption?: string;
  imageCredit?: string;
  imageSourceUrl?: string;
  width: number;
  height: number;
  socialWidth: number;
  socialHeight: number;
  socialImage?: string;
  socialImageAlt?: string;
  headings: { id: string; text: string; level: string }[];
  quickAnswer?: {
    question: string;
    answer: string;
    facts: { label: string; value: string }[];
    goodFor: string[];
    watchFor: string[];
    note?: string;
  };
  html: string;
  body: string;
  readingTime?: number;
  featured?: boolean;
}

export const categoryDescriptions: Record<string, string> = {
  technology: "AI, software, gadgets, tutorials, comparisons, and explainers.",
  product:
    "Product discovery, experimentation, AI product execution, and product operations.",
  auto: "Cars, bikes, EVs, ownership costs, and automotive technology.",
  finance: "Personal finance, markets, fintech, and financial explainers.",
};

export const listPosts = (): BlogPost[] => posts as BlogPost[];

export const getPost = (category: string, slug: string): BlogPost | undefined =>
  listPosts().find((post) => post.category === category && post.slug === slug);

export const isLeadCapturePost = (post: BlogPost): boolean => {
  if (post.category === "finance")
    return /(bike|scooter|two-wheeler|motorcycle)/.test(post.slug);
  if (post.category === "auto")
    return /(bike|scooter|two-wheeler|motorcycle|commuter|on-road|down-payment|loan|emi|ownership-cost)/.test(
      post.slug,
    );
  return false;
};
