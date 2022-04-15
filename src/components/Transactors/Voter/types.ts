import { FC } from "react";
import { Vote } from "contracts/types";

export interface VoteValues {
  vote: Vote;
  amount: string;
  poll_id: string;
}

export type Props = {
  poll_id: number;
  Form: FC;
};
