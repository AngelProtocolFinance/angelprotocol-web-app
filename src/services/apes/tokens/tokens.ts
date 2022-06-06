import { Coin } from "@terra-money/terra.js";
import { ethers, utils } from "ethers";
import { ProviderId } from "contexts/WalletContext/types";
import { WithBalance } from "services/types";
import { Dwindow } from "types/ethereum";
import { ALT20, EVMNative, Token } from "types/server/aws";
import isTerraProvider from "contexts/WalletContext/helpers/isTerraProvider";
import createAuthToken from "helpers/createAuthToken";
import { terraLcdUrl } from "constants/urls";
import { apes } from "../apes";
import { getERC20Holdings } from "../helpers/getERC20Holdings";
import { terraNativeAssets, tokenList } from "./constants";

type TerraBalanceRes = { balances: Coin.Data[] };
type CategorizedTokenList = { [key in Token["type"]]: Token[] };

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
      WithBalance<Token>[],
      { chainId: string; address: string; providerId: ProviderId }
    >({
      providesTags: [],
      //address
      //activeChainId
      async queryFn(args, queryApi, extraOptions, baseQuery) {
        try {
          const coins: WithBalance<Token>[] = [];
          const categorizedTokenList = tokenList.reduce((tokens, token) => {
            const _t = token.type;
            if (!tokens[_t]) tokens[_t] = [];
            tokens[_t].push(token);
            return tokens;
          }, {} as CategorizedTokenList);

          /**fetch balances for terra  */
          const isTerra = isTerraProvider(args.providerId); //query is skipped when wallet is not connected
          if (isTerra) {
            //fetch native terra coins
            const res = await fetch(
              terraLcdUrl + `/cosmos/bank/v1beta1/balances/${args.address}`
            );

            const jsonRes: TerraBalanceRes = await res.json();
            const terraTokens = jsonRes.balances.reduce((_coins, _coin) => {
              const coinAsset = terraNativeAssets[_coin.denom];
              //don't display coins with no assets
              if (coinAsset) {
                _coins.push({
                  ...coinAsset,
                  balance: +utils.formatUnits(_coin.amount, coinAsset.decimals),
                });
              }
              return _coins;
            }, [] as WithBalance<Token>[]);

            coins.push(...terraTokens);
            //if terra wallet is not xdefi return only terra balances
            return { data: coins };
          }

          /**fetch balances for ethereum */
          const evmTokenList = categorizedTokenList[
            "evm-native"
          ] as EVMNative[];
          const balanceQueries = evmTokenList.map((token) => {
            const jsonProvider = new ethers.providers.JsonRpcProvider(
              token.rpcUrl,
              { chainId: +token.chainId, name: token.chainName }
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
            if (token.chainId === args.chainId) {
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
              activeCoin.rpcUrl,
              args.address,
              erc20Tokens.map((token) => token.contractAddr)
            );

            //convert to NativeBalanceFormat
            const transformedTokens: WithBalance<ALT20>[] = erc20Holdings.map(
              (token, i) => ({
                type: "erc20",
                symbol: token.symbol,
                logo: erc20Tokens[i].logo,
                decimals: token.decimals,
                chainId: activeCoin.chainId,

                nativeSymbol: activeCoin.symbol,
                contractAddr: token.contractAddress,

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
