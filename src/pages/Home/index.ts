import { ap, ver } from "api/api";
import type { LoaderFunction } from "react-router";
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
