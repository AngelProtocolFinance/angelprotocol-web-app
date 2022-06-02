import { chainIDs } from "constants/chainIDs";
import Halo, { H, T } from "contracts/Halo";
import { useContract } from "../useContract";
import { gov_api } from "./gov";
import { staker } from "./placeholders";

export function useGovBalanceState() {
  const { contract } = useContract<H, T>(Halo);
  const { data = 0 } = gov_api.endpoints.govBalance.useQueryState(
    contract.gov_balance
  );
  return data;
}

export function useGovStakerState() {
  const { wallet, contract } = useContract<H, T>(Halo);
  const { data = staker } = gov_api.endpoints.govStaker.useQueryState(
    contract.staker,
    {
      skip:
        wallet === undefined || wallet.network.chainID === chainIDs.terra_local,
    }
  );
  return data;
}
