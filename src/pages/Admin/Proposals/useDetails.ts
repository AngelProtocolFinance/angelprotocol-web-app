import { useMemo } from "react";
import { useVoteList, useVoter } from "services/terra/admin/queriers";
import { Proposal, ProposalStatus } from "services/terra/admin/types";
import { useLatestBlock } from "services/terra/queriers";

export default function useDetails(proposalInfo: Proposal): ProposalDetails {
  const blockHeight = useLatestBlock();
  const { votes } = useVoteList(proposalInfo.id);

  const [numYes, numNo] = useMemo(
    () =>
      votes.reduce(
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
      ),
    [votes]
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
    pctNotYet: numNotYet / totalWeight,
    blockHeight,
    remainingBlocks: expiry - +blockHeight,
    isVoteEnded: proposalInfo.expires.at_height < +blockHeight,
    isExecutable: proposalInfo.status === "passed",
    isExecuted: proposalInfo.status === "executed",
  };
}

export type ProposalDetails = {
  numYes: number;
  numNo: number;
  numNotYet: number;
  pctYes: number;
  pctNo: number;
  pctNotYet: number;
  blockHeight: string;
  remainingBlocks: number;
  isVoteEnded: boolean;
  isExecutable: boolean;
  isExecuted: boolean;
};
