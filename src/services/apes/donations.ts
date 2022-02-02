import createAuthToken from "helpers/createAuthToken";
import { UserTypes } from "services/user/types";
import { apes } from "./apes";
import { ReceiptPayload } from "components/Receipter/types";

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
    requestReceipt: builder.mutation<any, ReceiptPayload>({
      query: (receiptPayload) => {
        const generatedToken = createAuthToken(UserTypes.WEB_APP);
        return {
          url: `donation`,
          method: "POST",
          headers: { authorization: generatedToken },
          body: receiptPayload,
        };
      },
      transformResponse: (response: any) => response, // TODO:  assign type to the response object
    }),
  }),
});

export const { useLogDonationTransactionMutation, useRequestReceiptMutation } =
  donations_api;
