import { FC } from "react";

export interface Values {
  // Values type
  amount: string;
  is_stake: boolean;
}

export type Props = { Form: FC; stake: boolean };
