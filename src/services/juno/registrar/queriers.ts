import { useRegistrarConfigQuery } from "./registrar";

export function useRegistrarConfig() {
  const { data, isError, isLoading, isFetching } =
    useRegistrarConfigQuery(null);
  return {
    registrarConfig: data,
    isError: isError,
    isLoading: isLoading || isFetching,
  };
}
