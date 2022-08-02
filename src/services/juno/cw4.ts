import { ContractQueryArgs } from "services/types";
import { InquiredMember, Member, QueryRes } from "types/server/contracts";
import { adminTags, junoTags } from "services/juno/tags";
import { junoApi } from ".";
import contract_querier from "./contract_querier";

type MemberRes = {
  members: Member[];
};

export const cw4Api = junoApi.injectEndpoints({
  endpoints: (builder) => ({
    //CW4
    members: builder.query<Member[], ContractQueryArgs>({
      providesTags: [{ type: junoTags.admin, id: adminTags.members }],
      query: contract_querier,
      transformResponse: (res: QueryRes<MemberRes>) => {
        return res.data.members;
      },
    }),
    member: builder.query<InquiredMember, ContractQueryArgs>({
      providesTags: [{ type: junoTags.admin, id: adminTags.member }],
      query: contract_querier,
      transformResponse: (res: QueryRes<InquiredMember>) => {
        return res.data;
      },
    }),
  }),
});

export const { useMemberQuery, useMembersQuery } = cw4Api;
