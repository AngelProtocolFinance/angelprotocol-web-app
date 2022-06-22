import Gov, { G, TG } from "contracts/Gov";
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
