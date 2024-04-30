import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PaymentIntent } from "@stripe/stripe-js";
import { TEMP_JWT } from "constants/auth";
import { APIs } from "constants/urls";
import { bgCookies, getCookie, setCookie } from "helpers/cookie";
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
    createCryptoIntent: builder.query<
      { transactionId: string },
      CryptoDonation
    >({
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
    }),
    fiatCurrencies: builder.query<
      { currencies: DetailedCurrency[]; defaultCurr?: DetailedCurrency },
      void
    >({
      query: () => ({
        url: "fiat-currencies",
        params: { prefCode: getCookie(bgCookies.prefCode) },
      }),
      transformResponse: (res: FiatCurrencyData) => {
        const toDetailed = (
          input: FiatCurrencyData["currencies"][number]
        ): DetailedCurrency => ({
          code: input.currency_code,
          rate: input.rate,
          min: input.minimum_amount,
        });

        if (res.default) {
          setCookie(
            bgCookies.prefCode,
            res.default.currency_code.toUpperCase()
          );
        }

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
  useCreateCryptoIntentQuery,
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
