import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EndowmentBalances, Token } from "types/aws";
import { ChainID } from "types/chain";
import { APIs } from "constants/urls";
import { apiEnv } from "../constants";
import { version as v } from "../helpers";
import { tags } from "./tags";

type StripePaymentIntentParams = {
  amount: number;
  endowId: number;
  liquidSplitPct: string;
};

export const apes = createApi({
  reducerPath: "apes",
  baseQuery: fetchBaseQuery({
    baseUrl: APIs.apes,
    mode: "cors",
  }),
  tagTypes: tags,
  endpoints: (builder) => ({
    tokens: builder.query<Token[], ChainID>({
      query: (chainID) => `v1/tokens/${chainID}`,
    }),

    createStripePaymentIntent: builder.mutation<
      { clientSecret: string },
      StripePaymentIntentParams
    >({
      query: ({ amount, endowId, liquidSplitPct }) => ({
        url: `${v(2)}/fiat/stripe-proxy/apes/${apiEnv}`,
        method: "POST",
        body: JSON.stringify({
          endowmentId: endowId,
          splitLiq: liquidSplitPct,
          amount: amount,
        }),
      }),
    }),
    endowBalance: builder.query<EndowmentBalances, number>({
      query: (endowId) => `${v(1)}/balances/${endowId}`,
    }),
  }),
});

export const {
  useTokensQuery,
  useEndowBalanceQuery,
  useCreateStripePaymentIntentMutation,
  util: {
    invalidateTags: invalidateApesTags,
    updateQueryData: updateApesQueryData,
  },
} = apes;
