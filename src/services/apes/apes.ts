import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TokenWithBalance } from "services/types";
import {
  FetchedChain,
  PaginatedAWSQueryRes,
  Token,
  WithdrawLog,
  WithdrawLogQueryParams,
} from "types/aws";
import { ProviderId } from "contexts/WalletContext";
import { IS_TEST } from "constants/env";
import { APIs } from "constants/urls";
import { fetchBalances } from "./helpers/fetchBalances";

export const apes = createApi({
  reducerPath: "apes",
  baseQuery: fetchBaseQuery({
    baseUrl: APIs.apes,
    mode: "cors",
  }),
  tagTypes: ["chain", "withdraw_logs", "balances", "donations", "tokens"],
  endpoints: (builder) => ({
    chains: builder.query<FetchedChain[], unknown>({
      query: () => `v1/chains${IS_TEST ? "/test" : ""}`,
    }),
    chain: builder.query<FetchedChain, string>({
      query: (chainId) => `v1/chain/${chainId}`,
    }),
    withdrawLogs: builder.query<
      PaginatedAWSQueryRes<WithdrawLog[]>,
      WithdrawLogQueryParams
    >({
      providesTags: ["withdraw_logs"],
      query: ({ cw3, ...params }) => ({ url: `/v2/withdraw/${cw3}`, params }),
    }),
    balances: builder.query<
      TokenWithBalance[],
      { address: string; chainId: string; providerId: ProviderId }
    >({
      providesTags: ["balances"],
      async queryFn({ address, chainId, providerId }, api, options, baseQuery) {
        const { data } = await baseQuery(`v1/chain/${chainId}`);
        const _chain = data as FetchedChain;
        return { data: await fetchBalances(_chain, address, providerId) };
      },
    }),
    tokens: builder.query<Token[], unknown>({
      providesTags: ["tokens"],
      query: () => `v1/tokens/list${IS_TEST ? "/test" : ""}`,
    }),
  }),
});

export const {
  useBalancesQuery,
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
