import { PayloadAction } from "@reduxjs/toolkit";
import { TagDescription } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import {
  AdminVoteInfo,
  CW3Config,
  EndowmentDetails,
  Proposal,
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

export type AdminRoles = "ap" | "reviewer" | "charity";
export type AdminResources = {
  cw3: string;
  cw4: string;
  endowmentId: number;
  endowment: EndowmentDetails;
  cw3config: CW3Config;
  role: AdminRoles;
  propMeta: Required<Pick<TxArgs, "successMeta" | "tagPayloads">> & {
    willExecute?: true;
  };
};

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
