import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { PaymentIntent } from "@stripe/stripe-js";
import { fetchAuthSession } from "aws-amplify/auth";
import { TEMP_JWT } from "constants/auth";
import { APIs } from "constants/urls";
import { bgCookies, getCookie, setCookie } from "helpers/cookie";
import type { RootState } from "store/store";
import { userIsSignedIn } from "types/auth";
import type {
  Crypto,
  DonationIntent,
  EndowmentBalances,
  FiatCurrencyData,
  GuestDonor,
  PayPalOrder,
} from "types/aws";
import type { DetailedCurrency } from "types/components";
import { version as v } from "../helpers";
import { tags } from "./tags";

type StripeRequiresBankVerification = {
  /** timestamp in seconds: only present when status ===  "requires_action"*/
  arrivalDate?: number;
  url?: string;
};

type StripePaymentIntentParams = DonationIntent.Fiat & {
  type: "one-time" | "subscription";
};

type CreatePayPalOrderParams = DonationIntent.Fiat;

export const apes = createApi({
  reducerPath: "apes",
  baseQuery: fetchBaseQuery({
    baseUrl: APIs.apes,
    mode: "cors",
    async prepareHeaders(headers, { getState }) {
      const {
        auth: { user },
      } = getState() as RootState;

      if (headers.get("authorization") === TEMP_JWT) {
        if (!userIsSignedIn(user)) return headers;
        const nowSeconds = Math.round(+new Date() / 1000);

        const token =
          nowSeconds < user.tokenExpiry
            ? user.token
            : /** fetching session fires `tokenRefresh | tokenRefresh_failure` event in Hub */
              await fetchAuthSession({ forceRefresh: true }).then((res) =>
                res.tokens?.idToken?.toString()
              );

        if (!token) return headers;

        headers.set("authorization", token);
      }
      return headers;
    },
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
    createCryptoIntent: builder.query<Crypto.NewPayment, DonationIntent.Crypto>(
      {
        query: (params) => ({
          url: "crypto-intents",
          method: "POST",
          headers: { authorization: TEMP_JWT },
          body: JSON.stringify(params),
        }),
      }
    ),
    intent: builder.query<DonationIntent.ToResume, { transactionId: string }>({
      query: (params) => ({ url: `donation-intents/${params.transactionId}` }),
    }),
    fiatCurrencies: builder.query<
      { currencies: DetailedCurrency[]; defaultCurr?: DetailedCurrency },
      /** dbPrefCode */
      string | undefined
    >({
      query: (dbPrefCode) => ({
        url: "fiat-currencies",
        params: { prefCode: dbPrefCode || getCookie(bgCookies.prefCode) },
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
        url: "fiat-donation/paypal/orders/v2",
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
    chariotGrant: builder.query<string, DonationIntent.Fiat>({
      query: (data) => ({
        url: "fiat-donation/chariot",
        method: "POST",
        body: JSON.stringify(data),
      }),
      transformResponse: (res: { grantId: string }) => res.grantId,
    }),
    endowBalance: builder.query<EndowmentBalances, number>({
      providesTags: ["balance"],
      query: (endowId) => `${v(1)}/balances/${endowId}`,
    }),
    stripePaymentStatus: builder.query<
      Pick<PaymentIntent, "status"> &
        StripeRequiresBankVerification & {
          guestDonor?: GuestDonor;
          recipientName?: string;
          recipientId?: number;
        },
      { paymentIntentId: string }
    >({
      query: ({ paymentIntentId }) => ({
        url: `stripe-proxy?payment_intent=${paymentIntentId}`,
      }),
    }),
    topCountries: builder.query<string[], unknown>({
      query: () => "top-countries",
    }),
  }),
});

export const {
  useCapturePayPalOrderMutation,
  useCreateCryptoIntentQuery,
  useLazyIntentQuery,
  useFiatCurrenciesQuery,
  useStripePaymentIntentQuery,
  useLazyChariotGrantQuery,
  usePaypalOrderMutation,
  useEndowBalanceQuery,
  useStripePaymentStatusQuery,
  useTopCountriesQuery,
  util: {
    invalidateTags: invalidateApesTags,
    updateQueryData: updateApesQueryData,
  },
} = apes;
