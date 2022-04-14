import Multicall, { MC, M } from "contracts/Multicall";
import { WalletProxy } from "providers/WalletProvider";
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
  } = useAirdropQuery(getSerializableWallet(wallet)!, {
    skip: !wallet,
  });
  return {
    airdrops: data,
    isLoading: isLoading || isFetching,
    isError,
  };
}

//strip wallet Proxy of unserializable attr since

type SerializableWalletProxy = Pick<
  WalletProxy,
  "address" | "connection" | "network"
>;
function getSerializableWallet(wallet?: WalletProxy): WalletProxy | undefined {
  if (!wallet) return;
  const { address, connection, network } = wallet;
  const serializableWalletProxy: SerializableWalletProxy = {
    address,
    connection,
    network,
  };
  //cast back to WalletProxy
  //contracts doesn't use wallet methods
  return serializableWalletProxy as WalletProxy;
}
