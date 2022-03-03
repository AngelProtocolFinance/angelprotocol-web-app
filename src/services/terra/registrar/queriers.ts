import { chainIDs } from "constants/chainIDs";
import { useRegistrar } from "../contracts";
import { registrar_api } from "./registrar";

export function useEndowmentList() {
  const { useEndowmentsQuery } = registrar_api;
  const { wallet, contract } = useRegistrar();
  const {
    data = [],
    isLoading,
    isFetching,
  } = useEndowmentsQuery(contract.endowmentList, {
    skip: wallet?.network.chainID === chainIDs.localterra,
  });

  return {
    endowments: data,
    isEndowmentsLoading: isLoading || isFetching,
  };
}

export function useEndowmentStatus(address: string, skip = false) {
  const { useEndowmentsQuery } = registrar_api;
  const { wallet, contract } = useRegistrar();
  const { endowmentStatus, isEndowmentStatusLoading } = useEndowmentsQuery(
    contract.endowmentList,
    {
      skip: skip || wallet?.network.chainID === chainIDs.localterra,
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
