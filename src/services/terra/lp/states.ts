import { useContract } from "../useContract";
import { pairInfo, pool_balance, simulation } from "./placeholders";
import { lp_api } from "./lp";
import LP, { L, T } from "contracts/LP";

export function usePairInfoState() {
  const { contract } = useContract<L, T>(LP);
  const { data = pairInfo } = lp_api.endpoints.pairInfo.useQueryState(
    contract.pairInfo
  );
  return data;
}

export function usePairSimulState() {
  const { contract } = useContract<L, T>(LP);
  const { data = simulation } = lp_api.endpoints.pairSimul.useQueryState(
    contract.simul
  );
  return data;
}

export function usePoolState() {
  const { contract } = useContract<L, T>(LP);
  const { data = pool_balance } = lp_api.endpoints.pool.useQueryState(
    contract.pool
  );
  return data;
}
