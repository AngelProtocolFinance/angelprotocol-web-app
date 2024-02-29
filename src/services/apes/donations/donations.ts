import { IS_TEST } from "constants/env";
import {
  DonationRecord,
  DonationsQueryParams,
  PaginatedAWSQueryRes,
  ReceiptPayload,
  Token,
} from "types/aws";
import { version as v } from "../../helpers";
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
    donations: builder.query<
      PaginatedAWSQueryRes<DonationRecord[]>,
      DonationsQueryParams
    >({
      providesTags: ["donations"],
      query: ({ id, chain_id, status, ...rest }) => {
        return {
          url:
            status === "ON-HOLD"
              ? `v1/donations/on-hold/${id}`
              : `${v(3)}/donation/${chain_id}/${id}`,
          params: rest,
        };
      },
    }),
    currencies: builder.query<Token[], void>({
      query: () => `v1/tokens/list${IS_TEST ? "/test" : ""}`,
    }),
  }),
});
