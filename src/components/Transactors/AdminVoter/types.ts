import { FC } from "react";
import { Vote } from "types/contracts/gov";

export type AdminVoteValues = {
  vote: Vote;
  proposal_id: number;
};

export type Props = { proposal_id: number; Form: FC };
