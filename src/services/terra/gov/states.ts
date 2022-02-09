import { useHaloContract } from "../contracts";
import { gov_api } from "./gov";

export function useGovBalanceState() {
  const { contract } = useHaloContract();
  const { data = 0 } = gov_api.endpoints.govBalance.useQueryState(
    contract.gov_balance
  );
  return data;
}
