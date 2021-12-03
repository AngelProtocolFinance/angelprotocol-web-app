import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  retry,
} from "@reduxjs/toolkit/query/react";
import { urls } from "App/chains";
import { chains, GovState } from "contracts/types";
import { ContractQueryArgs, Poll, Polls, QueryRes, TokenInfo } from "./types";

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
    haloInfo: builder.query<TokenInfo, ContractQueryArgs>({
      query: contract_querier,
      transformResponse: (res: QueryRes<TokenInfo>) => {
        return res.query_result;
      },
    }),
  }),
});

export const { useGovPollsQuery, useGovStateQuery, useHaloInfoQuery } = terra;

function contract_querier(arg: ContractQueryArgs) {
  const query_msg = btoa(JSON.stringify(arg.msg));
  return {
    url: `terra/wasm/v1beta1/contracts/${arg.address}/store`,
    params: { query_msg },
  };
}
