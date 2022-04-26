import LP, { L, T } from "contracts/LP";
import { TESTNET } from "../constants";
import { useContract } from "../useContract";
import { lp_api } from "./lp";
import { simulation } from "./placeholders";

export function usePairSimul(interval = 0, skip = false) {
  const { usePairSimulQuery } = lp_api;
  const { contract, wallet } = useContract<L, T>(LP);
  const { data = simulation } = usePairSimulQuery(contract.simul, {
    skip: skip || wallet?.network.chainID === TESTNET,
    pollingInterval: interval,
  });

  return data;
}
