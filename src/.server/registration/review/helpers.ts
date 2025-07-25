import type { EndowCount } from "@better-giving/endowment/db";
import type {
  ApplicationDbRecord,
  Key,
  Regs,
  UserReg,
} from "@better-giving/registration/db";
import {
  type Status,
  type Submission,
  isRejected,
} from "@better-giving/registration/models";
import type { Step6 } from "@better-giving/registration/step";
import { type Environment, tables } from "@better-giving/types/list";
import type { EndowAdmin } from "@better-giving/user/db";
import {
  type TransactWriteCommandInput,
  UpdateCommand,
  type UpdateCommandInput,
  ap,
} from "../../aws/db";
import { env } from "../../env";
import { wise } from "../../sdks";

export function endowAdmin(email: string, endowId: number) {
  const _mail = email.toLowerCase();
  const user: EndowAdmin.DbRecord = {
    PK: `Email#${_mail}`,
    SK: `Endow#${env}#${endowId}`,
    gsi1PK: `Endow#${endowId}`,
    gsi1SK: `Email#${env}#${_mail}`,
    email: _mail,
    endowID: endowId,
  };
  return {
    TableName: tables.usersV2,
    Item: user,
  };
}
export async function bankingRecord(reg: ApplicationDbRecord, endowId: number) {
  const account = await wise.v2Account(reg.banking.wise_recipient_id);

  const DEFAULT_PRIORITY_NUM = 3;
  const dateCreated = new Date().toISOString();

  const bankingRecord = {
    PK: reg.banking.wise_recipient_id.toString(),
    gsi1PK: endowId,
    gsi1SK: `${reg.env}#approved#${dateCreated}`,

    gsi2PK: reg.env,
    gsi2SK: `approved#${dateCreated}`,

    gsi3PK: endowId,
    gsi3SK: `${DEFAULT_PRIORITY_NUM}#${dateCreated}`,

    gsi4PK: `${endowId}#${reg.env}`,
    gsi4SK: `${DEFAULT_PRIORITY_NUM}#${dateCreated}`,

    bankSummary: account.longAccountSummary,
    bankStatementFile: reg.banking.bank_statement,
    rejectionReason: "",
  };
  return {
    TableName: "banking-applications",
    Item: bankingRecord,
  };
}

export const dbUpdate = (fields: Record<string, any>) => {
  const comps = Object.entries(fields).map(([k, v]) => ({
    update: `#${k} = :${k}`,
    name: [`#${k}`, k],
    value: [`:${k}`, v],
  }));

  return {
    UpdateExpression: `SET ${comps.map(({ update: u }) => u).join(",")}`,
    ExpressionAttributeNames: comps.reduce(
      (p, { name: [n, _n] }) => ({ ...p, [n]: _n }),
      {}
    ),
    ExpressionAttributeValues: comps.reduce(
      (p, { value: [v, _v] }) => ({ ...p, [v]: _v }),
      {}
    ),
  };
};

type TxItems = NonNullable<TransactWriteCommandInput["TransactItems"]>;
type TxType = NonNullable<TxItems[number]>;
export const regUpdate = <T extends "tx" | "standalone">(
  reg: Omit<ApplicationDbRecord, "submission">,
  submission: Submission
): T extends "tx" ? TxType["Update"] : UpdateCommandInput => {
  const newStatus: Status = isRejected(submission) ? "04" : "03";

  const sks = {
    gsi1: `${reg.updated_at}#${newStatus}` satisfies UserReg["gsi1SK"],
    gsi2: `${newStatus}#${reg.updated_at}` satisfies Regs["gsi2SK"],
  };

  return {
    TableName: tables.registration,
    Key: { PK: `Reg#${reg.id}`, SK: `Reg#${reg.id}` } satisfies Key,
    UpdateExpression:
      "SET #submission = :submission, #status = :status, gsi1SK = :gsi1SK, gsi2SK = :gsi2SK",
    ExpressionAttributeNames: {
      "#submission": "submission" satisfies keyof Step6,
      "#status": "status" satisfies keyof Step6,
    },
    ExpressionAttributeValues: {
      ":submission": submission,
      ":status": newStatus,
      ":gsi1SK": sks.gsi1,
      ":gsi2SK": sks.gsi2,
    },
  };
};

export const nextEndowId = async (env: Environment): Promise<number> => {
  const res = await ap.send(
    new UpdateCommand({
      TableName: tables.endowments_v3,
      Key: { PK: "Count", SK: env } satisfies EndowCount.Keys,
      UpdateExpression: "SET #count = #count + :one",
      ExpressionAttributeNames: {
        "#count": "count",
      },

      ExpressionAttributeValues: { ":one": 1 },
      ReturnValues: "UPDATED_NEW",
    })
  );
  return res.Attributes?.count ?? 1;
};
