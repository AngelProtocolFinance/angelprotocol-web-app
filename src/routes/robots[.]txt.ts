import type { LoaderFunction } from "@vercel/remix";

export const loader: LoaderFunction = async ({ request }) => {
  const origin = new URL(request.url).origin;

  const robotText = `
# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Security exclusions
Disallow: /admin/
Disallow: /dashboard/
Disallow: /banking-applications/
Disallow: /applications/
Disallow: /api/

Sitemap: ${origin}/sitemap.xml
`;

  return new Response(robotText.trim(), {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400",
    },
  });
};
