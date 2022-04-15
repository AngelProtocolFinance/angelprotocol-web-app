import Registrar, { R, T } from "contracts/Registrar";
import { chainIDs } from "constants/chainIDs";
import { useContract } from "../useContract";
import { registrar_api } from "./registrar";

export function useApprovedVaultsRate() {
  const { useApprovedVaultsRateQuery } = registrar_api;
  const { contract, wallet } = useContract<R, T>(Registrar);
  const {
    data = [],
    isError,
    isLoading,
    isFetching,
  } = useApprovedVaultsRateQuery(contract.vaultsRate, {
    skip: wallet?.network.chainID === chainIDs.localterra,
  });

  return {
    vaultsRate: data,
    isVaultsRateError: isError,
    isVaultsRateLoading: isLoading || isFetching,
  };
}
