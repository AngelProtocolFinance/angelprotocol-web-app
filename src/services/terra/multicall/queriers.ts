import Multicall, { MC, M } from "contracts/Multicall";
import { useContract } from "../useContract";
import { multicall_api } from "./multicall";

export function useEndowmentBalance(address: string) {
  const { useEndowmentBalanceQuery } = multicall_api;
  const { contract } = useContract<MC, M>(Multicall);
  const { data, isError, isLoading, isFetching } = useEndowmentBalanceQuery(
    contract.endowmentBalance(address),
    {}
  );

  return {
    endowmentBalance: data,
    isLoading: isLoading || isFetching,
    isError,
  };
}
