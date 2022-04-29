import contract_querier from "../contract_querier";
import { admin, tags } from "../tags";
import { terra } from "../terra";
import { ContractQueryArgs, QueryRes } from "../types";
import {
  CW3Config,
  InquiredMember,
  Member,
  MemberRes,
  Proposal,
  ProposalsRes,
  VoteInfo,
  VoteListRes,
} from "./types";

export const admin_api = terra.injectEndpoints({
  endpoints: (builder) => ({
    //CW4
    members: builder.query<Member[], ContractQueryArgs>({
      providesTags: [{ type: tags.admin, id: admin.members }],
      query: contract_querier,
      transformResponse: (res: QueryRes<MemberRes>) => {
        return res.query_result.members;
      },
    }),
    member: builder.query<InquiredMember, ContractQueryArgs>({
      providesTags: [{ type: tags.admin, id: admin.member }],
      query: contract_querier,
      transformResponse: (res: QueryRes<InquiredMember>) => {
        return res.query_result;
      },
    }),

    //CW3
    cw3Config: builder.query<CW3Config, ContractQueryArgs>({
      providesTags: [{ type: tags.admin, id: admin.config }],
      query: contract_querier,
      transformResponse: (res: QueryRes<CW3Config>) => {
        return res.query_result;
      },
    }),

    proposal: builder.query<Proposal, ContractQueryArgs>({
      providesTags: [{ type: tags.admin, id: admin.proposal }],
      query: contract_querier,
      transformResponse: (res: QueryRes<Proposal>) => {
        return res.query_result;
      },
    }),
    proposals: builder.query<Proposal[], ContractQueryArgs>({
      providesTags: [{ type: tags.admin, id: admin.proposals }],
      query: contract_querier,
      transformResponse: (res: QueryRes<ProposalsRes>) => {
        return res.query_result.proposals;
      },
    }),
    votes: builder.query<VoteInfo[], ContractQueryArgs>({
      providesTags: [{ type: tags.admin, id: admin.votes }],
      query: contract_querier,
      transformResponse: (res: QueryRes<VoteListRes>) => {
        return res.query_result.votes;
      },
    }),
  }),
});
