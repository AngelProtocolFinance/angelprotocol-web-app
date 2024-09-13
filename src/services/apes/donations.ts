import { TEMP_JWT } from "constants/auth";
import { IS_TEST } from "constants/env";
import type {
  BalanceMovement,
  BalanceTxsPage,
  BalanceTxsQueryParams,
  EndowmentBalances,
  ReceiptPayload,
  Token,
} from "types/aws";
import { apes } from "../apes";

export const {
  useRequestReceiptMutation,
  useMoveFundsMutation,
  useCurrenciesQuery,
  useBalanceTxsQuery,
  useLazyBalanceTxsQuery,
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
    balanceTxs: builder.query<BalanceTxsPage, BalanceTxsQueryParams>({
      query: ({ endowId, ...params }) => {
        return {
          url: `endowments/${endowId}/balance-txs`,
          params,
        };
      },
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
          headers: { authorization: TEMP_JWT },
        };
      },
    }),
  }),
});
