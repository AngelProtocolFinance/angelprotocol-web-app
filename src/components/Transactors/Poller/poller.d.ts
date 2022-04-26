declare module "@types-component/poller" {
  import { FC } from "react";

  interface CreatePollValues {
    amount: string;
    title: string;
    description: string;
    link: string;
    // execute_msgs: predefined fields
  }

  type Props = { Form: FC };
}
