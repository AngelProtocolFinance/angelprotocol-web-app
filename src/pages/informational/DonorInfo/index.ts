import { APIs } from "constants/urls";
import type { LoaderFunction } from "react-router-dom";
import { version as v } from "services/helpers";
import type { EndowCardsPage } from "types/aws";

export { DonorInfo as Component } from "./DonorInfo";

export const loader: LoaderFunction = async () => {
  const url = new URL(APIs.aws);
  url.pathname = `${v(1)}/cloudsearch-nonprofits`;
  url.searchParams.set("page", "1");
  url.searchParams.set("claimed", "true");
  return fetch(url)
    .then((res) => res.json())
    .then((data: EndowCardsPage) => data.items);
};
