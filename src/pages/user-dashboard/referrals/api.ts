import type { LoaderFunction } from "@vercel/remix";
import type { UserV2 } from "types/auth";
import type { Earning, PendingEarnings, Referred } from "types/referrals";
import { cognito, toAuth } from ".server/auth";
import { getEarnings } from ".server/donations";
import { pendingEarnings, referredBy } from ".server/referrals";

interface EarningsPage {
  items: Earning[];
  nextPageKey?: string;
}

export interface LoaderData {
  user: UserV2;
  referreds: Referred[];
  earnings: EarningsPage;
  pendings: PendingEarnings;
  origin: string;
}

export const loader: LoaderFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const [pendings, referreds, earnings] = await Promise.all([
    pendingEarnings(user.referral_id),
    referredBy(user.referral_id),
    getEarnings(user.referral_id, null, 4),
  ]);

  return {
    user,
    origin: new URL(request.url).origin,
    referreds,
    earnings,
    pendings,
  } satisfies LoaderData;
};
