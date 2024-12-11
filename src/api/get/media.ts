import type { MediaPage, MediaQueryParamsObj } from "@better-giving/endowment";
import { ap, toSearch, ver } from "../api";

export const getMedia = async (
  endowId: number,
  params: MediaQueryParamsObj
) => {
  return ap
    .get<MediaPage>(`${ver(1)}/endowments/${endowId}/media`, {
      searchParams: toSearch(params),
    })
    .json();
};
