import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  BaseChain,
  PaginatedAWSQueryRes,
  TokenWithChainID,
  WithdrawLog,
  WithdrawLogQueryParams,
} from "types/aws";
import { IS_TEST } from "constants/env";
import { appRoutes } from "constants/routes";
import { APIs } from "constants/urls";
import { network } from "../constants";
import { version as v } from "../helpers";
import { tags } from "./tags";

type StripeSessionURLParams = {
  endowId: number;
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
        query: ({ endowId, liquidSplitPct }) => ({
          url: `${v(1)}/fiat/stripe-proxy/apes/${network}`,
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

export const {
  useChainsQuery,
  useTokensQuery,
  useWithdrawLogsQuery,
  useLazyWithdrawLogsQuery,
  useStripeSessionURLMutation,
  util: {
    invalidateTags: invalidateApesTags,
    updateQueryData: updateApesQueryData,
  },
} = apes;
