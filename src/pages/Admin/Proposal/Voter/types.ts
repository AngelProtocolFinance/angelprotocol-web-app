import { ProposalType, Vote } from "types/contracts";

export type VoteValues = {
  vote: Vote;
  proposalId: number;
  reason: string; //type === "application",
  //meta
  type: ProposalType;
};

export type Props = { proposalId: number; type: ProposalType };
