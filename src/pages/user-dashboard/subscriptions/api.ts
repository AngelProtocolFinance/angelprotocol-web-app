import type { ISub } from "lib/subscriptions";
import type { Route } from "./+types";
import { cognito, to_auth } from ".server/auth";
import { subsdb } from ".server/aws/db";

export interface LoaderData {
  subs: ISub[];
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return to_auth(request, headers);
  const subs = await subsdb.user_subs(user.email);
  return { subs } satisfies LoaderData;
};
