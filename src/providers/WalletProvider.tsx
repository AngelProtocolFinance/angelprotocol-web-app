import { WalletProvider as TerraProvider } from "@terra-money/wallet-provider";
import Loader from "components/Loader/Loader";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from "react";
import { MetamaskProvider } from "./MetamaskProvider";
import { Wallet, WalletConnectionType } from "./types";
import useChainOptions from "./useChainOptions";
import useWallets from "./useWallets";

interface IWalletContext {
  isLoading: boolean;
  wallet?: Wallet;
  connect: (connType: WalletConnectionType) => Promise<void>;
  disconnect: () => Promise<void>;
}

export const WalletContext = createContext<IWalletContext>({
  isLoading: false,
  connect: (_: WalletConnectionType) => new Promise((r) => r),
  disconnect: () => new Promise((r) => r),
});

export function WalletProvider(props: PropsWithChildren<{}>) {
  const [wallet, setWallet] = useState<Wallet>();
  const { connect, disconnect, isLoading: isLoadingWallets } = useWallets();
  const { chainOptions, isLoading: isLoadingChainOptions } = useChainOptions();

  const connectWallet = useCallback(
    async (connType: WalletConnectionType) => {
      if (isLoadingWallets) {
        console.log("loading wallets");
        return;
      }

      const connectedWallet = await connect(connType);
      setWallet(connectedWallet);
    },
    [connect, isLoadingWallets]
  );

  const disconnectWallet = useCallback(async () => {
    if (isLoadingWallets) {
      console.log("loading wallets");
      return;
    }

    await disconnect();
    setWallet(undefined);
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
        connect: connectWallet,
        disconnect: disconnectWallet,
      }}
    >
      <TerraProvider {...chainOptions}>
        <MetamaskProvider>{props.children}</MetamaskProvider>
      </TerraProvider>
    </WalletContext.Provider>
  );
}
