import { ReceiptPayload } from "@types-server/aws";
import createAuthToken from "helpers/createAuthToken";
import { apes } from "./apes";

const donations_api = apes.injectEndpoints({
  endpoints: (builder) => ({
    requestReceipt: builder.mutation<any, ReceiptPayload>({
      query: (receiptPayload) => {
        const generatedToken = createAuthToken("angelprotocol-web-app");
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
