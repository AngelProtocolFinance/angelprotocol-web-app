import type { LoaderFunction } from "@vercel/remix";

interface SitemapUrl {
  url: string;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority: number;
}

// Static URLs based on your route configuration
const staticUrls: SitemapUrl[] = [
  { url: "/", changeFrequency: "daily", priority: 1.0 },
  { url: "/nonprofit", changeFrequency: "weekly", priority: 0.8 },
  { url: "/donor", changeFrequency: "weekly", priority: 0.8 },
  { url: "/about", changeFrequency: "monthly", priority: 0.7 },
  { url: "/blog", changeFrequency: "daily", priority: 0.8 },
  { url: "/marketplace", changeFrequency: "daily", priority: 0.9 },
  { url: "/funds", changeFrequency: "daily", priority: 0.9 },
  { url: "/wp-plugin", changeFrequency: "monthly", priority: 0.6 },
  { url: "/privacy-policy", changeFrequency: "monthly", priority: 0.4 },
  { url: "/terms-of-use", changeFrequency: "monthly", priority: 0.4 },
  { url: "/terms-of-use-npo", changeFrequency: "monthly", priority: 0.4 },
];

export const config = { runtime: "edge" };
export const loader: LoaderFunction = async ({ request }) => {
  const origin = new URL(request.url).origin;

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls
  .map(
    (url) => `  <url>
    <loc>${origin}${url.url}</loc>
    <changefreq>${url.changeFrequency}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(sitemap.trim(), {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
