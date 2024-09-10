import { IS_TEST } from "constants/env";
import type {
  BalanceMovement,
  EndowmentBalances,
  PayoutsPage,
  PayoutsQueryParams,
  ReceiptPayload,
  Token,
} from "types/aws";
import { apes } from "../apes";

export const {
  useRequestReceiptMutation,
  useMoveFundsMutation,
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
      query: ({ endowId }) => `endowments/${endowId}/payouts`,
    }),
    moveFunds: builder.mutation<
      EndowmentBalances,
      BalanceMovement & { endowId: number }
    >({
      invalidatesTags: (_, error) => (error ? [] : ["balance"]),
      query: ({ endowId, ...payload }) => {
        return {
          url: `endowments/${endowId}/move-balance`,
          method: "PUT",
          body: payload,
        };
      },
    }),
  }),
});
