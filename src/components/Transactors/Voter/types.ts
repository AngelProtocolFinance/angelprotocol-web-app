import { FC } from "react";

export interface VoteValues {
  vote: "yes" | "no";
  amount: string;
  poll_id: string;
}

export type Props = {
  poll_id: number;
  Form: FC;
};
