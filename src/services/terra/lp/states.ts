/**
 * states are hooks that only uses existing cache entry and doesn't call the API when
 * there's no cache entry
 */
import { useLPContract } from "../contracts";
import { pairInfo, pool_balance, simulation } from "./placeholders";
import { lp_api } from "./lp";

export function usePairInfoState() {
  const { contract } = useLPContract();
  const { data = pairInfo } = lp_api.endpoints.pairInfo.useQueryState(
    contract.pairInfo
  );
  return data;
}

export function usePairSimulState() {
  const { contract } = useLPContract();
  const { data = simulation } = lp_api.endpoints.pairSimul.useQueryState(
    contract.simul
  );
  return data;
}

export function usePoolState() {
  const { contract } = useLPContract();
  const { data = pool_balance } = lp_api.endpoints.pool.useQueryState(
    contract.pool
  );
  return data;
}
