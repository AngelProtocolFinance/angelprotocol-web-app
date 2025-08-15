import type { LoaderFunction } from "@vercel/remix";
import type { EarningsPage } from "types/referrals";
import { cognito, toAuth } from ".server/auth";
import { getEarnings } from ".server/donations";

export interface LoaderData extends EarningsPage {}
export const loader: LoaderFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);
  const url = new URL(request.url);
  const nextKey = url.searchParams.get("nextKey");

  const page = await getEarnings(user.referral_id, nextKey, 8);
  return page;
};
