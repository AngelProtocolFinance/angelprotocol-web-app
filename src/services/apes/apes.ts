import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PaymentIntent } from "@stripe/stripe-js";
import { TEMP_JWT } from "constants/auth";
import { APIs } from "constants/urls";
import {
  Donor,
  EndowmentBalances,
  FiatCurrencyData,
  GuestDonor,
  PayPalOrder,
  Token,
} from "types/aws";
import { ChainID } from "types/chain";
import { DetailedCurrency } from "types/components";
import { DonationSource } from "types/lists";
import { apiEnv } from "../constants";
import { version as v } from "../helpers";
import { tags } from "./tags";

type FiatDonation = {
  /** Denominated in USD. */
  amount: number;
  tipAmount: number;
  usdRate: number;
  /**ISO 3166-1 alpha-3 code. */
  currency: string;
  endowmentId: number;
  splitLiq: number;
  donor: Donor;
  source: DonationSource;
};

type StripePaymentIntentParams = FiatDonation & {
  type: "one-time" | "subscription";
};

type CreatePayPalOrderParams = FiatDonation;

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
    fiatCurrencies: builder.query<DetailedCurrency[], void>({
      query: () => ({
        url: `v1/fiat/currencies`,
      }),
      transformResponse: (res: FiatCurrencyData) =>
        res.currencies.map((c) => ({
          code: c.currency_code,
          min: c.minimum_amount,
          rate: c.rate,
        })),
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
      Pick<PaymentIntent, "status"> & {
        guestDonor?: GuestDonor;
        recipientName?: string;
      },
      { paymentIntentId: string }
    >({
      query: ({ paymentIntentId }) => ({
        url: `v2/fiat/stripe-proxy/${apiEnv}?payment_intent=${paymentIntentId}`,
      }),
    }),
    tokens: builder.query<Token[], ChainID>({
      query: (chainID) => `v1/tokens/${chainID}`,
    }),
  }),
});

export const {
  useCapturePayPalOrderMutation,
  useFiatCurrenciesQuery,
  useStripePaymentIntentQuery,
  usePaypalOrderQuery,
  useEndowBalanceQuery,
  useGetStripePaymentStatusQuery,
  useTokensQuery,
  util: {
    invalidateTags: invalidateApesTags,
    updateQueryData: updateApesQueryData,
  },
} = apes;
