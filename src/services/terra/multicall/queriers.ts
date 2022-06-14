import { useGetWallet } from "contexts/WalletContext/WalletContext";
import Multicall, { M, MC } from "contracts/Multicall";
import { useContract } from "../useContract";
import { multicall_api } from "./multicall";

export function useEndowmentBalance(address: string) {
  const { useEndowmentBalanceQuery } = multicall_api;
  const { contract } = useContract<MC, M>(Multicall);
  const { data, isError, isLoading, isFetching } = useEndowmentBalanceQuery(
    contract.balanceAndRates(address),
    {}
  );

  return {
    endowmentBalance: data,
    isLoading: isLoading || isFetching,
    isError,
  };
}

export function useWithdrawConstraints(address: string) {
  const { useWithdrawConstraintsQuery } = multicall_api;
  const { contract } = useContract<MC, M>(Multicall);
  const { data, isError, isLoading, isFetching } = useWithdrawConstraintsQuery(
    contract.balanceAndRates(address),
    {}
  );
  return {
    withdrawContrains: data,
    isLoading: isLoading || isFetching,
    isError,
  };
}

export function useEndowmentCWs(address: string) {
  const { useWithdrawConstraintsQuery } = multicall_api;
  const { contract } = useContract<MC, M>(Multicall);
  const { data, isError, isLoading, isFetching } = useWithdrawConstraintsQuery(
    contract.balanceAndRates(address),
    {}
  );
  return {
    withdrawContrains: data,
    isLoading: isLoading || isFetching,
    isError,
  };
}

export function useAirdrop() {
  const { useAirdropQuery } = multicall_api;
  const { wallet } = useGetWallet();
  const {
    data = [],
    isError,
    isLoading,
    isFetching,
  } = useAirdropQuery(wallet?.address!, {
    skip: !wallet,
  });
  return {
    airdrops: data,
    isLoading: isLoading || isFetching,
    isError,
  };
}
