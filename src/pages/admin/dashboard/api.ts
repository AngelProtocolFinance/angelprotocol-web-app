import { type IItem, priority_nums } from "@better-giving/banking-applications";
import { NavHistoryDB } from "@better-giving/nav-history/db";
import { type INpoPayoutsPage, PayoutsDB } from "@better-giving/payouts";
import type { LoaderFunction } from "@vercel/remix";
import { plusInt } from "api/schema/endow-id";
import { CronExpressionParser } from "cron-parser";
import * as v from "valibot";
import { endowUpdate } from "../endow-update-action";
import { cognito, toAuth } from ".server/auth";
import { apes } from ".server/aws/db";
import { npo_banks } from ".server/banking-applications";
import { env } from ".server/env";
import { npoBalances } from ".server/npo-balances";

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
export const loader: LoaderFunction = async ({ params, request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const payouts_db = new PayoutsDB(apes, env);
  const navdb = new NavHistoryDB(apes, env);
  const id = v.parse(plusInt, params.id);
  const interval = CronExpressionParser.parse("0 0 */3 * *"); //every 3 days
  // console.log("next payout", interval.next().toString());

  const [ltd, { liq = 0, lock_units = 0, cash = 0 }, recent_payouts, pm] =
    await Promise.all([
      navdb.ltd(),
      npoBalances(id),
      payouts_db.npo_payouts(id.toString(), { status: "pending", limit: 3 }),
      npo_banks(id, 1).then(([x]) => {
        if (!x) return;
        // no default payout method
        if (x.thisPriorityNum < priority_nums.approved) return;
        return x;
      }),
    ]);

  return {
    id,
    bal_liq: liq,
    bal_lock: lock_units * ltd.price,
    bal_cash: cash,
    recent_payouts,
    next_payout: interval.next().toString(),
    pm,
  } satisfies DashboardData;
};
