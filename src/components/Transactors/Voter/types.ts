import { Vote } from "types/contracts";

export interface VoteValues {
  vote: Vote;
  amount: string;
  poll_id: string;
}

export type Props = {
  poll_id: number;
};
