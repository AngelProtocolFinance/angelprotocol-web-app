import Halo, { H, T } from "contracts/Halo";
import { LOCAL_TERRA } from "../constants";
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
  const { contract, wallet } = useContract<H, T>(Halo);
  const { data = staker } = gov_api.endpoints.govStaker.useQueryState(
    contract.staker,
    {
      skip: wallet === undefined || wallet.network.chainID === LOCAL_TERRA,
    }
  );
  return data;
}
