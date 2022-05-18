declare module "@types-component/voter" {
  import { Vote } from "@types-server/contracts";

  interface VoteValues {
    vote: Vote;
    amount: string;
    poll_id: string;
  }

  type Props = {
    poll_id: number;
  };
}
