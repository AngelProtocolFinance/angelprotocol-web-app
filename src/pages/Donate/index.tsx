import type { MetaFunction } from "@vercel/remix";
import type { DonateData } from "api/donate-loader";
import { APP_NAME, BASE_URL } from "constants/env";
import { metas } from "helpers/seo";
export { default } from "./Content";
export { loader } from "api/donate-loader";
export { clientLoader } from "api/cache";
export const meta: MetaFunction = ({ data }) => {
  if (!data) return [];
  const { endow } = data as DonateData;
  return metas({
    title: `Donate to ${endow.name} - ${APP_NAME}`,
    description: endow.tagline?.slice(0, 140),
    name: endow.name,
    image: endow.logo,
    url: `${BASE_URL}/donate/${endow.id}`,
  });
};
