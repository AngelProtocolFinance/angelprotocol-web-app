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
  name = APP_NAME,
  image = SEO_IMAGE,
  url = BASE_URL,
}: Meta): MetaDescriptor[] => [
  { title },
  { property: "title", content: title },
  { property: "description", content: description },
  { property: "og:type", content: "website" },
  { property: "og:title", content: title },
  { property: "og:description", content: description },
  { property: "og:url", content: url },
  { property: "og:image", content: image },
  { property: "twitter:card", content: "summary_large_image" },
  { property: "twitter:creator", content: name },
  { property: "twitter:title", content: title },
  { property: "twitter:description", content: description },
  { property: "twitter:url", content: url },
  { property: "twitter:image", content: image },
];
