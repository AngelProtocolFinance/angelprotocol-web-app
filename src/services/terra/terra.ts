import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
  retry,
} from "@reduxjs/toolkit/query/react";
import { Coin, Dec } from "@terra-money/terra.js";
import { RootState } from "store/store";
import { terra_lcds } from "constants/urls";
import contract_querier from "./contract_querier";
import { halo, tags, user } from "./tags";
import {
  BalanceRes,
  BlockLatest,
  ContractQueryArgs,
  HaloBalance,
  QueryRes,
  TokenInfo,
} from "./types";

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
    tags.halo,
    tags.lbp,
    tags.endowment,
    tags.admin,
    tags.multicall,
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

    haloInfo: builder.query<TokenInfo, ContractQueryArgs>({
      providesTags: [{ type: tags.halo, id: halo.info }],
      query: contract_querier,
      transformResponse: (res: QueryRes<TokenInfo>) => {
        return res.query_result;
      },
    }),
    haloBalance: builder.query<number, ContractQueryArgs>({
      providesTags: [{ type: tags.user, id: user.halo_balance }],
      query: contract_querier,
      transformResponse: (res: QueryRes<HaloBalance>) => {
        const halo_amount = new Dec(res.query_result.balance)
          .div(1e6)
          .toNumber();
        return halo_amount;
      },
    }),

    //lbp_pair
  }),
});
