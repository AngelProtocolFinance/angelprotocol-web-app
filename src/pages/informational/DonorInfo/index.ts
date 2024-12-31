import { ap, ver } from "api/api";
import type { LoaderFunction } from "react-router";
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
