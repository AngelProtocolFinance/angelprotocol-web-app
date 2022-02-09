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
