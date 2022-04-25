//Block

//Halo token
export type ContractQueryArgs<T = object> = {
  address: string;
  msg: T;
};

export type MultiContractQueryArgs = ContractQueryArgs<AggregatedQuery>;
export type AggregatedQuery = {
  aggregate: { queries: EncodedQueryMember[] };
};
type EncodedQueryMember = {
  address: string;
  data: string; //base64 encoded msg
};
