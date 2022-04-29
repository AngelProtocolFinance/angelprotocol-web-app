import { FundDetails, FundListRes } from "contracts/types";
import contract_querier from "../contract_querier";
import { indexfund, tags } from "../tags";
import { terra } from "../terra";
import { ContractQueryArgs, QueryRes } from "../types";
import { AllianceMember, AllianceMembersRes, IndexFundConfig } from "./types";

export const indexFund_api = terra.injectEndpoints({
  endpoints: (builder) => ({
    fundList: builder.query<FundDetails[], ContractQueryArgs>({
      providesTags: [{ type: tags.indexfund, id: indexfund.fund_list }],
      query: contract_querier,
      transformResponse: (res: QueryRes<FundListRes>) => {
        return res.query_result.funds;
      },
    }),
    allianceMembers: builder.query<AllianceMember[], ContractQueryArgs>({
      providesTags: [{ type: tags.indexfund, id: indexfund.alliance_members }],
      query: contract_querier,
      transformResponse: (res: QueryRes<AllianceMembersRes>) => {
        return res.query_result.alliance_members;
      },
    }),
    config: builder.query<IndexFundConfig, ContractQueryArgs>({
      providesTags: [{ type: tags.indexfund, id: indexfund.config }],
      query: contract_querier,
      transformResponse: (res: QueryRes<IndexFundConfig>) => {
        return res.query_result;
      },
    }),
  }),
});
