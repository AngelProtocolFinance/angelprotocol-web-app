import {
  type IItem,
  type Record as R,
  priority_nums,
  to_item,
} from "@better-giving/banking-applications";
import type { Update } from "@better-giving/banking-applications/schema";
import { tables } from "@better-giving/types/list";
import { env } from "../env";
import { lex_increase } from "./helpers";
import { GetCommand, QueryCommand, UpdateCommand, ap } from ".server/aws/db";

export const bank = async (id: string): Promise<R | undefined> => {
  const cmd = new GetCommand({
    TableName: tables["banking-applications"],
    Key: { PK: id },
  });
  return ap.send(cmd).then((res) => res.Item as any);
};

export const npo_banks = async (npo_id: number, limit = 10) => {
  const result = await ap.send(
    new QueryCommand({
      Limit: limit,
      TableName: tables["banking-applications"],
      IndexName: "gsi4",
      KeyConditionExpression: "gsi4PK = :pk",
      ExpressionAttributeValues: {
        ":pk": `${npo_id}#${env}`,
      },
      ScanIndexForward: false,
    })
  );
  const items = (result.Items || []) as R[];
  const tpn = (() => {
    if (!items[0]) return undefined;
    const num = +items[0].gsi4SK.split("#")[0];
    if (num > priority_nums.approved) return num;
  })();

  return items.map((item, idx, records) => {
    const heir = records[idx + 1];
    const hpn = heir ? to_item(heir).thisPriorityNum : undefined;
    return to_item(item, { top: tpn, heir: hpn });
  });
};

export const review_bank = async (prev: IItem, update: Update) => {
  const [top] = await npo_banks(prev.endowmentID, 1);
  const { topPriorityNum: tpn = 0 } = top || {};

  const { wiseRecipientID: id, dateCreated: dc } = prev;
  if (update.type === "approved" || update.type === "rejected") {
    const npn = async () => {
      if (update.type === "rejected") return priority_nums.rejected;

      if (tpn > priority_nums.approved) return priority_nums.approved;
      //set as priority if nothing is set already set
      return priority_nums.approved + 1;
    };
    const reason = update.type === "rejected" ? update.reason : "";
    const command = new UpdateCommand({
      TableName: tables["banking-applications"],
      Key: { PK: id },
      UpdateExpression:
        "SET gsi1SK = :gsi1SK, gsi2SK = :gsi2SK, gsi4SK =:gsi4SK, rejectionReason = :reason",
      ExpressionAttributeValues: {
        ":gsi1SK": `${env}#${update.type}#${dc}` satisfies R["gsi1SK"],
        ":gsi2SK": `${update.type}#${dc}` satisfies R["gsi2SK"],
        ":gsi4SK": `${await npn()}#${dc}` satisfies R["gsi4SK"],
        ":reason": reason,
      },
    });
    return ap.send(command);
  }

  const new_sk4: R["gsi4SK"] = `${lex_increase(tpn || priority_nums.approved)}#${dc}`;
  const command = new UpdateCommand({
    TableName: tables["banking-applications"],
    Key: { PK: id },
    UpdateExpression: `SET gsi4SK = :sk`,
    ExpressionAttributeValues: {
      ":sk": new_sk4,
    },
    ReturnValues: "ALL_NEW",
  });
  return ap.send(command);
};

export const npo_bank = async (
  npo_id: number,
  id: string
): Promise<IItem | undefined> => {
  const [top] = await npo_banks(npo_id, 2);
  const { topPriorityNum: tpn, heirPriorityNum: hpn } = top || {};
  const x = await bank(id);
  if (!x) return;

  return to_item(x, { heir: hpn, top: tpn });
};
