import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ChainQueryArgs } from "../types";
import {
  BaseChain,
  FetchedChain,
  PaginatedAWSQueryRes,
  TokenWithChainID,
  WithdrawLog,
  WithdrawLogQueryParams,
} from "types/aws";
import { EndowmentType } from "types/lists";
import { Chain } from "types/tx";
import { UnsupportedChainError } from "errors/errors";
import { chainIds } from "constants/chainIds";
import { IS_TEST, JUNO_LCD_OVERRIDE, JUNO_RPC_OVERRIDE } from "constants/env";
import { appRoutes } from "constants/routes";
import { APIs } from "constants/urls";
import { network } from "../constants";
import { version as v } from "../helpers";
import { fetchBalances } from "./helpers/fetchBalances";
import { tags } from "./tags";

type StripeSessionURLParams = {
  endowId: number;
  endowType: EndowmentType;
  liquidSplitPct: string;
};

export const apes = createApi({
  reducerPath: "apes",
  baseQuery: fetchBaseQuery({
    baseUrl: APIs.apes,
    mode: "cors",
  }),
  tagTypes: tags,
  endpoints: (builder) => ({
    chains: builder.query<BaseChain[], unknown>({
      query: () => `v1/chains${IS_TEST ? "/test" : ""}`,
    }),
    withdrawLogs: builder.query<
      PaginatedAWSQueryRes<WithdrawLog[]>,
      WithdrawLogQueryParams
    >({
      providesTags: ["withdraw_logs"],
      query: ({ cw3, ...params }) => ({
        url: `/${v(3)}/withdraw/${cw3}`,
        params,
      }),
    }),
    chain: builder.query<Chain, ChainQueryArgs>({
      providesTags: ["chain"],
      async queryFn({ address, chainId }, api, options, baseQuery) {
        try {
          const { data } = await baseQuery(`v1/chain/${chainId}`);
          const chain = overrides(data as FetchedChain);

          const [native, ...tokens] = await fetchBalances(
            {
              ...chain,
              tokens: chain.tokens.map((t) => ({
                ...t,
                token_id: t.token_id.toLowerCase(),
              })),
            },
            address
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
    tokens: builder.query<TokenWithChainID[], unknown>({
      providesTags: ["tokens"],
      query: () => `v1/tokens/list${IS_TEST ? "/test" : ""}`,
      transformResponse(res: TokenWithChainID[]) {
        //TODO: AWS sort by chain_id
        res.sort((a, b) => a.chain_id.localeCompare(b.chain_id));
        return res;
      },
    }),
    stripeSessionURL: builder.mutation<{ url: string }, StripeSessionURLParams>(
      {
        query: ({ endowType, endowId, liquidSplitPct }) => ({
          url: `${v(1)}/fiat/stripe-proxy/${
            endowType === "charity" ? "apes" : "normal"
          }/${network}`,
          method: "POST",
          body: JSON.stringify({
            endowmentId: endowId,
            splitLiq: liquidSplitPct,
            redirectUrl: `${window.location.origin}${appRoutes.donate_fiat_thanks}`,
          }),
        }),
      }
    ),
  }),
});

function overrides(chain: FetchedChain): FetchedChain {
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
  useStripeSessionURLMutation,
  util: {
    invalidateTags: invalidateApesTags,
    updateQueryData: updateApesQueryData,
  },
} = apes;
