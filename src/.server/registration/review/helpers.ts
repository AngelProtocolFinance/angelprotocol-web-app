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
import { tables } from "@better-giving/types/list";
import type {
  TransactWriteCommandInput,
  UpdateCommandInput,
} from "../../aws/db";
import { wise } from "../../sdks";

export async function bankingRecord(reg: ApplicationDbRecord, endowId: number) {
  const account = await wise.v2_account(reg.banking.wise_recipient_id);

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
