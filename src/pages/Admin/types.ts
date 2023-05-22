import { Coin } from "@cosmjs/proto-signing";
import { TxTypes } from "contracts/createTx/types";
import { EndowmentProposal } from "types/aws";
import { Asset, FundDetails } from "types/contracts";

export type AdminParams = { id: string; type: string /**AccountType */ };
export type ProposalParams = { id: string };

export type Templates =
  | Extract<
      TxTypes,
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
    >
  | "multisig.owners" //combined add | remove in one template
  | "multisig.config" //combined threshold | execution required in one template
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
