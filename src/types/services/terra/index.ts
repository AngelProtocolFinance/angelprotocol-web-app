import { Coin } from "@terra-money/terra.js";

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

export enum terraTags {
  gov = "gov",
  user = "user",
  halo = "halo",
  lbp = "lbp",
  endowment = "endowment",
  admin = "admin",
  multicall = "multicall",
}
export enum govTags {
  polls = "polls",
  state = "state",
  staker = "staker",
  config = "config",
  halo_balance = "halo_balance",
}
export enum userTags {
  terra_balance = "terra_balance",
  halo_balance = "halo_balance",
}
export enum haloTags {
  info = "info",
}

export enum lbpTags {
  pool = "pool",
}

export enum endowmentTags {
  holdings = "holdings",
  rate = "rate",
  profile = "profile",
}

export enum adminTags {
  proposals = "proposals",
  proposal = "proposal",
  members = "members",
  member = "member",
  votes = "votes",
  applications = "applications",
}

export enum multicallTags {
  endowmentBalance = "endowmentBalance",
  airdrops = "airdrop",
}

export type MultiContractQueryArgs = ContractQueryArgs<AggregatedQuery>;
export type MultiQueryRes = QueryRes<AggregatedResult>;

export type AggregatedQuery = {
  aggregate: { queries: EncodedQueryMember[] };
};
export type AggregatedResult = {
  return_data: EncodedResultMember[];
};
export type DecodedResultMember = {
  success: boolean;
  data: object; //parsed
};

type EncodedQueryMember = {
  address: string;
  data: string; //base64 encoded msg
};

type EncodedResultMember = {
  success: boolean;
  data: string; //base64 encoded msg
};
