import {
  ContractQueries as Q,
  ContractQueryTypes as QT,
  QueryOptions,
} from "./types";
import { Contract } from "types/lists";
import { toBase64 } from "helpers";
import { contracts } from "constants/contracts";
import { JUNO_LCD } from "constants/env";
import { cosmosQueries } from "./cosmosQueries";

export async function queryContract<T extends QT>(
  type: T,
  options: QueryOptions<T>,
  endpoint = { type: "cosmos", url: JUNO_LCD }
) {
  const [contract_key] = type.split(".");
  //consumer is forced to supply contract address when it is not hardcoded
  const { [contract_key]: c, ...args } = options as any;

  const contract =
    contract_key in contracts ? contracts[contract_key as Contract] : c;

  if (true) {
    const [query, transform] = cosmosQueries[type];
    const content = typeof query === "function" ? query(args) : query;
    const path = `cosmwasm/wasm/v1/contract/${contract}/smart/${toBase64(
      content
    )}`;

    return fetch(`${endpoint.url}/${path}`)
      .then<Q[T]["res"]>((res) => {
        const msg = `failed query ${type}`;
        if (!res.ok) throw new Error(msg);
        return res.json();
      })
      .then(
        (result) => transform(result as any) as ReturnType<Q[T]["transform"]>
      );
  }
  // else polygon
}
