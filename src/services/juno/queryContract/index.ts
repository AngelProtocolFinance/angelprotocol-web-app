import { ContractQueries as Q, ContractQueryTypes as QT } from "./types";
import { JUNO_LCD } from "constants/env";
import { genQuery } from "./genQueryPath";

export async function queryContract<T extends QT>(
  type: T,
  contract: string,
  args: Q[T]["args"],
  url = JUNO_LCD
) {
  const [path, transform] = genQuery(type, args, contract);
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
