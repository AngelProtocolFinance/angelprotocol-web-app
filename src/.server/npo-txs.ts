import type { BalanceTx } from "@better-giving/balance-tx";
import { tables } from "@better-giving/types/list";
import { QueryCommand, apes } from "./aws/db";
import { env } from "./env";

export const npoTxs = async (id: number, nextKey: string | null) => {
  const command = new QueryCommand({
    TableName: tables["balance-txs"],
    KeyConditionExpression: "PK = :PK AND begins_with(SK, :SK)",
    ExpressionAttributeValues: {
      ":PK": `Tx#${+id}` satisfies BalanceTx.DBRecord["PK"],
      ":SK": env,
    },
    ScanIndexForward: false,
    Limit: 5,
    ExclusiveStartKey: nextKey
      ? JSON.parse(Buffer.from(nextKey, "base64").toString())
      : undefined,
  });

  const result = await apes.send(command);
  const items = (result.Items || []) as BalanceTx.DBRecord[];

  const toBase64 = (key: Record<string, any> | undefined) =>
    key ? Buffer.from(JSON.stringify(key)).toString("base64") : undefined;

  return {
    items: items.map(({ PK, SK, ...i }) => i),
    nextPageKey: toBase64(result.LastEvaluatedKey),
  };
};
