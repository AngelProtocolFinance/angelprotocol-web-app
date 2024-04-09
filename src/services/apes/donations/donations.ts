import { IS_TEST } from "constants/env";
import { ReceiptPayload, Token } from "types/aws";
import { apes } from "../apes";

export const donations_api = apes.injectEndpoints({
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
  }),
});
