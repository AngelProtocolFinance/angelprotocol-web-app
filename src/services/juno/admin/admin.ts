import { ContractQueryArgs } from "services/types";
import {
  AdminVoteInfo,
  CW3Config,
  Member,
  Proposal,
  QueryRes,
} from "types/server/contracts";
import { adminTags, junoTags } from "services/juno/tags";
import { junoApi } from "..";
import contract_querier from "../contract_querier";

type MemberRes = {
  members: Member[];
};
type ProposalsRes = {
  proposals: Proposal[];
};

type InquiredMember = {
  weight: number | null;
};

type VoteListRes = {
  votes: AdminVoteInfo[];
};

export const admin_api = junoApi.injectEndpoints({
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

    //CW3
    cw3Config: builder.query<CW3Config, ContractQueryArgs>({
      providesTags: [{ type: junoTags.admin, id: adminTags.config }],
      query: contract_querier,
      transformResponse: (res: QueryRes<CW3Config>) => {
        return res.data;
      },
    }),

    proposal: builder.query<Proposal, ContractQueryArgs>({
      providesTags: [{ type: junoTags.admin, id: adminTags.proposal }],
      query: contract_querier,
      transformResponse: (res: QueryRes<Proposal>) => {
        return res.data;
      },
    }),
    proposals: builder.query<Proposal[], ContractQueryArgs>({
      providesTags: [{ type: junoTags.admin, id: adminTags.proposals }],
      query: contract_querier,
      transformResponse: (res: QueryRes<ProposalsRes>) => {
        return res.data.proposals;
      },
    }),
    votes: builder.query<AdminVoteInfo[], ContractQueryArgs>({
      providesTags: [{ type: junoTags.admin, id: adminTags.votes }],
      query: contract_querier,
      transformResponse: (res: QueryRes<VoteListRes>) => {
        return res.data.votes;
      },
    }),
  }),
});
