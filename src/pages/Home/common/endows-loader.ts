import { APIs } from "constants/urls";
import { cacheGet } from "helpers/cache-get";
import type { LoaderFunction } from "react-router-dom";
import type { EndowListPaginatedAWSQueryRes, EndowmentCard } from "types/aws";
export type { EndowmentCard } from "types/aws";
import { version as v } from "services/helpers";

export const endowsLoader: LoaderFunction = async () => {
  const url = new URL(APIs.aws);
  url.pathname = `${v(1)}/cloudsearch-nonprofits`;
  url.searchParams.set("page", "1");
  url.searchParams.set("claimed", "true");
  return cacheGet(url)
    .then((res) => res.json())
    .then((data: EndowListPaginatedAWSQueryRes<EndowmentCard[]>) => data.Items);
};
