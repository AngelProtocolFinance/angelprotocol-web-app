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
}
