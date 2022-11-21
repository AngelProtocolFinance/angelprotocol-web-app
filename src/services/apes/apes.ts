import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseChain, Chain, WithdrawLog } from "types/aws";
import { UnsupportedNetworkError } from "errors/errors";
import { APIs } from "constants/urls";
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
      query: () => "v1/chains",
    }),
    withdrawLogs: builder.query<WithdrawLog[], string>({
      providesTags: [{ type: apesTags.withdraw_logs }],
      query: (cw3) => `v1/withdraw/${cw3}`,
    }),
    chain: builder.query<Chain, { chainId: string }>({
      providesTags: [{ type: apesTags.chain }],
      async queryFn({ chainId }) {
        try {
          const chainRes = await fetch(`${APIs.apes}/v1/chain/${chainId}`);

          const chain: Chain | { message: string } = await chainRes.json();

          if (!chain || "message" in chain) {
            throw new UnsupportedNetworkError(chainId);
          }

          return { data: chain };
        } catch (error) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: "Error fetching chain data",
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
  useLazyChainsQuery,
  useChainQuery,
  useWithdrawLogsQuery,
  util: { invalidateTags: invalidateApesTags },
} = apes;
