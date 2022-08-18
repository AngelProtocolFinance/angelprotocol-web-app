import { useEndowmentsQuery } from "services/juno/registrar";

export function useEndowmentStatus(id: number, skip?: boolean) {
  return useEndowmentsQuery(
    {},
    {
      skip,
      selectFromResult: ({ data, isLoading, isFetching }) => ({
        endowmentStatus: data?.find((endowment) => endowment.id === id)?.status,
        isEndowmentStatusLoading: isLoading || isFetching,
      }),
    }
  );
}
