import Registrar, { R, T } from "contracts/Registrar";
import { chainIDs } from "constants/chainIDs";
import { useContract } from "../useContract";
import { registrar_api } from "./registrar";

export function useApprovedVaultsRateState() {
  const { wallet, contract } = useContract<R, T>(Registrar);
  const {
    data = [],
    isError,
    isLoading,
    isFetching,
  } = registrar_api.endpoints.approvedVaultsRate.useQueryState(
    contract.vaultsRate,
    { skip: wallet?.network.chainID === chainIDs.terra_local }
  );

  return {
    vaultsRate: data,
    isVaultsRateError: isError,
    isVaultsRateLoading: isLoading || isFetching,
  };
}
