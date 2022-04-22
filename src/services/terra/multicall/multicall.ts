import { Dec } from "@terra-money/terra.js";
import {
  AggregatedResult,
  MultiContractQueryArgs,
  MultiQueryRes,
  multicallTags,
  terraTags,
} from "types/services/terra";
import { Holding, Holdings } from "types/services/terra/account";
import { VaultsRateRes } from "types/services/terra/registrar";
import { WalletProxy } from "providers/WalletProvider";
import Multicall from "contracts/Multicall";
import { aws_endpoint } from "constants/urls";
import contract_querier from "../contract_querier";
import { terra } from "../terra";
import { vaultMap } from "./constants";
import {
  Airdrops,
  ClaimInquiry,
  VaultField,
  VaultFieldIds,
  VaultFieldLimits,
} from "./types";
import { EndowmentBalance, RateLookUp } from "./types";

export const multicall_api = terra.injectEndpoints({
  endpoints: (builder) => ({
    endowmentBalance: builder.query<EndowmentBalance, MultiContractQueryArgs>({
      providesTags: [
        { type: terraTags.multicall, id: multicallTags.endowmentBalance },
      ],
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
    withdrawConstraints: builder.query<
      { vaultFields: VaultField[]; vaultLimits: VaultFieldLimits },
      MultiContractQueryArgs
    >({
      providesTags: [
        { type: terraTags.multicall, id: multicallTags.endowmentBalance },
      ],
      query: contract_querier,
      transformResponse: (res: MultiQueryRes) => {
        const [holdings, ratesRes] = decodeAggregatedResult<
          [Holdings, VaultsRateRes]
        >(res.query_result);

        const vaultLimits: VaultFieldLimits = {
          [VaultFieldIds.anchor1_amount]: {
            limit: 0,
            addr: "",
            rate: 1,
          },
          [VaultFieldIds.anchor2_amount]: {
            limit: 0,
            addr: "",
            rate: 1,
          },
        };

        //map vaultFields while updating limits
        const vaultFields = ratesRes.vaults_rate.map((vault) => {
          const vaultHolding = holdings.liquid_cw20.find(
            (liquidHolding) => liquidHolding.address === vault.vault_addr
          );
          const vaultInfo = vaultMap[vault.vault_addr];
          let ustBalance = 0;

          if (vaultHolding) {
            ustBalance = new Dec(vaultHolding.amount)
              .mul(vault.fx_rate)
              .toNumber();
            vaultLimits[vaultInfo.fieldId] = {
              limit: ustBalance,
              addr: vaultHolding.address,
              rate: new Dec(vault.fx_rate).toNumber(),
            };
          }

          return {
            ...vaultInfo,
            ustBalance,
          };
        });

        return { vaultFields, vaultLimits };
      },
    }),
    airdrop: builder.query<any, WalletProxy>({
      providesTags: [{ type: terraTags.multicall, id: multicallTags.airdrops }],
      async queryFn(wallet, queryApi, extraOptions, baseQuery) {
        try {
          const airDropsRes = await fetch(
            `${aws_endpoint}/airdrop/${wallet.address}/${wallet.network.chainID}`
          );
          const airDrops = (await airDropsRes.json()) as Airdrops;
          const multiCallContract = new Multicall(wallet);
          const claimInqRes = await baseQuery(
            contract_querier(multiCallContract.airDropInquiries(airDrops))
          );
          const claimInqs = claimInqRes.data as MultiQueryRes;
          const claimables: Airdrops = [];
          decodeAggregatedResult<ClaimInquiry[]>(
            claimInqs.query_result
          ).forEach((inquiry, i) => {
            if (!inquiry.is_claimed) claimables.push(airDrops[i]);
          });

          return { data: claimables };
        } catch (err) {
          return {
            error: {
              status: 500,
              statusText: "Query error",
              data: "Airdrop custom query encountered an error",
            },
          };
        }
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
