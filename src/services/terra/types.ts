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
  string: string;
  // status: "in_progress";
  status: string;
  end_height: number;
  title: string;
  description: string;
  link: string;
  deposit_amount: string;
  // execute_data: null;
  execute_data: any;
  yes_votes: "0";
  no_votes: "0";
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

export type GovState = {
  poll_count: number;
  total_share: string;
  total_deposit: string;
};

export type GovStaker = {
  balance: string;
  locked_balance: any[];
  share: string;
};
