import { Vote } from "types/server/contracts";

export type AdminVoteValues = {
  vote: Vote;
  proposal_id: number;
};

export type Props = { proposal_id: number };
