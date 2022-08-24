import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import ERC20Abi from "abi/ERC20.json";
import { ethers, utils } from "ethers";
import { Chain, Token } from "types/server/aws";
import { queryContract } from "services/juno/queryContract";
import { VerifiedChain } from "contexts/ChainGuard";
import { Wallet } from "contexts/WalletContext";
import { condenseToNum } from "helpers";
import { getCosmosBalance } from "helpers/getCosmosBalance";
import { APIs } from "constants/urls";
import { apesTags } from "./tags";

export const apes = createApi({
  reducerPath: "apes",
  baseQuery: fetchBaseQuery({
    baseUrl: APIs.apes,
    mode: "cors",
  }),
  tagTypes: [apesTags.custom],
  endpoints: (builder) => ({
    Chain: builder.query<Chain, Wallet>({
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
  }),
});

export const {
  useChainQuery,
  useBalanceQuery,
  endpoints: {
    balance: { useLazyQuery: useLazyBalanceQuery },
  },
  util: { invalidateTags: invalidateApesTags },
} = apes;
