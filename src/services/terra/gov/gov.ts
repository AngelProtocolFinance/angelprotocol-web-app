import { Dec } from "@terra-money/terra.js";
import contract_querier from "../contract_querier";
import { gov, tags } from "../tags";
import { terra } from "../terra";
import { ContractQueryArgs, HaloBalance, QueryRes } from "../types";
import { GovConfig, GovStaker, GovState, Poll, Polls } from "./types";

export const gov_api = terra.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});
