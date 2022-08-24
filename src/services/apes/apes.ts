import { Coin } from "@cosmjs/proto-signing";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import ERC20Abi from "abi/ERC20.json";
import { ethers, utils } from "ethers";
import { Chain, Token, TokenType } from "types/server/aws";
import { queryContract } from "services/juno/queryContract";
import { VerifiedChain } from "contexts/ChainGuard";
import { Wallet } from "contexts/WalletContext";
import { condenseToNum } from "helpers";
import { getCosmosBalance } from "helpers/getCosmosBalance";
import { UnsupportedNetworkError } from "errors/errors";
import { APIs } from "constants/urls";
import { fillERC20Holdings } from "./helpers/fillERC20Holdings";
import { getERC20Holdings } from "./helpers/getERC20Holdings";
import { apesTags, customTags } from "./tags";

type CategorizedTokens = { [key in TokenType]: Token[] };

export const apes = createApi({
  reducerPath: "apes",
  baseQuery: fetchBaseQuery({
    baseUrl: APIs.apes,
    mode: "cors",
  }),
  tagTypes: [apesTags.custom],
  endpoints: (builder) => ({
    chaim: builder.query<Chain, Wallet>({
      query: ({ chainId }) => `chain/${chainId}`,
      transformResponse: (res: Chain) => res,
    }),
    balance: builder.query<number, { token: Token; chain: VerifiedChain }>({
      async queryFn({ token, chain }) {
        const { wallet } = chain;
        try {
          if (
            token.type === "juno-native" ||
            token.type === "terra-native" ||
            token.type === "ibc"
          ) {
            return {
              data: await getCosmosBalance(
                token.token_id,
                wallet.address,
                chain.lcd_url
              ),
            };
          }

          if (token.type === "cw20") {
            const { balance } = await queryContract(
              "cw20Balance",
              token.token_id,
              { addr: wallet.address },
              chain.lcd_url
            );
            return { data: condenseToNum(balance, token.decimals) };
          }

          if (token.type === "evm-native" || token.type === "erc20") {
            const jsonProvider = new ethers.providers.JsonRpcProvider(
              chain.rpc_url,
              { chainId: +chain.chain_id, name: chain.chain_name }
            );
            if (token.type === "evm-native") {
              const balance = await jsonProvider.getBalance(
                chain.wallet.address
              );
              return { data: +utils.formatUnits(balance, token.decimals) };
            }
            if (token.type === "erc20") {
              const contract = new ethers.Contract(
                token.token_id, //contract_addr
                ERC20Abi,
                jsonProvider
              );
              const balance = await (contract.balanceOf(
                wallet.address
              ) as Promise<ethers.BigNumber>);

              return { data: +utils.formatUnits(balance, token.decimals) };
            }
          }
          //token doesn't match any type
          return { data: 0 };
        } catch (error) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: "Error querying token balance",
            },
          };
        }
      },
    }),

    balances: builder.query<any, Chain & { address: string }>({
      providesTags: [{ type: apesTags.custom, id: customTags.chain }],
      async queryFn({ address, ...chain }) {
        //categorize tokens
        const tokens = [chain.native_currency]
          .concat(chain.tokens)
          .reduce((tokens, token) => {
            tokens[token.type] ||= [];
            tokens[token.type].push(token);
            return tokens;
          }, {} as CategorizedTokens);

        try {
          // fetch balances for juno or terra
          if (chain.type === "juno-native" || chain.type === "terra-native") {
            const { balances } = await fetch(
              chain.lcd_url + `/cosmos/bank/v1beta1/balances/${address}`
            ).then<{ balances: Coin[] }>((res) => res.json());

            //native and IBCs balances from '/balances' endpoint
            const natives = tokens["juno-native"]
              .concat(tokens["ibc"])
              .map((token) => {
                //this inner loop can be avoided, but needs N `balance/denom=x` queries
                const bal = balances.find(
                  (bal) => bal.denom === token.token_id
                );
                token.balance = condenseToNum(
                  bal?.amount || "0",
                  token.decimals
                );
                return token;
              });

            const cw20s = await fillCW20Balances(
              tokens["cw20"],
              chain.lcd_url,
              address
            );

            return { data: natives.concat(cw20s) };
          }

          if (chain.type === "evm-native") {
            /**fetch balances for evm-compatible chains */
            const jsonProvider = new ethers.providers.JsonRpcProvider(
              chain.rpc_url,
              { chainId: +chain.chain_id, name: chain.chain_name }
            );
            const nativeBalance = await jsonProvider.getBalance(address);
            const natives = tokens["evm-native"];

            //evm chains 1 native token
            natives[0].balance = +utils.formatUnits(
              nativeBalance,
              chain.native_currency.decimals
            );

            const erc20s = await fillERC20Holdings(
              chain.rpc_url,
              address,
              tokens["erc20"]
            );

            return { data: natives.concat(erc20s) };
          }

          return { data: [] };
        } catch (error) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: "Error querying balances",
            },
          };
        }
      },
    }),

    chain: builder.query<Chain, Wallet>({
      providesTags: [{ type: apesTags.custom, id: customTags.chain }],
      async queryFn(args) {
        try {
          const { address, chainId } = args;
          const chainRes = await fetch(`${APIs.apes}/chain/${chainId}`);

          const chain: Chain | { message: string } = await chainRes.json();

          if (!chain || "message" in chain) {
            throw new UnsupportedNetworkError(chainId);
          }

          // fetch balances for juno or terra
          if (chain.type === "juno-native" || chain.type === "terra-native") {
            const balancesRes = await fetch(
              chain.lcd_url + `/cosmos/bank/v1beta1/balances/${address}`
            );

            // returns only positive balances
            const { balances: nativeBalances }: { balances: Coin[] } =
              await balancesRes.json();

            // checking providerId to know which specific wallet is connected
            // this way once Terra v2 is enabled on Keplr again, the users will be able to
            // fetch their balances even when using Keplr
            const cw20Balances = await getCW20Balance(chain, address);

            const allBalances = nativeBalances.concat(cw20Balances);

            [chain.native_currency, ...chain.tokens].forEach((token) => {
              const balance = allBalances.find(
                (x) => x.denom === token.token_id
              );
              token.balance = +utils.formatUnits(
                balance?.amount ?? 0,
                token.decimals
              );
            });

            return { data: chain };
          }

          /**fetch balances for ethereum */
          const jsonProvider = new ethers.providers.JsonRpcProvider(
            chain.rpc_url,
            { chainId: +chainId, name: chain.chain_name }
          );
          const queryResults = await jsonProvider.getBalance(address);

          chain.native_currency.balance = +utils.formatUnits(
            queryResults,
            chain.native_currency.decimals
          );

          const erc20Holdings = await getERC20Holdings(
            chain.rpc_url,
            address,
            chain.tokens.map((token) => token.token_id)
          );

          chain.tokens.forEach((token) => {
            const erc20 = erc20Holdings.find(
              (x) => x.contractAddress === token.token_id
            );
            token.balance = +(erc20?.balance ?? 0); // erc20 balance is already in decimal format
          });

          return { data: chain };
        } catch (error) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: "Error querying balances",
              data:
                error instanceof UnsupportedNetworkError
                  ? error.toSerializable()
                  : error,
            },
          };
        }
      },
    }),
  }),
});

