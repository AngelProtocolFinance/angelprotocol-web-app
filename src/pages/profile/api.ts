import type { Route } from "./+types";
import { npo_id } from "./npo-id";
import { cognito } from ".server/auth";
import { baldb, npodb } from ".server/aws/db";
import { to_detailed } from ".server/user";

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const id = npo_id(params.id);
  const { user } = await cognito.retrieve(request);
  const npo = await npodb.npo(id);
  if (!npo) throw new Response(null, { status: 404 });

  const bal = await baldb.npo_balance(npo.id);
  return { npo, bal, user: user && to_detailed(user) };
};
