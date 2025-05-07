import type { LoaderFunction } from "@vercel/remix";
import type { UserV2 } from "types/auth";
import type { Earning, Referred } from "types/referrals";
import { cognito, toAuth } from ".server/auth";
import { getEarnings } from ".server/donations";
import { referredBy } from ".server/referrals";

export interface LoaderData {
  user: UserV2;
  referreds: Referred[];
  earnings: Earning[];
  origin: string;
}

export const loader: LoaderFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const referreds = await referredBy(user.referral_id);
  const earnings = await getEarnings(user.referral_id, null);

  return {
    user,
    origin: new URL(request.url).origin,
    referreds,
    earnings: earnings.items,
  } satisfies LoaderData;
};
