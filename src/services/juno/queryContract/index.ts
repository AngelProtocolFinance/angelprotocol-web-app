import {
  ContractQueries as Q,
  ContractQueryTypes as QT,
  QueryOptions,
} from "./types";
import { Contract } from "types/lists";
import { contracts } from "constants/contracts";
import { EIPMethods } from "constants/evm";
import { POLYGON_RPC } from "constants/urls";
import { queryObjects } from "./queryObjects";

type Result = { result: string } | { error: { code: number; message: string } };

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

  console.log({ data, type });

  const result = await fetch(POLYGON_RPC, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: EIPMethods.eth_call,
      params: [
        {
          to: contract,
          data,
        },
        "latest",
      ],
    }),
  }).then<Result>((res) => {
    if (!res.ok) throw new Error(`failed query ${type}`);
    return res.json();
  });

  if ("error" in result)
    throw new Error(`error ${type}:` + result.error.message);

  return transform(result.result, args) as any;
}
