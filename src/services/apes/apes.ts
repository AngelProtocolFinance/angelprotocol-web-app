import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PaymentIntent } from "@stripe/stripe-js";
import { Token } from "types/aws";
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
    getStripePaymentIntent: builder.query<
      PaymentIntent,
      { clientSecret: string }
    >({
      query: ({ clientSecret }) => ({
        url: `${v(
          1
        )}/fiat/stripe-proxy/apes/${apiEnv}/get-payment-intent/${clientSecret}`,
      }),
    }),
    createStripePaymentIntent: builder.mutation<
      { clientSecret: string },
      StripePaymentIntentParams
    >({
      query: ({ amount, endowId, liquidSplitPct }) => ({
        // url: `${v(2)}/fiat/stripe-proxy/apes/${apiEnv}`,
        url: "temp-stripe-proxy-to-delete-later",
        method: "POST",
        body: JSON.stringify({
          endowmentId: endowId,
          splitLiq: liquidSplitPct,
          amount: amount,
        }),
      }),
    }),
  }),
});

export const {
  useTokensQuery,
  useGetStripePaymentIntentQuery,
  useCreateStripePaymentIntentMutation,
  util: {
    invalidateTags: invalidateApesTags,
    updateQueryData: updateApesQueryData,
  },
} = apes;
