import useSWR, { SWRResponse } from "swr";
import {
  ContractQueries as Q,
  ContractQueryTypes as QT,
} from "../juno/queryContract/types";
import { Contract } from "types/lists";
import { contracts } from "constants/contractsV2";
import { queryContract } from "../juno/queryContract";

export default function useQueryContract<T extends QT>(
  contract: Q[T]["contract"] extends Contract ? Contract : string,
  id: T,
  args: Q[T]["args"]
): SWRResponse<Q[T]["res"]["data"]> {
  const c = contract in contracts ? contracts[contract as Contract] : contract;

  return useSWR(id, async (id: T) => {
    const res = await queryContract(id, c, args);
    /** perform transformations here, and output chain agnostic type */
    return res;
  });
}
