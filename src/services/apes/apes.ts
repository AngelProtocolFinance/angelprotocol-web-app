import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PaymentIntent } from "@stripe/stripe-js";
import { TEMP_JWT } from "constants/auth";
import { APIs } from "constants/urls";
import {
  CryptoDonation,
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
        url: `fiat-donation/paypal/orders/${params.orderId}/capture`,
        method: "POST",
        headers: { authorization: TEMP_JWT },
      }),
    }),
    createCryptoIntent: builder.mutation<{ id: string }, CryptoDonation>({
      query: (params) => ({
        url: `crypto-donation/v2`,
        method: "POST",
        headers: { authorization: TEMP_JWT },
        body: JSON.stringify(params),
      }),
    }),
    confirmCryptoIntent: builder.mutation<
      { guestDonor: GuestDonor },
      { txId: string; txHash: string }
    >({
      query: ({ txHash, txId }) => ({
        url: `crypto-donation/${txId}/confirm`,
        method: "POST",
        headers: { authorization: TEMP_JWT },
        body: JSON.stringify({ txHash }),
      }),
      transformResponse: (res: { guestDonor: GuestDonor }) => res,
    }),
    fiatCurrencies: builder.query<
      { currencies: DetailedCurrency[]; defaultCurr?: DetailedCurrency },
      void
    >({
      query: () => ({ url: "fiat-currencies", credentials: "include" }),
      transformResponse: (res: FiatCurrencyData) => {
        const toDetailed = (
          input: FiatCurrencyData["currencies"][number]
        ): DetailedCurrency => ({
          code: input.currency_code,
          rate: input.rate,
          min: input.minimum_amount,
        });
        return {
          currencies: res.currencies.map((c) => toDetailed(c)),
          defaultCurr: res.default && toDetailed(res.default),
        };
      },
    }),
    paypalOrder: builder.mutation<string, CreatePayPalOrderParams>({
      query: (params) => ({
        url: "fiat-donation/paypal/orders",
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
  useCreateCryptoIntentMutation,
  useConfirmCryptoIntentMutation,
  useFiatCurrenciesQuery,
  useStripePaymentIntentQuery,
  usePaypalOrderMutation,
  useEndowBalanceQuery,
  useGetStripePaymentStatusQuery,
  useTokensQuery,
  util: {
    invalidateTags: invalidateApesTags,
    updateQueryData: updateApesQueryData,
  },
} = apes;
