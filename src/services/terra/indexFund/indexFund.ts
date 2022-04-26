import {
  AllianceMember,
  FundDetails,
  IndexFundConfig,
  QueryRes,
} from "@types-server/contracts";
import { ContractQueryArgs } from "@types-services/terra";
import contract_querier from "../contract_querier";
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
      query: contract_querier,
      transformResponse: (res: QueryRes<FundListRes>) => {
        return res.query_result.funds;
      },
    }),
    allianceMembers: builder.query<AllianceMember[], ContractQueryArgs>({
      query: contract_querier,
      transformResponse: (res: QueryRes<AllianceMembersRes>) => {
        return res.query_result.alliance_members;
      },
    }),
    config: builder.query<IndexFundConfig, ContractQueryArgs>({
      query: contract_querier,
      transformResponse: (res: QueryRes<IndexFundConfig>) => {
        return res.query_result;
      },
    }),
  }),
});
