import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { PaymentIntent } from "@stripe/stripe-js";
import { APIs } from "constants/urls";
import type { GuestDonor } from "types/aws";
import { tags } from "./tags";

type StripeRequiresBankVerification = {
  /** timestamp in seconds: only present when status ===  "requires_action"*/
  arrivalDate?: number;
  url?: string;
};

export const apes = createApi({
  reducerPath: "apes",
  baseQuery: fetchBaseQuery({
    baseUrl: APIs.apes,
    mode: "cors",
  }),
  tagTypes: tags,
  endpoints: (builder) => ({
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
  useStripePaymentStatusQuery,
  useTopCountriesQuery,
  util: {
    invalidateTags: invalidateApesTags,
    updateQueryData: updateApesQueryData,
  },
} = apes;
