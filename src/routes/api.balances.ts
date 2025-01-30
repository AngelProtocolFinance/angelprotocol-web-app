import { tables } from "@better-giving/types/list";
import { type LoaderFunction, data } from "@vercel/remix";
import { apes } from ".server/aws/apes";
import { env } from ".server/env";

export const MAX_ALLOWED_OPS = 100;

interface NpoBal {
  id: number;
  bal: number;
}

export const loader: LoaderFunction = async () => {
  const balances: NpoBal[] = [];
  let total = 0;
  let startKey: Record<string, any> | undefined = undefined;
  do {
    const res = await apes.DynamoDB.Query({
      TableName: tables.balances,
      KeyConditionExpression: "network = :network",
      FilterExpression: "sustainabilityFundBal > :zero",
      ExpressionAttributeValues: { ":network": env, ":zero": 0 },
      ProjectionExpression: "id, sustainabilityFundBal",
      ExclusiveStartKey: startKey,
    });

    startKey = res.LastEvaluatedKey;

    for (const item of (res.Items || []) as any[]) {
      const bal = item.sustainabilityFundBal;
      total += bal as any;
      balances.push({ id: item.id, bal });
    }
  } while (startKey);

  return data({
    list: balances.map((b) => ({
      ...b,
      pct: `${((b.bal / total) * 100).toFixed(2)}%`,
    })),
    total,
  });
};
