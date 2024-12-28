import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { PaymentIntent } from "@stripe/stripe-js";
import { APIs } from "constants/urls";
import type { DonationIntent, GuestDonor } from "types/aws";
import { tags } from "./tags";

type StripeRequiresBankVerification = {
  /** timestamp in seconds: only present when status ===  "requires_action"*/
  arrivalDate?: number;
  url?: string;
};

type StripePaymentIntentParams = DonationIntent.Fiat & {
  type: "one-time" | "subscription";
};

export const apes = createApi({
  reducerPath: "apes",
  baseQuery: fetchBaseQuery({
    baseUrl: APIs.apes,
    mode: "cors",
  }),
  tagTypes: tags,
  endpoints: (builder) => ({
    intent: builder.query<DonationIntent.ToResume, { transactionId: string }>({
      query: (params) => ({ url: `donation-intents/${params.transactionId}` }),
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
  useLazyIntentQuery,
  useStripePaymentIntentQuery,
  useLazyChariotGrantQuery,
  useStripePaymentStatusQuery,
  useTopCountriesQuery,
  util: {
    invalidateTags: invalidateApesTags,
    updateQueryData: updateApesQueryData,
  },
} = apes;
