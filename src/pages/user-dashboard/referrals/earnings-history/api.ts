import { search } from "helpers/https";
import type { EarningsPage } from "types/referrals";
import type { Route } from "./+types";
import { cognito, to_auth } from ".server/auth";
import { getEarnings } from ".server/donations";

export interface LoaderData extends EarningsPage {}
export const loader = async ({ request }: Route.LoaderArgs) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return to_auth(request, headers);
  const { nextKey } = search(request);

  const page = await getEarnings(user.referral_id, nextKey, 8);
  return page satisfies LoaderData;
};
