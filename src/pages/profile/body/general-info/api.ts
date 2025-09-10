import type { IMedia } from "@better-giving/endowment";
import type { IProgramDb } from "@better-giving/endowment";
import type { IFundItem } from "@better-giving/fundraiser";
import type { LoaderFunction } from "@vercel/remix";
import { npoId } from "../common/npo-id";
import { npodb } from ".server/aws/db";
import { get_funds_npo_memberof } from ".server/funds";

export interface LoaderData {
  programs: IProgramDb[];
  media: IMedia[];
  funds: IFundItem[];
}

export const loader: LoaderFunction = async ({ params }) => {
  const id = await npoId(params.id);
  if (typeof id !== "number") return id;
  const med_page = await npodb.npo_media(id, { type: "video", featured: true });

  return {
    programs: await npodb.npo_programs(id),
    media: med_page.items,
    funds: await get_funds_npo_memberof(id, {
      npo_profile_featured: true,
    }),
  } satisfies LoaderData;
};