export const {
  useChainQuery,
  useChaimQuery,
  useBalanceQuery,
  endpoints: {
    balance: { useLazyQuery: useLazyBalanceQuery },
  },
  util: { invalidateTags: invalidateApesTags },
} = apes;

async function getCW20Balance(chain: Chain, walletAddress: string) {
  const cw20BalancePromises = chain.tokens
    .filter((x) => x.type === "cw20")
    .map((x) =>
      queryContract(
        "cw20Balance",
        x.token_id,
        { addr: walletAddress },
        chain.lcd_url
      ).then((data) => ({
        denom: x.token_id,
        amount: data.balance,
      }))
    );

  const cw20Balances = await Promise.all(cw20BalancePromises);
  return cw20Balances;
}

async function fillCW20Balances(
  cw20s: Token[],
  lcdUrl: string,
  address: string
): Promise<Token[]> {
  const balanceQueries = cw20s.map((x) =>
    queryContract("cw20Balance", x.token_id, { addr: address }, lcdUrl).then(
      (data) => ({
        denom: x.token_id,
        amount: data.balance,
      })
    )
  );
  const results = await Promise.allSettled(balanceQueries);
  return results.map((result, i) => ({
    ...cw20s[i],
    balance:
      result.status === "fulfilled"
        ? condenseToNum(result.value.amount, cw20s[i].decimals)
        : 0,
  }));
}
