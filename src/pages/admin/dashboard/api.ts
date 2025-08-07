import { BalanceDb } from "@better-giving/balance";
import { type IItem, priority_nums } from "@better-giving/banking-applications";
import { NavHistoryDB } from "@better-giving/nav-history";
import { type INpoPayoutsPage, PayoutsDB } from "@better-giving/payouts";
import type { LoaderFunction } from "@vercel/remix";
import { CronExpressionParser } from "cron-parser";
import { endowUpdate } from "../endow-update-action";
import { apes } from ".server/aws/db";
import { npo_banks } from ".server/banking-applications";
import { env } from ".server/env";
import { admin_checks, is_resp } from ".server/utils";

export interface DashboardData {
  id: number;
  bal_liq: number;
  bal_lock: number;
  bal_cash: number;
  /** compute in server save client bundle */
  recent_payouts: INpoPayoutsPage;
  next_payout: string;
  pm?: IItem;
}

export const endowUpdateAction = endowUpdate({ redirect: "." });
export const loader: LoaderFunction = async (x) => {
  const adm = await admin_checks(x);
  if (is_resp(adm)) return adm;

  const payouts_db = new PayoutsDB(apes, env);
  const navdb = new NavHistoryDB(apes, env);
  const baldb = new BalanceDb(apes, env);
  const interval = CronExpressionParser.parse("0 0 */3 * *"); //every 3 days

  const [ltd, bal, recent_payouts, pm] = await Promise.all([
    navdb.ltd(),
    baldb.npo_balance(adm.id),
    payouts_db.npo_payouts(adm.id.toString(), { status: "pending", limit: 3 }),
    npo_banks(adm.id, 1).then(([x]) => {
      if (!x) return;
      // no default payout method
      if (x.thisPriorityNum < priority_nums.approved) return;
      return x;
    }),
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
