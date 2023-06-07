import { ProposalBase } from "../../../../types";

export type Beneficiary = {
  id: string;
  type: "endowment" | "indexfund" | "wallet";
};

export type FormValues = ProposalBase & {
  beneficiary: Beneficiary;
};
