import { gov_api } from "./gov";
import { staker } from "./placeholders";
import useGovContract from "./useGovContract";

export function useGovStakerState() {
  const { contract, wallet } = useGovContract();
  const { data = staker } = gov_api.endpoints.govStaker.useQueryState(
    contract.staker,
    { skip: !wallet?.address }
  );
  return data;
}

export function useGovHaloBalance() {
  const { contract } = useGovContract();
  const { data = 0 } = gov_api.endpoints.govHaloBalance.useQueryState(
    contract.haloBalance
  );
  return data;
}
