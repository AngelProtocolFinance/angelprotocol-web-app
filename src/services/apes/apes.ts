import { Coin } from "@cosmjs/proto-signing";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ethers, utils } from "ethers";
import { ProviderInfo } from "contexts/WalletContext/types";
import { Chain, WithdrawLog } from "types/server/aws";
import { queryContract } from "services/juno/queryContract";
import { UnsupportedNetworkError } from "errors/errors";
import { APIs } from "constants/urls";
import { getERC20Holdings } from "./helpers/getERC20Holdings";
import { apesTags, customTags } from "./tags";

export const apes = createApi({
  reducerPath: "apes",
  baseQuery: fetchBaseQuery({
    baseUrl: APIs.apes,
    mode: "cors",
  }),
  tagTypes: [apesTags.custom, apesTags.withdraw_logs],
  endpoints: (builder) => ({
    withdrawLogs: builder.query<WithdrawLog[], string>({
      providesTags: [{ type: apesTags.withdraw_logs }],
      query: (cw3) => `withdraw/${cw3}`,
    }),
    chain: builder.query<Chain, { providerInfo: ProviderInfo }>({
      providesTags: [{ type: apesTags.custom, id: customTags.chain }],
      async queryFn(args) {
        try {
          const { address, chainId } = args.providerInfo;
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
