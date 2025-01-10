import { type MetaFunction, useLoaderData } from "@remix-run/react";
import type { DonateData } from "api/donate-loader";
import { APP_NAME, BASE_URL } from "constants/env";
import { metas } from "helpers/seo";
import Content from "./Content";
export { loader } from "api/donate-loader";

export const meta: MetaFunction = ({ data }) => {
  const { endow } = data as DonateData;
  return metas({
    title: `Donate to ${endow.name} - ${APP_NAME}`,
    description: endow.tagline?.slice(0, 140),
    name: endow.name,
    image: endow.logo,
    url: `${BASE_URL}/donate/${endow.id}`,
  });
};

export default function Donate() {
  const { endow } = useLoaderData() as DonateData;
  return <Content endowment={endow} />;
}
