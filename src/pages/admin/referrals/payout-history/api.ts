import type { LoaderFunction } from "@vercel/remix";
import type { PayoutsPage } from "types/referrals";
import { cognito, toAuth } from ".server/auth";
import { paidOut } from ".server/referrals";

export interface LoaderData extends PayoutsPage {}

export const loader: LoaderFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);
  const url = new URL(request.url);
  const nextKey = url.searchParams.get("nextKey");

  const page = await paidOut(user.referral_id, nextKey, 8);

  return page;
};
