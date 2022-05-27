import { PayloadAction } from "@reduxjs/toolkit";
import { TagDescription } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { NativeToken, Profile } from "types/server/aws";

/** tokens */
export type NativeTokenWithBalance = NativeToken & { balance: string };

/**endowments */
export type CategorizedProfiles = {
  [index: number]: Profile[];
};

export type Tag = TagDescription<string>;
export type Tags = TagDescription<string>[];
export type TagPayload = PayloadAction<TagDescription<string>[], string>;
export type TagPayloads = TagPayload[];
