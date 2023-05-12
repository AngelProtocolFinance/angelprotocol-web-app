import { Coin } from "@cosmjs/proto-signing";
import { TxTypes } from "contracts/createTx/types";
import { EndowmentProposal } from "types/aws";
import {
  Asset,
  EndowmentStatusText,
  FundDetails,
  RegistrarConfigPayload,
  RegistrarOwnerPayload,
} from "types/contracts";

export type AdminParams = { id: string; type: string /**AccountType */ };
export type ProposalParams = { id: string };

export type Templates =
  | Extract<
      TxTypes,
      | "accounts.update-controller"
      | "accounts.withdraw"
      | "accounts.update-status"
      | "index-fund.config"
      | "index-fund.update-owner"
      | "index-fund.create-fund"
      | "index-fund.remove-fund"
      | "index-fund.update-members"
      | "index-fund.update-alliance-list"
      | "registrar.update-owner"
      | "registrar.update-config"
    >
  | "multisig.owner" //combined add | remove in one template
  | "multisig.config" //combined threshold | execution required in one template
  | "multisig.fund-transfer"; // erc20 transfer and native transfer

export type MetaConstructor<K extends Templates, V> = {
  type: K;
  data: K extends Templates ? V : unknown;
};

export type FundPreview = Omit<FundDetails, "id">;
export type SourcePreview = { vaultName: string; usdAmount: number };

/** _templates */
export type ProposalBase = {
  title: string;
  description: string;
};
export type FundIdContext = { fundId: string };

export interface FormCW3Config {
  threshold: number;
  duration: number;
  require_execution: boolean;
}
export interface FormReviewCW3Config extends FormCW3Config {
  seed_asset?: Asset;
  seed_split_to_liquid: string; //"0.5,0.9",
  new_endow_gas_money?: Coin;
}
export type CW3ConfigValues<T extends FormCW3Config> = ProposalBase &
  T & { initial: T; isTime: boolean };

export type EndowmentUpdateValues = ProposalBase & {
  id: number;
  status: Exclude<EndowmentStatusText, "closed">;
  //address to transfer funds when endowment will be closed

  //beneficiary type
  beneficiaryType: "wallet" | "endowment" | "index fund";

  //beneficiary
  wallet: string;
  endowmentId: number;
  indexFund: number;

  //metadata
  prevStatus?: EndowmentStatusText;
};

export type FundSendPayload = {
  amount: number;
  recipient: string;

  //metadata
  denom: string;
  haloBalance: number;
  usdBalance: number;
};

export type FundSendValues = ProposalBase & FundSendPayload;

export type MemberUpdatorValues = ProposalBase & {
  addr: string;
  weight: string;
};

export type RegistrarConfigExtensionValues = ProposalBase &
  RegistrarConfigPayload & {
    initialConfigPayload: RegistrarConfigPayload;
  };

export type RegistrarOwnerValues = ProposalBase &
  RegistrarOwnerPayload & { initialOwner: string };

export type SortDirection = "asc" | "desc";
export type SortKey = keyof Pick<
  EndowmentProposal,
  "OrganizationName" | "RegistrationDate" | "RegistrationStatus" | "Email"
>;
