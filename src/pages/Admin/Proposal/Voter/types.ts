import { ProposalType, Vote } from "types/contracts";

export type VoteValues = {
  vote: Vote;
  proposalId: number;
  reason: string; //type === "application",
  //meta
  type: ProposalType;
  existingReason: string;
};

export type Props = Pick<VoteValues, "proposalId" | "type" | "existingReason">;
