import type { LoaderFunction } from "@vercel/remix";
import { resp } from "helpers/https";
import { podb } from ".server/aws/db";
import { admin_checks, is_resp } from ".server/utils";

export const loader: LoaderFunction = async (x) => {
  const adm = await admin_checks(x);
  if (is_resp(adm)) return adm;
  const page = await podb.npo_payouts(adm.id.toString(), {});
  return resp.json(page);
};
