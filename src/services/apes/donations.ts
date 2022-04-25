import createAuthToken, { UserTypes } from "helpers/createAuthToken";
import { apes } from "./apes";
import { ReceiptPayload } from "./types";

const donations_api = apes.injectEndpoints({
  endpoints: (builder) => ({
    requestReceipt: builder.mutation<any, ReceiptPayload>({
      query: (receiptPayload) => {
        const generatedToken = createAuthToken(UserTypes.WEB_APP);
        const { transactionId, ...restOfPayload } = receiptPayload;
        return {
          url: `donation`,
          params: { transactionId },
          method: "PUT",
          headers: { authorization: generatedToken },
          body: restOfPayload,
        };
      },
    }),
  }),
});

export const { useRequestReceiptMutation } = donations_api;
