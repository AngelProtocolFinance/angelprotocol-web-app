import { PayloadAction } from "@reduxjs/toolkit";
import { TagDescription } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import {
  AccountType,
  AdminVoteInfo,
  CW3Config,
  EndowmentDetails,
  GenericBalance,
  Proposal,
  ReviewCW3Config,
  Strategy,
  VaultWithBalance,
} from "types/contracts";
import { TxArgs } from "hooks/useCosmosTxSender";

export type Tag = TagDescription<string>;
export type TagPayload = PayloadAction<Tag[], string>;

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

const strats: keyof EndowmentDetails = "strategies";
const one_offs: keyof EndowmentDetails = "oneoff_vaults";
const _locked: AccountType = "locked";
const _liquid: AccountType = "liquid";

export type Account = {
  strats: Strategy[];
  one_offs: string[];
  balance: GenericBalance;
  investments: VaultWithBalance[];
};

export type EndowDetails = Omit<
  EndowmentDetails,
  typeof strats | typeof one_offs
> & {
  [_locked]: Account;
  [_liquid]: Account;
};

type Base = {
  cw3: string;
  cw4: string;
  id: number;
  isUserMember: boolean;
  propMeta: Required<Pick<TxArgs, "successMeta" | "tagPayloads">> & {
    willExecute?: true;
  };
};

export type APResource = Base & {
  type: "ap";
  config: CW3Config;
  details?: never;
};
export type ReviewResource = Base & {
  type: "review";
  config: ReviewCW3Config;
  details?: never;
};
export type CharityResource = Base & {
  type: "charity";
  config: CW3Config;
  details: EndowDetails;
};

export type EndowmentResource = APResource | ReviewResource | CharityResource;

export type ProposalDetails = Proposal & {
  votes: AdminVoteInfo[];
};

export type JunoTags =
  | "gov"
  | "indexfund"
  | "admin"
  | "account"
  | "registrar"
  | "custom";

export type Country = {
  flags: { png?: string; svg?: string };
  name: {
    common: string;
  };
};

export type CountryInRegion = Pick<Country, "name"> & { region: string };

export type CountryOption = {
  name: string;
  flag: string;
};

export type Regions = { [region: string]: string[] };
