import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
  retry,
} from "@reduxjs/toolkit/query/react";
import { Coin } from "@terra-money/terra.js";
import { RootState } from "store/store";
import { terra_lcds } from "constants/urls";
import { tags, user } from "./tags";
import { BalanceRes, BlockLatest } from "./types";

const customBaseQuery: BaseQueryFn = retry(
  async (args, api, extraOptions) => {
    const chainID = (api.getState() as RootState).chain.terra;
    const base_url = terra_lcds[chainID];
    return fetchBaseQuery({ baseUrl: base_url })(args, api, extraOptions);
  },
  { maxRetries: 1 }
);

export const terra = createApi({
  reducerPath: "terra",
  baseQuery: customBaseQuery,
  tagTypes: [
    tags.gov,
    tags.user,
    tags.admin,
    tags.endowment,
    tags.multicall,
    tags.cw20,
  ],
  endpoints: (builder) => ({
    latestBlock: builder.query<string, unknown>({
      query: () => "/blocks/latest",
      transformResponse: (res: BlockLatest) => {
        return res.block.header.height;
      },
    }),
    balances: builder.query<Coin.Data[], string | undefined>({
      providesTags: [{ type: tags.user, id: user.terra_balance }],
      query: (address) => `/cosmos/bank/v1beta1/balances/${address}`,
      transformResponse: (res: BalanceRes) => {
        return res.balances;
      },
    }),
  }),
});
