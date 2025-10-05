import type { IBapp } from "@better-giving/banking-applications";
import type {
  INpoPayoutsPage,
  INpoSettlementsPage,
} from "@better-giving/payouts";
import { CronExpressionParser } from "cron-parser";
import { endowUpdate } from "../endow-update-action";
import type { Route } from "./+types/dashboard";
import { baldb, bappdb, navdb, podb } from ".server/aws/db";
import { admin_checks, is_resp } from ".server/utils";

export interface DashboardData {
  id: number;
  bal_liq: number;
  bal_lock: number;
  bal_cash: number;
  /** compute in server save client bundle */
  recent_payouts: INpoPayoutsPage;
  recent_settlements: INpoSettlementsPage;
  next_payout: string;
  pm?: IBapp;
}

export const endowUpdateAction = endowUpdate({ redirect: "." });
export const loader = async (x: Route.LoaderArgs) => {
  const adm = await admin_checks(x);
  if (is_resp(adm)) return adm;

  const interval = CronExpressionParser.parse("0 0 */3 * *"); //every 3 days

  const [ltd, bal, recent_payouts, recent_settlements, pm] = await Promise.all([
    navdb.ltd(),
    baldb.npo_balance(adm.id),
    podb.npo_payouts(adm.id.toString(), { status: "pending", limit: 3 }),
    podb.npo_settlements(adm.id.toString(), { limit: 3 }),
    bappdb.npo_default_bapp(adm.id),
  ]);

  return {
    id: adm.id,
    bal_liq: bal.liq,
    bal_lock: bal.lock_units * ltd.price,
    bal_cash: bal.cash,
    recent_payouts,
    recent_settlements,
    next_payout: interval.next().toString(),
    pm,
  } satisfies DashboardData;
};
