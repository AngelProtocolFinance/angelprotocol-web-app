import { ChainIDs } from "@types-lists";
import Registrar, { R, T } from "contracts/Registrar";
import { useContract } from "../useContract";
import { registrar_api } from "./registrar";

const LOCAL_TERRA: ChainIDs = "localterra";
export function useEndowmentStatus(address: string, skip = false) {
  const { useEndowmentsQuery } = registrar_api;
  const { wallet, contract } = useContract<R, T>(Registrar);
  const { endowmentStatus, isEndowmentStatusLoading } = useEndowmentsQuery(
    contract.endowmentList({}),
    {
      skip: skip || wallet?.network.chainID === LOCAL_TERRA,
      selectFromResult: ({ data, isLoading, isFetching }) => ({
        endowmentStatus: data?.find(
          (endowment) => endowment.address === address
        )?.status,
        isEndowmentStatusLoading: isLoading || isFetching,
      }),
    }
  );

  return { endowmentStatus, isEndowmentStatusLoading };
}

export function useRegistrarConfig() {
  const { useConfigQuery } = registrar_api;
  const { contract, wallet } = useContract<R, T>(Registrar);
  const { data, isError, isLoading, isFetching } = useConfigQuery(
    contract.config,
    {
      skip: wallet?.network.chainID === LOCAL_TERRA,
    }
  );

  return {
    registrarConfig: data,
    isError: isError,
    isLoading: isLoading || isFetching,
  };
}

export function useCategorizedEndowments() {
  const { useCategorizedEndowmentsQuery } = registrar_api;
  const { contract } = useContract<R, T>(Registrar);
  const {
    data = {},
    isError,
    isLoading,
    isFetching,
  } = useCategorizedEndowmentsQuery(
    contract.endowmentList({
      endow_type: "charity",
      status: "1",
    })
  );

  return {
    endowments: data,
    isEndowmentsError: isError,
    isEndowmentsLoading: isLoading || isFetching,
  };
}
