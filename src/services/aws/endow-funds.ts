import type { FundItem } from "@better-giving/fundraiser";
import { version as v } from "../helpers";
import { aws } from "./aws";

export const { useFundsEndowMemberOfQuery, useOptOutMutation } =
  aws.injectEndpoints({
    endpoints: (builder) => ({
      fundsEndowMemberOf: builder.query<FundItem[], { endowId: number }>({
        providesTags: ["endow-funds"],
        query: ({ endowId }) => {
          return {
            url: `${v(8)}/endowments/${endowId}/funds`,
          };
        },
      }),
      optOut: builder.mutation<unknown, string>({
        invalidatesTags: ["endow-funds"],
        query: (fundId) => {
          return {
            url: `${v(1)}/funds/${fundId}/opt-out`,
            method: "POST",
          };
        },
      }),
      approve: builder.mutation<unknown, string>({
        invalidatesTags: ["endow-funds"],
        query: (fundId) => {
          return {
            url: `${v(1)}/funds/${fundId}/approve`,
            method: "POST",
          };
        },
      }),
    }),
  });
