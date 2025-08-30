import type { Allocation } from "@better-giving/donation/schema";
import { default_allocation } from "constants/common";
import { funddb, npodb } from "./aws/db";

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
  allocation: Allocation;
}

/**
 * @param id - endow id or fund uuid
 * @param dynamo - dynamodb client that has access to the tables
 */
export async function get_recipient(id: string | number) {
  //recipient is endowment
  if (typeof id === "number") {
    const npo = await npodb.npo(id);
    if (!npo) return undefined;
    const recipient: Recipient = {
      npo: { id },
      fund: { id: "", members: [] },
      name: npo.name,
      claimed: npo.claimed,
      fiscal_sponsored: npo.fiscal_sponsored,
      hide_bg_tip: npo.hide_bg_tip ?? false,
      receiptMsg: npo.receiptMsg ?? "",
      allocation: npo.allocation ?? default_allocation,
    };

    return recipient;
  }

  return funddb.fund(id).then((data) => {
    if (!data) return undefined;
    const recipient: Recipient = {
      npo: { id: 0 },
      fund: { id, members: data.members },
      name: data.name,
      claimed: false,
      fiscal_sponsored: false,
      hide_bg_tip: data.settings.hide_bg_tip,
      receiptMsg: "",
      allocation: default_allocation,
    };
    return recipient;
  });
}
