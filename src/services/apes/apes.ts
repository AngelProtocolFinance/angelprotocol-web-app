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
import { UnsupportedChainError } from "errors/errors";
import { chainIds } from "constants/chainIds";
import { IS_TEST, JUNO_LCD_OVERRIDE, JUNO_RPC_OVERRIDE } from "constants/env";
import { APIs } from "constants/urls";
import { fetchBalances } from "./helpers/fetchBalances";

const DATA: { Items: WithdrawLog[]; ItemCutoff: number } = {
  ItemCutoff: 5,
  Items: [
    {
      start_time: new Date().toISOString(),
      amount: 800.2839,
      endowment_multisig: "",
      proposal_chain_id: "",
      proposal_id: 1,
      proposal_status: "open",
      symbol: "JUNO",
      target_chain: chainIds.juno,
      target_wallet: "juno1k7jkmvzkrr3rv4htqvmh63f0fmvm89dfpqc6y5",
      num_routes: 1,
      routes: [
        {
          id: "axelar",
          hash: "fjdklsafdfa",
          output_amount: 800.2839,
          output_symbol: "JUNO",
          status: "OK",
        },
      ],
    },
    {
      start_time: new Date().toISOString(),
      amount: 800.2839,
      endowment_multisig: "",
      proposal_chain_id: "",
      proposal_id: 1,
      proposal_status: "executed",
      symbol: "JUNO",
      target_chain: chainIds.juno,
      target_wallet: "juno1k7jkmvzkrr3rv4htqvmh63f0fmvm89dfpqc6y5",
      num_routes: 1,
      routes: [
        {
          id: "axelar",
          hash: "fjdklsafdfa",
          output_amount: 800.2839,
          output_symbol: "JUNO",
          status: "OK",
        },
      ],
    },
    {
      start_time: new Date().toISOString(),
      amount: 800.2839,
      endowment_multisig: "",
      proposal_chain_id: "",
      proposal_id: 1,
      proposal_status: "pending",
      symbol: "JUNO",
      target_chain: chainIds.juno,
      target_wallet: "juno1k7jkmvzkrr3rv4htqvmh63f0fmvm89dfpqc6y5",
      num_routes: 1,
      routes: [
        {
          id: "axelar",
          hash: "fjdklsafdfa",
          output_amount: 800.2839,
          output_symbol: "JUNO",
          status: "OK",
        },
      ],
    },
    {
      start_time: new Date().toISOString(),
      amount: 800.2839,
      endowment_multisig: "",
      proposal_chain_id: "",
      proposal_id: 1,
      proposal_status: "rejected",
      symbol: "JUNO",
      target_chain: chainIds.juno,
      target_wallet: "juno1k7jkmvzkrr3rv4htqvmh63f0fmvm89dfpqc6y5",
      num_routes: 1,
      routes: [
        {
          id: "axelar",
          hash: "fjdklsafdfa",
          output_amount: 800.2839,
          output_symbol: "JUNO",
          status: "OK",
        },
      ],
    },
    {
      start_time: new Date().toISOString(),
      amount: 300.2839,
      endowment_multisig: "",
      proposal_chain_id: "",
      proposal_id: 1,
      proposal_status: "passed",
      symbol: "ETH",
      target_chain: chainIds.ethereum,
      target_wallet: "0x0f6d331f26C0B64fc6EACddABd5645b55cf2d8e0",
      num_routes: 1,
      routes: [
        {
          id: "axelar",
          hash: "fjdklsafdf2",
          output_amount: 300.2839,
          output_symbol: "ETH",
          status: "OK",
        },
      ],
    },
  ],
};

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
      query: ({ cw3, ...params }) => ({ url: `/v1/withdraw/${cw3}`, params }),
      transformResponse: () => ({ ...DATA, Count: 5, ScannedCount: 5 }),
    }),
    chain: builder.query<Chain, { address?: string; chainId?: string }>({
      providesTags: ["chain"],
      async queryFn({ address, chainId }, api, options, baseQuery) {
        try {
          if (!chainId) {
            throw new Error("Argument 'chainId' missing");
          }
          if (!address) {
            throw new Error("Argument 'address' missing");
          }

          const { data } = await baseQuery(`v1/chain/${chainId}`);
          const chain = overrideURLs(data as FetchedChain);

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
