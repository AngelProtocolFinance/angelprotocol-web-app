import useSWR, { SWRConfiguration, SWRResponse } from "swr";
import {
  ContractQueries as Q,
  ContractQueryTypes as QT,
  QueryOptions,
} from "./queryContract/types";
import { queryContract } from "./queryContract";

export function useQueryContract<T extends QT>(
  type: T,
  options: QueryOptions<T>,
  config?: SWRConfiguration
): SWRResponse<ReturnType<Q[T]["transform"]>> {
  return useSWR([type, options], (args) => queryContract(...args), config);
}
