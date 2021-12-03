import { Vote } from "contracts/types";

export interface QueryRes<T> {
  query_result: T;
}

export type ContractQueryArgs = {
  address: string;
  msg: object;
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
export type Poll = {
  id: number;
  creator: string;
  // status: "in_progress";
  status: string;
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
export type GovStaker = {
  balance: string;
  share: string;
  locked_balance: LockedHolding[];
};

export type GovState = {
  poll_count: number;
  total_share: string;
  total_deposit: string;
};

export type GovConfig = {
  owner: string; //address of the owner
  halo_token: string; //the contract address of the halo token
  quorum: "0.3"; //the required number of voters
  threshold: "0.5"; //required %of voters to vote yes to make the poll passed
  voting_period: 2000; //block passes since the poll is created
  timelock_period: 1000; //lock period of deposit
  proposal_deposit: "10000000000"; //need 10k HALO to make poll
  snapshot_period: 10; //num blocks passed when fresh update is made available
};
