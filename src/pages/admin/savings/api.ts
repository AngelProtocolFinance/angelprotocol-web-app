import { BalanceDb } from "@better-giving/balance";
import type { LoaderFunction } from "@vercel/remix";
import { apes } from ".server/aws/db";
import { env } from ".server/env";
import { admin_checks, is_resp } from ".server/utils";

export interface LoaderData {
  id: number;
  bal_liq: number;
}

export const loader: LoaderFunction = async (x) => {
  const adm = await admin_checks(x);
  if (is_resp(adm)) return adm;
  const db = new BalanceDb(apes, env);

  const [{ liq }] = await Promise.all([db.npo_balance(adm.id)]);

  return {
    id: adm.id,
    bal_liq: liq,
  } satisfies LoaderData;
};
