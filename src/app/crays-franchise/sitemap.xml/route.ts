import {
  CRAYS_PRO_INDEXABLE_PATHS,
  getCraysProPublicCanonical,
} from "@/lib/crays-pro-public-metadata";

export const dynamic = "force-static";

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...CRAYS_PRO_INDEXABLE_PATHS.map(
    (path) => `  <url><loc>${getCraysProPublicCanonical(path)}</loc></url>`,
  ),
  "</urlset>",
  "",
].join("\n");

export function GET() {
  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=86400",
    },
  });
}
