import type { LoaderFunction } from "@vercel/remix";
import type { EndowCardsPage } from "types/aws/ap";
export type { EndowmentCard } from "types/aws/ap";
import { ap, ver } from "api/api";

export const endowsLoader: LoaderFunction = async () => {
  return ap
    .get<EndowCardsPage>(`${ver(1)}/cloudsearch-nonprofits`, {
      searchParams: { page: 1, claimed: true },
    })
    .json()
    .then((data) => data.items);
};
