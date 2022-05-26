import { PayloadAction } from "@reduxjs/toolkit";
import { TagDescription } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { Profile } from "types/server/aws";

export type ContractQueryArgs<T = object> = {
  address: string;
  msg: T;
};

export type TerraTags =
  | "gov"
  | "indexfund"
  | "admin"
  | "endowment"
  | "multicall"
  | "registrar";

/**endowments */
export type CategorizedProfiles = {
  [index: number]: Profile[];
};

export type Tag = TagDescription<string>;
export type Tags = TagDescription<string>[];
export type TagPayload = PayloadAction<TagDescription<string>[], string>;
export type TagPayloads = TagPayload[];
