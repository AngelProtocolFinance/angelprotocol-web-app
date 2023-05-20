import {
  type BaseContract,
  Contract as EthersContract,
  providers,
} from "ethers";
import { RegistrarConfig } from "types/contracts";
import { Contract } from "types/lists";
import { IndexFund, MultiSigGeneric, Registrar } from "types/typechain-types";
import { contracts } from "constants/contracts";

const provider = new providers.JsonRpcProvider("");
const registrar = new EthersContract("", "", provider) as Registrar;
const indexFund = new EthersContract("", "", provider) as IndexFund;
const multisig = new EthersContract("", "", provider) as MultiSigGeneric;

type Q<
  C extends BaseContract,
  T extends keyof C["functions"],
  Params,
  Result
> = {
  params: Params;
  result: ReturnType<C["functions"][T]>;
  transformed: Result;
};

type Queries = {
  "registrar.config": Q<Registrar, "queryConfig", null, RegistrarConfig>;
  "index-fund.state": Q<IndexFund, "queryState", null, number>;
  "multisig.owners": Q<MultiSigGeneric, "getOwners", null, string[]>;
  "multisig.tx-count": Q<
    MultiSigGeneric,
    "getTransactionCount",
    string,
    number
  >;
};

type QT = keyof Queries;
const queries: {
  [K in QT]: [
    (address: string, params: Queries[K]["params"]) => Queries[K]["result"],
    (result: Awaited<Queries[K]["result"]>) => Queries[K]["transformed"]
  ];
} = {
  "registrar.config": [
    () => registrar.functions.queryConfig(),
    (result) => result as any,
  ],
  "index-fund.state": [
    () => indexFund.functions.queryState(),
    (result) => result as any,
  ],
  "multisig.owners": [
    (addr, arg) => multisig.functions.getOwners(),
    (result) => result as any,
  ],
};

type Empty = { [key: string]: never };
type QueryParams<T extends QT> = Queries[T]["params"];

export type QueryOptions<T extends QT> = T extends `${infer C}.${string}`
  ? C extends Contract
    ? //if args is also null, options is empty
      QueryParams<T> extends null
      ? Empty
      : QueryParams<T>
    : //if contract address is not hardcoded, need to supply
      Record<C, string> & (QueryParams<T> extends null ? {} : QueryParams<T>)
  : Empty;

export async function queryContract<T extends QT>(
  type: T,
  options: QueryOptions<T>
) {
  const [contractKey] = type.split(".");
  //consumer is forced to supply contract address when it is not hardcoded
  const { [contractKey]: c, ...args } = options as any;

  const [query, transform] = queries[type];
  const result = await query(
    contractKey in contracts ? contracts[contractKey as Contract] : c,
    args
  );
  return transform(result as any);
}
