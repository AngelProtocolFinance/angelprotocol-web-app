import {
  ContractQueries as Q,
  ContractQueryTypes as QT,
  QueryOptions,
} from "./types";
import { Contract } from "types/lists";
import { EIPMethods } from "constants/evm";
import { contracts } from "./contracts";
import { queries } from "./queries";

const POLYGON_RPC = "https://rpc.ankr.com/polygon_mumbai";

type Result = { result: string } | { error: { code: number; message: string } };

export async function query<T extends QT>(type: T, options: QueryOptions<T>) {
  const [contract_key] = type.split(".");
  //consumer is forced to supply contract address when it is not hardcoded
  const { [contract_key]: c, ...args } = options as any;

  const contract =
    contract_key in contracts ? contracts[contract_key as Contract] : c;

  const [query, transform] = queries[type];
  const data = typeof query === "function" ? query(args) : query;

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

  console.log({ result });

  return transform(result.result) as ReturnType<Q[T]["transform"]>;
}
