import { type V2RecipientAccount, Wise } from "@better-giving/wise";
import type { LoaderFunction } from "@vercel/remix";
import type { UserV2 } from "types/auth";
import type { EarningsPage, PendingEarnings, Referred } from "types/referrals";
import { cognito, toAuth } from ".server/auth";
import { getEarnings } from ".server/donations";
import { env, wiseApiToken } from ".server/env";
import { pendingEarnings, referredBy } from ".server/referrals";

export interface LoaderData {
  user: UserV2;
  referreds: Referred[];
  earnings: EarningsPage;
  pendings: PendingEarnings;
  payout?: V2RecipientAccount;
  origin: string;
}

function payout(id: number) {
  const wise = new Wise({ apiToken: wiseApiToken, sandbox: env === "staging" });
  return wise.v2Account(id);
}

export const loader: LoaderFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const [pendings, referreds, earnings, p] = await Promise.all([
    pendingEarnings(user.referral_id),
    referredBy(user.referral_id),
    getEarnings(user.referral_id, null, 4),
    user.pay_id ? payout(+user.pay_id) : undefined,
  ]);

  return {
    user,
    origin: new URL(request.url).origin,
    referreds,
    earnings,
    pendings,
    payout: p,
  } satisfies LoaderData;
};
