import { PayloadAction } from "@reduxjs/toolkit";
import { TagDescription } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import {
  AdminVoteInfo,
  CW3Config,
  EndowmentDetails,
  Proposal,
  ReviewCW3Config,
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

type Base = {
  cw3: string;
  cw4: string;
  id: number;
  propMeta: Required<
    Pick<TxArgs, "successMeta" | "tagPayloads" | "isAuthorized">
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

export type EndowmentAssets = {
  free: number;
  invested: number;
  total: number;
};
