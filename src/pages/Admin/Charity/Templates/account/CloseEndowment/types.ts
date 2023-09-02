import { ProposalBase } from "../../../../types";
import { BeneficiaryType, EndowmentType } from "types/lists";

export type FormValues = ProposalBase & {
  beneficiaryType: BeneficiaryType;
  beneficiaryWallet: string;
  beneficiaryEndowmentId: number;
  meta: { endowType: EndowmentType; endowId: number };
};
