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
  Poll,
  Polls,
  QueryRes,
  TokenInfo,
} from "./types";

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
  endpoints: (builder) => ({
    latestBlock: builder.query<string, unknown>({
      query: () => "/blocks/latest",
      transformResponse: (res: BlockLatest) => {
        return res.block.header.height;
      },
    }),

    balances: builder.query<Coin.Data[], string | undefined>({
      query: (address) => `/cosmos/bank/v1beta1/balances/${address}`,
      transformResponse: (res: BalanceRes) => {
        return res.balances;
      },
    }),

    govPolls: builder.query<Poll[], ContractQueryArgs>({
      query: contract_querier,
      transformResponse: (res: QueryRes<Polls>) => {
        return res.query_result.polls;
      },
    }),
    govState: builder.query<GovState, ContractQueryArgs>({
      query: contract_querier,
      transformResponse: (res: QueryRes<GovState>) => {
        return res.query_result;
      },
    }),
    govStaker: builder.query<GovStaker, ContractQueryArgs>({
      query: contract_querier,
      transformResponse: (res: QueryRes<GovStaker>) => {
        return res.query_result;
      },
    }),
    govConfig: builder.query<GovConfig, ContractQueryArgs>({
      query: contract_querier,
      transformResponse: (res: QueryRes<GovConfig>) => {
        return res.query_result;
      },
    }),
    haloInfo: builder.query<TokenInfo, ContractQueryArgs>({
      query: contract_querier,
      transformResponse: (res: QueryRes<TokenInfo>) => {
        return res.query_result;
      },
    }),
    haloBalance: builder.query<number, ContractQueryArgs>({
      query: contract_querier,
      transformResponse: (res: QueryRes<HaloBalance>) => {
        const halo_amount = new Dec(res.query_result.balance)
          .div(1e6)
          .toNumber();
        return halo_amount;
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
