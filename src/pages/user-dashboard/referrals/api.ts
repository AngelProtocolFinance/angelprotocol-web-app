import type { V2RecipientAccount } from "@better-giving/wise";
import { type LoaderFunction, data } from "@vercel/remix";
import type { UserV2 } from "types/auth";
import type { EarningsPage, PendingEarnings, Referred } from "types/referrals";
import { cognito, toAuth } from ".server/auth";
import { getEarnings } from ".server/donations";
import { paidOutLtd, pendingEarnings, referredBy } from ".server/referrals";
import { wise } from ".server/sdks";

export interface LoaderData {
  user: UserV2;
  referreds: Referred[];
  earnings: EarningsPage;
  pendings: PendingEarnings;
  payout?: V2RecipientAccount;
  payout_ltd: number;
  payout_min?: number;
  base_url: string;
  w_form?: string;
}

function payout(id: number) {
  return wise.v2_account(id);
}

export const loader: LoaderFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const [pendings, referreds, earnings, p, pltd] = await Promise.all([
    pendingEarnings(user.referral_id),
    referredBy(user.referral_id),
    getEarnings(user.referral_id, undefined, 4),
    user.pay_id ? payout(+user.pay_id) : undefined,
    paidOutLtd(user.referral_id),
  ]);

  return data({
    user,
    base_url: new URL(request.url).origin,
    referreds,
    earnings,
    pendings,
    payout: p,
    payout_min: user.pay_min ? +user.pay_min : undefined,
    payout_ltd: pltd,
    w_form: user.w_form,
  } satisfies LoaderData);
};
