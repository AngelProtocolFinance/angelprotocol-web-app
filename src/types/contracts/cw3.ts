import { TransactionStatus } from "types/lists";
import { Vote } from "./common";

export type PageOptions = {
  range: [number, number];
  status: TransactionStatus;
};

export type VotesPageOptions = {
  proposal_id: number;
  limit?: number;
  start_after?: number;
};

export type CW3ListVoters = {
  voters: string[];
};

export type Expiration = { at_time: number } | { at_height: number };
export type ProposalType = "normal" | "application";

export type AdminVoteInfo = {
  voter: string; //"juno123abc.."
  vote: Vote;
  weight: number; //1
};
