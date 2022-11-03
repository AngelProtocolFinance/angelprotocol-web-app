import { Donation, ReceiptPayload } from "types/aws";
import { createAuthToken } from "helpers";
import { IS_TEST } from "constants/env";
import { apes } from "./apes";
import { apesTags } from "./tags";

type DonationResult = {
  Items: Donation[];
  ItemCutoff: number | undefined;
};

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
      Donation[],
      { id: string | number /** TODO: use key when bug is removed in AWS */ }
    >({
      providesTags: [{ type: apesTags.donations }],
      query: ({ id }) => ({
        url: `v2/donation/${id}${IS_TEST ? "/testnet" : ""}`,
        // headers: { key },
      }),
      transformResponse(res: DonationResult) {
        return res.Items;
      },
    }),
  }),
});

export const { useRequestReceiptMutation, useDonationsQuery } = donations_api;
