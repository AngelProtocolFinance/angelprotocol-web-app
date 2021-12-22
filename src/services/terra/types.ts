import { Coin } from "@terra-money/terra.js";
import { Vote } from "contracts/types";

export interface QueryRes<T> {
  query_result: T;
}

export interface BalanceRes {
  balances: Coin.Data[];
}

export type ContractQueryArgs<T = object> = {
  address: string;
  msg: T;
};

//Block
export type BlockLatest = {
  block_id: any;
  block: { header: { height: string } };
};

//Halo token
export type HaloBalance = {
  balance: string;
};

export type TokenInfo = {
  name: string;
  symbol: string;
  decimals: number;
  total_supply: string;
};

//Halo gov
export enum PollStatus {
  in_progress = "in_progress",
  passed = "passed",
  rejected = "rejected",
  executed = "executed",
  expired = "expired", //deprecated
  failed = "failed",
}

export type Poll = {
  id: number;
  creator: string;
  // status: "in_progress";
  status: PollStatus;
  end_height: number;
  title: string;
  description: string;
  link: string;
  deposit_amount: string;
  // execute_data: null;
  execute_data: any;
  yes_votes: "0"; //uhalo amount
  no_votes: "0"; //uhalo amount
  // staked_amount: null;
  staked_amount: any;
  // total_balance_at_end_poll: null;
  total_balance_at_end_poll: any;
};

export type Polls = { polls: Poll[] };

export type PollExecuteMsg = {
  order: number;
  contract: string;
  msg: string;
};

type VoteInfo = { vote: Vote; balance: string };
type LockedHolding = [number, VoteInfo]; //[poll_id, info]
type Claim = { amount: string; release_at: { at_time: string } };

export type GovStaker = {
  balance: string;
  share: string;
  locked_balance: LockedHolding[];
  claims?: Claim[];
};

export type GovState = {
  poll_count: number;
  total_share: string; //gov share from gov staking
  total_deposit: string; //total deposit from poll_creation and votes
};

export type GovConfig = {
  owner: string; //address of the owner
  halo_token: string; //the contract address of the halo token
  quorum: string; // "0.3" the required number of voters
  threshold: string; //"0.5" required %of voters to vote yes to make the poll passed
  voting_period: number; //2000 block passes since the poll is created
  timelock_period: number; //1000 lock period of deposit?
  proposal_deposit: string; //"10000000000"need 10k HALO to make poll
  snapshot_period: number; //10 num blocks passed when fresh update is made available
};

//lbp_factor
export type Token = {
  contract_addr: string;
};
export type NativeToken = {
  denom: string;
};
export interface WeightedAssetInfo<T> {
  info: T extends Token ? { token: T } : { native_token: T };
  start_weight: string; //"96"
  end_weight: string; //"50"
}

export interface WeightedPoolAssetInfo<T> extends WeightedAssetInfo<T> {
  amount: string; //for simul and pool result
}

export type PairInfo = {
  asset_infos: [WeightedAssetInfo<Token>, WeightedAssetInfo<NativeToken>];
  token_code_id: number;
  start_time: number;
  end_time: number;
  description?: string;
  commission_rate: string; //""0.02""
};

export type Simulation = {
  return_amount: string;
  spread_amount: string;
  commission_amount: string;
  ask_weight: string;
  offer_weight: string;
  is_placeholder?: true;
};

export type Pool = {
  assets: [WeightedPoolAssetInfo<Token>, WeightedPoolAssetInfo<NativeToken>];
  total_share: string;
};

export type PoolBalance = {
  native_token: string;
  token: string;
  is_placeholder?: true;
};
