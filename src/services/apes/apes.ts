import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  FetchedChain,
  PaginatedAWSQueryRes,
  WithdrawLog,
  WithdrawLogQueryParams,
} from "types/aws";
import { TokenWithBalance } from "types/tx";
import { appRoutes } from "constants/routes";
import { APIs } from "constants/urls";
import { network } from "../constants";
import { version as v } from "../helpers";
import { fetchBalances } from "./helpers/fetchBalances";
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
    tokens: builder.query<
      TokenWithBalance[],
      { chainId: string; address?: string }
    >({
      async queryFn({ address, chainId }, api, options, baseQuery) {
        const { data } = await baseQuery(`v1/chain/${chainId}`);
        const chain = data as FetchedChain;

        console.log({ address, chainId });

        if (!address) {
          return { data: chain.tokens.map((t) => ({ ...t, balance: 0 })) };
        }

        return { data: await fetchBalances(chain, address) };
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
  useWithdrawLogsQuery,
  useLazyWithdrawLogsQuery,
  useTokensQuery,
  useStripeSessionURLMutation,
  util: {
    invalidateTags: invalidateApesTags,
    updateQueryData: updateApesQueryData,
  },
} = apes;
