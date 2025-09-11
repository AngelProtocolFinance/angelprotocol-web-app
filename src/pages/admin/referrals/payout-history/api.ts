import { search } from "helpers/https";
import type { LoaderFunction } from "react-router";
import type { PayoutsPage } from "types/referrals";
import { npodb } from ".server/aws/db";
import { paidOut } from ".server/referrals";
import { admin_checks, is_resp } from ".server/utils";

export interface LoaderData extends PayoutsPage {}

export const loader: LoaderFunction = async (args) => {
  const adm = await admin_checks(args);
  if (is_resp(adm)) return adm;

  const x = await npodb.npo(adm.id, ["referral_id"]);
  if (!x) return { status: 404 };

  if (!x.referral_id) throw `@dev: referral_id not found for npo:${adm.id}`;

  const { nextKey } = search(args.request);

  const page = await paidOut(x.referral_id, nextKey, 8);

  return page;
};
