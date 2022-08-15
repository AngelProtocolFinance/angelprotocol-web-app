import { useEndowmentsQuery } from "services/juno/registrar/registrar";

export function useEndowmentStatus(endowAddr: string, skip?: boolean) {
  return useEndowmentsQuery(
    {},
    {
      skip,
      selectFromResult: ({ data, isLoading, isFetching }) => ({
        endowmentStatus: data?.find(
          (endowment) => endowment.address === endowAddr
        )?.status,
        isEndowmentStatusLoading: isLoading || isFetching,
      }),
    }
  );
}
