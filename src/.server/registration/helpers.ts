import type { RegNumEnvGsi } from "@better-giving/endowment/db";
import type { DbRecord, Regs, UserReg } from "@better-giving/registration/db";
import { type Environment, tables } from "@better-giving/types/list";
import { PutCommand, QueryCommand, ap } from "../aws/db";

type Key = keyof RegNumEnvGsi.DbRecord;
export const getUsEndow = async (ein: string, environment: Environment) => {
  const cmd = new QueryCommand({
    TableName: tables.endowments_v3,
    IndexName: "regnum-env-gsi" satisfies RegNumEnvGsi.Name,
    Limit: 1,
    KeyConditionExpression: "#rn = :rn AND #env = :env",
    FilterExpression: "#country = :us",
    ExpressionAttributeNames: {
      "#rn": "registration_number" satisfies Key,
      "#env": "env" satisfies Key,
      "#country": "hq_country" satisfies Key,
    },
    ExpressionAttributeValues: {
      ":rn": ein,
      ":env": environment,
      ":us": "United States",
    },
  });

  return ap
    .send(cmd)
    .then((res) => res.Items?.[0] as RegNumEnvGsi.DbRecord | undefined);
};

export const isClaimed = async (
  registration_number: string,
  environment: Environment
) =>
  getUsEndow(registration_number, environment).then(
    (endow) => endow?.claimed ?? true
  );

export async function putItem(item: DbRecord) {
  /** update sort keys based on status and updated_at */
  const sks = {
    gsi1: `${item.updated_at}#${item.status}` satisfies UserReg["gsi1SK"],
    gsi2: `${item.status}#${item.updated_at}` satisfies Regs["gsi2SK"],
  };

  const cmd = new PutCommand({
    TableName: tables.registration,
    Item: { ...item, gsi1SK: sks.gsi1, gsi2SK: sks.gsi2 },
  });
  await ap.send(cmd);
  return item;
}

export function nextKeyBase64(key: Record<string, any> | undefined) {
  return key ? Buffer.from(JSON.stringify(key)).toString("base64") : undefined;
}
