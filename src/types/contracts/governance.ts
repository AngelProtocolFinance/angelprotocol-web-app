import { Vote } from ".";

export type PollStatus =
  | "in_progress"
  | "passed"
  | "rejected"
  | "executed"
  | "expired"
  | "failed";

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

export type GovVoteInfo = { vote: Vote; balance: string };
export type LockedHolding = [number, GovVoteInfo]; //[poll_id, info]
export type Claim = { amount: string; release_at: { at_time: string } };

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
