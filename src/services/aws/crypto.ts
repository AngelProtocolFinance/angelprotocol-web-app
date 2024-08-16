import { version as v } from "../helpers";
import { aws } from "./aws";

export const { useLazyMinAmountQuery } = aws.injectEndpoints({
  endpoints: (builder) => ({
    minAmount: builder.query<number, string>({
      query: (from) => `/${v(1)}/crypto/v1/min-amount?currency_from=${from}`,
      transformResponse: (res: { min_amount: number }) => res.min_amount,
    }),
  }),
});
