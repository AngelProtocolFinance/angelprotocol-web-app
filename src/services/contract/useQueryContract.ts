import useSWR from "swr";
import {
  ContractQueries as Q,
  ContractQueryTypes as QT,
} from "../juno/queryContract/types";
import { contracts } from "constants/contracts";
import { JUNO_LCD } from "constants/env";
import { queryContract } from "../juno/queryContract";

export default function useQueryContract<T extends QT>(
  type: T,
  args: Q[T]["args"],
  contract: string,
  url = JUNO_LCD
) {
  contracts;
  return useSWR(type, (type) => queryContract(type, contract, args, url));
}
