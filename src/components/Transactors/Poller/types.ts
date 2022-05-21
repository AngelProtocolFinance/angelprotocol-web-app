import { FC } from "react";

export interface CreatePollValues {
  amount: string;
  title: string;
  description: string;
  link: string;
  // execute_msgs: predefined fields
}

export type Props = { Form: FC };
