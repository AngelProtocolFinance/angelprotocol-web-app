import { VotesPageOptions } from "types/contracts";
import { useVotesQuery } from "services/juno/cw3";
import { useAdminResources } from "../../Guard";

//contract.voteList(genVoteListPageOptions(pollId, pageNum))
export const VOTES_PER_PAGE = 15;
export function useVoteList(pollId: number, pageNum?: number) {
  const { cw3 } = useAdminResources();
  const {
    data = [],
    isFetching,
    isLoading,
  } = useVotesQuery({
    contract: cw3,
    ...genVoteListPageOptions(pollId, pageNum),
  });
  return { votes: data, isVoteListLoading: isFetching || isLoading };
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
