import type { BalanceTx } from "@better-giving/balance-tx";
import { tables } from "@better-giving/types/list";
import type { Item, SfwPage } from "types/npo-sfws";
import { QueryCommand, apes } from "./aws/db";
import { env } from "./env";

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

  const metered: (Item & { twr: number })[] = [];

  for (let i = items.length - 1; i >= 0; i--) {
    const prev = metered.at(-1); //last item pushed
    const curr = items[i];

    // this week returnƒ
    const sub = curr.start ? (curr.end - curr.start) / curr.start : 0;
    // running time weighted return
    const twr = ((prev?.twr ?? 0) + 1) * (1 + sub) - 1;

    const { PK, SK, ...c } = curr;
    metered.push({ ...c, twr });
  }

  return {
    all: metered,
    twr: metered.at(-1)?.twr ?? 0,
  } satisfies SfwPage;
};
