import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  BaseChain,
  Chain,
  FetchedChain,
  PaginatedAWSQueryRes,
  Token,
  WithdrawLog,
  WithdrawLogQueryParams,
} from "types/aws";
import { ProviderId } from "contexts/WalletContext";
import { UnsupportedChainError } from "errors/errors";
import { chainIds } from "constants/chainIds";
import { IS_TEST, JUNO_LCD_OVERRIDE, JUNO_RPC_OVERRIDE } from "constants/env";
import { APIs } from "constants/urls";
import { fetchBalances } from "./helpers/fetchBalances";

export const apes = createApi({
  reducerPath: "apes",
  baseQuery: fetchBaseQuery({
    baseUrl: APIs.apes,
    mode: "cors",
  }),
  tagTypes: ["chain", "withdraw_logs", "donations", "tokens"],
  endpoints: (builder) => ({
    chains: builder.query<BaseChain[], unknown>({
      query: () => `v1/chains${IS_TEST ? "/test" : ""}`,
    }),
    withdrawLogs: builder.query<
      PaginatedAWSQueryRes<WithdrawLog[]>,
      WithdrawLogQueryParams
    >({
      providesTags: ["withdraw_logs"],
      query: ({ cw3, ...params }) => ({ url: `/v2/withdraw/${cw3}`, params }),
    }),
    chain: builder.query<
      Chain,
      { address?: string; chainId?: string; providerId?: ProviderId }
    >({
      providesTags: ["chain"],
      async queryFn({ address, chainId, providerId }, api, options, baseQuery) {
        try {
          if (!chainId) {
            throw new Error("Argument 'chainId' missing");
          }
          if (!address) {
            throw new Error("Argument 'address' missing");
          }
          if (!providerId) {
            throw new Error("Argument 'providerId' missing");
          }

          const { data } = await baseQuery(`v1/chain/${chainId}`);
          const chain = overrideURLs(data as FetchedChain);

          const [native, ...tokens] = await fetchBalances(
            chain,
            address,
            providerId
          );

          return { data: { ...chain, native_currency: native, tokens } };
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
    tokens: builder.query<Token[], unknown>({
      providesTags: ["tokens"],
      query: () => `v1/tokens/list${IS_TEST ? "/test" : ""}`,
    }),
  }),
});

function overrideURLs(chain: FetchedChain): FetchedChain {
  if (chain.chain_id === chainIds.juno) {
    return {
      ...chain,
      lcd_url: JUNO_LCD_OVERRIDE || chain.lcd_url,
      rpc_url: JUNO_RPC_OVERRIDE || chain.rpc_url,
    };
  }
  return chain;
}

export const {
  useChainsQuery,
  useChainQuery,
  useLazyChainQuery,
  useTokensQuery,
  useWithdrawLogsQuery,
  useLazyWithdrawLogsQuery,
  util: {
    invalidateTags: invalidateApesTags,
    updateQueryData: updateApesQueryData,
  },
} = apes;
