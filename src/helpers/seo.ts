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
  title = `Catholic Giving: Faithful online gift processing and fund management | ${APP_NAME}`,
  description = `Increase Catholic giving, grow funds faithfully. ${APP_NAME} offers free, high-converting giving forms, USCCB-aligned savings, and faithful fund growth tools—no platform or management fees.`,
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
