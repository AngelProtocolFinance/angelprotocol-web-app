import { BatchGetCommand, QueryCommand, apes } from "./aws/db";
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

  //get user's metadata
  const tables_users_meta = "users-meta";
  const distinct_donor_ids = new Set<string>(res.Items?.map((x) => x.donor_id));
  const batchGet = new BatchGetCommand({
    RequestItems: {
      [tables_users_meta]: {
        Keys: Array.from(distinct_donor_ids.values()).map((x) => {
          return {
            PK: `User#${x}`,
            SK: env,
          };
        }),
        ProjectionExpression: "email, photo",
      },
    },
  });
  const { Responses } = await apes.send(batchGet);

  const photoMap = (Responses?.[tables_users_meta] ?? []).reduce((acc, x) => {
    acc[x.email] = x.photo;
    return acc;
  }, {});

  const items = (res.Items || []).map(
    ({ PK, SK, gsi1PK, gsi1SK, donor_id, env, ...x }) => ({
      ...x,
      photo: photoMap[donor_id],
    })
  );

  const toBase64 = (key: Record<string, any> | undefined) =>
    key ? Buffer.from(JSON.stringify(key)).toString("base64") : undefined;

  return {
    items,
    nextPageKey: toBase64(res.LastEvaluatedKey),
  };
};
