import { PayloadAction } from "@reduxjs/toolkit";
import { TagDescription } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { Profile, Token } from "types/server/aws";

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

export type TerraTags =
  | "gov"
  | "indexfund"
  | "admin"
  | "endowment"
  | "multicall"
  | "registrar";

/** multicall */
export type TokenWithBalance = Token & { balance: number };

/**endowments */
export type CategorizedProfiles = {
  [index: number]: Profile[];
};

export type Tag = TagDescription<string>;
export type Tags = TagDescription<string>[];
export type TagPayload = PayloadAction<TagDescription<string>[], string>;
export type TagPayloads = TagPayload[];
