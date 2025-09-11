import type { IBapp } from "@better-giving/banking-applications";
import type { INpoPayoutsPage } from "@better-giving/payouts";
import { CronExpressionParser } from "cron-parser";
import type { LoaderFunction } from "react-router";
import { endowUpdate } from "../endow-update-action";
import { baldb, bappdb, navdb, podb } from ".server/aws/db";
import { admin_checks, is_resp } from ".server/utils";

export interface DashboardData {
  id: number;
  bal_liq: number;
  bal_lock: number;
  bal_cash: number;
  /** compute in server save client bundle */
  recent_payouts: INpoPayoutsPage;
  next_payout: string;
  pm?: IBapp;
}

export const endowUpdateAction = endowUpdate({ redirect: "." });
export const loader: LoaderFunction = async (x) => {
  const adm = await admin_checks(x);
  if (is_resp(adm)) return adm;

  const interval = CronExpressionParser.parse("0 0 */3 * *"); //every 3 days

  const [ltd, bal, recent_payouts, pm] = await Promise.all([
    navdb.ltd(),
    baldb.npo_balance(adm.id),
    podb.npo_payouts(adm.id.toString(), { status: "pending", limit: 3 }),
    bappdb.npo_default_bapp(adm.id),
  ]);

  return {
    id: adm.id,
    bal_liq: bal.liq,
    bal_lock: bal.lock_units * ltd.price,
    bal_cash: bal.cash,
    recent_payouts,
    next_payout: interval.next().toString(),
    pm,
  } satisfies DashboardData;
};
