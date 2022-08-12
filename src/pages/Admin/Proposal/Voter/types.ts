import { Vote } from "types/server/contracts";

export type VoteValues = {
  vote: Vote;
  proposalId: number;
};

export type Props = { proposalId: number };
