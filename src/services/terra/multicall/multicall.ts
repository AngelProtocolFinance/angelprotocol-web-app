import { Coin, Dec } from "@terra-money/terra.js";
import { Airdrop, Airdrops, Token } from "@types-server/aws";
import {
  CW20Balance,
  ClaimInquiry,
  Holding,
  Holdings,
  QueryRes,
  VaultRateInfo,
} from "@types-server/contracts";
import {
  MultiContractQueryArgs,
  TokenWithBalance,
} from "@types-services/terra";
import { VaultField, VaultFieldLimits } from "@types-shared/withdraw";
import { WalletProxy } from "providers/WalletProvider";
import Multicall from "contracts/Multicall";
import { chainIDs } from "constants/chainIDs";
import { apes_endpoint, aws_endpoint } from "constants/urls";
import contract_querier from "../contract_querier";
import { multicallTags, terraTags } from "../tags";
import { terra } from "../terra";
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

interface BalanceRes {
  balances: Coin.Data[];
}

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
      providesTags: [{ type: terraTags.multicall, id: multicallTags.airdrop }],
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
      providesTags: [{ type: terraTags.multicall, id: multicallTags.airdrop }],
      async queryFn(args, queryApi, extraOptions, baseQuery) {
        try {
          const queryAddr = args.customAddr || args.wallet.address;
          const isTestnet = args.wallet.network.chainID === chainIDs.terra_test;

          //1st query
          const bankBalancesRes = await baseQuery(
            `/cosmos/bank/v1beta1/balances/${queryAddr}`
          );

          const bankBalances = (bankBalancesRes.data as BalanceRes).balances;

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
                balance: new Dec(tokenBankBalance.amount)
                  .div(Dec.pow(10, token.decimals))
                  .toNumber(),
              });
              return result;
            }
          }, [] as TokenWithBalance[]);

          const multicallContract = new Multicall(args.wallet);
          //2nd pass to token list

          const cw20Tokens = tokenList.filter(
            (token) =>
              !!token.cw20_contract?.[isTestnet ? "testnet" : "mainnet"]
          );

          const cw20BalancesRes = await baseQuery(
            contract_querier(
              //this query will not run, if !wallet or !customAddr
              multicallContract.cw20Balances(queryAddr!, cw20Tokens)
            )
          );

          const cw20MultiQueryRes = cw20BalancesRes.data as MultiQueryRes;

          const cw20Balances: TokenWithBalance[] = decodeAggregatedResult<
            CW20Balance[]
          >(cw20MultiQueryRes.query_result).map((cw20Balance, i) => {
            return {
              ...cw20Tokens[i],
              balance: new Dec(cw20Balance.balance)
                .div(Dec.pow(10, cw20Tokens[i].decimals))
                .toNumber(),
            };
          });

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

function decodeAggregatedResult<T extends object[]>(result: AggregatedResult) {
  return result.return_data.map((data) => JSON.parse(atob(data.data))) as T;
}
