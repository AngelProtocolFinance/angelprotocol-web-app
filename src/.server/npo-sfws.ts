import type { BalanceTx } from "@better-giving/balance-tx";
import { tables } from "@better-giving/types/list";
import { addWeeks, format, subWeeks } from "date-fns";
import type { Item, SfwPage } from "types/npo-sfws";
import { QueryCommand, apes } from "./aws/db";
import { env } from "./env";

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
    {} as Record<string, BalanceTx.SFW.DBRecord | undefined>
  );
  const latest = new Date(items[0].date);
  const oldest = subWeeks(latest, limit);

  const filled: Item[] = [];
  let currDate = oldest;
  while (currDate <= latest) {
    const currKey = key(currDate);
    const prev = map[key(subWeeks(currDate, 1))];
    const curr = map[currKey];

    if (!curr) {
      const start = prev ? prev.end : 0;
      const end = 0;
      const item: Item = {
        date: currDate.toISOString(),
        week: currKey,
        endow_id: id,
        environment: env,
        flow: prev ? -prev.end : 0,
        start,
        end,
        filler: true,
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

  const firstNotFilled = filled.findIndex((x) => !x.filler);
  const metered: (Item & { twr: number })[] = [];

  //disregard all filler items in front
  for (let i = Math.max(0, firstNotFilled); i < filled.length; i++) {
    const prev = metered[i - 1];
    const curr = filled[i];

    const endBal = curr.start + curr.flow;
    // this week return
    const sub = endBal ? (curr.end - endBal) / endBal : 0;
    // running time weighted return
    const twr = ((prev?.twr ?? 0) + 1) * (1 + sub) - 1;

    metered.push({ ...curr, twr });

    min = Math.min(min, curr.end);
    max = Math.max(max, curr.end);
  }

  return {
    all: metered,
    min,
    max,
    twr: metered.at(-1)?.twr ?? 0,
  } satisfies SfwPage;
};
