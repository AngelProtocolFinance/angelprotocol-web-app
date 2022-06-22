import { ContractQueryArgs } from "services/types";
import {
  CW20Balance,
  CW20Info,
  GovConfig,
  GovStaker,
  GovState,
  Poll,
  Polls,
  QueryRes,
} from "types/server/contracts";
import { govTags, terraTags } from "services/terra/tags";
import Decimal from "helpers/Decimal";
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
    govHaloBalance: builder.query<number, ContractQueryArgs>({
      providesTags: [{ type: terraTags.gov, id: govTags.halo_balance }],
      query: contract_querier,
      transformResponse: (res: QueryRes<CW20Balance>) => {
        return new Decimal(res.query_result.balance, 6).toNumber();
      },
    }),
    haloInfo: builder.query<CW20Info, ContractQueryArgs>({
      providesTags: [{ type: terraTags.gov, id: govTags.halo_info }],
      query: contract_querier,
      transformResponse: (res: QueryRes<CW20Info>) => {
        return res.query_result;
      },
    }),
  }),
});
