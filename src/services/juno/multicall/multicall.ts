import Decimal from "decimal.js";
import { MultiContractQueryArgs } from "services/types";
import { Airdrop, Airdrops } from "types/server/aws";
import {
  ClaimInquiry,
  Holding,
  Holdings,
  QueryRes,
  VaultRateInfo,
} from "types/server/contracts";
import { VaultField, VaultFieldLimits } from "types/shared/withdraw";
import { WalletState } from "contexts/WalletContext/WalletContext";
import Multicall from "contracts/Multicall";
import { aws_endpoint } from "constants/urls";
import { junoApi } from "..";
import contract_querier from "../contract_querier";
import { junoTags, multicallTags } from "../tags";
import { vaultMap } from "./constants";

type VaultsRateRes = {
  vaults_rate: VaultRateInfo[];
};

type RateLookUp = { [index: string]: string };
type EndowmentBalance = {
  liquid: number;
  locked: number;
  total: number;
};

type MultiQueryRes = QueryRes<AggregatedResult>;
type AggregatedResult = {
  return_data: EncodedResultMember[];
};
type EncodedResultMember = {
  success: boolean;
  data: string; //base64 encoded msg
};

export const multicall_api = junoApi.injectEndpoints({
  endpoints: (builder) => ({
    endowmentBalance: builder.query<EndowmentBalance, MultiContractQueryArgs>({
      providesTags: [
        { type: junoTags.multicall, id: multicallTags.endowmentBalance },
      ],
      query: contract_querier,
      transformResponse: (res: MultiQueryRes) => {
        const [holdings, ratesRes] = decodeAggregatedResult<
          [Holdings, VaultsRateRes]
        >(res.data);

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
        { type: junoTags.multicall, id: multicallTags.endowmentBalance },
      ],
      query: contract_querier,
      transformResponse: (res: MultiQueryRes) => {
        const [holdings, ratesRes] = decodeAggregatedResult<
          [Holdings, VaultsRateRes]
        >(res.data);

        const vaultLimits: VaultFieldLimits = {
          anchor1_amount: {
            limit: 0,
            addr: "",
            rate: 1,
          },
          anchor2_amount: {
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
            ustBalance = new Decimal(vaultHolding.amount)
              .mul(vault.fx_rate)
              .toNumber();
            vaultLimits[vaultInfo.fieldId] = {
              limit: ustBalance,
              addr: vaultHolding.address,
              rate: new Decimal(vault.fx_rate).toNumber(),
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
    airdrop: builder.query<Airdrop[], WalletState>({
      providesTags: [{ type: junoTags.multicall, id: multicallTags.airdrop }],
      async queryFn(wallet, queryApi, extraOptions, baseQuery) {
        try {
          const airDropsRes = await fetch(
            `${aws_endpoint}/airdrop/${wallet.address}/${wallet.chain.chain_id}`
          );
          const airDrops = (await airDropsRes.json()) as Airdrops;
          const multiCallContract = new Multicall(wallet);
          const claimInqRes = await baseQuery(
            contract_querier(multiCallContract.airDropInquiries(airDrops))
          );
          const claimInqs = claimInqRes.data as MultiQueryRes;
          const claimables: Airdrops = [];
          decodeAggregatedResult<ClaimInquiry[]>(claimInqs.data).forEach(
            (inquiry, i) => {
              if (!inquiry.is_claimed) claimables.push(airDrops[i]);
            }
          );

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
        new Decimal(result).add(
          new Decimal(curr.amount).mul(ratesMap[curr.address])
        ),
      new Decimal(0)
    )
    .div(1e6);
}

function decodeAggregatedResult<T extends object[]>(result: AggregatedResult) {
  return result.return_data.map((data) => JSON.parse(atob(data.data))) as T;
}
