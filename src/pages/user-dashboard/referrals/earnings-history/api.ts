import { search } from "helpers/https";
import type { LoaderFunction } from "react-router";
import type { EarningsPage } from "types/referrals";
import { cognito, toAuth } from ".server/auth";
import { getEarnings } from ".server/donations";

export interface LoaderData extends EarningsPage {}
export const loader: LoaderFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);
  const { nextKey } = search(request);

  const page = await getEarnings(user.referral_id, nextKey, 8);
  return page;
};
