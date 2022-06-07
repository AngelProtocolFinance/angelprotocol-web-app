import { ethers, utils } from "ethers";
import { ALT20, EVMNative, Token } from "types/server/aws";
import { WithBalance } from "services/types";
import { ProviderId } from "contexts/WalletContext/types";
import createAuthToken from "helpers/createAuthToken";
import { IS_DEV } from "constants/env";
import { apes_endpoint } from "constants/urls";
import { apes } from "../apes";
import { getERC20Holdings } from "./helpers/getERC20Holdings";

type CategorizedTokenList = { [key in Token["type"]]: Token[] };
const tokens_api = apes.injectEndpoints({
  endpoints: (builder) => ({
    tokens: builder.query<any[], unknown>({
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
      WithBalance<Token>[],
      { chainId: string; address: string; providerId: ProviderId }
    >({
      providesTags: [],
      //address
      //activeChainId
      async queryFn(args, queryApi, extraOptions, baseQuery) {
        try {
          const tokensRes = await fetch(
            `${apes_endpoint}/token/list${IS_DEV ? "/test" : ""}`
          );
          const tokenList: Token[] = await tokensRes.json();
          const coins: WithBalance<Token>[] = [];
          const categorizedTokenList = tokenList.reduce((tokens, token) => {
            const _t = token.type;
            if (!tokens[_t]) tokens[_t] = [];
            tokens[_t].push(token);
            return tokens;
          }, {} as CategorizedTokenList);

          /**fetch balances for ethereum */
          const evmTokenList = categorizedTokenList[
            "evm-native"
          ] as EVMNative[];
          const balanceQueries = evmTokenList.map((token) => {
            const jsonProvider = new ethers.providers.JsonRpcProvider(
              token.rpc_url,
              { chainId: +token.chain_id, name: token.chain_name }
            );
            return jsonProvider.getBalance(args.address);
          });

          const queryResults = await Promise.allSettled(balanceQueries);
          //map native balances with ordering
          const evmCoins = queryResults.reduce((_coins, result, i) => {
            const token: WithBalance = {
              ...evmTokenList[i],
              balance:
                result.status === "fulfilled"
                  ? +utils.formatUnits(result.value, evmTokenList[i].decimals)
                  : 0,
            };
            if (token.chain_id === args.chainId) {
              //bring active coin to front
              _coins.unshift(token);
            } else {
              _coins.push(token);
            }
            return _coins;
          }, [] as WithBalance<EVMNative>[]);

          //fetch erc20 balances of activeCoin
          if (evmCoins.length > 1) {
            const activeCoin = evmCoins[0];
            const erc20Tokens = activeCoin.tokens;
            const erc20Holdings = await getERC20Holdings(
              activeCoin.rpc_url,
              args.address,
              erc20Tokens.map((token) => token.contract_addr)
            );

            //convert to NativeBalanceFormat
            const transformedTokens: WithBalance<ALT20>[] = erc20Holdings.map(
              (token, i) => ({
                type: "erc20",
                symbol: token.symbol,
                logo: erc20Tokens[i].logo,
                decimals: token.decimals,
                chain_id: activeCoin.chain_id,

                native_symbol: activeCoin.symbol,
                contract_addr: token.contractAddress,

                balance: +token.balance,
              })
            );
            //insert ERC20 tokens with balances next to native token
            (evmCoins as WithBalance<Token>[]).splice(
              1,
              0,
              ...transformedTokens
            );
          }
          return { data: coins.concat(evmCoins) };
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
