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

const parsePairData = (input: string) => {
  const parsedResult = JSON.parse(input);

  const return_amount = +parsedResult.return_amount;
  const spread_amount = +parsedResult.spread_amount;
  const commission_amount = +parsedResult.commission_amount;
  const ask_weight = +parsedResult.ask_weight;
  const offer_weight = +parsedResult.offer_weight;

  return {
    return_amount,
    spread_amount,
    commission_amount,
    ask_weight,
    offer_weight,
  };
};

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
        const result = parsePairData(response.result);

        return { message: response.message, result };
      },
    }),
  }),
});

export const { useGetLBPPairDataQuery } = lbp_api;
