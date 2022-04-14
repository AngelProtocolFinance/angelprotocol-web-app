import { Dec } from "@terra-money/terra.js";
import { Holding, Holdings } from "../account/types";
import contract_querier from "../contract_querier";
import { VaultsRateRes } from "../registrar/types";
import { tags, endowment } from "../tags";
import { terra } from "../terra";
import {
  AggregatedResult,
  MultiContractQueryArgs,
  MultiQueryRes,
} from "../types";
import { EndowmentBalance, RateLookUp } from "./types";

export const multicall_api = terra.injectEndpoints({
  endpoints: (builder) => ({
    endowmentBalance: builder.query<EndowmentBalance, MultiContractQueryArgs>({
      providesTags: [{ type: tags.endowment, id: endowment.holdings }],
      query: contract_querier,
      transformResponse: (res: MultiQueryRes) => {
        const [holdings, ratesRes] = decodeAggregatedResult<
          [Holdings, VaultsRateRes]
        >(res.query_result);

        const ratesMap = ratesRes.vaults_rate.reduce((result, curr) => {
          result[curr.vault_addr] = curr.fx_rate;
          return result;
        }, {} as RateLookUp);

        const liquid = getTotalHolding(holdings.liquid_cw20, ratesMap);
        const locked = getTotalHolding(holdings.locked_cw20, ratesMap);
        const total = liquid.add(locked);

        return {
          liquid: liquid.toNumber(),
          locked: locked.toNumber(),
          total: total.toNumber(),
        };
      },
    }),
  }),
});

function getTotalHolding(holdings: Holding[], ratesMap: RateLookUp) {
  return holdings
    .reduce(
      (result, curr) =>
        new Dec(result).add(new Dec(curr.amount).mul(ratesMap[curr.address])),
      new Dec(0)
    )
    .div(1e6);
}

function decodeAggregatedResult<T extends object[]>(
  result: AggregatedResult
): T {
  return result.return_data.map((data) => JSON.parse(atob(data.data))) as T;
}
