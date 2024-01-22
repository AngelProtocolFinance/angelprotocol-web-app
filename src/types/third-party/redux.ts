import { PayloadAction } from "@reduxjs/toolkit";
import { BaseQueryFn } from "@reduxjs/toolkit/dist/query";
import { TagDescription } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { TypedUseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";

type Tag = TagDescription<string>;
export type TagPayload = PayloadAction<Tag[], string>;
type Base = BaseQueryFn<any, unknown, unknown, {}, {}>;
export type QueryState<T> = Pick<
  TypedUseQueryHookResult<T, any, Base>,
  "isLoading" | "isError" | "data" | "isFetching" | "error"
>;
