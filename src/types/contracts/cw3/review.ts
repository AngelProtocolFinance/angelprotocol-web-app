import { Vote } from "../common";

export interface ApplicationVote {
  proposal_id: number;
  vote: Vote;
  reason?: string;
}
