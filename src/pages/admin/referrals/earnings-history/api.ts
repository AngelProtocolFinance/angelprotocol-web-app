import type { LoaderFunction } from "@vercel/remix";
import { admin_checks, is_resp } from "pages/admin/utils";
import type { EarningsPage } from "types/referrals";
import { getEarnings } from ".server/donations";
import { getNpo } from ".server/npo";

export interface LoaderData extends EarningsPage {}

export const loader: LoaderFunction = async (args) => {
  const adm = await admin_checks(args);
  if (is_resp(adm)) return adm;

  const x = await getNpo(adm.id, ["referral_id"]);
  if (!x) return { status: 404 };

  if (!x.referral_id) throw `@dev: referral_id not found for npo:${adm.id}`;

  const url = new URL(adm.req.url);
  const nextKey = url.searchParams.get("nextKey");

  const page = await getEarnings(x.referral_id, nextKey, 8);

  return page;
};
