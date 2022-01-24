import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  retry,
} from "@reduxjs/toolkit/query/react";
import { terra_lcds } from "constants/urls";
import { GovState, HaloBalance } from "contracts/types";
import { Dec, Coin } from "@terra-money/terra.js";
import {
  BalanceRes,
  BlockLatest,
  ContractQueryArgs,
  GovConfig,
  GovStaker,
  Holdings,
  PairInfo,
  Poll,
  Polls,
  Pool,
  PoolBalance,
  QueryRes,
  Simulation,
  TokenInfo,
} from "./types";
import { endowment, gov, halo, lbp, tags, user } from "./tags";
import { RootState } from "store/store";
import { AnyRecord } from "dns";

//initial works on migrating terra SDK queries into lower level
//to enhance speed & efficiency thru caching
//a way to segragate queries to testnet | mainnet

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
  tagTypes: [tags.gov, tags.user, tags.halo, tags.lbp, tags.endowment],
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
    //lbp_pair
    pool: builder.query<PoolBalance, ContractQueryArgs>({
      providesTags: [{ type: tags.lbp, id: lbp.pool }],
      query: contract_querier,
      transformResponse: (res: QueryRes<Pool>) => {
        const pool = res.query_result;
        return {
          token: pool.assets[0].amount,
          native_token: pool.assets[1].amount,
        };
      },
    }),
    pairInfo: builder.query<PairInfo, ContractQueryArgs>({
      query: contract_querier,
      transformResponse: (res: QueryRes<PairInfo>) => {
        return res.query_result;
      },
    }),
    pairSimul: builder.query<Simulation, ContractQueryArgs>({
      query: contract_querier,
      transformResponse: (res: QueryRes<Simulation>) => {
        return res.query_result;
      },
    }),
    endowmentHoldings: builder.query<Holdings, ContractQueryArgs>({
      providesTags: [{ type: tags.endowment, id: endowment.holdings }],
      query: contract_querier,
      transformResponse: (res: QueryRes<Holdings>) => {
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
