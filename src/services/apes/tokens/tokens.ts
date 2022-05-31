import { ethers, utils } from "ethers";
import { TokenWithBalance } from "services/types";
import { Token } from "types/server/aws";
import createAuthToken from "helpers/createAuthToken";
import { apes } from "../apes";
import { getERC20Holdings } from "../helpers/getERC20Holdings";
import { tokenList, unSupportedToken } from "./constants";

const tokens_api = apes.injectEndpoints({
  endpoints: (builder) => ({
    tokens: builder.query<Token[], unknown>({
      query: () => {
        const generatedToken = createAuthToken("angelprotocol-web-app");
        return {
          url: "token/list",
          method: "GET",
          headers: { authorization: generatedToken },
        };
      },
    }),
    balances: builder.query<
      TokenWithBalance[],
      { chainId: string; address: string }
    >({
      providesTags: [],
      //address
      //activeChainId
      async queryFn(args, queryApi, extraOptions, baseQuery) {
        try {
          //TODO: get supported token list from server
          const isChainSupported =
            tokenList.find((token) => token.chainId === args.chainId) !==
            undefined;

          if (!isChainSupported) {
            return {
              data: [
                unSupportedToken,
                ...tokenList.map((token) => ({ ...token, balance: "0" })),
              ],
            };
          }

          const balanceQueries = tokenList.map((token) => {
            const jsonProvider = new ethers.providers.JsonRpcProvider(
              token.rpcUrl
            );
            return jsonProvider.getBalance(args.address);
          });
          const queryResults = await Promise.allSettled(balanceQueries);

          //map native balances with ordering
          const coins = queryResults.reduce((coins, result, i) => {
            const token: TokenWithBalance = {
              ...tokenList[i],
              balance:
                result.status === "fulfilled"
                  ? utils.formatUnits(result.value, tokenList[i].decimals)
                  : "0",
            };
            if (token.chainId === args.chainId) {
              //bring active coin to front
              coins.unshift(token);
            } else {
              coins.push(token);
            }
            return coins;
          }, [] as TokenWithBalance[]);

          //fetch erc20 balances of activeCoin
          if (coins.length > 1) {
            const activeCoin = coins[0];
            const erc20Tokens = activeCoin.tokens;
            const erc20Holdings = await getERC20Holdings(
              activeCoin.rpcUrl,
              args.address,
              erc20Tokens.map((token) => token.contractAddr)
            );

            //convert to NativeBalanceFormat
            const transformedTokens: TokenWithBalance[] = erc20Holdings.map(
              (token, i) => ({
                ...activeCoin,
                //overrides
                min_denom: token.symbol.toLocaleLowerCase(),
                symbol: token.symbol,
                logo: erc20Tokens[i].logo,
                decimals: token.decimals,
                erc20Tokens: [],
                balance: token.balance,

                //for ERC20 txs
                nativeSymbol: activeCoin.symbol,
                contractAddr: erc20Tokens[i].contractAddr,
              })
            );
            //insert ERC20 tokens with balances next to native token
            coins.splice(1, 0, ...transformedTokens);
          }
          return { data: coins };
        } catch (err) {
          console.error(err);
          return {
            error: {
              status: 500,
              statusText: "Query error",
              data: "Failed to get ethereum balances",
            },
          };
        }
      },
    }),
  }),
});

export const { useTokensQuery, useBalancesQuery } = tokens_api;
