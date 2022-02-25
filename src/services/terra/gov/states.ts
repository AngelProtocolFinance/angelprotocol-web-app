import { chainIDs } from "constants/chainIDs";
import { useHaloContract } from "../contracts";
import { gov_api } from "./gov";
import { staker } from "./placeholders";

export function useGovBalanceState() {
  const { contract } = useHaloContract();
  const { data = 0 } = gov_api.endpoints.govBalance.useQueryState(
    contract.gov_balance
  );
  return data;
}

export function useGovStakerState() {
  const { wallet, contract } = useHaloContract();
  const { data = staker } = gov_api.endpoints.govStaker.useQueryState(
    contract.staker,
    {
      skip:
        wallet === undefined || wallet.network.chainID === chainIDs.localterra,
    }
  );
  return data;
}
