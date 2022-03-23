import { FundDetails, FundListRes } from "contracts/types";
import contract_querier from "../contract_querier";
import { terra } from "../terra";
import { ContractQueryArgs, QueryRes } from "../types";
import { TCAMembersRes } from "./types";

export const indexFund_api = terra.injectEndpoints({
  endpoints: (builder) => ({
    fundList: builder.query<FundDetails[], ContractQueryArgs>({
      query: contract_querier,
      transformResponse: (res: QueryRes<FundListRes>) => {
        return res.query_result.funds;
      },
    }),
    tcaMembers: builder.query<string[], ContractQueryArgs>({
      query: contract_querier,
      transformResponse: (res: QueryRes<TCAMembersRes>) => {
        return res.query_result.tca_members;
      },
    }),
  }),
});
