import {
  DonationRecord,
  DonationsQueryParams,
  PaginatedAWSQueryRes,
  ReceiptPayload,
  Token,
} from "types/aws";
import { IS_TEST } from "constant/env";
import { version as v } from "../../helpers";
import { apes } from "../apes";

export const donations_api = apes.injectEndpoints({
  endpoints: (builder) => ({
    //post donation receipt
    requestReceipt: builder.mutation<any, ReceiptPayload>({
      query: (receiptPayload) => {
        const { transactionId, ...restOfPayload } = receiptPayload;
        return {
          url: `${v(3)}/donation`,
          params: { transactionId },
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
      query: ({ id, chain_id, ...rest }) => {
        return {
          url: `${v(3)}/donation/${chain_id}/${id}`,
          params: rest,
        };
      },
    }),
    currencies: builder.query<Token[], void>({
      query: () => `v1/tokens/list${IS_TEST ? "/test" : ""}`,
    }),
  }),
});
