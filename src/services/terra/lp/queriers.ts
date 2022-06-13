import LP, { L, T } from "contracts/LP";
import { chainIDs } from "constants/chainIDs";
import { useContract } from "../useContract";
import { lp_api } from "./lp";
<<<<<<< HEAD
import { simulation } from "./placeholders";
=======

export function usePairInfo() {
  const { usePairInfoQuery } = lp_api;
  const { wallet, contract } = useContract<L, T>(LP);
  const { data = pairInfo } = usePairInfoQuery(contract.pairInfo, {
    skip: wallet?.network.chainID === chainIDs.terra_test,
  });

  return data;
}
>>>>>>> master

export function usePairSimul(interval = 0, skip = false) {
  const { usePairSimulQuery } = lp_api;
  const { contract, wallet } = useContract<L, T>(LP);
  const { data = simulation } = usePairSimulQuery(contract.simul, {
    skip: skip || wallet?.network.chainID === chainIDs.terra_test,
    pollingInterval: interval,
  });

  return data;
}
<<<<<<< HEAD
=======

export function usePool(skip = false) {
  const { usePoolQuery } = lp_api;
  const { wallet, contract } = useContract<L, T>(LP);
  const { data = pool_balance } = usePoolQuery(contract.pool, {
    skip: skip || wallet?.network.chainID === chainIDs.terra_test,
  });
  return data;
}
>>>>>>> master
