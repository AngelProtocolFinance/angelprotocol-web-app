import type { BalanceTx } from "@better-giving/balance-tx";
import { tables } from "@better-giving/types/list";
import { addWeeks, format, subWeeks } from "date-fns";
import { QueryCommand, apes } from "./aws/db";

const env = "production";

const key = (date: Date) => `${format(date, "yy")}${format(date, "II")}`;

export const npoSfws = async (id: number, limit = 52 / 4) => {
  const cmd = new QueryCommand({
    TableName: tables["balance-txs"],
    KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk)",
    ExpressionAttributeValues: {
      ":pk": `SFW#${id}` satisfies BalanceTx.SFW.Key["PK"],
      ":sk": env,
    },
    ScanIndexForward: false,
    Limit: limit,
  });
  const items = await apes
    .send(cmd)
    .then<BalanceTx.SFW.DBRecord[]>((res) => (res.Items || []) as any);

  if (items.length === 0) return [];

  const map = items.reduce(
    (acc, item) => {
      acc[item.week] = item;
      return acc;
    },
    {} as Record<string, BalanceTx.SFW.DBRecord>
  );

  const latest = new Date(items[0].date);
  const oldest = subWeeks(latest, limit);

  type Item = Omit<BalanceTx.SFW.DBRecord, "PK" | "SK">;

  const filled: Item[] = [];
  let currDate = oldest;
  while (currDate <= latest) {
    const currKey = key(currDate);
    const prev = map[key(subWeeks(currDate, 1))];
    const curr = map[currKey];

    if (!curr) {
      const start = prev ? prev.end : 0;
      const end = 0;
      const change = end - start;
      const pct_change = start === 0 ? 0 : change / start;
      const item: Item = {
        date: "",
        week: currKey,
        endow_id: id,
        environment: env,
        flow: 0,
        start,
        end,
        change,
        pct_change,
      };
      filled.push(item);
      currDate = addWeeks(currDate, 1);
      continue;
    }
    filled.push((({ PK, SK, ...x }) => x)(curr));
    currDate = addWeeks(currDate, 1);
  }

  // graph boundary
  let min = filled[0].end || 500e12; // 500T global wealth
  let max = filled[0].end;
  const metered: (Item & { twr: number })[] = [];
  for (let i = 1; i < filled.length; i++) {
    const prev = metered.at(i - 1);
    const curr = filled[i];

    // this week return
    const sub =
      (curr.end - (curr.start + curr.flow)) / (curr.start + curr.flow);
    // running time weighted return
    const twr = ((prev?.twr ?? 0) + 1) * (1 + sub) - 1;

    metered.push({ ...curr, twr });

    min = Math.min(min, curr.end);
    max = Math.max(max, curr.end);
  }

  return { all: metered, min, max, twr: metered.at(-1)?.twr ?? 0 };
};
