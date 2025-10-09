import type { Route } from "./+types";
import { npo_id } from "./npo-id";
import { cognito } from ".server/auth";
import { baldb, npodb } from ".server/aws/db";
import { get_funds_npo_memberof } from ".server/funds";
import { to_detailed } from ".server/user";

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const id = npo_id(params.id);
  const { user } = await cognito.retrieve(request);
  const npo = await npodb.npo(id);
  if (!npo) throw new Response(null, { status: 404 });
  const med_page = npodb.npo_media(npo.id, {
    type: "video",
    featured: true,
  });

  return {
    npo,
    user: user && to_detailed(user),

    //lazy
    bal: baldb.npo_balance(npo.id),
    funds: get_funds_npo_memberof(npo.id, { npo_profile_featured: true }),
    media: med_page.then((x) => x.items),
    programs: npodb.npo_programs(npo.id),
  };
};
