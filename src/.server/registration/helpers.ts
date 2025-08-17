import type { DbRecord, Regs, UserReg } from "@better-giving/registration/db";
import { tables } from "@better-giving/types/list";
import { PutCommand, ap, npodb } from "../aws/db";

export const is_claimed = async (registration_number: string) =>
  npodb
    .npo_with_regnum(registration_number)
    .then((endow) => endow?.claimed ?? true);

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
