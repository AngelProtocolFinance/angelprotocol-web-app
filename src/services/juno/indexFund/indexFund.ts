import { ContractQueryArgs } from "services/types";
import {
  AllianceMember,
  FundDetails,
  IndexFundConfig,
  QueryRes,
} from "types/server/contracts";
import { junoApi } from "..";
import contract_querier from "../contract_querier";
import { indexfundTags, junoTags } from "../tags";

type AllianceMembersRes = {
  alliance_members: AllianceMember[];
};

type FundListRes = {
  funds: FundDetails[];
};

export const indexFund_api = junoApi.injectEndpoints({
  endpoints: (builder) => ({
    fundList: builder.query<FundDetails[], ContractQueryArgs>({
      providesTags: [{ type: junoTags.indexfund, id: indexfundTags.fund_list }],
      query: contract_querier,
      transformResponse: (res: QueryRes<FundListRes>) => {
        return res.data.funds;
      },
    }),
    allianceMembers: builder.query<AllianceMember[], ContractQueryArgs>({
      providesTags: [
        { type: junoTags.indexfund, id: indexfundTags.alliance_members },
      ],
      query: contract_querier,
      transformResponse: (res: QueryRes<AllianceMembersRes>) => {
        return res.data.alliance_members;
      },
    }),
    config: builder.query<IndexFundConfig, ContractQueryArgs>({
      providesTags: [{ type: junoTags.indexfund, id: indexfundTags.config }],
      query: contract_querier,
      transformResponse: (res: QueryRes<IndexFundConfig>) => {
        return res.data;
      },
    }),
  }),
});
