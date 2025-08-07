import { PayoutsDB } from "@better-giving/payouts";
import type { LoaderFunction } from "@vercel/remix";
import { resp } from "helpers/https";
import { apes } from ".server/aws/db";
import { env } from ".server/env";
import { admin_checks, is_resp } from ".server/utils";

export const loader: LoaderFunction = async (x) => {
  const adm = await admin_checks(x);
  if (is_resp(adm)) return adm;
  const db = new PayoutsDB(apes, env);
  const page = await db.npo_payouts(adm.id.toString(), {});
  return resp.json(page);
};
