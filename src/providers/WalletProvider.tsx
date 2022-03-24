import { WalletProvider as TerraProvider } from "@terra-money/wallet-provider";
import Loader from "components/Loader/Loader";
import { createContext, PropsWithChildren, useCallback, useMemo } from "react";
import { DEFAULT_WALLET, WalletConnectionType, WalletSetters } from "./types";
import useChainOptions from "./useChainOptions";
import useWallet from "./useWallet";

type IWalletContext = Omit<WalletSetters, "connect"> & {
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
  const {
    wallet,
    connect,
    disconnect,
    isLoading: isLoadingWallets,
    isConnected,
  } = useWallet();
  const { chainOptions, isLoading: isLoadingChainOptions } = useChainOptions();

  const connectWallet = useCallback(
    async (connType: WalletConnectionType) => {
      if (isLoadingWallets) {
        return;
      }

      await connect(connType);
    },
    [connect, isLoadingWallets]
  );

  const disconnectWallet = useCallback(async () => {
    if (isLoadingWallets) {
      return;
    }
    await disconnect();
  }, [disconnect, isLoadingWallets]);

  const isLoading = useMemo(
    () => isLoadingChainOptions && isLoadingWallets,
    [isLoadingChainOptions, isLoadingWallets]
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
