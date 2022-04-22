import { ContractQueryArgs, QueryRes } from "types/services/terra";
import { FundDetails, FundListRes } from "contracts/types";
import contract_querier from "../contract_querier";
import { terra } from "../terra";
import { AllianceMember, AllianceMembersRes, IndexFundConfig } from "./types";

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
