import type { MetaDescriptor } from "@remix-run/react";
import { APP_NAME, BASE_URL, SEO_IMAGE } from "constants/env";

interface Meta {
  title?: string;
  description?: string;
  name?: string;
  image?: string;
  url?: string;
}

export const metas = ({
  title = `Support an impact organization - ${APP_NAME}`,
  description = `${APP_NAME} provides impact stakeholders with the tools to fundraise, coordinate, and invest capital.`,
  image = SEO_IMAGE,
  url = BASE_URL,
}: Meta): MetaDescriptor[] => [
  { title },
  { name: "description", content: description },
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
