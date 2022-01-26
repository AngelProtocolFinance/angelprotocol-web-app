/**
 * states are hooks that only uses existing cache entry and doesn't call the API when
 * there's no cache entry
 */
import Account from "contracts/Account";
import { useHaloContract, useLPContract } from "./contracts";
import { holdings, pairInfo, pool_balance, simulation } from "./placeholders";
import { terra } from "./terra";

export function usePairInfoState() {
  const { contract } = useLPContract();
  const { data = pairInfo } = terra.endpoints.pairInfo.useQueryState(
    contract.pairInfo
  );
  return data;
}

export function usePairSimulState() {
  const { contract } = useLPContract();
  const { data = simulation } = terra.endpoints.pairSimul.useQueryState(
    contract.simul
  );
  return data;
}

export function usePoolState() {
  const { contract } = useLPContract();
  const { data = pool_balance } = terra.endpoints.pool.useQueryState(
    contract.pool
  );
  return data;
}

export function useGovBalanceState() {
  const { contract } = useHaloContract();
  const { data = 0 } = terra.endpoints.govBalance.useQueryState(
    contract.gov_balance
  );
  return data;
}

export function useEndowmentHoldingsState(address: string, skip = false) {
  const contract = new Account(address);
  const {
    data = holdings,
    isError,
    isLoading,
    isFetching,
  } = terra.endpoints.endowmentHoldings.useQueryState(contract.balance, {
    skip,
  });

  return {
    holdings: data,
    isHoldingsError: isError,
    isHoldingsLoading: isLoading || isFetching,
  };
}
