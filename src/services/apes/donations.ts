import { PutRequestValues } from "./types";
import createAuthToken from "helpers/createAuthToken";
import { UserTypes } from "services/user/types";
import { apes } from "./apes";

const donations_api = apes.injectEndpoints({
  endpoints: (builder) => ({
    logDonationTransaction: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: "donation",
          method: "POST",
          headers: { authorization: data.token },
          body: data.body,
        };
      },
      transformResponse: (response: { data: any }) => response,
    }),
    requestReceipt: builder.mutation<any, { receipt: PutRequestValues }>({
      query: ({ receipt }) => {
        const generatedToken = createAuthToken(UserTypes.WEB_APP);
        return {
          url: `donation?transactionId=${receipt.transactionId}`,
          method: "PUT",
          headers: { authorization: generatedToken },
          body: receipt.body,
        };
      },
      transformResponse: (response: any) => response, // TODO:  assign type to the response object
    }),
  }),
});

export const { useLogDonationTransactionMutation, useRequestReceiptMutation } =
  donations_api;
