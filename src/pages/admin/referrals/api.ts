import { type V2RecipientAccount, Wise } from "@better-giving/wise";
import type { LoaderFunction } from "@vercel/remix";
import { plusInt } from "api/schema/endow-id";
import type { UserV2 } from "types/auth";
import type { EarningsPage, PendingEarnings, Referred } from "types/referrals";
import { parse } from "valibot";
import { cognito, toAuth } from ".server/auth";
import { getEarnings } from ".server/donations";
import { env, wiseApiToken } from ".server/env";
import { getNpo } from ".server/npo";
import { paidOutLtd, pendingEarnings, referredBy } from ".server/referrals";

export interface LoaderData {
  user: UserV2;
  referreds: Referred[];
  earnings: EarningsPage;
  pendings: PendingEarnings;
  payout?: V2RecipientAccount;
  payout_ltd: number;
  payout_min?: number;
  origin: string;
}

function payout(id: number) {
  const wise = new Wise({ apiToken: wiseApiToken, sandbox: env === "staging" });
  return wise.v2Account(id);
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const npo_id = parse(plusInt, params.id);
  if (!user.endowments.includes(npo_id)) throw `not authorized`;

  const endow = await getNpo(npo_id);
  if (!endow) throw `npo:${npo_id} not found`;

  if (!endow.referral_id) throw `@dev: referral_id not found for npo:${npo_id}`;

  const [pendings, referreds, earnings, p, pltd] = await Promise.all([
    pendingEarnings(endow.referral_id),
    referredBy(endow.referral_id),
    getEarnings(endow.referral_id, null, 4),
    user.pay_id ? payout(+user.pay_id) : undefined,
    paidOutLtd(endow.referral_id),
  ]);

  return {
    user,
    origin: new URL(request.url).origin,
    referreds,
    earnings,
    pendings,
    payout: p,
    payout_min: user.pay_min ? +user.pay_min : undefined,
    payout_ltd: pltd,
  } satisfies LoaderData;
};
