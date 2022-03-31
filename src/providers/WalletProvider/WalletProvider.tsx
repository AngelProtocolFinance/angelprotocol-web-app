import {
  WalletProvider as TerraProvider,
  WalletStatus,
} from "@terra-money/wallet-provider";
import { createContext, PropsWithChildren } from "react";
import Loader from "../../components/Loader/Loader";
import { IWalletContext } from "./types";
import useChainOptions from "./useChainOptions";
import useWalletProxy from "./useWalletProxy";

export const WalletContext = createContext<IWalletContext>({
  wallet: undefined,
  status: WalletStatus.WALLET_NOT_CONNECTED,
  availableWallets: [],
  availableInstallations: [],
  connect: () => new Promise((r) => r),
  disconnect: () => new Promise((r) => r),
});

export function WalletProvider(props: PropsWithChildren<{}>) {
  const { chainOptions, isLoading } = useChainOptions();

  if (isLoading) {
    return <LoaderSection />;
  }

  return (
    <TerraProvider {...chainOptions}>
      <WalletProxyProvider>{props.children}</WalletProxyProvider>
    </TerraProvider>
  );
}

function WalletProxyProvider(props: PropsWithChildren<{}>) {
  const walletProxy = useWalletProxy();

  return (
    <WalletContext.Provider value={walletProxy}>
      {props.children}
    </WalletContext.Provider>
  );
}

function LoaderSection() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Loader bgColorClass="bg-white-grey" gapClass="gap-2" widthClass="w-4" />
    </div>
  );
}
