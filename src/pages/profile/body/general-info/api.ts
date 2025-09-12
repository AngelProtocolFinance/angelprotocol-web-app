import type { IMedia } from "@better-giving/endowment";
import type { IProgramDb } from "@better-giving/endowment";
import type { IFundItem } from "@better-giving/fundraiser";
import { npoId } from "../common/npo-id";
import type { Route } from "./+types";
import { npodb } from ".server/aws/db";
import { get_funds_npo_memberof } from ".server/funds";

export interface LoaderData {
  programs: IProgramDb[];
  media: IMedia[];
  funds: IFundItem[];
}

export const loader = async ({ params }: Route.LoaderArgs) => {
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
