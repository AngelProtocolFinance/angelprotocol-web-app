import { aws } from "./aws";

interface PairData {
  pair_contract: string;
  timestamp: number;
  return_amount: number;
  spread_amount: number;
  commission_amount: number;
  ask_weight: number;
  offer_weight: number;
}

interface PairDataQueryResult {
  message: string;
  result: PairData;
  error: object;
}

const lbp_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    getLBPPairData: builder.query<PairDataQueryResult, any>({
      query: () => {
        return {
          url: "lbp-pair-data-get",
          method: "Get",
        };
      },
    }),
  }),
});

export const { useGetLBPPairDataQuery } = lbp_api;
