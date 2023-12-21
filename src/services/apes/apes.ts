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
  /**ISO 3166-1 alpha-3 code */
  currency: string;
  endowmentId: number;
  kycData?: KYCData;
  splitLiq: string;
};

export const apes = createApi({
  reducerPath: "apes",
  baseQuery: fetchBaseQuery({
    baseUrl: APIs.apes,
    mode: "cors",
  }),
  tagTypes: tags,
  endpoints: (builder) => ({
    createStripePaymentIntent: builder.mutation<
      { clientSecret: string },
      StripePaymentIntentParams
    >({
      query: (data) => ({
        url: `v2/fiat/stripe-proxy/apes/${apiEnv}`,
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
    getStripePaymentStatus: builder.query<
      Pick<PaymentIntent, "status">,
      { paymentIntentId: string }
    >({
      query: ({ paymentIntentId }) => ({
        url: `v2/fiat/stripe-proxy/apes/${apiEnv}?payment_intent=${paymentIntentId}`,
      }),
    }),
    stripeCurrencies: builder.query<
      { supported_payment_currencies: string[] }, // Array of ISO 3166-1 alpha-3 codes
      { country_code: string } // ISO 3166-1 alpha-2 code
    >({
      query: ({ country_code }) => ({
        url: `v2/fiat/stripe-proxy/apes/${apiEnv}/currencies/${country_code}`,
      }),
    }),
    tokens: builder.query<Token[], ChainID>({
      query: (chainID) => `v1/tokens/${chainID}`,
    }),
  }),
});

export const {
  useCreateStripePaymentIntentMutation,
  useGetStripePaymentStatusQuery,
  useStripeCurrenciesQuery,
  useTokensQuery,
  util: {
    invalidateTags: invalidateApesTags,
    updateQueryData: updateApesQueryData,
  },
} = apes;
