import {
  ContractQueries as Q,
  ContractQueryTypes as QT,
  QueryOptions,
} from "./types";
import { Contract } from "types/lists";
import { request } from "helpers";
import { contracts } from "constants/contracts";
import { EIPMethods } from "constants/evm";
import { POLYGON_RPC } from "constants/urls";
import { queryObjects } from "./queryObjects";

export async function queryContract<T extends QT>(
  type: T,
  options: QueryOptions<T>,
  //as most contract calls are intended for polygon
  rpcURL = POLYGON_RPC
): Promise<ReturnType<Q[T]["transform"]>> {
  const [contract_key] = type.split(".");
  //consumer is forced to supply contract address when it is not hardcoded
  const { [contract_key]: c, ...args } = options as any;

  const contract =
    contract_key in contracts ? contracts[contract_key as Contract] : c;

  const [query, transform] = queryObjects[type];

  const data = typeof query === "function" ? query(args) : query;

  const result = await request({
    method: EIPMethods.eth_call,
    params: [
      {
        to: contract,
        data,
      },
      "latest",
    ],
    rpcURL,
  });

  return transform(result, args) as any;
}
