import { AWSQueryRes, Donation, ReceiptPayload } from "types/aws";
import { createAuthToken } from "helpers";
import { IS_TEST } from "constants/env";
import { apes } from "./apes";

const donations_api = apes.injectEndpoints({
  endpoints: (builder) => ({
    //post donation receipt
    requestReceipt: builder.mutation<any, ReceiptPayload>({
      query: (receiptPayload) => {
        const generatedToken = createAuthToken("angelprotocol-web-app");
        const { transactionId, ...restOfPayload } = receiptPayload;
        return {
          url: `v1/donation`,
          params: { transactionId },
          method: "PUT",
          headers: { authorization: generatedToken },
          body: restOfPayload,
        };
      },
    }),
    donations: builder.query<
      [Donation[], string | undefined],
      { id: string | number /** TODO: use key when bug is removed in AWS */ }
    >({
      query: ({ id }) => ({
        url: `v1/donation/${id}${IS_TEST ? "/testnet" : ""}`,
        // headers: { key },
      }),
      transformResponse(res: AWSQueryRes<any>) {
        return [res.Items, res.LastEvaluatedKey];
      },
    }),
  }),
});

export const { useRequestReceiptMutation, useDonationsQuery } = donations_api;
