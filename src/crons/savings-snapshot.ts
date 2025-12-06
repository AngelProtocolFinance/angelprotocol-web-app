import {
  PutCommand,
  ScanCommand,
  type ScanCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { BalanceDb, type IBalance } from "@better-giving/balance";
import { type IBalLog, LiquidDb } from "lib/liquid";
import type { ActionFunction } from "react-router";
import { liqdb as db } from ".server/aws/db";
import { env } from ".server/env";
import { is_resp, qstash_body } from ".server/utils";

// runs daily
export const action: ActionFunction = async ({
  request,
}): Promise<Response> => {
  const b = await qstash_body(request);
  if (is_resp(b)) return b;

  const now = new Date();

  const scan: ScanCommandInput = {
    TableName: BalanceDb.table,
    FilterExpression: "#env = :env",
    ExpressionAttributeNames: {
      "#env": "network",
      "#liq": "liq",
      "#id": "id",
    },
    ExpressionAttributeValues: { ":env": env },
    ProjectionExpression: "#id, #liq",
  };

  type B = Pick<IBalance, "id" | "liq">;
  const bals = await db.exhaust<typeof ScanCommand, B>(
    ScanCommand,
    scan,
    (x) => x as any
  );
  const non_zero_bals = bals.filter((x) => x.liq && x.liq > 0);

  const npo_bals = non_zero_bals.reduce(
    (acc, cur) => {
      acc[cur.id] = cur.liq ?? 0;
      return acc;
    },
    {} as Record<string, number>
  );

  const log: IBalLog = {
    date: now.toISOString(),
    balances: npo_bals,
    total: non_zero_bals.reduce((a, { liq = 0 }) => a + liq, 0),
  };
  const put = new PutCommand({
    TableName: LiquidDb.table,
    Item: db.bal_log_record(log),
  });

  await db.client.send(put);
  console.info(`Logged ${non_zero_bals.length} non-zero balances`);
  return new Response(null, { status: 200 });
};
