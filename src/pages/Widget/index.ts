import type { MetaFunction } from "@vercel/remix";
import { BASE_URL } from "constants/env";
import { metas } from "helpers/seo";
import type { WidgetData } from "./loader";

export { default } from "./Widget";
export { ErrorBoundary } from "components/error";
export { loader } from "./loader";

export const meta: MetaFunction = ({ data, location: loc }) => {
  if (!data) return [];
  const d = data as WidgetData;
  return metas({
    title: `Donation Form Configuration${d.endow?.id ? ` for nonprofit ${d.endow?.id}` : ""}`,
    description: d.endow?.tagline?.slice(0, 140),
    name: d.endow?.name,
    image: d.endow?.logo,
    url: `${BASE_URL}${loc.pathname}`,
  });
};
