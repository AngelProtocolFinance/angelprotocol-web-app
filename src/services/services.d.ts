declare module "@types-services/terra" {
  import { Token } from "@types-server/aws";
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
    | "admin"
    | "endowment"
    | "multicall"
    | "registrar";

  /** multicall */
  type TokenWithBalance = Token & { balance: number };
}
