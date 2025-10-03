import type { Route } from "./+types";
import { npo_id } from "./npo-id";
import { npodb } from ".server/aws/db";

export const loader = async ({ params }: Route.LoaderArgs) => {
  const id = npo_id(params.id);
  const npo = await npodb.npo(id);
  if (!npo) throw new Response(null, { status: 404 });

  return npo;
};
