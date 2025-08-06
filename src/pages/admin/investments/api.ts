import { BalanceDb } from "@better-giving/balance";
import { NavHistoryDB } from "@better-giving/nav-history";
import type { LoaderFunction } from "@vercel/remix";
import { admin_checks, is_resp } from "../utils";
import { apes } from ".server/aws/db";
import { env } from ".server/env";

export interface LoaderData {
  id: number;
  bal_lock: number;
}

export const loader: LoaderFunction = async (x) => {
  const adm = await admin_checks(x);
  if (is_resp(adm)) return adm;

  const navdb = new NavHistoryDB(apes, env);
  const baldb = new BalanceDb(apes, env);

  const [{ lock_units }, ltd] = await Promise.all([
    baldb.npo_balance(adm.id),
    navdb.ltd(),
  ]);
  return {
    id: adm.id,
    bal_lock: lock_units * ltd.price,
  } satisfies LoaderData;
};
