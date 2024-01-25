import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PaymentIntent } from "@stripe/stripe-js";
import { CurrencyInfos } from "services/types";
import {
  EndowmentBalances,
  FiatCurrencyData,
  KYCData,
  PayPalOrder,
  Token,
} from "types/aws";
import { ChainID } from "types/chain";
import { Currency } from "components/CurrencySelector";
import { TEMP_JWT } from "constants/auth";
import { APIs } from "constants/urls";
import { apiEnv } from "../constants";
import { version as v } from "../helpers";
import { tags } from "./tags";

type StripePaymentIntentParams = {
  /** Denominated in USD. */
  amount: number;
  /**ISO 3166-1 alpha-3 code. */
  currency: string;
  email: string;
  endowmentId: number;
  kycData?: KYCData;
  splitLiq: string;
};

type CreatePayPalOrderParams = {
  /** Denominated in USD. */
  amount: number;
  /**ISO 3166-1 alpha-3 code */
  currency: string;
  email: string;
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
    capturePayPalOrder: builder.mutation<PayPalOrder, { orderId: string }>({
      query: (params) => ({
        url: `v1/fiat/paypal/${apiEnv}/orders/${params.orderId}/capture`,
        method: "POST",
        headers: { authorization: TEMP_JWT },
      }),
    }),
    createPayPalOrder: builder.mutation<
      { orderId: string },
      CreatePayPalOrderParams
    >({
      query: (params) => ({
        url: `v1/fiat/paypal/${apiEnv}/orders`,
        method: "POST",
        headers: { authorization: TEMP_JWT },
        body: JSON.stringify(params),
      }),
    }),
    createStripePaymentIntent: builder.mutation<
      { clientSecret: string },
      StripePaymentIntentParams
    >({
      query: (data) => ({
        url: `v2/fiat/stripe-proxy/${apiEnv}`,
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
        url: `v2/fiat/stripe-proxy/${apiEnv}?payment_intent=${paymentIntentId}`,
      }),
    }),
    paypalCurrencies: builder.query<
      { currencies: Currency[]; map: CurrencyInfos },
      null
    >({
      query: () => ({
        url: `v1/fiat/paypal/currencies`,
      }),
      transformResponse(res: FiatCurrencyData) {
        return {
          currencies: res.currencies.map((c) => ({ code: c.currency_code })),
          map: res.currencies.reduce(
            (prev, curr) => ({
              ...prev,
              [curr.currency_code]: {
                minAmount: curr.minimum_amount,
                rate: curr.rate,
                code: curr.currency_code,
              },
            }),
            {} as CurrencyInfos
          ),
        };
      },
    }),
    stripeCurrencies: builder.query<
      { currencies: Currency[]; map: CurrencyInfos },
      null
    >({
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
            const currencies: Currency[] = data.currencies.map((c) => ({
              code: c.currency_code,
            }));

            const map = data.currencies.reduce(
              (prev, curr) => ({
                ...prev,
                [curr.currency_code]: {
                  minAmount: curr.minimum_amount,
                  rate: curr.rate,
                  code: curr.currency_code,
                },
              }),
              {} as CurrencyInfos
            );

            return {
              ...response,
              data: { currencies, map },
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
  useCreateStripePaymentIntentMutation,
  useCreatePayPalOrderMutation,
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
