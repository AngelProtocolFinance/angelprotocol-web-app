import { EndowmentProposal } from "types/aws";
import { TxType } from "types/tx";

export type AdminParams = { id: string; type: string /**AccountType */ };
export type ProposalParams = { id: string };

export type Templates =
  | Extract<
      TxType,
      | "accounts.update-controller"
      | "accounts.withdraw"
      | "accounts.close"
      | "index-fund.config"
      | "index-fund.update-owner"
      | "index-fund.create-fund"
      | "index-fund.remove-fund"
      | "index-fund.update-members"
      | "index-fund.update-alliance-list"
      | "registrar.update-owner"
      | "registrar.update-config"
      | "registrar.add-token"
    >
  | "multisig.fund-transfer"; // erc20 transfer and native transfer

/** _templates */
export type ProposalBase = {
  title: string;
  description: string;
};

export type SortDirection = "asc" | "desc";
export type SortKey = keyof Pick<
  EndowmentProposal,
  "OrganizationName" | "RegistrationDate" | "RegistrationStatus" | "Email"
>;
