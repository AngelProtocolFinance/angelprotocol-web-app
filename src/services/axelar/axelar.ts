import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
  retry,
} from "@reduxjs/toolkit/query/react";
import { InvestGasEstimateParams } from "../types";
import {
  GasEstimateResponse,
  GasFeeEstimationParams,
  QueryRes,
  Transaction,
} from "types/axelar";
import { contracts } from "constants/contracts";
import { IS_TEST } from "constants/env";

const customBaseQuery: BaseQueryFn = retry(
  async (args, api, extraOptions) => {
    return fetchBaseQuery({
      baseUrl: IS_TEST
        ? "https://testnet.api.gmp.axelarscan.io"
        : "https://api.gmp.axelarscan.io",
    })(args, api, extraOptions);
  },
  { maxRetries: 1 }
);

//https://docs.axelarscan.io/interchain/searchGMP
type Transactions = {
  items: Transaction[];
  next: number | undefined;
};

const TX_PER_PAGE = 5;
export const axelar = createApi({
  reducerPath: "axelar",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    //implementation endpoint of useQueryHook
    gasFeeEstimate: builder.query<any, InvestGasEstimateParams>({
      query: ({ tokenToInvest, strategy }) => {
        const payload: GasFeeEstimationParams = {
          method: "estimateGasFee",
          sourceChain: "Polygon",
          destinationChain: strategy.networkId,
          gasMultiplier: 1.5,
          showDetailedFees: true,

          sourceTokenSymbol: tokenToInvest.symbol,
          sourceTokenAddress: "0x2c852e740B62308c46DD29B982FBb650D063Bd07", //aUSDC

          sourceContractAddress: contracts["accounts"],
          destinationContractAddress: strategy.router,

          symbol: tokenToInvest.symbol,
          amount: tokenToInvest.amount,
        };

        return {
          method: "POST",
          body: JSON.stringify(payload),
        };
      },
      transformResponse(res: GasEstimateResponse) {
        const {
          base_fee,
          express_fee,

          //source
          source_base_fee,
          source_confirm_fee,
          source_express_fee,

          //destination
          destination_base_fee,
          destination_confirm_fee,
          destination_express_fee,

          /** tokens involved  */
          destination_native_token,
          axelar_token,
          source_token,

          //settings
          express_supported,
        } = res.apiResponse.result;

        const totalAxelarFee = base_fee + (express_supported ? 0 : express_fee);
        const totalDestinationFee =
          destination_base_fee +
          destination_confirm_fee +
          (express_supported ? 0 : destination_express_fee.total);

        const totalSourceFee =
          source_base_fee +
          source_confirm_fee +
          (express_supported ? 0 : source_express_fee.total);

        const totalDestinationFee_sourceDenom =
          totalDestinationFee * //to source token denom
          (destination_native_token.token_price.usd /
            source_token.token_price.usd);

        const totalAxelarFees_sourceDenom =
          totalAxelarFee * //to source token denom
          (axelar_token.token_price.usd / source_token.token_price.usd);

        const totalFee =
          totalSourceFee +
          totalDestinationFee_sourceDenom +
          totalAxelarFees_sourceDenom;

        console.log({ totalFee, res });
      },
    }),
    transactions: builder.query<Transactions, { page: number }>({
      query: ({ page }) => ({
        method: "POST",
        body: JSON.stringify({
          method: "searchGMP",
          contractMethod: "callContractWithToken",
          sourceChain: "polygon",
          sourceContractAddress: contracts["accounts"],
          from: (page - 1) * TX_PER_PAGE,
          size: TX_PER_PAGE,
        }),
      }),
      transformResponse(res: QueryRes<Transaction>, meta, { page: currPage }) {
        return {
          items: res.data,
          next: currPage * TX_PER_PAGE < res.total ? currPage + 1 : undefined,
        };
      },
    }),
  }),
});
