import { useContract } from "../useContract";
import Registrar, { R, T } from "contracts/Registrar";
import { registrar_api } from "./registrar";
import { chainIDs } from "constants/chainIDs";

export function useApprovedVaultsRate() {
  const { useApprovedVaultsRateQuery } = registrar_api;
  const { contract, wallet } = useContract<R, T>(Registrar);
  const {
    data = [],
    isError,
    isLoading,
    isFetching,
  } = useApprovedVaultsRateQuery(contract.vaultsRate, {
    skip: wallet?.network.chainID === chainIDs.terra_local,
  });

  return {
    vaultsRate: data,
    isVaultsRateError: isError,
    isVaultsRateLoading: isLoading || isFetching,
  };
}
