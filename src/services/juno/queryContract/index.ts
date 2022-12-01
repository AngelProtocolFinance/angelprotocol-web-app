import { ContractQueries as Q, ContractQueryTypes as QT } from "./types";
import { logger } from "helpers";
import { baseUrl } from "../index";
import { genQueryPath } from "./genQueryPath";

export async function queryContract<T extends QT>(
  type: T,
  contract: string,
  args: Q[T]["args"],
  url = baseUrl
) {
  return fetch(`
    ${url}/${genQueryPath(type, args, contract)}
  `)
    .then<Q[T]["res"]>((res) => {
      const msg = `failed query ${type}`;
      logger.error(msg);
      if (!res.ok) throw new Error(msg);
      return res.json();
    })
    .then((result) => result.data as Q[T]["res"]["data"]);
}
