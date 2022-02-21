import { Vote } from "contracts/types";
import { FC } from "react";

export interface Values {
  vote: Vote;
  amount: string;
  poll_id?: string;
}

export type Props = {
  poll_id?: string;
  Form: FC;
};
