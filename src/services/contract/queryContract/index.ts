import {
  ContractQueries as Q,
  ContractQueryTypes as QT,
  QueryOptions,
} from "./types";
import { Contract } from "types/lists";
import { contracts } from "constants/contracts";
import { JUNO_LCD } from "constants/env";
import { genQuery } from "./genQueryPath";

export async function queryContract<T extends QT>(
  type: T,
  options: QueryOptions<T>,
  url = JUNO_LCD
) {
  const [contract_key] = type.split(".");
  //consumer is forced to supply contract address when it is not hardcoded
  const { [contract_key]: contract, ...args } = options as any;

  const c =
    contract_key in contracts ? contracts[contract_key as Contract] : contract;

  const [path, transform] = genQuery(type, args, c);
  return fetch(`
    ${url}/${path}
  `)
    .then<Q[T]["res"]>((res) => {
      const msg = `failed query ${type}`;
      if (!res.ok) throw new Error(msg);
      return res.json();
    })
    .then(
      (result) => transform(result as any) as ReturnType<Q[T]["transform"]>
    );
}
