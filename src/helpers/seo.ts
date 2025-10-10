import { APP_NAME, BASE_URL, SEO_IMAGE } from "constants/env";
import type { MetaDescriptor } from "react-router";

interface Meta {
  title?: string;
  description?: string;
  name?: string;
  image?: string;
  url?: string;
}

export const metas = ({
  title = `Fundraising Platform for Nonprofits - ${APP_NAME}`,
  description = `Raise more this quarter and grow funds together. ${APP_NAME} offers free, high-converting donation forms, savings, and fund growth tools—no platform or management fees.`,
  image = SEO_IMAGE,
  url = BASE_URL,
}: Meta): MetaDescriptor[] => [
  { title },
  { name: "description", content: description },
  { property: "og:site_name", content: APP_NAME },
  { property: "og:url", content: url },
  { property: "og:type", content: "website" },
  { property: "og:title", content: title },
  { property: "og:description", content: description },
  { property: "og:image", content: image },
  { name: "twitter:card", content: "summary_large_image" },
  { property: "twitter:domain", content: url.replace(/^https?:\/\//, "") },
  { property: "twitter:url", content: url },
  { name: "twitter:title", content: title },
  { name: "twitter:description", content: description },
  { name: "twitter:image", content: image },
];
