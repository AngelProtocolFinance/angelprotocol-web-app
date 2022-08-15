import { contracts } from "constants/contracts";
import { queryObject } from "../queryContract/queryObjects";
import { useRegistrarConfigQuery } from "./registrar";

export function useRegistrarConfig() {
  const { data, isError, isLoading, isFetching } = useRegistrarConfigQuery({
    address: contracts.registrar,
    msg: queryObject.regConfig,
  });

  return {
    registrarConfig: data,
    isError: isError,
    isLoading: isLoading || isFetching,
  };
}
