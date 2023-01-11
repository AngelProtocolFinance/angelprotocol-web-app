import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TokenWithBalance } from "services/types";
import { FetchedChain, WithdrawLog } from "types/aws";
import { IS_TEST } from "constants/env";
import { APIs } from "constants/urls";
import { fetchBalances } from "./helpers/fetchBalances";

export const apes = createApi({
  reducerPath: "apes",
  baseQuery: fetchBaseQuery({
    baseUrl: APIs.apes,
    mode: "cors",
  }),
  tagTypes: ["chain", "withdraw_logs", "balances", "donations"],
  endpoints: (builder) => ({
    chains: builder.query<FetchedChain[], unknown>({
      query: () => `v1/chains${IS_TEST ? "/test" : ""}`,
    }),
    chain: builder.query<FetchedChain, string>({
      query: (chainId) => `v1/chain/${chainId}`,
    }),
    withdrawLogs: builder.query<WithdrawLog[], string>({
      providesTags: ["withdraw_logs"],
      query: (cw3) => `v1/withdraw/${cw3}`,
    }),
    balances: builder.query<
      TokenWithBalance[],
      { address: string; chainId: string }
    >({
      providesTags: ["balances"],
      async queryFn({ address, chainId }, api, options, baseQuery) {
        const { data } = await baseQuery(`v1/chain/${chainId}`);
        const _chain = data as FetchedChain;
        return { data: await fetchBalances(_chain, address) };
      },
    }),
  }),
});

export const {
  useBalancesQuery,
  useChainsQuery,
  useChainQuery,
  useLazyChainQuery,
  useWithdrawLogsQuery,
  util: { invalidateTags: invalidateApesTags },
} = apes;
