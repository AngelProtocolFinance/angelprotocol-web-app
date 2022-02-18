import contract_querier from "../contract_querier";
import { terra } from "../terra";
import { ContractQueryArgs, QueryRes } from "../types";
import {
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
    members: builder.query<Member[], ContractQueryArgs>({
      query: contract_querier,
      transformResponse: (res: QueryRes<MemberRes>) => {
        return res.query_result.members;
      },
    }),
    member: builder.query<InquiredMember, ContractQueryArgs>({
      query: contract_querier,
      transformResponse: (res: QueryRes<InquiredMember>) => {
        return res.query_result;
      },
    }),
    proposals: builder.query<Proposal[], ContractQueryArgs>({
      query: contract_querier,
      transformResponse: (res: QueryRes<ProposalsRes>) => {
        return res.query_result.proposals;
      },
    }),
    votes: builder.query<VoteInfo[], ContractQueryArgs>({
      query: contract_querier,
      transformResponse: (res: QueryRes<VoteListRes>) => {
        return res.query_result.votes;
      },
    }),
  }),
});
