import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseChain, Chain, FetchedChain, WithdrawLog } from "types/aws";
import { UnsupportedChainError } from "errors/errors";
import { IS_TEST } from "constants/env";
import { APIs } from "constants/urls";
import { fetchBalances } from "./helpers/fetchBalances";
import { apesTags } from "./tags";

export const apes = createApi({
  reducerPath: "apes",
  baseQuery: fetchBaseQuery({
    baseUrl: APIs.apes,
    mode: "cors",
  }),
  tagTypes: [apesTags.chain, apesTags.withdraw_logs, apesTags.donations],
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
      async queryFn({ address, chainId }, api, options, baseQuery) {
        try {
          if (!chainId) {
            throw new Error("Argument 'chainId' missing");
          }
          if (!address) {
            throw new Error("Argument 'address' missing");
          }
          const { data } = await baseQuery(`v1/chain/${chainId}`);
          const chain = data as FetchedChain;
          const [native, ...tokens] = await fetchBalances(chain, address);

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
  }),
});

export const {
  useChainsQuery,
  useChainQuery,
  useLazyChainQuery,
  useWithdrawLogsQuery,
  util: { invalidateTags: invalidateApesTags },
} = apes;
