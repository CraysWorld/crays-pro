import { CRAYS_PRO_PUBLIC_ORIGIN } from "@/lib/crays-pro-public-metadata";

export const dynamic = "force-static";

const robots = [
  "User-agent: *",
  "Allow: /",
  "Disallow: /api/",
  "Disallow: /auth/",
  "Disallow: /account/",
  "Disallow: /dashboard/",
  "Disallow: /investments/",
  "Disallow: /crays-franchise",
  "",
  `Sitemap: ${CRAYS_PRO_PUBLIC_ORIGIN}/sitemap.xml`,
  "",
].join("\n");

export function GET() {
  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=86400",
    },
  });
}
