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
import { govTags, junoTags } from "services/juno/tags";
import { condenseToNum } from "helpers";
import { junoApi } from "..";
import contract_querier from "../contract_querier";

export const gov_api = junoApi.injectEndpoints({
  endpoints: (builder) => ({
    govPolls: builder.query<Poll[], ContractQueryArgs>({
      providesTags: [{ type: junoTags.gov, id: govTags.polls }],
      query: contract_querier,
      transformResponse: (res: QueryRes<Polls>) => {
        return res.data.polls;
      },
    }),
    govState: builder.query<GovState, ContractQueryArgs>({
      providesTags: [{ type: junoTags.gov, id: govTags.state }],
      query: contract_querier,
      transformResponse: (res: QueryRes<GovState>) => {
        return res.data;
      },
    }),
    govStaker: builder.query<GovStaker, ContractQueryArgs>({
      providesTags: [{ type: junoTags.gov, id: govTags.staker }],
      query: contract_querier,
      transformResponse: (res: QueryRes<GovStaker>) => {
        return res.data;
      },
    }),
    govConfig: builder.query<GovConfig, ContractQueryArgs>({
      providesTags: [{ type: junoTags.gov, id: govTags.config }],
      query: contract_querier,
      transformResponse: (res: QueryRes<GovConfig>) => {
        return res.data;
      },
    }),
    govHaloBalance: builder.query<number, ContractQueryArgs>({
      providesTags: [{ type: junoTags.gov, id: govTags.halo_balance }],
      query: contract_querier,
      transformResponse: (res: QueryRes<CW20Balance>) => {
        return condenseToNum(res.data.balance);
      },
    }),
    haloInfo: builder.query<CW20Info, ContractQueryArgs>({
      providesTags: [{ type: junoTags.gov, id: govTags.halo_info }],
      query: contract_querier,
      transformResponse: (res: QueryRes<CW20Info>) => {
        return res.data;
      },
    }),
  }),
});
