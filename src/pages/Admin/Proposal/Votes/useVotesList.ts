import { VotesPageOptions } from "types/contracts";
import useQueryContract from "services/contract/useQueryContract";
import { useAdminResources } from "../../Guard";

//contract.voteList(genVoteListPageOptions(pollId, pageNum))
export const VOTES_PER_PAGE = 15;
export function useVoteList(pollId: number, pageNum?: number) {
  const { cw3 } = useAdminResources();
  const {
    data = { votes: [] },
    isValidating,
    isLoading,
  } = useQueryContract(
    cw3,
    "cw3Votes",
    genVoteListPageOptions(pollId, pageNum)
  );

  return { votes: data.votes, isVoteListLoading: isValidating || isLoading };
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
