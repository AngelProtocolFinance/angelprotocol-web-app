import type { Gsi1 } from "@better-giving/endowment/db";
import { tables } from "@better-giving/types/list";
import type { PendingEarnings, Referred } from "types/referrals";
import { GetCommand, QueryCommand, ap, apes } from "./aws/db";

export const referredBy = async (id: string): Promise<Referred[]> => {
  const ltdCmd = new GetCommand({
    TableName: "commissions",
    Key: { PK: `Ltd#${id}`, SK: `Ltd#${id}` },
  });

  const { Item: ltds = {} } = await apes.send(ltdCmd);

  const referredsCmd = new QueryCommand({
    TableName: tables.endowments_v3,
    IndexName: "gsi1",
    KeyConditionExpression: "#pk = :pk",
    ExpressionAttributeValues: {
      ":pk": `ReferredBy#${id}`,
    },
    ExpressionAttributeNames: { "#pk": "gsi1PK" },
  });
  return ap
    .send(referredsCmd)
    .then(({ Items = [] }) => Items as Gsi1.ReferredNpos.DbRecord[])
    .then((items) =>
      items.map((i) => ({
        id: i.id,
        name: i.name,
        up_until: i.referrer_expiry,
        ltd: ltds?.[`#${i.id}`] || 0,
      }))
    );
};

export const pendingEarnings = async (id: string): Promise<PendingEarnings> => {
  const cmd = new QueryCommand({
    TableName: "commissions",
    KeyConditionExpression: "PK = :pk",
    ExpressionAttributeValues: { ":pk": `Cm#${id}`, ":status": "pending" },
    FilterExpression: "#status = :status",
    ExpressionAttributeNames: { "#status": "status" },
  });

  const res = await apes.send(cmd);
  const pendings = (res.Items || []).map(({ amount, status, date }) => ({
    amount,
    status,
    date,
  }));
  console.log(res);
  const total = pendings.reduce((acc, { amount }) => acc + amount, 0);
  const dates = pendings.reduce((acc, { date, status }) => {
    acc[date] = status;
    return acc;
  }, {} as any);

  return { total, dates };
};
