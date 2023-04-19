import { CW3Config, EndowmentDetails, ReviewCW3Config } from "types/contracts";
import { Transaction } from "types/contracts/evm/multisig";
import { AccountType, ProviderId } from "types/lists";
import { SenderArgs } from "types/tx";

export type ContractQueryArgs<T = object> = {
  address: string;
  msg: T;
};

export type MultiContractQueryArgs = ContractQueryArgs<AggregatedQuery>;
export type AggregatedQuery = {
  aggregate: { queries: EncodedQueryMember[] };
};
export type EncodedQueryMember = {
  address: string;
  data: string; //base64 encoded msg
};

type Base = {
  multisig: string;
  members: string[];
  id: number;
  propMeta: Required<
    Pick<SenderArgs, "successMeta" | "tagPayloads" | "isAuthorized">
  > & {
    willExecute?: true;
  };
};

export type APResources = Base & {
  type: "ap";
  config: CW3Config;
};
export type ReviewResources = Base & {
  type: "review";
  config: ReviewCW3Config;
};
export type CharityResources = Base & {
  type: "charity";
  config: CW3Config;
} & EndowmentDetails;

export type AdminResources = APResources | ReviewResources | CharityResources;

export type ProposalDetails = Transaction & {
  signers: string[];
  signed: string[];
};

export type JunoTags =
  | "gov"
  | "indexfund"
  | "admin"
  | "account"
  | "registrar"
  | "custom";

export type ChainQueryArgs = {
  address: string;
  chainId: string;
  providerId: ProviderId;
};

export interface IERC20 {
  amount: string;
  address: string;
}

export type EndowBalance = { [key in AccountType]: IERC20[] };
