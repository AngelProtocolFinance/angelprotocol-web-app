import { ContractQueries as Q, ContractQueryTypes as QT } from "./types";
import { QueryRes } from "types/server/contracts";
import contract_querier from "../contract_querier";
import { baseUrl } from "../index";
import { queryObject } from "./queryObjects";

export async function queryContract<T extends QT>(
  type: T,
  contract: string,
  args: Q[T]["args"]
) {
  const query = queryObject[type];
  return fetch(`
    ${baseUrl}/${contract_querier({
    address: contract,
    msg: typeof query === "function" ? query(args) : query,
  })}
  `)
    .then<QueryRes<Q[T]["return"]>>((res) => res.json())
    .then((result) => result.data);
}
