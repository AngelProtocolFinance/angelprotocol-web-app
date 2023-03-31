import { VotesPageOptions } from "types/contracts";
import { useContractQuery } from "services/juno";
import { useAdminResources } from "../../Guard";

export const VOTES_PER_PAGE = 15;
export function useVoteList(pollId: number, pageNum?: number) {
  const { multisig } = useAdminResources();
  const {
    data: votes = [],
    isFetching,
    isLoading,
  } = useContractQuery("multisig.votes", {
    multisig,
    ...genVoteListPageOptions(pollId, pageNum),
  });

  return { votes, isVoteListLoading: isFetching || isLoading };
}

function genVoteListPageOptions(
  pollId: number,
  pageNum?: number
): VotesPageOptions {
  return {
    proposal_id: pollId,
    ...(pageNum && {
      limit: pageNum * VOTES_PER_PAGE,
    }),
  };
}
