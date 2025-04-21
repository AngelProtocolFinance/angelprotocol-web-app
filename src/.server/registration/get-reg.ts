import type { DbRecord, Key } from "@better-giving/registration/db";
import { tables } from "@better-giving/types/list";
import { GetCommand, ap } from "../aws/db";
export async function getReg(regId: string) {
  const cmd = new GetCommand({
    TableName: tables.registration,
    Key: {
      PK: `Reg#${regId}`,
      SK: `Reg#${regId}`,
    } satisfies Key,
  });

  return ap.send(cmd).then<DbRecord | undefined>((res) => res.Item as any);
}
