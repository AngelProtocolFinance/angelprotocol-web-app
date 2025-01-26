import type { LoaderFunction } from "@vercel/remix";

export const loader: LoaderFunction = async ({ request }) => {
  const origin = new URL(request.url).origin;

  const robotText = `
# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /
Crawl-delay: 10

# Marketing & Analytics Bots
User-agent: AdsBot-Google
User-agent: AdsBot-Google-Mobile
User-agent: Mediapartners-Google
User-agent: LinkedInBot
User-agent: facebookexternalhit
User-agent: Twitterbot
Allow: /

# Security exclusions
Disallow: /admin/
Disallow: /dashboard/
Disallow: /banking-applications/
Disallow: /applications/
Disallow: /staging/

# Query parameters
Disallow: /*?*
Allow: /*?utm_*    # Google Analytics UTM parameters
Allow: /*?fbclid*  # Facebook click identifier
Allow: /*?li_*     # LinkedIn tracking parameters
Allow: /*?twclid*  # Twitter click identifier

# Block specific file types
Disallow: /*.json$
Disallow: /*.xml$

# Media files
User-agent: Googlebot-Image
Allow: /images/
Allow: /assets/images/
Allow: /*.jpg$
Allow: /*.jpeg$
Allow: /*.gif$
Allow: /*.png$
Allow: /*.webp$

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
