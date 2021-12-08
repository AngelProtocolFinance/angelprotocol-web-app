import { aws } from "./aws";

const lbp_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    getLBPPairData: builder.query<any, any>({
      query: () => {
        return {
          url: `lbp-price-ping`,
          method: "Get",
        };
      },
      // transformResponse: (response: { data: any }) => response,
    }),
  }),
});

export const { useGetLBPPairDataQuery } = lbp_api;
