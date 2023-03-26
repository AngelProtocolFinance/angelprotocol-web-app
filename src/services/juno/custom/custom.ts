import { ProposalDetails } from "services/types";
import { junoApi } from "..";
import { queryContract } from "../queryContract";
import { adminTags } from "../tags";

export const customApi = junoApi.injectEndpoints({
  endpoints: (builder) => ({
    proposalDetails: builder.query<
      ProposalDetails,
      { id?: string; cw3: string; voter: string }
    >({
      providesTags: [
        { type: "admin", id: adminTags.proposal },
        { type: "admin", id: adminTags.votes },
      ],
      async queryFn(args) {
        const id = Number(args.id);

        if (isNaN(id)) {
          return { error: undefined };
        }

        const [proposal, votes] = await Promise.all([
          queryContract("cw3Proposal", args.cw3, { id }),
          queryContract("cw3Votes", args.cw3, {
            proposal_id: id,
          }),
        ]);

        return {
          data: {
            ...proposal,
            votes: votes,
          },
        };
      },
    }),
  }),
});

export const { useProposalDetailsQuery } = customApi;
