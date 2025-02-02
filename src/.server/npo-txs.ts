import { tables } from "@better-giving/types/list";
import { QueryCommand, apes } from "./aws/db";
import { env } from "./env";
export const getNpoSf = async (id: number, numWeeks: number) => {
  const cmd = new QueryCommand({
    TableName: tables["balance-txs"],
    KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk)",
    ExpressionAttributeValues: {
      ":pk": `SFW#${id}`,
      ":sk": env,
    },
    ScanIndexForward: false,
    Limit: numWeeks,
  });

  return apes.send(cmd).then((res) => res.Items);
};

export const npoTxs = async (id: number, nextKey: string | null) => {
  const startKey = nextKey
    ? JSON.parse(Buffer.from(nextKey, "base64").toString())
    : undefined;
  console.log({ id, nextKey, startKey });

  const command = new QueryCommand({
    TableName: tables["balance-txs"],
    KeyConditionExpression: "PK = :PK AND begins_with(SK, :SK)",
    ExpressionAttributeValues: {
      ":PK": `Tx#${+id}`,
      ":SK": env,
    },
    ScanIndexForward: false,
    Limit: 5,
    ExclusiveStartKey: nextKey
      ? JSON.parse(Buffer.from(nextKey, "base64").toString())
      : undefined,
  });

  const result = await apes.send(command);
  const items = result.Items || [];

  const toBase64 = (key: Record<string, any> | undefined) =>
    key ? Buffer.from(JSON.stringify(key)).toString("base64") : undefined;

  return {
    items: items.map(({ PK, SK, ...i }) => i),
    nextPageKey: toBase64(result.LastEvaluatedKey),
  };
};
