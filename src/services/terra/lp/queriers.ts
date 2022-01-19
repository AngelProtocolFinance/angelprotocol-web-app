import { chainIDs } from "contracts/types";
import { useLPContract } from "../contracts";
import { pairInfo, pool_balance, simulation } from "./placeholders";
import { lp_api } from "./lp";

export function usePairInfo() {
  const { usePairInfoQuery } = lp_api;
  const { contract, wallet } = useLPContract();
  const { data = pairInfo } = usePairInfoQuery(contract.pairInfo, {
    skip: wallet?.network.chainID === chainIDs.testnet,
  });

  return data;
}

export function usePairSimul(interval = 0, skip = false) {
  const { usePairSimulQuery } = lp_api;
  const { contract, wallet } = useLPContract();
  const { data = simulation } = usePairSimulQuery(contract.simul, {
    skip: skip || wallet?.network.chainID === chainIDs.testnet,
    pollingInterval: interval,
  });

  return data;
}

export function usePool(skip = false) {
  const { usePoolQuery } = lp_api;
  const { contract, wallet } = useLPContract();
  const { data = pool_balance } = usePoolQuery(contract.pool, {
    skip: skip || wallet?.network.chainID === chainIDs.testnet,
  });
  return data;
}
