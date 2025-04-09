import { QueryCommand, apes } from "./aws/db";

export const getDonors = async (
  recipient_id: string /** uuid or number id */
) => {
  const cmd = new QueryCommand({
    TableName: "donor_messages",
    IndexName: "recipient-env-gsi",
    KeyConditionExpression: "#pk = :pk",
    ExpressionAttributeNames: {
      "#pk": "gsi1PK",
    },
    ExpressionAttributeValues: {
      ":pk": `Recipient#${recipient_id}`,
    },
  });

  const res = await apes.send(cmd);

  const items = (res.Items || []).map(({ PK, SK, gsi1PK, gsiSK, ...x }) => x);
  const toBase64 = (key: Record<string, any> | undefined) =>
    key ? Buffer.from(JSON.stringify(key)).toString("base64") : undefined;

  return {
    items,
    nextPageKey: toBase64(res.LastEvaluatedKey),
  };
};
