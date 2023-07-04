import {
  ContractQueries as Q,
  ContractQueryTypes as QT,
  QueryOptions,
} from "./types";
import { Contract } from "types/lists";
import { request } from "helpers";
import { contracts } from "constants/contracts";
import { EIPMethods } from "constants/evm";
import { queryObjects } from "./queryObjects";

export async function queryContract<T extends QT>(
  type: T,
  options: QueryOptions<T>
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
  });

  return transform(result, args) as any;
}
