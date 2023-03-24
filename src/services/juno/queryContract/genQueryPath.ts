import { ContractQueries as Q, ContractQueryTypes as QT } from "./types";
import { toBase64 } from "helpers";
import { queryObject } from "./queryObject";

export function genQuery<T extends QT>(
  type: T,
  args: Q[QT]["args"],
  contract: string
): [string, Q[QT]["transform"]] {
  const [query, transform] = queryObject[type];
  const msg = typeof query === "function" ? query(args) : query;
  return [
    `cosmwasm/wasm/v1/contract/${contract}/smart/${toBase64(msg)}`,
    transform,
  ];
}
