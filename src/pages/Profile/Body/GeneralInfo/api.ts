import type { IMedia, Program } from "@better-giving/endowment";
import type { FundItem } from "@better-giving/fundraiser";
import type { LoaderFunction } from "@vercel/remix";
import { getPrograms } from "api/get/programs";
import { plusInt } from "api/schema/endow-id";
import { parse } from "valibot";
import { featuredMedia } from "../featured-media";
import { getFundsNpoMemberOf } from ".server/funds";

export interface LoaderData {
  programs: Program[];
  media: IMedia[];
  funds: FundItem[];
}

export const loader: LoaderFunction = async ({ params }) => {
  const id = parse(plusInt, params.id);
  return {
    programs: await getPrograms(params.id),
    media: await featuredMedia(params.id),
    funds: await getFundsNpoMemberOf(id, {
      npoProfileFeatured: true,
    }),
  } satisfies LoaderData;
};
