// app/routes/robots[.]txt.ts
import type { LoaderFunction } from "@vercel/remix";

export const config = { runtime: "edge" };
export const loader: LoaderFunction = async ({ request }) => {
  const origin = new URL(request.url).origin;

  const robotText = `
# https://www.robotstxt.org/robotstxt.html

# Allow all robots complete access by default
User-agent: *
Allow: /

# Block routes marked as "no robots" in config
Disallow: /admin/
Disallow: /dashboard/
Disallow: /banking-applications/
Disallow: /applications/
Disallow: /staging/

# Block query parameters
Disallow: /*?*

# Block specific file types
Disallow: /*.json$
Disallow: /*.xml$

# Define crawling rules for media files
User-agent: Googlebot-Image
Allow: /images/
Allow: /assets/images/
Allow: /*.jpg$
Allow: /*.jpeg$
Allow: /*.gif$
Allow: /*.png$
Allow: /*.webp$

# Location of your sitemap
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
