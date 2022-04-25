import { Vote } from "@types-server/contracts";
import { FC } from "react";

export interface VoteValues {
  vote: Vote;
  amount: string;
  poll_id: string;
}

export type Props = {
  poll_id: number;
  Form: FC;
};
