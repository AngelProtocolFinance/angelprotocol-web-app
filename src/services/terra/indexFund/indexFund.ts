import { ContractQueryArgs } from "services/types";
import {
  AllianceMember,
  FundDetails,
  IndexFundConfig,
  QueryRes,
} from "types/server/contracts";
import contract_querier from "../contract_querier";
import { indexfundTags, terraTags } from "../tags";
import { terra } from "../terra";

type AllianceMembersRes = {
  alliance_members: AllianceMember[];
};

type FundListRes = {
  funds: FundDetails[];
};

export const indexFund_api = terra.injectEndpoints({
  endpoints: (builder) => ({
    fundList: builder.query<FundDetails[], ContractQueryArgs>({
      providesTags: [
        { type: terraTags.indexfund, id: indexfundTags.fund_list },
      ],
      query: contract_querier,
      transformResponse: (res: QueryRes<FundListRes>) => {
        return res.query_result.funds;
      },
    }),
    allianceMembers: builder.query<AllianceMember[], ContractQueryArgs>({
      providesTags: [
        { type: terraTags.indexfund, id: indexfundTags.alliance_members },
      ],
      query: contract_querier,
      transformResponse: (res: QueryRes<AllianceMembersRes>) => {
        return res.query_result.alliance_members;
      },
    }),
    config: builder.query<IndexFundConfig, ContractQueryArgs>({
      providesTags: [{ type: terraTags.indexfund, id: indexfundTags.config }],
      query: contract_querier,
      transformResponse: (res: QueryRes<IndexFundConfig>) => {
        return res.query_result;
      },
    }),
  }),
});
