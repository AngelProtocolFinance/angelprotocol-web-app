import {
  Connection,
  ConnectType,
  WalletProvider as TerraProvider,
} from "@terra-money/wallet-provider";
import { createContext, PropsWithChildren } from "react";
import Loader from "../../components/Loader/Loader";
import useChainOptions from "./useChainOptions";
import useWalletProxy, { DEFAULT_WALLET, WalletProxy } from "./useWalletProxy";

type ConnectionType =
  | ConnectType.EXTENSION
  | ConnectType.WALLETCONNECT
  | "METAMASK";

type IWalletContext = {
  wallet: WalletProxy;
  availableConnections: Connection[];
};

const DEFAULT_AVAIL_CONNECTIONS: Connection[] = [];

export const WalletContext = createContext<IWalletContext>({
  wallet: DEFAULT_WALLET,
  availableConnections: DEFAULT_AVAIL_CONNECTIONS,
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
