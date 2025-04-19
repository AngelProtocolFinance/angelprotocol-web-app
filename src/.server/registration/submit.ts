import type { Application } from "@better-giving/registration/approval";
import type { Key, Regs, UserReg } from "@better-giving/registration/db";
import type { Status, Submission } from "@better-giving/registration/models";
import type { InitStep, Step5 } from "@better-giving/registration/step";
import { tables } from "@better-giving/types/list";
import { UpdateCommand, ap } from "../aws/db";

export async function submit(reg: Step5) {
  const submitDate = new Date().toISOString();
  const status: Status = "02";
  const sks = {
    gsi1: `${reg.updated_at}#${status}` satisfies UserReg["gsi1SK"],
    gsi2: `${status}#${reg.updated_at}` satisfies Regs["gsi2SK"],
  };

  type K = keyof Application;
  const cmd = new UpdateCommand({
    TableName: tables.registration,
    Key: { PK: `Reg#${reg.id}`, SK: `Reg#${reg.id}` } satisfies Key,
    UpdateExpression:
      "SET #submission = :submission, #status = :status, gsi1SK = :gsi1SK, gsi2SK = :gsi2SK, #updated_at = :updated_at, #update_type = :update_type",
    ExpressionAttributeNames: {
      "#submission": "submission" satisfies K,
      "#status": "status" satisfies K,
      "#updated_at": "updated_at" satisfies K,
      "#update_type": "update_type" satisfies K,
    },
    ExpressionAttributeValues: {
      ":submission": "in-review" satisfies Submission,
      ":status": status,
      ":gsi1SK": sks.gsi1,
      ":gsi2SK": sks.gsi2,
      ":updated_at": submitDate,
      ":update_type": "submission" satisfies InitStep["update_type"],
    },
    ReturnValues: "ALL_NEW",
  });

  return ap.send(cmd);
}
