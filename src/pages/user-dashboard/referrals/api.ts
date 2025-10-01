import type { IDonationFinal } from "@better-giving/donation";
import type { IPageKeyed } from "@better-giving/types/api";
import type { V2RecipientAccount } from "@better-giving/wise";
import type { LoaderFunctionArgs } from "react-router";
import type { UserV2 } from "types/auth";
import type { PendingEarnings, Referred } from "types/referrals";
import { cognito, to_auth } from ".server/auth";
import { dondb } from ".server/aws/db";
import { paidOutLtd, pendingEarnings, referredBy } from ".server/referrals";
import { wise } from ".server/sdks";

export interface LoaderData {
  user: UserV2;
  referreds: Referred[];
  earnings: IPageKeyed<IDonationFinal>;
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

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return to_auth(request, headers);

  const [pendings, referreds, earnings, p, pltd] = await Promise.all([
    pendingEarnings(user.referral_id),
    referredBy(user.referral_id),
    dondb.referred_by(user.referral_id, { limit: 4 }),
    user.pay_id ? payout(+user.pay_id) : undefined,
    paidOutLtd(user.referral_id),
  ]);

  return {
    user,
    base_url: new URL(request.url).origin,
    referreds,
    earnings,
    pendings,
    payout: p,
    payout_min: user.pay_min ? +user.pay_min : undefined,
    payout_ltd: pltd,
    w_form: user.w_form,
  } satisfies LoaderData;
};
