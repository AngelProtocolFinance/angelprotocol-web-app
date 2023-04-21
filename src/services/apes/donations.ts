import {
  Donation,
  DonationsQueryParams,
  ReceiptPayload,
  Token,
} from "types/aws";
import { NetworkType } from "types/lists";
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
      query: ({ id, ...rest }) => {
        return {
          url: `v3/donation/${id}${IS_TEST ? "/testnet" : ""}`,
          params: rest,
        };
      },
    }),
    currencies: builder.query<Token[], void>({
      query: () => `v1/tokens/list${IS_TEST ? "/test" : ""}`,
    }),
    requestWidgetUrl: builder.mutation<any, any>({
      query: (payload) => {
        const network: NetworkType = IS_TEST ? "testnet" : "mainnet";
        const generatedToken = createAuthToken("angelprotocol-web-app");
        return {
          url: `/v1/fiat/meld-widget-proxy/${network}`,
          method: "POST",
          headers: { authorization: generatedToken },
          body: payload,
        };
      },
    }),
  }),
});

export const {
  useRequestReceiptMutation,
  useDonationsQuery,
  useCurrenciesQuery,
  useRequestWidgetUrlMutation,
  endpoints: {
    donations: { useLazyQuery: useLazyDonationsQuery },
  },
  util: { updateQueryData: updateDonationsQueryData },
} = donations_api;
