import { useMemo } from "react";
import { AdminVoteInfo, Proposal, Vote } from "types/server/contracts";
import { useVoteList } from "services/terra/admin/queriers";
import { useLatestBlock } from "services/terra/queriers";
import useWalletContext from "hooks/useWalletContext";
import idParamToNumber from "helpers/idParamToNum";

export default function useProposalDetails(
  proposalInfo: Proposal
): ProposalDetails {
  const blockHeight = useLatestBlock();
  const { wallet } = useWalletContext();
  const { votes = [] } = useVoteList(proposalInfo.id);

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

  const userVote: Vote | undefined = useMemo(
    () => votes.find((vote) => vote.voter === wallet?.address)?.vote,
    [wallet, votes]
  );

  const totalWeight = +proposalInfo.threshold.absolute_percentage.total_weight;
  const expiry = proposalInfo.expires.at_height;
  const numNotYet = totalWeight - numYes - numNo;

  return {
    numYes,
    numNo,
    numNotYet,
    pctYes: (numYes / totalWeight) * 100,
    pctNo: (numNo / totalWeight) * 100,
    pctNotYet: (numNotYet / totalWeight) * 100,
    blockHeight,
    expiry,
    remainingBlocks: expiry - +blockHeight,
    isVoteEnded:
      proposalInfo.expires.at_height < +blockHeight ||
      proposalInfo.status !== "open",
    isExecutable: proposalInfo.status === "passed",
    isExecuted: proposalInfo.status === "executed",
    numId: idParamToNumber(proposalInfo.id),
    votes,
    userVote,
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
  expiry: number;
  remainingBlocks: number;
  isVoteEnded: boolean;
  isExecutable: boolean;
  isExecuted: boolean;
  numId: number;
  userVote?: Vote;
  votes: AdminVoteInfo[];
};
