import { ProposalBase } from "../../../../types";
import { BeneficiaryType } from "types/lists";

export type FormValues = ProposalBase & {
  beneficiaryType: BeneficiaryType | "treasury";
  beneficiaryWallet: string;
  beneficiaryEndowmentId: number;
};
