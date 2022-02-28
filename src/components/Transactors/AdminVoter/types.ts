import { Vote } from "contracts/types";
import { FC } from "react";

export type AdminVoteValues = {
  vote: Vote;
  proposal_id: number;
};

export type Props = { proposal_id: number; Form: FC };
