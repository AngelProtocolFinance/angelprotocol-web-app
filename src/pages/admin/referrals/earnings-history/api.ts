import { search } from "helpers/https";
import type { LoaderFunction } from "react-router";
import type { EarningsPage } from "types/referrals";
import { npodb } from ".server/aws/db";
import { getEarnings } from ".server/donations";
import { admin_checks, is_resp } from ".server/utils";

export interface LoaderData extends EarningsPage {}

export const loader: LoaderFunction = async (args) => {
  const { nextKey } = search(args.request);
  const adm = await admin_checks(args);
  if (is_resp(adm)) return adm;

  const x = await npodb.npo(adm.id, ["referral_id"]);
  if (!x) return { status: 404 };

  if (!x.referral_id) throw `@dev: referral_id not found for npo:${adm.id}`;

  const page = await getEarnings(x.referral_id, nextKey, 8);

  return page;
};
