import { ap } from "api/api";
import type { LoaderFunction } from "react-router-dom";
import { version as v } from "services/helpers";
export { Component } from "./Home";

export const loader: LoaderFunction = async ({ request }) => {
  const source = new URL(request.url);

  return ap
    .get(`${v(1)}/cloudsearch-nonprofits`, {
      searchParams: {
        query: source.searchParams.get("query") ?? "",
        page: "1",
        claimed: "true,false",
      },
    })
    .json();
};
