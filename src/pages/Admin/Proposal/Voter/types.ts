import { Vote } from "types/contracts";

export type VoteValues = {
  vote: Vote;
  proposalId: number;
};

export type Props = { proposalId: number };
