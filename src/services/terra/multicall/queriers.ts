import Multicall, { MC, M } from "contracts/Multicall";
import useWalletContext from "providers/WalletProvider/useWalletContext";
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

export function useAirdrop() {
  const { useAirdropQuery } = multicall_api;
  const { wallet } = useWalletContext();
  const {
    data = [],
    isError,
    isLoading,
    isFetching,
  } = useAirdropQuery(wallet!, {
    skip: !wallet,
  });
  return {
    airdrops: data,
    isLoading: isLoading || isFetching,
    isError,
  };
}
