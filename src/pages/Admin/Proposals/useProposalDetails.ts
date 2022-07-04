import { useMemo } from "react";
import { ProposalDetails } from "pages/Admin/types";
import { Proposal, Vote } from "types/server/contracts";
import { useVoteList } from "services/juno/admin/queriers";
import { useLatestBlock } from "services/juno/queriers";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import idParamToNumber from "helpers/idParamToNum";

export default function useProposalDetails(
  proposalInfo: Proposal
): ProposalDetails {
  const blockHeight = useLatestBlock();
  const { wallet } = useGetWallet();
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
    meta: proposalInfo.meta,
  };
}
