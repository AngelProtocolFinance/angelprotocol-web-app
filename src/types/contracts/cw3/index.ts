import { Coin } from "@cosmjs/proto-signing";
import {
  Asset,
  EmbeddedBankMsg,
  EmbeddedWasmMsg,
  Threshold,
  Vote,
} from "../common";

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

export type CW3ListVoters = {
  voters: string[];
};

export type ProposalsRes = {
  proposals: Proposal[];
};

export type ProposalStatus = "pending" | "executed";

export type Expiration = { at_time: number } | { at_height: number };

export type ProposalType = "normal" | "application";
export type Proposal = {
  id: number; //1
  title: string; //"this prpposal rocks"
  description: string; //"this is a description"
  meta?: string; //JSON string that contains preview metadata
  msgs: (EmbeddedWasmMsg | EmbeddedBankMsg)[];
  status: ProposalStatus;
  threshold: ThresholdRes;
  proposal_type: ProposalType;
};

export interface CW3Config {
  group_addr: string; //"juno123abc.."
  threshold: Threshold;
  max_voting_period: Duration;
  //...future needed attr
  require_execution: boolean;
}

export interface ReviewCW3Config extends CW3Config {
  seed_asset?: Asset;
  seed_split_to_liquid: string; //"0.5,0.9",
  new_endow_gas_money?: Coin;
}

export type CW3ConfigPayload = Omit<CW3Config, "group_addr"> & {
  //percent vote to pass poll
  threshold: Threshold;
  //poll duration in block height
  max_voting_period: Duration;
  require_execution: boolean;
};

export type ReviewCW3ConfigPayload = CW3ConfigPayload & {
  seed_asset?: Asset;
  seed_split_to_liquid: string; //"0.5,0.9",
  new_endow_gas_money?: Coin;
};

export type AdminVoteInfo = {
  voter: string; //"juno123abc.."
  vote: Vote;
  weight: number; //1
};
