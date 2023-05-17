import { ProposalBase } from "../../../../types";
import { EndowmentStatusText } from "types/contracts";
import { OptionType } from "components/Selector";

export type Beneficiary = {
  id: string;
  type: "endowment" | "indexfund" | "wallet";
};

export type FormValues = ProposalBase & {
  id: string;
  status: OptionType<EndowmentStatusText>;
  beneficiary: Beneficiary;

  //status:
  prevStatus: EndowmentStatusText;
};
