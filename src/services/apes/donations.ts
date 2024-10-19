import type { ReceiptPayload } from "types/aws";
import { apes } from "../apes";

export const {
  useRequestReceiptMutation,
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
  }),
});
