import {
  Connection,
  Installation,
  WalletProvider as TerraProvider,
  WalletStatus,
} from "@terra-money/wallet-provider";
import { createContext, PropsWithChildren } from "react";
import Loader from "../../components/Loader/Loader";
import useChainOptions from "./useChainOptions";
import useWalletProxy, { DEFAULT_WALLET, WalletProxy } from "./useWalletProxy";

type IWalletContext = {
  wallet: WalletProxy;
  status: WalletStatus;
  availableConnections: Connection[];
  availableInstallations: Installation[];
  connect: (...args: any[]) => Promise<void>;
  disconnect: () => Promise<void>;
};

const DEFAULT_AVAIL_CONNECTIONS: Connection[] = [];

export const WalletContext = createContext<IWalletContext>({
  wallet: DEFAULT_WALLET,
  status: WalletStatus.WALLET_NOT_CONNECTED,
  availableConnections: DEFAULT_AVAIL_CONNECTIONS,
  availableInstallations: [],
  connect: (..._: any[]) => new Promise((r) => r),
  disconnect: () => new Promise((r) => r),
});

export function WalletProvider(props: PropsWithChildren<{}>) {
  const { chainOptions, isLoading } = useChainOptions();
  const wallet = useWalletProxy();

  if (isLoading) {
    return (
      <Loader bgColorClass="bg-angel-blue" gapClass="gap-2" widthClass="w-4" />
    );
  }

  return (
    <WalletContext.Provider value={wallet}>
      <TerraProvider {...chainOptions}>{props.children}</TerraProvider>
    </WalletContext.Provider>
  );
}
