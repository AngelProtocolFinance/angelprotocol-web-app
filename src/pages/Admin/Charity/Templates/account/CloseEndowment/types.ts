import { ProposalBase } from "../../../../types";
import { BeneficiaryType, EndowmentType } from "types/lists";

export type FormValues = ProposalBase & {
  beneficiaryType: BeneficiaryType | "treasury";
  beneficiaryWallet: string;
  beneficiaryEndowmentId: number;
  meta: { endowType: EndowmentType };
};
