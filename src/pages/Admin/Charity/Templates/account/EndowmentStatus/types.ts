import { ProposalBase } from "../../../../types";
import { EndowmentStatusText } from "types/contracts";

export type FormValues = ProposalBase & {
  id: string;
  status: EndowmentStatusText;
  beneficiary: {
    id: string; // endow-id | indexfund-id | wallet-address
    type: "endowment" | "indexfund" | "wallet";
  };

  //status:
  prevStatus: EndowmentStatusText;
};
