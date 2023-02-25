import { IS_TEST } from "@giving/constants/env";
import { createAuthToken } from "@giving/helpers";
import {
  Donation,
  DonationsQueryParams,
  ReceiptPayload,
  Token,
} from "@giving/types/aws";
import { apes } from "./apes";

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
          url: `v2/donation`,
          params: { transactionId },
          method: "PUT",
          headers: { authorization: generatedToken },
          body: restOfPayload,
        };
      },
    }),
    donations: builder.query<Donation[], DonationsQueryParams>({
      providesTags: ["donations"],
      query: ({ id, ...rest }) => {
        return {
          url: `v3/donation/${id}${IS_TEST ? "/testnet" : ""}`,
          params: rest,
        };
      },
      transformResponse(res: DonationResult) {
        return res.Items;
      },
    }),
    currencies: builder.query<Token[], void>({
      query: () => `v1/tokens/list${IS_TEST ? "/test" : ""}`,
    }),
  }),
});

export const {
  useRequestReceiptMutation,
  useDonationsQuery,
  useCurrenciesQuery,
} = donations_api;
