import { WalletProvider as TerraProvider } from "@terra-money/wallet-provider";
import Loader from "../../components/Loader/Loader";
import { createContext, PropsWithChildren, useCallback, useMemo } from "react";
import { DEFAULT_WALLET, WalletConnectionType, WalletProxy } from "./types";
import useChainOptions from "./useChainOptions";
import useWalletProxy from "./useWalletProxy";

type IWalletContext = Omit<WalletProxy, "connect"> & {
  connect: (connType: WalletConnectionType) => Promise<void>;
};

export const WalletContext = createContext<IWalletContext>({
  wallet: DEFAULT_WALLET,
  isLoading: false,
  isConnected: false,
  connect: (_: WalletConnectionType) => new Promise((r) => r),
  disconnect: () => new Promise((r) => r),
});

export function WalletProvider(props: PropsWithChildren<{}>) {
  const { chainOptions, isLoading: isLoadingChainOptions } = useChainOptions();
  const {
    wallet,
    connect,
    disconnect,
    isLoading: isLoadingWallet,
    isConnected,
  } = useWalletProxy();

  const connectWallet = useCallback(
    async (connType: WalletConnectionType) => {
      if (isLoadingWallet) {
        return;
      }

      await connect(connType);
    },
    [connect, isLoadingWallet]
  );

  const disconnectWallet = useCallback(async () => {
    if (isLoadingWallet) {
      return;
    }
    await disconnect();
  }, [disconnect, isLoadingWallet]);

  const isLoading = useMemo(
    () => isLoadingChainOptions && isLoadingWallet,
    [isLoadingChainOptions, isLoadingWallet]
  );

  if (isLoading) {
    return (
      <Loader bgColorClass="bg-angel-blue" gapClass="gap-2" widthClass="w-4" />
    );
  }

  return (
    <WalletContext.Provider
      value={{
        wallet,
        isLoading,
        isConnected,
        connect: connectWallet,
        disconnect: disconnectWallet,
      }}
    >
      <TerraProvider {...chainOptions}>{props.children}</TerraProvider>
    </WalletContext.Provider>
  );
}
