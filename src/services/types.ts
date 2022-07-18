import { Token } from "types/server/aws";

export type ContractQueryArgs<T = object> = {
  address: string;
  msg: T;
};

export type MultiContractQueryArgs = ContractQueryArgs<AggregatedQuery>;
export type AggregatedQuery = {
  aggregate: { queries: EncodedQueryMember[] };
};
export type EncodedQueryMember = {
  address: string;
  data: string; //base64 encoded msg
};

export type JunoTags =
  | "gov"
  | "indexfund"
  | "admin"
  | "endowment"
  | "multicall"
  | "registrar";

/** multicall */
export type WithBalance = Token & { balance: number };
