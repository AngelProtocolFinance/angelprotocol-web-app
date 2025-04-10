import type {
  DonationMessage,
  GSI1 as Index,
} from "@better-giving/donation/donation-message";
import { tables } from "@better-giving/types/list";
import { QueryCommand, apes } from "./aws/db";
import { env } from "./env";

export const getDonationMessages = async (
  id: number | string,
  nextKey: string | null
) => {
  const recipientId: Index.Key["gsi1PK"] = `Recipient#${id}#${env}`;

  const cmd = new QueryCommand({
    TableName: tables.donation_messages,
    IndexName: "recipient-env-gsi" satisfies Index.Name,
    KeyConditionExpression: "gsi1PK = :gsi1PK",
    ExpressionAttributeValues: { ":gsi1PK": recipientId },
    ScanIndexForward: false,
    Limit: 10,
    ExclusiveStartKey: nextKey
      ? JSON.parse(Buffer.from(nextKey, "base64").toString())
      : undefined,
  });
  const { Items, LastEvaluatedKey } = await apes.send(cmd);

  const items = (Items || []) as DonationMessage.DBRecord[];
  const nextPageKey = LastEvaluatedKey
    ? Buffer.from(JSON.stringify(LastEvaluatedKey)).toString("base64")
    : undefined;

  return {
    items: items.map(({ PK, SK, gsi1PK, gsi1SK, ...i }) => i),
    nextPageKey,
  };
};
