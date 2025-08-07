import { type IItem, priority_nums } from "@better-giving/banking-applications";
import type { LoaderFunction } from "@vercel/remix";
import type { EarningsPage, PendingEarnings, Referred } from "types/referrals";
import { config } from "./config";
import { npo_banks } from ".server/banking-applications";
import { getEarnings } from ".server/donations";
import { getNpo } from ".server/npo";
import { paidOutLtd, pendingEarnings, referredBy } from ".server/referrals";
import { admin_checks, is_resp } from ".server/utils";

export interface LoaderData {
  id: string;
  referreds: Referred[];
  earnings: EarningsPage;
  pendings: PendingEarnings;
  payout?: IItem;
  payout_ltd: number;
  payout_min?: number;
  base_url: string;
}

export const loader: LoaderFunction = async (x) => {
  const adm = await admin_checks(x);
  if (is_resp(adm)) return adm;

  const endow = await getNpo(adm.id);
  if (!endow) throw `npo:${adm.id} not found`;

  if (!endow.referral_id) throw `@dev: referral_id not found for npo:${adm.id}`;

  const [pendings, referreds, earnings, p, pltd] = await Promise.all([
    pendingEarnings(endow.referral_id),
    referredBy(endow.referral_id),
    getEarnings(endow.referral_id, null, 4),
    npo_banks(endow.id, 1).then(([x]) => {
      if (!x) return;
      // no default payout method
      if (x.thisPriorityNum < priority_nums.approved) return;
      return x;
    }),
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
