import { Dec } from "@terra-money/terra.js";
import {
  ContractQueryArgs,
  HaloBalance,
  QueryRes,
  govTags,
  terraTags,
} from "types/services/terra";
import {
  GovConfig,
  GovStaker,
  GovState,
  Poll,
  Polls,
} from "types/services/terra/gov";
import contract_querier from "../contract_querier";
import { terra } from "../terra";

export const gov_api = terra.injectEndpoints({
  endpoints: (builder) => ({
    govPolls: builder.query<Poll[], ContractQueryArgs>({
      providesTags: [{ type: terraTags.gov, id: govTags.polls }],
      query: contract_querier,
      transformResponse: (res: QueryRes<Polls>) => {
        return res.query_result.polls;
      },
    }),
    govState: builder.query<GovState, ContractQueryArgs>({
      providesTags: [{ type: terraTags.gov, id: govTags.state }],
      query: contract_querier,
      transformResponse: (res: QueryRes<GovState>) => {
        return res.query_result;
      },
    }),
    govStaker: builder.query<GovStaker, ContractQueryArgs>({
      providesTags: [{ type: terraTags.gov, id: govTags.staker }],
      query: contract_querier,
      transformResponse: (res: QueryRes<GovStaker>) => {
        return res.query_result;
      },
    }),
    govConfig: builder.query<GovConfig, ContractQueryArgs>({
      providesTags: [{ type: terraTags.gov, id: govTags.config }],
      query: contract_querier,
      transformResponse: (res: QueryRes<GovConfig>) => {
        return res.query_result;
      },
    }),
    govBalance: builder.query<number, ContractQueryArgs>({
      providesTags: [{ type: terraTags.gov, id: govTags.halo_balance }],
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
