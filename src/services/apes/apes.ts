import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PaymentIntent } from "@stripe/stripe-js";
import { EndowmentBalances, Token } from "types/aws";
import { ChainID } from "types/chain";
import { version as v } from "services/helpers";
import { APIs } from "constants/urls";
import { apiEnv } from "../constants";
import { tags } from "./tags";

type StripePaymentIntentParams = {
  amountInCents: number;
  endowmentId: number;
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
    getStripePaymentStatus: builder.query<
      Pick<PaymentIntent, "status">,
      { paymentIntentId: string }
    >({
      query: ({ paymentIntentId }) => ({
        url: `v2/fiat/stripe-proxy/apes/${apiEnv}?paymentIntentId=${paymentIntentId}`,
      }),
    }),
    createStripePaymentIntent: builder.mutation<
      { clientSecret: string },
      StripePaymentIntentParams
    >({
      query: ({ amountInCents, endowmentId, liquidSplitPct }) => ({
        url: `v2/fiat/stripe-proxy/apes/${apiEnv}`,
        method: "POST",
        body: JSON.stringify({
          endowmentId: endowmentId,
          splitLiq: liquidSplitPct,
          amount: amountInCents,
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
  useGetStripePaymentStatusQuery,
  useCreateStripePaymentIntentMutation,
  util: {
    invalidateTags: invalidateApesTags,
    updateQueryData: updateApesQueryData,
  },
} = apes;
