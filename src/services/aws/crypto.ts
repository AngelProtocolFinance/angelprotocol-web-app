import type { Crypto } from "types/aws";
import { version as v } from "../helpers";
import { aws } from "./aws";

export const { useLazyPaymentQuery } = aws.injectEndpoints({
  endpoints: (builder) => ({
    payment: builder.query<Crypto.PaymentStatus, number>({
      query: (id) => `/${v(1)}/crypto/v1/payment/${id}`,
    }),
  }),
});
