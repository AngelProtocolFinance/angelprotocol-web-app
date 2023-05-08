import {
  Donation,
  DonationsQueryParams,
  ReceiptPayload,
  Token,
} from "types/aws";
import { createAuthToken } from "helpers";
import { IS_TEST } from "constants/env";
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
    donations: builder.query<DonationResult, DonationsQueryParams>({
      providesTags: ["donations"],
      query: ({ id, chain_id, ...rest }) => {
        return {
          url: `v3/donation/${chain_id}/${id}`,
          params: rest,
        };
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
  endpoints: {
    donations: { useLazyQuery: useLazyDonationsQuery },
  },
  util: { updateQueryData: updateDonationsQueryData },
} = donations_api;
