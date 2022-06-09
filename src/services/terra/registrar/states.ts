import Registrar, { R, T } from "contracts/Registrar";
import { useContract } from "../useContract";
import { registrar_api } from "./registrar";

export function useApprovedVaultsRateState() {
  const { contract } = useContract<R, T>(Registrar);
  const {
    data = [],
    isError,
    isLoading,
    isFetching,
  } = registrar_api.endpoints.approvedVaultsRate.useQueryState(
    contract.vaultsRate
  );

  return {
    vaultsRate: data,
    isVaultsRateError: isError,
    isVaultsRateLoading: isLoading || isFetching,
  };
}
