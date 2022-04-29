declare module "@types-services/terra" {
  type ContractQueryArgs<T = object> = {
    address: string;
    msg: T;
  };

  type MultiContractQueryArgs = ContractQueryArgs<AggregatedQuery>;
  type AggregatedQuery = {
    aggregate: { queries: EncodedQueryMember[] };
  };
  type EncodedQueryMember = {
    address: string;
    data: string; //base64 encoded msg
  };

  type TerraTags =
    | "gov"
    | "indexfund"
    | "user"
    | "halo"
    | "lbp"
    | "endowment"
    | "admin"
    | "multicall"
    | "registrar";
}
