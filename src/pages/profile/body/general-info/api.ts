import type { IMedia } from "@better-giving/endowment";
import type { IProgramDb } from "@better-giving/endowment";
import type { FundItem } from "@better-giving/fundraiser";
import type { LoaderFunction } from "@vercel/remix";
import { npoId } from "../common/npo-id";
import { featuredMedia } from "../featured-media";
import { npodb } from ".server/aws/db";
import { getFundsNpoMemberOf } from ".server/funds";

export interface LoaderData {
  programs: IProgramDb[];
  media: IMedia[];
  funds: FundItem[];
}

export const loader: LoaderFunction = async ({ params }) => {
  const id = await npoId(params.id);
  if (typeof id !== "number") return id;

  return {
    programs: await npodb.npo_programs(id),
    media: await featuredMedia(id.toString()),
    funds: await getFundsNpoMemberOf(id, {
      npoProfileFeatured: true,
    }),
  } satisfies LoaderData;
};
