import { aws } from "./aws";

interface PairData {
  return_amount: number;
  spread_amount: number;
  commission_amount: number;
  ask_weight: number;
  offer_weight: number;
}

interface PairDataQueryResult {
  message: string;
  result: PairData;
}

const lbp_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    getLBPPairData: builder.query<PairDataQueryResult, any>({
      query: () => {
        return {
          url: `lbp-price-ping`,
          method: "Get",
        };
      },
      transformResponse: (response: { message: string; result: string }) => {
        const pairData: PairData = JSON.parse(response.result);

        return { message: response.message, result: pairData };
      },
    }),
  }),
});

export const { useGetLBPPairDataQuery } = lbp_api;
