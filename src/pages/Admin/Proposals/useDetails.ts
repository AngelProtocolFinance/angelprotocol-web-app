import { useVoteList } from "services/terra/admin/queriers";
import { Proposal } from "services/terra/admin/types";
import { useLatestBlock } from "services/terra/queriers";

export default function useDetails(proposalInfo: Proposal) {
  const blockHeight = useLatestBlock();
  const { votes } = useVoteList(proposalInfo.id);

  const [numYes, numNo] = votes.reduce(
    (result, voteInfo) => {
      const weight = +voteInfo.weight;
      if (voteInfo.vote === "yes") {
        result[0] = result[0] + weight;
      } else {
        result[1] = result[1] + weight;
      }
      return result;
    },
    [0, 0]
  );

  const totalWeight = +proposalInfo.threshold.absolute_percentage.total_weight;
  const expiry = proposalInfo.expires.at_height;
  const numNotYet = totalWeight - numYes - numNo;

  return {
    numYes,
    numNo,
    numNotYet,
    pctYes: numYes / totalWeight,
    pctNo: numNo / totalWeight,
    pctNonYet: numNotYet / totalWeight,
    blockHeight,
    remainingBlocks: expiry - +blockHeight,
    isVoteEnded: proposalInfo.expires.at_height < +blockHeight,
  };
}
