import type { LoaderFunction } from "@remix-run/react";
import { ap, ver } from "api/api";
import type { EndowCardsPage } from "types/aws";

export { default } from "./DonorInfo";

export const clientLoader: LoaderFunction = async () => {
  return ap
    .get<EndowCardsPage>(`${ver(1)}/cloudsearch-nonprofits`, {
      searchParams: { page: 1, claimed: true },
    })
    .json()
    .then((data) => data.items);
};
