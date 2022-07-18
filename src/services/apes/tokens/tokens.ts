import { Coin } from "@cosmjs/proto-signing";
import { Coin as TerraCoin } from "@terra-money/terra.js";
import { ethers, utils } from "ethers";
import { ProviderId, ProviderInfo } from "contexts/WalletContext/types";
import { WithBalance } from "services/types";
import { ALT20, EVMNative, Token } from "types/server/aws";
import createAuthToken from "helpers/createAuthToken";
import { IS_TEST } from "constants/env";
import { apes_endpoint, junoLcdUrl, terraLcdUrl } from "constants/urls";
import { apes } from "../apes";
import { getERC20Holdings } from "../helpers/getERC20Holdings";
import { junoToken, lunaToken } from "./constants";

type TerraBalanceRes = { balances: TerraCoin.Data[] };
type JunoBalanceRes = { balances: Coin[] };
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
      { providerInfo: ProviderInfo }
    >({
      providesTags: [],
      async queryFn(args, queryApi, extraOptions, baseQuery) {
        try {
          const { providerId, address, chainId } = args.providerInfo;
          const tokensRes = await fetch(
            `${apes_endpoint}/chain/${args.providerInfo.chainId}`
          );

          const tokenList: Token[] = await tokensRes.json();
          const coins: WithBalance<Token>[] = [];
          const categorizedTokenList = tokenList.reduce((tokens, token) => {
            const _t = token.type;
            if (!tokens[_t]) tokens[_t] = [];
            tokens[_t].push(token);
            return tokens;
          }, {} as CategorizedTokenList);

          // fetch balances for juno
          if (isJunoProvider(providerId)) {
            const res = await fetch(
              junoLcdUrl + `/cosmos/bank/v1beta1/balances/${address}`
            );

            const jsonRes: JunoBalanceRes = await res.json();
            const junoTokens = jsonRes.balances.reduce((_coins, _coin) => {
              //don't display coins with no assets
              _coins.push({
                ...junoToken,
                balance: +utils.formatUnits(_coin.amount, junoToken.decimals),
              });
              return _coins;
            }, [] as WithBalance<Token>[]);

            coins.push(...junoTokens);

            return { data: coins };
          }

          /**fetch balances for terra  */
          if (isTerraProvider(providerId)) {
            //fetch native terra coins
            const res = await fetch(
              terraLcdUrl + `/cosmos/bank/v1beta1/balances/${address}`
            );

            const jsonRes: TerraBalanceRes = await res.json();
            const terraTokens = jsonRes.balances.reduce((_coins, _coin) => {
              //don't display coins with no assets
              _coins.push({
                ...lunaToken,
                balance: +utils.formatUnits(_coin.amount, lunaToken.decimals),
              });
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
              token.rpc_url,
              { chainId: +token.chain_id, name: token.chain_name }
            );
            return jsonProvider.getBalance(address);
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
            if (token.chain_id === chainId) {
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
              address,
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
          console.log(err);
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

function isJunoProvider(providerId: ProviderId) {
  switch (providerId) {
    //FUTURE: add other leap falcon xdefi etc
    case "keplr":
    case "walletconnect":
      return true;
    default:
      return false;
  }
}

function isTerraProvider(providerId: ProviderId) {
  switch (providerId) {
    //FUTURE: add other leap falcon etc
    case "station":
    case "walletconnect":
    case "xdefi-wallet":
    case "torus":
      return true;
    default:
      return false;
  }
}
