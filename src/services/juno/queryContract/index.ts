import { ContractQueries as Q, ContractQueryTypes as QT } from "./types";
import { JUNO_LCD } from "constants/urls";
import { genQueryPath } from "./genQueryPath";

export async function queryContract<T extends QT>(
  type: T,
  contract: string,
  args: Q[T]["args"],
  url = JUNO_LCD
) {
  return fetch(`
    ${url}/${genQueryPath(type, args, contract)}
  `)
    .then<Q[T]["res"]>((res) => {
      const msg = `failed query ${type}`;
      if (!res.ok) throw new Error(msg);
      return res.json();
    })
    .then((result) => result.data as Q[T]["res"]["data"]);
}
