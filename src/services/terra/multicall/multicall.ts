import { Dec } from "@terra-money/terra.js";
import { WalletProxy } from "providers/WalletProvider";
import Multicall from "contracts/Multicall";
import { chainIDs } from "constants/chainIDs";
import { apes_endpoint, aws_endpoint } from "constants/urls";
import { Holding, Holdings } from "../account/types";
import contract_querier from "../contract_querier";
import { CW20Balance } from "../cw20/cw20";
import { VaultsRateRes } from "../registrar/types";
import { multicall, tags } from "../tags";
import { terra } from "../terra";
import {
  AggregatedResult,
  BalanceRes,
  MultiContractQueryArgs,
  MultiQueryRes,
  QueryRes,
} from "../types";
import { vaultMap } from "./constants";
import {
  Airdrop,
  Airdrops,
  ClaimInquiry,
  Token,
  TokenWithBalance,
  VaultField,
  VaultFieldIds,
  VaultFieldLimits,
} from "./types";
import { EndowmentBalance, RateLookUp } from "./types";

export const multicall_api = terra.injectEndpoints({
  endpoints: (builder) => ({
    endowmentBalance: builder.query<EndowmentBalance, MultiContractQueryArgs>({
      providesTags: [{ type: tags.multicall, id: multicall.endowmentBalance }],
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
      providesTags: [{ type: tags.multicall, id: multicall.endowmentBalance }],
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
    airdrop: builder.query<Airdrop[], WalletProxy>({
      providesTags: [{ type: tags.multicall, id: multicall.airdrop }],
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
    //terra native balances, and cw20 balances
    terraBalances: builder.query<
      TokenWithBalance[],
      { wallet: WalletProxy; customAddr?: string }
    >({
      providesTags: [{ type: tags.multicall, id: multicall.airdrop }],
      async queryFn(args, queryApi, extraOptions, baseQuery) {
        try {
          const queryAddr = args.wallet.address || args.customAddr;
          const isTestnet =
            (args.wallet.network.chainID as chainIDs) === chainIDs.testnet;

          //1st query
          const bankBalancesRes = await baseQuery(
            `/cosmos/bank/v1beta1/balances/${queryAddr}`
          );
          const bankBalances = (bankBalancesRes.data as QueryRes<BalanceRes>)
            .query_result.balances;

          //2nd query
          const tokenListRes = await fetch(`${apes_endpoint}/token/list`);
          const tokenList = (await tokenListRes.json()) as Token[];

          //first pass to tokenList, get native token balances
          //O(t * b) time; b = bankBalances which is finite since normal users doesn't hold too many coins
          const nativeBalances = tokenList.reduce((result, token) => {
            const tokenBankBalance = bankBalances.find(
              (balance) => balance.denom === token.min_denom
            );
            //exclude from tokenListWithBalance if no entry (meaning 0)
            if (!tokenBankBalance) {
              return result;
            } else {
              result.push({
                ...token,
                balance: new Dec(tokenBankBalance.amount).div(1e6).toNumber(),
              });
              return result;
            }
          }, [] as TokenWithBalance[]);

          const multicallContract = new Multicall(args.wallet);
          //2nd pass to token list
          const cw20Tokens = tokenList.filter((token) => {
            //pass to multicall only tokens with contract depending on network
            return !!token.cw20_contracts?.[isTestnet ? "mainnet" : "testnet"];
          }, [] as Token[]);

          const cw20BalancesRes = await baseQuery(
            contract_querier(
              //this query will not run, if !wallet or !customAddr
              multicallContract.cw20Balances(queryAddr!, cw20Tokens)
            )
          );

          const cw20MultiQueryRes = cw20BalancesRes.data as MultiQueryRes;
          const cw20Balances: TokenWithBalance[] = decodeAggregatedResult<
            CW20Balance[]
          >(cw20MultiQueryRes.query_result).map((cw20Balance, i) => ({
            ...cw20Tokens[i],
            balance: new Dec(cw20Balance.balance).div(1e6).toNumber(),
          }));

          return { data: nativeBalances.concat(cw20Balances) };
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
