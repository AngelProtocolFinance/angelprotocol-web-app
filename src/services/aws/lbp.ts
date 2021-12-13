import { aws } from "./aws";

export interface PairData {
  pair_contract: string;
  timestamp: number;
  return_amount: number;
  spread_amount: number;
  commission_amount: number;
  ask_weight: number;
  offer_weight: number;
  offer_amount: number;
}

export interface LBPPairDataQueryResult {
  message: string;
  items: PairData[];
  error: any;
  lbp_start_time: number;
  lbp_end_time: number;
  target_price: number;
}

const lbp_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    getLBPPairData: builder.query<LBPPairDataQueryResult, any>({
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
