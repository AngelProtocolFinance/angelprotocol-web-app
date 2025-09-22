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

  const npo_bal_days: Record<string, number> = {};
  let total_bal_days = 0;

  for (let i = 0; i < logs.length; i++) {
    const current_log = logs[i];

    // logs is daily so use idx for weights
    // in reverse chronological order
    const days_remaining = i + 1;

    for (const [npo_id, balance] of Object.entries(current_log.balances)) {
      npo_bal_days[npo_id] ||= 0;
      npo_bal_days[npo_id] += balance * days_remaining;
    }
    total_bal_days += current_log.total * days_remaining;
  }

  const shares: Record<string, number> = {};
  for (const npo_id in npo_bal_days) {
    shares[npo_id] = npo_bal_days[npo_id] / total_bal_days;
  }

  return shares;
};
