import { PayloadAction } from "@reduxjs/toolkit";
import { TagDescription } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

export type Tag = TagDescription<string>;
export type TagPayload = PayloadAction<Tag[], string>;
