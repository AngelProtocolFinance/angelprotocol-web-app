import { Coin } from "@cosmjs/proto-signing";
import { ethers, utils } from "ethers";
import { ProviderInfo } from "contexts/WalletContext/types";
import { Chain, Token } from "types/server/aws";
import contract_querier from "services/juno/contract_querier";
import CW20 from "contracts/CW20";
import createAuthToken from "helpers/createAuthToken";
import { UnsupportedNetworkError } from "errors/errors";
import { apes_endpoint } from "constants/urls";
import { apes } from "./apes";
import { getERC20Holdings } from "./helpers/getERC20Holdings";

const chains_api = apes.injectEndpoints({
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
              if (balance?.amount)
                token.balance = +utils.formatUnits(
                  balance.amount,
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

export const { useTokensQuery, useChainQuery } = chains_api;

async function getCW20Balance(chain: Chain, walletAddress: string) {
  const cw20BalancePromises = chain.tokens
    .filter((x) => x.type === "cw20")
    .map((x) =>
      fetch(
        `${chain.lcd_url}${contract_querier(
          new CW20(undefined, x.token_id).balance(walletAddress)
        )}`
      )
        .then((res) => res.json())
        .then((res: { data: { balance: string } }) => ({
          denom: x.token_id,
          amount: res.data.balance,
        }))
    );

  const cw20Balances = await Promise.all(cw20BalancePromises);
  return cw20Balances;
}
