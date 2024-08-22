import type { Crypto } from "types/aws";
import { version as v } from "../helpers";
import { aws } from "./aws";

export const {
  useTokenEstimateQuery,
  useLazyTokenEstimateQuery,
  useLazyPaymentQuery,
} = aws.injectEndpoints({
  endpoints: (builder) => ({
    tokenEstimate: builder.query<Required<Crypto.Estimate>, string>({
      query: (from) =>
        `/${v(
          1
        )}/crypto/v1/min-amount?currency_from=${from}&fiat_equivalent=usd`,
    }),
    payment: builder.query<Crypto.PaymentStatus, number>({
      query: (id) => `/${v(1)}/crypto/v1/payment/${id}`,
    }),
  }),
});
