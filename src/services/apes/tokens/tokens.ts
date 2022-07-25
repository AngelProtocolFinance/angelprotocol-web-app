import { Coin } from "@cosmjs/proto-signing";
import { ethers, utils } from "ethers";
import { ProviderInfo } from "contexts/WalletContext/types";
import { Chain, Token } from "types/server/aws";
import { isJunoChain, isTerraChain } from "helpers/checkChain";
import createAuthToken from "helpers/createAuthToken";
import getCosmosClient from "helpers/getCosmosClient";
import { UnsupportedNetworkError } from "errors/errors";
import { apes_endpoint } from "constants/urls";
import { apes } from "../apes";
import { getERC20Holdings } from "../helpers/getERC20Holdings";

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
    chain: builder.query<Chain, { providerInfo: ProviderInfo }>({
      providesTags: [],
      async queryFn(args, queryApi, extraOptions, baseQuery) {
        try {
          const { address, chainId } = args.providerInfo;
          const chainRes = await fetch(`${apes_endpoint}/chain/${chainId}`);

          const chain: Chain | { message: string } = await chainRes.json();

          if (!chain || "message" in chain) {
            throw new UnsupportedNetworkError(chainId);
          }

          // fetch balances for juno
          if (isJunoChain(chainId)) {
            const nativeBalances = await getNativeCosmosBalances(
              chain,
              address
            );

            const cw20Balances = await getJunoCW20Balances(chain, address);

            const allBalances = nativeBalances.concat(cw20Balances);

            const allCoins = [chain.native_currency, ...chain.tokens];

            allBalances.forEach((balance) => {
              const coin = allCoins.find((x) => x.token_id === balance.denom);
              coin!.balance = +utils.formatUnits(
                balance.amount,
                coin!.decimals
              );
            });

            return { data: chain };
          }

          // fetch balances for terra
          if (isTerraChain(chainId)) {
            // returns only positive balances
            const balances = await getNativeCosmosBalances(chain, address);

            // don't display coins with no assets
            [chain.native_currency, ...chain.tokens].forEach((coin) => {
              const coinBalance = balances.find(
                (x) => x.denom === coin.token_id
              );
              if (coinBalance) {
                coin.balance = +utils.formatUnits(
                  coinBalance.amount,
                  coin.decimals
                );
              }
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

          erc20Holdings.forEach((erc20) => {
            const token = chain.tokens.find(
              (x) => x.token_id === erc20.contractAddress
            );
            // token exists because getERC20Holdings returns balances only for chain.tokens
            token!.balance = +erc20.balance;
          });

          return { data: chain };
        } catch (err) {
          console.log(err);
          return {
            error: {
              status: 500,
              statusText: "Query error",
              data: "Failed to get balances",
            },
          };
        }
      },
    }),
  }),
});

export const { useTokensQuery, useChainQuery } = tokens_api;

async function getJunoCW20Balances(chain: Chain, address: string) {
  const junoClient = await getCosmosClient(chain.chain_id, chain.rpc_url);

  const cw20BalancePromises = chain.tokens
    .filter((x) => x.type === "cw20")
    .map((x) => junoClient.getBalance(address, x.token_id));

  const cw20Balances = await Promise.all(cw20BalancePromises);
  return cw20Balances;
}

/**
 * @param chain Chain
 * @param address wallet address
 * @returns non-zero native balances of coins/tokens approved for donation
 */
async function getNativeCosmosBalances(
  chain: Chain,
  address: string
): Promise<Coin[]> {
  const balancesRes = await fetch(
    chain.lcd_url + `/cosmos/bank/v1beta1/balances/${address}`
  );

  // returns only positive balances
  const { balances }: { balances: Coin[] } = await balancesRes.json();

  return balances.filter(
    (x) => !!chain.tokens.find((token) => token.token_id === x.denom)
  );
}
