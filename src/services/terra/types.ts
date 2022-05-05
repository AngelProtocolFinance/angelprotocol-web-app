import { Coin } from "@terra-money/terra.js";

export interface QueryRes<T> {
  query_result: T;
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

export type MultiContractQueryArgs = ContractQueryArgs<AggregatedQuery>;
export type MultiQueryRes = QueryRes<AggregatedResult>;

type EncodedQueryMember = {
  address: string;
  data: string; //base64 encoded msg
};

type EncodedResultMember = {
  success: boolean;
  data: string; //base64 encoded msg
};

export type DecodedResultMember = {
  success: boolean;
  data: object; //parsed
};

export type AggregatedQuery = {
  aggregate: { queries: EncodedQueryMember[] };
};

export type AggregatedResult = {
  return_data: EncodedResultMember[];
};
