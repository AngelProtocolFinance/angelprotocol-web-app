import type { MetaFunction } from "@vercel/remix";
import type { DonateData } from "api/donate-loader";
import { BASE_URL } from "constants/env";
import { metas } from "helpers/seo";

export { default } from "./donate-widget";
export { ErrorBoundary } from "components/error";
export { loader } from "api/donate-loader";

export const meta: MetaFunction = ({ data, location: l }) => {
  if (!data) return [];
  const { endow } = data as DonateData;
  return metas({
    title: `Donate to ${endow.name}`,
    description: endow.tagline?.slice(0, 140),
    name: endow.name,
    image: endow.image || endow.logo,
    url: `${BASE_URL}/${l.pathname}`,
  });
};
