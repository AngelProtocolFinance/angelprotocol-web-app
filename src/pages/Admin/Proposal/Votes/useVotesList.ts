import { VotesPageOptions } from "types/server/contracts";
import { useVotesQuery } from "services/juno/cw3";
import CW3 from "contracts/CW3";
import { useAdminResources } from "../../Guard";

export const VOTES_PER_PAGE = 15;
export function useVoteList(pollId: number, pageNum?: number) {
  const { cw3 } = useAdminResources();
  const contract = new CW3(undefined, cw3);
  const {
    data = [],
    isFetching,
    isLoading,
  } = useVotesQuery(contract.voteList(genVoteListPageOptions(pollId, pageNum)));
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
