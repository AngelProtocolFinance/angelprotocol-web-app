import type { IMedia, INpo } from "@better-giving/endowment";
import type { IProgramDb } from "@better-giving/endowment";
import type { IFundItem } from "@better-giving/fundraiser";
import { npo_id } from "../../npo-id";
import type { Route } from "./+types";
import { baldb, npodb } from ".server/aws/db";
import { get_funds_npo_memberof } from ".server/funds";

export interface LoaderData {
  npo: INpo;
  programs: IProgramDb[];
  media: IMedia[];
  funds: IFundItem[];
  bal_ltd: number;
}

export const loader = async ({ params }: Route.LoaderArgs) => {
  const id = npo_id(params.id);
  const npo = await npodb.npo(id);
  if (!npo) return new Response(null, { status: 404 });
  const med_page = npodb.npo_media(npo.id, {
    type: "video",
    featured: true,
  });

  return {
    npo,
    programs: await npodb.npo_programs(npo.id),
    media: await med_page.then((x) => x.items),
    funds: await get_funds_npo_memberof(npo.id, {
      npo_profile_featured: true,
    }),
    bal_ltd: await baldb.npo_balance(npo.id).then((x) => x.ltd),
  } satisfies LoaderData;
};
