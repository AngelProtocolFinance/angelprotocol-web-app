import { useConnectedWallet } from "@terra-money/use-wallet";
import { Vote } from "contracts/types";
import idParamToNumber from "helpers/idParamToNum";
import { useMemo } from "react";
import { useVoteList } from "services/terra/admin/queriers";
import { Proposal } from "services/terra/admin/types";
import { useLatestBlock } from "services/terra/queriers";

export default function useDetails(proposalInfo: Proposal): ProposalDetails {
  const blockHeight = useLatestBlock();
  const wallet = useConnectedWallet();
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

  const userVote: Vote | undefined = useMemo(
    () => votes.find((vote) => vote.voter === wallet?.walletAddress)?.vote,
    [wallet]
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
    remainingBlocks: expiry - +blockHeight,
    isVoteEnded: proposalInfo.expires.at_height < +blockHeight,
    isExecutable: proposalInfo.status === "passed",
    isExecuted: proposalInfo.status === "executed",
    numId: idParamToNumber(proposalInfo.id),
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
  numId: number;
  userVote?: Vote;
};
