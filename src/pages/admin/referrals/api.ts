import type { IBapp } from "@better-giving/banking-applications";
import type { IDonationFinal } from "@better-giving/donation";
import type { IPageKeyed } from "@better-giving/types/api";
import type { LoaderFunctionArgs } from "react-router";
import type { PendingEarnings, Referred } from "types/referrals";
import { config } from "./config";
import { bappdb, dondb, npodb } from ".server/aws/db";
import { paidOutLtd, pendingEarnings, referredBy } from ".server/referrals";
import { admin_checks, is_resp } from ".server/utils";

export interface LoaderData {
  id: string;
  referreds: Referred[];
  earnings: IPageKeyed<IDonationFinal>;
  pendings: PendingEarnings;
  payout?: IBapp;
  payout_ltd: number;
  payout_min?: number;
  base_url: string;
}

export const loader = async (x: LoaderFunctionArgs) => {
  const adm = await admin_checks(x);
  if (is_resp(adm)) return adm;

  const endow = await npodb.npo(adm.id);
  if (!endow) throw `npo:${adm.id} not found`;

  if (!endow.referral_id) throw `@dev: referral_id not found for npo:${adm.id}`;

  const [pendings, referreds, earnings, p, pltd] = await Promise.all([
    pendingEarnings(endow.referral_id),
    referredBy(endow.referral_id),
    dondb.referred_by(endow.referral_id, { limit: 4 }),
    bappdb.npo_default_bapp(endow.id),
    paidOutLtd(endow.referral_id),
  ]);

  return {
    id: endow.referral_id,
    base_url: new URL(adm.req.url).origin,
    referreds,
    earnings,
    pendings,
    payout: p,
    payout_min: config.pay_min,
    payout_ltd: pltd,
  } satisfies LoaderData;
};
