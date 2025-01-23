import type * as endowDb from "@better-giving/endowment/db";
import { tables } from "@better-giving/types/list";
import type { UserEndow } from "@better-giving/user";
import type * as userDb from "@better-giving/user/db";
import { ap } from "./aws/ap";
import { env } from "./env";

export async function getUserNpos(userId: string): Promise<UserEndow[]> {
  const creds = await ap.DynamoDB.Query({
    TableName: tables.usersV2,
    KeyConditionExpression: "PK = :pk AND begins_with(SK, :skSubstr)",
    ExpressionAttributeValues: {
      ":pk": `Email#${userId}`,
      ":skSubstr": `Endow#${env}#`,
    },
  }).then<userDb.EndowAdmin.DbRecord[]>((res) => (res.Items || []) as any[]);

  if (creds.length === 0) return [];

  const { Responses } = await ap.DynamoDB.BatchGetItem({
    RequestItems: {
      [tables.endowments_v3]: {
        Keys: creds.map((cred) => {
          return {
            PK: `Endow#${cred.endowID}`,
            SK: env,
          } satisfies endowDb.Endow.Keys;
        }),
        ProjectionExpression: "#name, #id, #logo",
        ExpressionAttributeNames: {
          "#name": "name",
          "#id": "id",
          "#logo": "logo",
        },
      },
    },
  });
  type EndowMeta = Pick<endowDb.Endow.DbRecord, "name" | "logo" | "id">;

  const endows = (Responses?.[tables.endowments_v3] ??
    []) as unknown as EndowMeta[];

  const endowMap = endows.reduce(
    (acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    },
    {} as { [index: number]: EndowMeta }
  );

  return creds.map<UserEndow>(({ endowID, email, alertPref }) => ({
    endowID,
    email,
    alertPref,
    ...endowMap[endowID],
  }));
}
