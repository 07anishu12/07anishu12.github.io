import { getSitemapXml } from "../../lib/sitemap";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET(): Promise<Response> {
  const xml = getSitemapXml("blog-categories");
  if (!xml) {
    return new Response("Not found", { status: 404 });
  }
  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
    },
  });
}
