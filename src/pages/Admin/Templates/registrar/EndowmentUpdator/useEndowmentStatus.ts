import { queryObject } from "services/juno/queryContract/queryObjects";
import { useEndowmentsQuery } from "services/juno/registrar/registrar";
import { contracts } from "constants/contracts";

export function useEndowmentStatus(endowAddr: string, skip?: boolean) {
  return useEndowmentsQuery(
    { address: contracts.registrar, msg: queryObject.regEndowList({}) },
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
