import type { IDonationFinal } from "@better-giving/donation";
import type { IPageKeyed } from "@better-giving/types/api";
import { resp, search } from "helpers/https";
import type { Route } from "./+types";
import { dondb, npodb } from ".server/aws/db";
import { admin_checks, is_resp } from ".server/utils";

export interface LoaderData extends IPageKeyed<IDonationFinal> {}

export const loader = async (args: Route.LoaderArgs) => {
  const { nextKey } = search(args.request);
  const adm = await admin_checks(args);
  if (is_resp(adm)) return adm;

  const x = await npodb.npo(adm.id, ["referral_id"]);
  if (!x) return resp.status(404);

  if (!x.referral_id) throw `@dev: referral_id not found for npo:${adm.id}`;
  return dondb.referred_by(x.referral_id, { limit: 4, next: nextKey });
};
