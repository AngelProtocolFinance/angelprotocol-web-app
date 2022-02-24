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
