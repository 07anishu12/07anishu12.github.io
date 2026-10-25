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
}

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
