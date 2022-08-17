import Registrar, { R, T } from "contracts/Registrar";
import { useContract } from "../useContract";
import { registrar_api } from "./registrar";

export function useEndowmentStatus(id: number, skip = false) {
  const { useEndowmentsQuery } = registrar_api;
  const { contract } = useContract<R, T>(Registrar);
  const { endowmentStatus, isEndowmentStatusLoading } = useEndowmentsQuery(
    contract.endowmentList({}),
    {
      skip,
      selectFromResult: ({ data, isLoading, isFetching }) => ({
        endowmentStatus: data?.find((endowment) => endowment.id === id)?.status,
        isEndowmentStatusLoading: isLoading || isFetching,
      }),
    }
  );

  return { endowmentStatus, isEndowmentStatusLoading };
}

export function useRegistrarConfig() {
  const { useRegistrarConfigQuery } = registrar_api;
  const { contract } = useContract<R, T>(Registrar);
  const { data, isError, isLoading, isFetching } = useRegistrarConfigQuery(
    contract.config
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
