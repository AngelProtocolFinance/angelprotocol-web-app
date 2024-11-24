import type { FundItem } from "@better-giving/fundraiser";
import type { FundsEndowMemberOfParams } from "@better-giving/fundraiser/schema";
import { TEMP_JWT } from "constants/auth";
import { version as v } from "../helpers";
import { aws } from "./aws";

interface PathParams {
  endowId: number;
  fundId: string;
}
export const {
  useFundsEndowMemberOfQuery,
  useOptOutMutation,
  useApproveMutation,
} = aws.injectEndpoints({
  endpoints: (builder) => ({
    fundsEndowMemberOf: builder.query<
      FundItem[],
      { endowId: number } & FundsEndowMemberOfParams
    >({
      providesTags: ["endow-funds"],
      query: ({ endowId, ...params }) => {
        return {
          params,
          url: `${v(8)}/endowments/${endowId}/funds`,
        };
      },
    }),
    optOut: builder.mutation<unknown, PathParams>({
      invalidatesTags: ["endow-funds"],
      query: ({ fundId, endowId }) => {
        return {
          url: `${v(8)}/endowments/${endowId}/funds/${fundId}/opt-out`,
          method: "POST",
          headers: { authorization: TEMP_JWT },
        };
      },
    }),
    approve: builder.mutation<unknown, PathParams>({
      invalidatesTags: ["endow-funds"],
      query: ({ fundId, endowId }) => {
        return {
          url: `${v(8)}/endowments/${endowId}/funds/${fundId}/approve`,
          method: "POST",
          headers: { authorization: TEMP_JWT },
        };
      },
    }),
  }),
});