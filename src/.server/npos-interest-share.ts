import type { IBalLog } from "@better-giving/liquid";
import { QueryCommand, liqdb } from "./aws/db";

interface AccrualPeriod {
  start: string;
  end: string;
}

export const npo_interest_shares = async (
  period: AccrualPeriod
): Promise<Record<string, number>> => {
  const q = liqdb.bal_logs_qinput({
    date_start: period.start,
    date_end: period.end,
  });
  const logs = await liqdb.exhaust(QueryCommand, q, (x) => x as IBalLog);

  const totals: Record<string, number> = {};
  let total = 0;

  for (const log of logs) {
    for (const [k, v] of Object.entries(log.balances)) {
      totals[k] ||= 0;
      totals[k] += v;
    }
    total += log.total;
  }

  const shares: Record<string, number> = {};
  for (const npo in totals) {
    const share = totals[npo] / total;
    shares[npo] = share;
  }

  return shares;
};
