import { useContract } from "../useContract";
import Registrar, { R, T } from "contracts/Registrar";
import { registrar_api } from "./registrar";

export function useApprovedVaultsRate() {
  const { useApprovedVaultsRateQuery } = registrar_api;
  const { contract } = useContract<R, T>(Registrar);
  const {
    data = [],
    isError,
    isLoading,
    isFetching,
  } = useApprovedVaultsRateQuery(contract.vaultsRate);

  return {
    vaultsRate: data,
    isVaultsRateError: isError,
    isVaultsRateLoading: isLoading || isFetching,
  };
}
