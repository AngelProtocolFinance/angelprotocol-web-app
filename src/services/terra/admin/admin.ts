import contract_querier from "../contract_querier";
import { terra } from "../terra";
import { ContractQueryArgs, QueryRes } from "../types";
import { Member, MemberRes } from "./types";

export const admin_api = terra.injectEndpoints({
  endpoints: (builder) => ({
    members: builder.query<Member[], ContractQueryArgs>({
      query: contract_querier,
      transformResponse: (res: QueryRes<MemberRes>) => {
        return res.query_result.members;
      },
    }),
  }),
});
