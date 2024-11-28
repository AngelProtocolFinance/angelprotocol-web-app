import type {
  FundUpdate,
  FundsPage,
  FundsParams,
  NewFund,
  SingleFund,
} from "@better-giving/fundraiser";

import { TEMP_JWT } from "constants/auth";
import { version as v } from "../helpers";
import { aws } from "./aws";

export const funds = aws.injectEndpoints({
  endpoints: (builder) => ({
    createFund: builder.mutation<{ id: string }, NewFund>({
      invalidatesTags: ["funds"],
      query: (payload) => {
        return {
          url: `${v(1)}/funds`,
          method: "POST",
          body: payload,
          headers: { authorization: TEMP_JWT },
        };
      },
    }),
    editFund: builder.mutation<SingleFund, FundUpdate & { id: string }>({
      invalidatesTags: ["funds", "fund"],
      query: ({ id, ...payload }) => {
        return {
          url: `${v(1)}/funds/${id}`,
          method: "PATCH",
          body: payload,
          headers: { authorization: TEMP_JWT },
        };
      },
    }),
    closeFund: builder.mutation<unknown, string>({
      invalidatesTags: ["funds", "fund", "user-funds"],
      query: (fundId) => {
        return {
          url: `${v(1)}/funds/${fundId}/close`,
          method: "POST",
          headers: { authorization: TEMP_JWT },
        };
      },
    }),
    funds: builder.query<FundsPage, FundsParams>({
      providesTags: ["funds"],
      query: (params) => {
        return {
          url: `${v(1)}/funds`,
          params,
        };
      },
    }),
    fund: builder.query<SingleFund, string>({
      providesTags: ["fund"],
      query: (fundId) => `${v(1)}/funds/${fundId}`,
    }),
  }),
});

export const {
  useCreateFundMutation,
  useLazyFundsQuery,
  useFundsQuery,
  useFundQuery,
  useEditFundMutation,
  useCloseFundMutation,
  util: { updateQueryData: updateAwsQueryData },
} = funds;
