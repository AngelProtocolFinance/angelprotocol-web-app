import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EndowmentBalances, Token } from "types/aws";
import { ChainID } from "types/chain";
import { appRoutes } from "constants/routes";
import { APIs } from "constants/urls";
import { apiEnv } from "../constants";
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
    tokens: builder.query<Token[], ChainID>({
      query: (chainID) => `v1/tokens/${chainID}`,
    }),

    stripeSessionURL: builder.mutation<{ url: string }, StripeSessionURLParams>(
      {
        query: ({ endowId, liquidSplitPct }) => ({
          url: `${v(1)}/fiat/stripe-proxy/apes/${apiEnv}`,
          method: "POST",
          body: JSON.stringify({
            endowmentId: endowId,
            splitLiq: liquidSplitPct,
            redirectUrl: `${window.location.origin}${appRoutes.donate_fiat_thanks}`,
          }),
        }),
      }
    ),
    endowBalance: builder.query<EndowmentBalances, number>({
      query: (endowId) => `${v(1)}/balances/${endowId}`,
    }),
  }),
});

export const {
  useTokensQuery,
  useStripeSessionURLMutation,
  useEndowBalanceQuery,
  util: {
    invalidateTags: invalidateApesTags,
    updateQueryData: updateApesQueryData,
  },
} = apes;
