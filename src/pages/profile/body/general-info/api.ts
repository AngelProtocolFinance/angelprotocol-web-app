import type { IMedia, Program } from "@better-giving/endowment";
import type { FundItem } from "@better-giving/fundraiser";
import { getPrograms } from "api/get/programs";
import type { LoaderFunction } from "react-router";
import { npoId } from "../common/npo-id";
import { featuredMedia } from "../featured-media";
import { getFundsNpoMemberOf } from ".server/funds";

export interface LoaderData {
  programs: Program[];
  media: IMedia[];
  funds: FundItem[];
}

export const loader: LoaderFunction = async ({ params }) => {
  const id = await npoId(params.id);
  if (typeof id !== "number") return id;

  return {
    programs: await getPrograms(id),
    media: await featuredMedia(id.toString()),
    funds: await getFundsNpoMemberOf(id, {
      npoProfileFeatured: true,
    }),
  } satisfies LoaderData;
};
