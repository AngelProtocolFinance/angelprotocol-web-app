import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PaymentIntent } from "@stripe/stripe-js";
import { EndowmentBalances, FiatCurrencyData, KYCData, Token } from "types/aws";
import { ChainID } from "types/chain";
import { APIs } from "constants/urls";
import { apiEnv } from "../constants";
import { version as v } from "../helpers";
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
    endowBalance: builder.query<EndowmentBalances, number>({
      query: (endowId) => `${v(1)}/balances/${endowId}`,
    }),
    getStripePaymentStatus: builder.query<
      Pick<PaymentIntent, "status">,
      { paymentIntentId: string }
    >({
      query: ({ paymentIntentId }) => ({
        url: `v2/fiat/stripe-proxy/apes/${apiEnv}?payment_intent=${paymentIntentId}`,
      }),
    }),
    stripeCurrencies: builder.query<FiatCurrencyData, null>({
      async queryFn(_args, _api, _extraOptions, baseQuery) {
        return await fetch("https://ipapi.co/json/")
          .then<{
            country_code: string; // ISO 3166-1 alpha-2 code
          }>((response) => response.json())
          .then(({ country_code }) =>
            baseQuery({
              url: `v2/fiat/stripe-proxy/apes/${apiEnv}/currencies/${country_code}`,
            })
          )
          .then((response) => {
            if (response.error) {
              return response;
            }
            return {
              ...response,
              data: response.data as FiatCurrencyData,
            };
          });
      },
    }),
    tokens: builder.query<Token[], ChainID>({
      query: (chainID) => `v1/tokens/${chainID}`,
    }),
  }),
});

export const {
  useCreateStripePaymentIntentMutation,
  useEndowBalanceQuery,
  useGetStripePaymentStatusQuery,
  useStripeCurrenciesQuery,
  useTokensQuery,
  util: {
    invalidateTags: invalidateApesTags,
    updateQueryData: updateApesQueryData,
  },
} = apes;
