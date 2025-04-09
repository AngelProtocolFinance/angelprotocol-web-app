import { QueryCommand, apes } from "./aws/db";
import { env } from "./env";

export const npoDonors = async (
  recipient_id: string /** uuid or number id */,
  nextKey: string | null
) => {
  const cmd = new QueryCommand({
    TableName: "donation_messages",
    IndexName: "recipient-env-gsi",
    KeyConditionExpression: "#pk = :pk",
    ExpressionAttributeNames: {
      "#pk": "gsi1PK",
    },
    ExpressionAttributeValues: {
      ":pk": `Recipient#${recipient_id}#${env}`,
    },
    ExclusiveStartKey: nextKey
      ? JSON.parse(Buffer.from(nextKey, "base64").toString())
      : undefined,
  });

  const res = await apes.send(cmd);

  const items = (res.Items || []).map(
    ({ PK, SK, gsi1PK, gsi1SK, donor_id, env, ...x }) => x
  );
  const toBase64 = (key: Record<string, any> | undefined) =>
    key ? Buffer.from(JSON.stringify(key)).toString("base64") : undefined;

  return {
    items,
    nextPageKey: toBase64(res.LastEvaluatedKey),
  };
};
