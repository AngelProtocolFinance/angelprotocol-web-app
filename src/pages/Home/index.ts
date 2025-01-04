import type { LoaderFunction } from "@remix-run/react";
import { ap, ver } from "api/api";
export { default } from "./Home";

export const clientLoader: LoaderFunction = async ({ request }) => {
  const source = new URL(request.url);

  return ap
    .get(`${ver(1)}/cloudsearch-nonprofits`, {
      searchParams: {
        query: source.searchParams.get("query") ?? "",
        page: "1",
        claimed: "true,false",
      },
    })
    .json();
};
