import { useContract } from "../useContract";
import { gov_api } from "./gov";
import { staker } from "./placeholders";

export function useGovStakerState() {
  const { contract, walletAddr } = useContract<G, TG>(Gov);
  const { data = staker } = gov_api.endpoints.govStaker.useQueryState(
    contract.staker,
    { skip: !walletAddr }
  );
  return data;
}

export function useGovHaloBalance() {
  const { contract } = useContract<G, TG>(Gov);
  const { data = 0 } = gov_api.endpoints.govHaloBalance.useQueryState(
    contract.haloBalance
  );
  return data;
}
