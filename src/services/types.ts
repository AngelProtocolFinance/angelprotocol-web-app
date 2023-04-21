import { ASTProfile, EndowmentProfile } from "types/aws";
import { EndowmentDetails } from "types/contracts";
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

export type MultisigConfig = { threshold: number; requireExecution: boolean };

type Base = {
  multisig: string;
  members: string[];
  id: number;
  config: MultisigConfig;
  propMeta: Required<
    Pick<SenderArgs, "successMeta" | "tagPayloads" | "isAuthorized">
  > & {
    willExecute?: true;
  };
};

export type APResources = Base & {
  type: "ap";
};
export type ReviewResources = Base & {
  type: "review";
};
export type CharityResources = Base & {
  type: "charity";
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

export type Profile =
  | ({
      type: "endowment";
    } & EndowmentProfile)
  | ({ type: "ast" } & ASTProfile);

//type guard
export function endow(
  profile: Profile
): profile is EndowmentProfile & { type: "endowment" } {
  return profile.type === "endowment";
}
