import { tables } from "@better-giving/types/list";
import { type LoaderFunction, data } from "react-router";
import { cognito } from ".server/auth";
import { QueryCommand, ap } from ".server/aws/db";
import { env } from ".server/env";

export const MAX_ALLOWED_OPS = 100;

interface NpoBal {
  id: number;
  bal: number;
}

export const loader: LoaderFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) {
    return new Response("please login before visiting this page", {
      status: 401,
      headers,
    });
  }
  if (!user.groups.includes("ap-admin")) {
    return new Response("you are not authorized to view this page", {
      status: 403,
      headers,
    });
  }

  const balances: NpoBal[] = [];
  let total = 0;
  let startKey: Record<string, any> | undefined;
  do {
    const cmd = new QueryCommand({
      TableName: tables.balances,
      KeyConditionExpression: "network = :network",
      FilterExpression: "sustainabilityFundBal > :zero",
      ExpressionAttributeValues: { ":network": env, ":zero": 0 },
      ProjectionExpression: "id, sustainabilityFundBal",
      ExclusiveStartKey: startKey,
    });
    const res = await ap.send(cmd);

    startKey = res.LastEvaluatedKey;

    for (const item of (res.Items || []) as any[]) {
      const bal = item.sustainabilityFundBal;
      total += bal as any;
      balances.push({ id: item.id, bal });
    }
  } while (startKey);

  return data({
    list: balances
      .toSorted((a, b) => b.bal - a.bal)
      .map((b) => ({
        ...b,
        bal: b.bal.toFixed(2),
        pct: `${((b.bal / total) * 100).toFixed(2)}%`,
      })),
    total,
  });
};
