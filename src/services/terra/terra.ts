import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  retry,
} from "@reduxjs/toolkit/query/react";
import { urls } from "App/chains";
import { chains, GovState, HaloBalance } from "contracts/types";
import { Dec, Coin } from "@terra-money/terra.js";
import {
  BalanceRes,
  BlockLatest,
  ContractQueryArgs,
  GovConfig,
  GovStaker,
  PairInfo,
  Poll,
  Polls,
  QueryRes,
  TokenInfo,
} from "./types";
import { gov, halo, tags, user } from "./tags";

//initial works on migrating terra SDK queries into lower level
//to enhance speed & efficiency thru caching

//a way to segragate queries to testnet | mainnet
const customBaseQuery: BaseQueryFn = async (args, api, extraOptions) => {
  //disable retries
  //get state from api.getState
  const is_mainnet = false;
  const base_url = is_mainnet ? urls[chains.mainnet] : urls[chains.testnet];
  return retry(fetchBaseQuery({ baseUrl: base_url }), { maxRetries: 1 })(
    args,
    api,
    extraOptions
  );
};

export const terra = createApi({
  reducerPath: "terra",
  baseQuery: customBaseQuery,
  tagTypes: [tags.gov, tags.user, tags.halo],
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

    govPolls: builder.query<Poll[], ContractQueryArgs>({
      providesTags: [{ type: tags.gov, id: gov.polls }],
      query: contract_querier,
      transformResponse: (res: QueryRes<Polls>) => {
        return res.query_result.polls;
      },
    }),
    govState: builder.query<GovState, ContractQueryArgs>({
      providesTags: [{ type: tags.gov, id: gov.state }],
      query: contract_querier,
      transformResponse: (res: QueryRes<GovState>) => {
        return res.query_result;
      },
    }),
    govStaker: builder.query<GovStaker, ContractQueryArgs>({
      providesTags: [{ type: tags.gov, id: gov.staker }],
      query: contract_querier,
      transformResponse: (res: QueryRes<GovStaker>) => {
        return res.query_result;
      },
    }),
    govConfig: builder.query<GovConfig, ContractQueryArgs>({
      providesTags: [{ type: tags.gov, id: gov.config }],
      query: contract_querier,
      transformResponse: (res: QueryRes<GovConfig>) => {
        return res.query_result;
      },
    }),
    govBalance: builder.query<number, ContractQueryArgs>({
      providesTags: [{ type: tags.gov, id: gov.halo_balance }],
      query: contract_querier,
      transformResponse: (res: QueryRes<HaloBalance>) => {
        const halo_amount = new Dec(res.query_result.balance)
          .div(1e6)
          .toNumber();
        return halo_amount;
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
    //lbp_factory
    pairInfo: builder.query<PairInfo, ContractQueryArgs>({
      providesTags: [{ type: tags.user, id: user.halo_balance }],
      query: contract_querier,
      transformResponse: (res: QueryRes<PairInfo>) => {
        return res.query_result;
      },
    }),
  }),
});

function contract_querier(arg: ContractQueryArgs) {
  const query_msg = btoa(JSON.stringify(arg.msg));
  return {
    url: `terra/wasm/v1beta1/contracts/${arg.address}/store`,
    params: { query_msg },
  };
}
