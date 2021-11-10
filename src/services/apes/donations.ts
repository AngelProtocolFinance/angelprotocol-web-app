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
  }),
});

export const { useLogDonationTransactionMutation } = donations_api;
