import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PaymentIntent } from "@stripe/stripe-js";
import { TEMP_JWT } from "constants/auth";
import { APIs } from "constants/urls";
import {
  Donor,
  EndowmentBalances,
  FiatCurrencyData,
  PayPalOrder,
  Token,
} from "types/aws";
import { ChainID } from "types/chain";
import { DetailedCurrency } from "types/components";
import { apiEnv } from "../constants";
import { version as v } from "../helpers";
import { tags } from "./tags";

type StripePaymentIntentParams = {
  type: "one-time" | "subscription";
  /** Denominated in USD. */
  amount: number;
  tipAmount: number;
  usdRate: number;
  /**ISO 3166-1 alpha-3 code. */
  currency: string;
  endowmentId: number;
  splitLiq: number;
  donor: Donor;
};

type CreatePayPalOrderParams = {
  /** Denominated in USD. */
  amount: number;
  tipAmount: number;
  usdRate: number;
  /**ISO 3166-1 alpha-3 code */
  currency: string;
  endowmentId: number;
  splitLiq: number;
  donor: Donor;
};

type ChariotGrantIntentParams = {
  /** Denominated in USD. */
  amount: number;
  tipAmount: number;
  usdRate: number;
  /**ISO 3166-1 alpha-3 code. */
  currency: string;
  endowmentId: number;
  splitLiq: number;
  transactionId?: string;
  donor: Donor;
};

export const apes = createApi({
  reducerPath: "apes",
  baseQuery: fetchBaseQuery({
    baseUrl: APIs.apes,
    mode: "cors",
  }),
  tagTypes: tags,
  endpoints: (builder) => ({
    capturePayPalOrder: builder.mutation<PayPalOrder, { orderId: string }>({
      query: (params) => ({
        url: `v1/fiat/paypal/${apiEnv}/orders/${params.orderId}/capture`,
        method: "POST",
        headers: { authorization: TEMP_JWT },
      }),
    }),
    chariotGrantIntent: builder.mutation<string, ChariotGrantIntentParams>({
      query: (data) => ({
        url: `v1/fiat/chariot-connect`,
        method: "POST",
        body: JSON.stringify(data),
      }),
      transformResponse: (res: { grantId: string }) => res.grantId,
    }),
    paypalOrder: builder.query<string, CreatePayPalOrderParams>({
      query: (params) => ({
        url: `v1/fiat/paypal/${apiEnv}/orders`,
        method: "POST",
        headers: { authorization: TEMP_JWT },
        body: JSON.stringify(params),
      }),
      transformResponse: (res: { orderId: string }) => res.orderId,
    }),
    stripePaymentIntent: builder.query<string, StripePaymentIntentParams>({
      query: (data) => ({
        url: "fiat-donation/stripe",
        method: "POST",
        body: JSON.stringify(data),
      }),
      transformResponse: (res: { clientSecret: string }) => res.clientSecret,
    }),
    endowBalance: builder.query<EndowmentBalances, number>({
      query: (endowId) => `${v(1)}/balances/${endowId}`,
    }),
    getStripePaymentStatus: builder.query<
      Pick<PaymentIntent, "status">,
      { paymentIntentId: string }
    >({
      query: ({ paymentIntentId }) => ({
        url: `v2/fiat/stripe-proxy/${apiEnv}?payment_intent=${paymentIntentId}`,
      }),
    }),
    paypalCurrencies: builder.query<DetailedCurrency[], null>({
      query: () => ({
        url: `v1/fiat/paypal/currencies`,
      }),
      transformResponse: (res: FiatCurrencyData) =>
        res.currencies.map((c) => ({
          code: c.currency_code,
          min: c.minimum_amount,
          rate: c.rate,
        })),
    }),
    stripeCurrencies: builder.query<DetailedCurrency[], null>({
      async queryFn(_args, _api, _extraOptions, baseQuery) {
        return await fetch("https://ipapi.co/json/")
          .then<{
            country_code: string; // ISO 3166-1 alpha-2 code
          }>((response) => response.json())
          .then(({ country_code }) =>
            baseQuery({
              url: `v2/fiat/stripe-proxy/${apiEnv}/currencies/${country_code}`,
            })
          )
          .then((response) => {
            if (response.error) {
              return response;
            }

            const data = response.data as FiatCurrencyData;

            return {
              data: data.currencies.map((c) => ({
                code: c.currency_code,
                min: c.minimum_amount,
                rate: c.rate,
              })),
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
  useCapturePayPalOrderMutation,
  useChariotGrantIntentMutation,
  useStripePaymentIntentQuery,
  usePaypalOrderQuery,
  useEndowBalanceQuery,
  useGetStripePaymentStatusQuery,
  usePaypalCurrenciesQuery,
  useStripeCurrenciesQuery,
  useTokensQuery,
  util: {
    invalidateTags: invalidateApesTags,
    updateQueryData: updateApesQueryData,
  },
} = apes;
