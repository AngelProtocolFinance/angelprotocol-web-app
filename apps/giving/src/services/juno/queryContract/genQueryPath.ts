import { toBase64 } from "@ap/helpers";
import { ContractQueries as Q, ContractQueryTypes as QT } from "./types";
import { queryObject } from "./queryObjects";

export function genQueryPath<T extends QT>(
  type: T,
  args: Q[QT]["args"],
  contract: string
) {
  const query = queryObject[type];
  const msg = typeof query === "function" ? query(args) : query;
  return `cosmwasm/wasm/v1/contract/${contract}/smart/${toBase64(msg)}`;
}
