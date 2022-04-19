import { LBPPairDataQueryResult } from "types/services/aws/lbp";
import { aws } from "./aws";

const lbp_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    getLBPPairData: builder.query<LBPPairDataQueryResult, any>({
      query: () => {
        return {
          url: "lbp-pair-data-get",
          method: "Get",
        };
      },
      extraOptions: { maxRetries: 5 },
    }),
  }),
});

export const { useGetLBPPairDataQuery } = lbp_api;
