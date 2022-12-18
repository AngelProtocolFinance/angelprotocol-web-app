import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseChain, Chain, WithdrawLog } from "types/aws";
import { Coin } from "types/cosmos";
import { JsonRpcProvider } from "types/evm";
import { queryContract } from "services/juno/queryContract";
import { formatUnits } from "helpers/evm";
import { UnsupportedChainError } from "errors/errors";
import { IS_TEST } from "constants/env";
import { APIs } from "constants/urls";
import { getERC20Holdings } from "./helpers/getERC20Holdings";
import { apesTags } from "./tags";

export const apes = createApi({
  reducerPath: "apes",
  baseQuery: fetchBaseQuery({
    baseUrl: APIs.apes,
    mode: "cors",
  }),
  tagTypes: [apesTags.chain, apesTags.withdraw_logs],
  endpoints: (builder) => ({
    chains: builder.query<BaseChain[], unknown>({
      query: () => `v1/chains${IS_TEST ? "/test" : ""}`,
    }),
    withdrawLogs: builder.query<WithdrawLog[], string>({
      providesTags: [{ type: apesTags.withdraw_logs }],
      query: (cw3) => `v1/withdraw/${cw3}`,
    }),
    chain: builder.query<Chain, { address?: string; chainId?: string }>({
      providesTags: [{ type: apesTags.chain }],
      async queryFn({ address, chainId }) {
        try {
          if (!chainId) {
            throw new Error("Argument 'chainId' missing");
          }
          if (!address) {
            throw new Error("Argument 'address' missing");
          }

          const chain = await fetch(
            `${APIs.apes}/v1/chain/${chainId}`
          ).then<Chain>((res) => {
            if (res.status === 400) throw new UnsupportedChainError(chainId);
            if (!res.ok) throw new Error("failed to fetch chain");
            return res.json();
          });

          const result: Chain = {
            ...chain,
            native_currency: {
              ...chain.native_currency,
            },
            tokens: chain.tokens.map((t) => ({ ...t })),
          };

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

            [result.native_currency, ...result.tokens].forEach((token) => {
              const balance = allBalances.find(
                (x) => x.denom === token.token_id
              );
              token.balance = +formatUnits(
                balance?.amount ?? 0,
                token.decimals
              );
            });
          } else {
            /**fetch balances for ethereum */
            const jsonProvider = new JsonRpcProvider(chain.rpc_url, {
              chainId: +chain.chain_id,
              name: chain.chain_name,
            });
            const queryResults = await jsonProvider.getBalance(address);

            const erc20Holdings = await getERC20Holdings(
              chain.rpc_url,
              address,
              chain.tokens.map((token) => token.token_id)
            );

            result.native_currency.balance = +formatUnits(
              queryResults,
              chain.native_currency.decimals
            );

            result.tokens.forEach((token) => {
              const erc20 = erc20Holdings.find(
                (x) => x.contractAddress === token.token_id
              );
              token.balance = +(erc20?.balance ?? 0); // erc20 balance is already in decimal format
            });
          }

          return { data: result };
        } catch (error) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: "Error querying balances",
              data:
                error instanceof UnsupportedChainError
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
  useChainsQuery,
  useChainQuery,
  useLazyChainQuery,
  useWithdrawLogsQuery,
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
