import { FC } from "react";

export interface Values {
  vote: "yes" | "no";
  amount: string;
  poll_id: string;
}

export type Props = {
  poll_id: number;
  Form: FC;
};
