import type { LoaderFunction } from "@vercel/remix";
import { search } from "helpers/https";
import type { PayoutsPage } from "types/referrals";
import { cognito, toAuth } from ".server/auth";
import { paidOut } from ".server/referrals";

export interface LoaderData extends PayoutsPage {}

export const loader: LoaderFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const { nextKey: n } = search(request);
  const page = await paidOut(user.referral_id, n, 8);

  return page;
};
