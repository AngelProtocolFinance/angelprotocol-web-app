import * as db from "@better-giving/referrals/db";
import type { PayoutsPage, PendingEarnings, Referred } from "types/referrals";
import { GetCommand, QueryCommand, apes, npodb } from "./aws/db";

export const referredBy = async (id: string): Promise<Referred[]> => {
  const ltdCmd = new GetCommand({
    TableName: db.name,
    Key: { PK: `Ltd#${id}`, SK: `Ltd#${id}` } satisfies Pick<
      db.Ltd,
      "PK" | "SK"
    >,
  });

  const { Item: ltds = {} } = await apes.send(ltdCmd);

  const npos = await npodb.npo_referred_by(id);
  return npos.map((i) => ({
    id: i.id,
    name: i.name,
    up_until: i.referrer_expiry,
    ltd: ltds?.[`#${i.id}`] || 0,
  }));
};

export const pendingEarnings = async (id: string): Promise<PendingEarnings> => {
  const cmd = new QueryCommand({
    TableName: db.name,
    KeyConditionExpression: "PK = :pk",
    ExpressionAttributeValues: {
      ":pk": `Cm#${id}` satisfies db.Commission["PK"],
      ":status": "pending" satisfies db.Commission["status"],
    },
    FilterExpression: "#status = :status",
    ExpressionAttributeNames: { "#status": "status" },
  });

  const res = await apes.send(cmd);
  const items = (res.Items || []) as db.Commission[];
  const pendings = items.map(({ amount, status, date }) => ({
    amount,
    status,
    date,
  }));
  const total = pendings.reduce((acc, { amount }) => acc + amount, 0);

  return { total };
};

export async function paidOut(
  id: string,
  next?: string,
  limit = 10
): Promise<PayoutsPage> {
  const cmd = new QueryCommand({
    TableName: db.name,
    KeyConditionExpression: "PK = :pk",
    ExpressionAttributeValues: { ":pk": `Po#${id}` satisfies db.Payout["PK"] },
    ScanIndexForward: false,
    Limit: limit,
    ExclusiveStartKey: next ? JSON.parse(next) : undefined,
  });

  const res = await apes.send(cmd);
  const items = (res.Items || []) as db.Payout[];
  return {
    items,
    next: res.LastEvaluatedKey
      ? JSON.stringify(res.LastEvaluatedKey)
      : undefined,
  };
}

export async function paidOutLtd(id: string): Promise<number> {
  const cmd = new GetCommand({
    TableName: db.name,
    Key: {
      PK: `PoLtd#${id}`,
      SK: `PoLtd#${id}`,
    } satisfies Pick<db.PayoutLtd, "PK" | "SK">,
  });

  const res = await apes.send(cmd);
  const item = res.Item as db.PayoutLtd | undefined;
  return item?.amount ?? 0;
}
