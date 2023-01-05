import { Coin } from "@cosmjs/proto-signing";
import { JsonRpcProvider } from "@ethersproject/providers";
import { formatUnits } from "@ethersproject/units";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CosmosBalances, TokenWithBalance } from "services/types";
import { FetchedChain, Token, WithdrawLog } from "types/aws";
import { queryContract } from "services/juno/queryContract";
import { condenseToNum } from "helpers";
import { chains } from "constants/chains";
import { contracts } from "constants/contracts";
import { IS_TEST } from "constants/env";
import { APIs } from "constants/urls";
import { getERC20Holdings } from "./helpers/getERC20Holdings";
import { apesTags } from "./tags";

type BalMap = { [index: string]: string | undefined };

export const apes = createApi({
  reducerPath: "apes",
  baseQuery: fetchBaseQuery({
    baseUrl: APIs.apes,
    mode: "cors",
  }),
  tagTypes: [apesTags.chain, apesTags.withdraw_logs],
  endpoints: (builder) => ({
    chains: builder.query<FetchedChain[], unknown>({
      query: () => `v1/chains${IS_TEST ? "/test" : ""}`,
    }),
    chain: builder.query<FetchedChain, string>({
      query: (chainId) => `v1/chain/${chainId}`,
    }),
    withdrawLogs: builder.query<WithdrawLog[], string>({
      providesTags: [{ type: apesTags.withdraw_logs }],
      query: (cw3) => `v1/withdraw/${cw3}`,
    }),
    balances: builder.query<
      TokenWithBalance[],
      { address: string; chainId: string }
    >({
      providesTags: [{ type: apesTags.chain }],
      async queryFn({ address, chainId }, api, options, baseQuery) {
        const chain = chains[chainId];
        const { data } = await baseQuery(`v1/chain/${chainId}`);
        const _chain = data as FetchedChain;
        const tokens = segragate([_chain.native_currency, ..._chain.tokens]);

        // fetch balances for juno or terra
        if (chain.type === "cosmos" || chain.type === "terra") {
          const [natives, gifts, ...cw20s] = await Promise.allSettled([
            fetch(chain.lcd + `/cosmos/bank/v1beta1/balances/${address}`)
              .then<CosmosBalances>((res) => {
                if (!res.ok) throw new Error("failed to get native balances");
                return res.json();
              })
              //transform for easy access
              .then(({ balances }) => toMap(balances)),
            queryContract(
              "giftcardBalance",
              contracts.gift_cards,
              {
                addr: address,
              },
              chain.lcd
            ).then(({ native, cw20 }) =>
              toMap([
                ...native,
                ...cw20.map<Coin>(({ address, amount }) => ({
                  denom: address,
                  amount: amount,
                })),
              ])
            ),
            ...tokens.alts.map((x) =>
              queryContract(
                "cw20Balance",
                x.token_id,
                {
                  addr: address,
                },
                chain.lcd
              )
            ),
          ]);

          return {
            data: [
              //native balances
              ...tokens.natives.map((t) => ({
                ...t,
                balance: getBal(natives, t),
                gift: getBal(gifts, t),
              })),
              //cw20 tokens
              ...tokens.alts.map((t) => ({
                ...t,
                balance: getBal(
                  toMap(
                    cw20s.map<Coin>((result) => ({
                      denom: t.token_id,
                      amount:
                        result.status === "fulfilled"
                          ? result.value.balance
                          : "0",
                    }))
                  ),
                  t
                ),
                gift: getBal(gifts, t),
              })),
            ],
          };
        } else {
          /**fetch balances for ethereum */
          const native = tokens.natives[0]; //evm chains have only one gas token
          const jsonProvider = new JsonRpcProvider(chain.rpc);
          const [nativeBal, erc20s] = await Promise.allSettled([
            jsonProvider.getBalance(address),
            getERC20Holdings(chain.rpc, address, tokens.alts),
          ]);

          return {
            data: [
              {
                ...native,
                balance: +formatUnits(
                  nativeBal.status === "fulfilled" ? nativeBal.value : "0",
                  native.decimals
                ),
              },
              ...(erc20s.status === "fulfilled" ? erc20s.value : []),
            ],
          };
        }
      },
    }),
  }),
});

export const {
  useBalancesQuery,
  useChainsQuery,
  useChainQuery,
  useLazyChainQuery,
  useWithdrawLogsQuery,
  util: { invalidateTags: invalidateApesTags },
} = apes;

type TokenType = "natives" | "alts";
function segragate(tokens: Token[]): { [key in TokenType]: Token[] } {
  return tokens.reduce((result, token) => {
    const type: TokenType =
      token.type === "ibc" || token.type.includes("native")
        ? "natives"
        : "alts";
    result["alts"] ||= []; //init alts all the same
    result[type] ||= [];
    result[type].push(token);
    return result;
  }, {} as any);
}

function toMap(coins: Coin[]): BalMap {
  return Object.entries(coins).reduce(
    (result, [, { denom, amount }]) => ({
      ...result,
      [denom]: amount,
    }),
    {}
  );
}
function getBal(
  map: PromiseSettledResult<BalMap> | BalMap,
  { token_id, decimals }: Token
) {
  if (isPromise(map)) {
    if (map.status === "rejected") return 0;
    return condenseToNum(map.value[token_id] || "0", decimals);
  }
  return condenseToNum(map[token_id] || "0", decimals);
}

function isPromise<T>(val: any): val is PromiseSettledResult<T> {
  const key: keyof PromiseSettledResult<any> = "status";
  return key in val;
}
