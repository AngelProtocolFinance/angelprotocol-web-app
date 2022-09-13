import { EmbeddedBankMsg, EmbeddedWasmMsg, Threshold, Vote } from "../index";

type Duration = { time: number } | { height: number };
type PercentageRes = {
  absolute_percentage: {
    percentage: string; //"0.5"
    total_weight: number; //2
  };
};

type ThresholdRes = PercentageRes; // | AbsoluteCount | Quorum;

export type PageOptions = { limit?: number; start_before?: number };

export type VotesPageOptions = {
  proposal_id: number;
  limit?: number;
  start_after?: number;
};

export type ProposalsRes = {
  proposals: Proposal[];
};

export type ProposalStatus =
  | "pending"
  | "open"
  | "rejected"
  | "passed"
  | "executed";

export type Expiration = { at_time: number } | { at_height: number };

export type ProposalType = "normal" | "application";
export type Proposal = {
  id: number; //1
  title: string; //"this prpposal rocks"
  description: string; //"this is a description"
  meta?: string; //JSON string that contains preview metadata
  msgs: (EmbeddedWasmMsg | EmbeddedBankMsg)[];
  status: ProposalStatus;
  expires: Expiration;
  threshold: ThresholdRes;
  type: ProposalType;
};

export type CW3Config = {
  group_addr: string; //"juno123abc.."
  threshold: Threshold;
  max_voting_period: Duration;
  //...future needed attr
};

export type CW3ConfigPayload = {
  //percent vote to pass poll
  threshold: Threshold;
  //poll duration in block height
  max_voting_period: Duration;
};

export type AdminVoteInfo = {
  voter: string; //"juno123abc.."
  vote: Vote;
  weight: number; //1
};
