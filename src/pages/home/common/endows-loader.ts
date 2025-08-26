import type { LoaderFunction } from "react-router";
import type { EndowCardsPage } from "types/npo";
export type { EndowmentCard } from "types/npo";
import { ap, ver } from "api/api";

export const endowsLoader: LoaderFunction = async () => {
  return ap
    .get<EndowCardsPage>(`${ver(1)}/cloudsearch-nonprofits`, {
      searchParams: { page: 1, claimed: true },
    })
    .json()
    .then((data) => data.items);
};
