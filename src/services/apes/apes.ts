import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PaymentIntent } from "@stripe/stripe-js";
import { KYCData, Token } from "types/aws";
import { ChainID } from "types/chain";
import { APIs } from "constants/urls";
import { apiEnv } from "../constants";
import { tags } from "./tags";

type StripePaymentIntentParams = {
  /** Denominated in USD. */
  amount: number;
  endowmentId: number;
  liquidSplitPct: string;
  kycData?: KYCData;
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
      { clientSecret: string }
    >({
      query: ({ clientSecret }) => ({
        url: `v2/fiat/stripe-proxy/apes/${apiEnv}?client_secret=${clientSecret}`,
      }),
    }),
    createStripePaymentIntent: builder.mutation<
      { clientSecret: string },
      StripePaymentIntentParams
    >({
      query: ({ amount, endowmentId, liquidSplitPct, kycData }) => ({
        url: `v2/fiat/stripe-proxy/apes/${apiEnv}`,
        method: "POST",
        body: JSON.stringify({
          amount,
          endowmentId,
          kycData,
          splitLiq: liquidSplitPct,
        }),
      }),
    }),
  }),
});

export const {
  useTokensQuery,
  useGetStripePaymentStatusQuery,
  useCreateStripePaymentIntentMutation,
  util: {
    invalidateTags: invalidateApesTags,
    updateQueryData: updateApesQueryData,
  },
} = apes;
