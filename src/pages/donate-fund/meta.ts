import type { MetaFunction } from "@vercel/remix";
import { APP_NAME } from "constants/env";
import { metas } from "helpers/seo";
import type { LoaderData } from "./api";

export const meta: MetaFunction = ({ data }) => {
  const d = data as LoaderData;
  return metas({
    title: `Donate to ${d.fund.name} - ${APP_NAME}`,
  });
};
