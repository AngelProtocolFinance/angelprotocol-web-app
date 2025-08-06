import { BalanceDb } from "@better-giving/balance";
import { NavHistoryDB } from "@better-giving/nav-history";
import type { LoaderFunction } from "@vercel/remix";
import { admin_checks, is_resp } from "pages/admin/utils";
import { apes } from ".server/aws/db";
import { env } from ".server/env";

export interface LoaderData {
  id: number;
  bal_lock: number;
  bal_liq: number;
}

export const withdraw_loader: LoaderFunction = async (x) => {
  const adm = await admin_checks(x);
  if (is_resp(adm)) return adm;

  const nav_db = new NavHistoryDB(apes, env);
  const baldb = new BalanceDb(apes, env);

  const [ltd, bal] = await Promise.all([
    nav_db.ltd(),
    baldb.npo_balance(adm.id),
  ]);

  return {
    id: adm.id,
    bal_lock: bal.lock_units * ltd.price,
    bal_liq: bal.liq,
  } satisfies LoaderData;
};
