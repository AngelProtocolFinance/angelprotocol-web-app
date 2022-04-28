declare module "@types-component/admin-voter" {
  import { FC } from "react";
  import { Vote } from "@types-server/contracts";

  type AdminVoteValues = {
    vote: Vote;
    proposal_id: number;
  };

  type Props = { proposal_id: number };
}
