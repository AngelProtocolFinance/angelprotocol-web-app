import { resp } from "helpers/https";
import type { Route } from "./+types/irs-npos-aggregates";
import { cognito, to_auth } from ".server/auth";
import { nonprofits } from ".server/mongodb/db";

export const loader = async ({
  params: { type },
  request,
}: Route.LoaderArgs) => {
  const { user } = await cognito.retrieve(request);
  if (!user) return to_auth(request);
  if (!user.groups.includes("ap-admin")) throw resp.status(403);
  const c = await nonprofits;

  const states = await c.distinct(type).then((s) => s.filter((x) => x != null));
  return new Response(JSON.stringify(states));
};
