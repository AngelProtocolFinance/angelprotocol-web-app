import { APIs } from "constants/urls";
import { cacheGet } from "helpers/cache-get";
import type { LoaderFunction } from "react-router-dom";
import { version as v } from "services/helpers";
export { Component } from "./Home";

export const loader: LoaderFunction = async ({ request }) => {
  const source = new URL(request.url);

  const url = new URL(APIs.aws);
  url.pathname = `${v(1)}/cloudsearch-nonprofits`;
  url.searchParams.set("query", source.searchParams.get("query") ?? "");
  url.searchParams.set("page", "1");
  url.searchParams.set("claimed", "true,false");
  return cacheGet(url).then((res) => res.json());
};
