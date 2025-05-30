import type { Endow } from "@better-giving/endowment/db";
import type { DbRecord, Keys } from "@better-giving/fundraiser/db";
import { tables } from "@better-giving/types/list";
import { GetCommand, ap } from "./aws/db";
import { env } from "./env";

export interface Recipient {
  npo: {
    /** 0 when recipient is fund */
    id: number;
  };
  fund: {
    /** empty when recipient is npo */
    id: string;
    members: number[];
  };
  name: string;
  claimed: boolean;
  hide_bg_tip: boolean;
  fiscal_sponsored: boolean;
  receiptMsg: string;
}

/**
 * @param id - endow id or fund uuid
 * @param dynamo - dynamodb client that has access to the tables
 */
export async function get_recipient(id: string | number) {
  //recipient is endowment
  if (typeof id === "number") {
    const key: Endow.Keys = {
      PK: `Endow#${id}`,
      SK: env,
    };
    const getEndowProfileCommand = new GetCommand({
      TableName: tables.endowments_v3,
      Key: key,
      ProjectionExpression:
        "#name, claimed, fiscal_sponsored, hide_bg_tip, receiptMsg",
      ExpressionAttributeNames: { "#name": "name" },
    });

    return ap
      .send(getEndowProfileCommand)
      .then((result) => result.Item)
      .then((data) => {
        if (!data) return undefined;
        const recipient: Recipient = {
          npo: { id },
          fund: { id: "", members: [] },
          name: data.name,
          claimed: data.claimed,
          fiscal_sponsored: data.fiscal_sponsored,
          hide_bg_tip: data.hide_bg_tip ?? false,
          receiptMsg: data.receiptMsg,
        };
        return recipient;
      });
  }

  //recipient is fund
  const command = new GetCommand({
    TableName: tables.funds,
    Key: {
      PK: `Fund#${id}`,
      SK: `Fund#${id}`,
    } satisfies Keys,
  });

  return ap
    .send(command)
    .then<DbRecord | undefined>((res) => res.Item as any)
    .then((data) => {
      if (!data) return undefined;
      const recipient: Recipient = {
        npo: { id: 0 },
        fund: { id, members: data.members },
        name: data.name,
        claimed: false,
        fiscal_sponsored: false,
        hide_bg_tip: data.settings.hide_bg_tip,
        receiptMsg: "",
      };
      return recipient;
    });
}
