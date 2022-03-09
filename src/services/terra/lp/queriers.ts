import LP, { L, T } from "contracts/LP";
import { chainIDs } from "constants/chainIDs";
import { useContract } from "../useContract";
import { pairInfo, pool_balance, simulation } from "./placeholders";
import { lp_api } from "./lp";

export function usePairInfo() {
  const { usePairInfoQuery } = lp_api;
  const { wallet, contract } = useContract<L, T>(LP);
  const { data = pairInfo } = usePairInfoQuery(contract.pairInfo, {
    skip: wallet?.network.chainID === chainIDs.testnet,
  });

  return data;
}

export function usePairSimul(interval = 0, skip = false) {
  const { usePairSimulQuery } = lp_api;
  const { wallet, contract } = useContract<L, T>(LP);
  const { data = simulation } = usePairSimulQuery(contract.simul, {
    skip: skip || wallet?.network.chainID === chainIDs.testnet,
    pollingInterval: interval,
  });

  return data;
}

export function usePool(skip = false) {
  const { usePoolQuery } = lp_api;
  const { wallet, contract } = useContract<L, T>(LP);
  const { data = pool_balance } = usePoolQuery(contract.pool, {
    skip: skip || wallet?.network.chainID === chainIDs.testnet,
  });
  return data;
}
