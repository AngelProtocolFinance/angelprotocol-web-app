import { Res, Result, WithAddrArgs } from "./queryContract/types";
import { adminTags } from "services/juno/tags";
import { junoApi } from ".";
import { genQueryPath } from "./queryContract/genQueryPath";

export const cw3Api = junoApi.injectEndpoints({
  endpoints: (builder) => ({
    proposal: builder.query<Result<"cw3Proposal">, WithAddrArgs<"cw3Proposal">>(
      {
        providesTags: [{ type: "admin", id: adminTags.proposal }],
        query: ({ contract, ...args }) =>
          genQueryPath("cw3Proposal", args, contract),
        transformResponse: (res: Res<"cw3Proposal">) => {
          return res.data;
        },
      }
    ),
    proposals: builder.query<
      Result<"cw3Proposals">,
      WithAddrArgs<"cw3Proposals">
    >({
      providesTags: [{ type: "admin", id: adminTags.proposals }],
      query: ({ contract, ...args }) =>
        genQueryPath("cw3Proposals", args, contract),
      transformResponse: (res: Res<"cw3Proposals">) => {
        return res.data.proposals;
      },
    }),
    reviewCw3Config: builder.query<
      Result<"reviewCw3Config">,
      WithAddrArgs<"reviewCw3Config">
    >({
      providesTags: [{ type: "admin", id: adminTags.config }],
      query: (contract) => genQueryPath("reviewCw3Config", null, contract),
      transformResponse: (res: Res<"reviewCw3Config">) => {
        return res.data;
      },
    }),
    votes: builder.query<Result<"cw3Votes">, WithAddrArgs<"cw3Votes">>({
      providesTags: [{ type: "admin", id: adminTags.votes }],
      query: ({ contract, ...args }) =>
        genQueryPath("cw3Votes", args, contract),
      transformResponse: (res: Res<"cw3Votes">) => {
        return res.data.votes;
      },
    }),
  }),
});

export const {
  useProposalsQuery,
  useVotesQuery,
  useProposalQuery,
  useReviewCw3ConfigQuery,
} = cw3Api;
