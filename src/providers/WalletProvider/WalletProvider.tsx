import {
  WalletProvider as TerraProvider,
  WalletStatus,
} from "@terra-money/wallet-provider";
import { createContext, PropsWithChildren } from "react";
import Loader from "../../components/Loader/Loader";
import BinanceWallet from "../BinanceWallet/BinanceWallet";
import Metamask from "../Metamask/Metamask";
import { IWalletContext } from "./types";
import useChainOptions from "./useChainOptions";
import useWalletContext from "./useWalletContext";

export const WalletContext = createContext<IWalletContext>({
  wallet: undefined,
  status: WalletStatus.WALLET_NOT_CONNECTED,
  availableWallets: [],
  availableInstallations: [],
});

export function WalletProvider(props: PropsWithChildren<{}>) {
  const { chainOptions, isLoading } = useChainOptions();

  if (isLoading) {
    return <LoaderSection />;
  }

  return (
    <TerraProvider {...chainOptions}>
      <Metamask>
        <BinanceWallet>
          <WalletProxyProvider>{props.children}</WalletProxyProvider>
        </BinanceWallet>
      </Metamask>
    </TerraProvider>
  );
}

function WalletProxyProvider(props: PropsWithChildren<{}>) {
  const walletContext = useWalletContext();

  return (
    <WalletContext.Provider value={walletContext}>
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
