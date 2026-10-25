export interface ServerAttribution {
  referer: string | null;
  pagePath: string | null;
  articleSlug: string | null;
  category: string | null;
  campaign: string | null;
}

export const deriveAttribution = (
  refererHeader: string | undefined,
): ServerAttribution => {
  if (!refererHeader) {
    return {
      referer: null,
      pagePath: null,
      articleSlug: null,
      category: null,
      campaign: null,
    };
  }

  try {
    const url = new URL(refererHeader);
    const parts = url.pathname.split("/").filter(Boolean);
    const blogIndex = parts.indexOf("blog");
    const category =
      blogIndex >= 0 && parts[blogIndex + 1] ? parts[blogIndex + 1] : null;
    const articleSlug =
      blogIndex >= 0 && parts[blogIndex + 2] ? parts[blogIndex + 2] : null;
    return {
      referer: url.toString(),
      pagePath: url.pathname,
      articleSlug,
      category,
      campaign:
        url.searchParams.get("utm_campaign") ??
        url.searchParams.get("campaign"),
    };
  } catch {
    return {
      referer: null,
      pagePath: null,
      articleSlug: null,
      category: null,
      campaign: null,
    };
  }
};
