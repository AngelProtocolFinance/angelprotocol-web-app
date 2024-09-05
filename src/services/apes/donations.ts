import { IS_TEST } from "constants/env";
import type {
  PayoutsPage,
  PayoutsQueryParams,
  ReceiptPayload,
  Token,
} from "types/aws";
import { apes } from "../apes";

export const {
  useRequestReceiptMutation,
  useCurrenciesQuery,
  usePayoutsQuery,
  useLazyPayoutsQuery,
  util: { updateQueryData: updateDonationsApiQueryData },
} = apes.injectEndpoints({
  endpoints: (builder) => ({
    //post donation receipt
    requestReceipt: builder.mutation<any, ReceiptPayload>({
      query: (receiptPayload) => {
        const { transactionId, ...restOfPayload } = receiptPayload;
        return {
          url: `crypto-donation/${transactionId}`,
          method: "PUT",
          body: restOfPayload,
        };
      },
    }),
    currencies: builder.query<Token[], void>({
      query: () => `v1/tokens/list${IS_TEST ? "/test" : ""}`,
    }),
    payouts: builder.query<PayoutsPage, PayoutsQueryParams>({
      query: (endowId) => `endowments/${endowId}/payouts`,
    }),
  }),
});
