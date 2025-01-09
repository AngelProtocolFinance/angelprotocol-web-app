import type { IMedia, Program } from "@better-giving/endowment";
import type { FundItem } from "@better-giving/fundraiser";
import type { LoaderFunction } from "@remix-run/react";
import { ap, ver } from "api/api";
import { getPrograms } from "api/get/programs";
import { featuredMedia } from "../featured-media";

export interface LoaderData {
  programs: Program[];
  media: IMedia[];
  funds: FundItem[];
}

const getFunds = async (idParam: string | undefined) => {
  return ap
    .get<FundItem[]>(`${ver(8)}/endowments/${idParam}/funds`, {
      searchParams: { npoProfileFeatured: true },
    })
    .json();
};

export const clientLoader: LoaderFunction = async ({ params }) => {
  return {
    programs: await getPrograms(params.id),
    media: await featuredMedia(params.id),
    funds: await getFunds(params.id),
  } satisfies LoaderData;
};
