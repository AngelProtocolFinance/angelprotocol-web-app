import { BalanceDb } from "@better-giving/balance";
import { BalanceTxsDb, type IBalanceTxsPage } from "@better-giving/balance-txs";
import { NavHistoryDB } from "@better-giving/nav-history";
import type { LoaderFunction } from "@vercel/remix";
import * as v from "valibot";
import { apes } from ".server/aws/db";
import { env } from ".server/env";
import { admin_checks, is_resp } from ".server/utils";

export interface LoaderData extends IBalanceTxsPage {
  bal_lock: number;
}

export const loader: LoaderFunction = async (x) => {
  const { searchParams: s } = new URL(x.request.url);
  const key = v.parse(
    v.nullable(v.pipe(v.string(), v.base64())),
    s.get("next")
  );

  const adm = await admin_checks(x);
  if (is_resp(adm)) return adm;

  const navdb = new NavHistoryDB(apes, env);
  const baldb = new BalanceDb(apes, env);
  const btxdb = new BalanceTxsDb(apes, env);

  const [{ lock_units }, ltd, btxs_page1] = await Promise.all([
    baldb.npo_balance(adm.id),
    navdb.ltd(),
    btxdb.owner_txs(adm.id.toString(), "lock", {
      next: key ?? undefined,
      limit: 10,
    }),
  ]);
  return {
    bal_lock: lock_units * ltd.price,
    ...btxs_page1,
  } satisfies LoaderData;
};
