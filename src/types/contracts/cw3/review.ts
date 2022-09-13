import { CreateEndowmentPayload, Vote } from "../index";
import { Expiration } from "./index";

export interface ApplicationProposal {
  ref_id: string;
  msg: CreateEndowmentPayload;
  // note: we ignore API-spec'd earliest if passed, always opens immediately
  latest?: Expiration;
  meta?: string;
}

export interface ApplicationVote {
  proposal_id: number;
  vote: Vote;
  reason?: string;
}
