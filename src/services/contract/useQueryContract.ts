import useSWR, { SWRResponse } from "swr";
import {
  ContractQueries as Q,
  ContractQueryTypes as QT,
} from "../juno/queryContract/types";
import { Contract } from "types/lists";
import { contracts } from "constants/contracts";
import { queryContract } from "../juno/queryContract";

export function useQueryContract<T extends QT>(
  contract: Q[T]["contract"] extends Contract ? Contract : string,
  id: T,
  args: Q[T]["args"]
): SWRResponse<ReturnType<Q[T]["transform"]>> {
  const c = contract in contracts ? contracts[contract as Contract] : contract;
  return useSWR([id, c, args], queryContract);
}
