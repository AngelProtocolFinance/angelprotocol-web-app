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

export type MultiContractQueryArgs = ContractQueryArgs<AggregatedQuery>;

type EncodedQueryMember = {
  address: string;
  data: string; //base64 encoded msg
};

type ResultMember = {
  success: boolean;
  data: string; //base64 encoded msg
};

export type AggregatedQuery = {
  aggregate: { queries: EncodedQueryMember[] };
};

type AggregatedResult = {
  datas: ResultMember[];
};

type CallPair<T, U> = [T, U];
type CallPairs = CallPair<any, any>[];
