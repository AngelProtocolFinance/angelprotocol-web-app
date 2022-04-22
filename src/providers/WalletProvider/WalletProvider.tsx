import {
  WalletProvider as TerraProvider,
  WalletStatus,
} from "@terra-money/wallet-provider";
import { PropsWithChildren, createContext } from "react";
import BinanceContext from "contexts/BinanceWalletContext/BinanceWalletContext";
import MetamaskContext from "contexts/MetamaskContext/MetamaskContext";
import { chainOptions } from "./chainOptions";
import { IWalletContext } from "./types";
import useWalletContext from "./useWalletContext";

export const WalletContext = createContext<IWalletContext>({
  wallet: undefined,
  status: WalletStatus.WALLET_NOT_CONNECTED,
  availableWallets: [],
  availableInstallations: [],
});

export function WalletProvider(props: PropsWithChildren<{}>) {
  return (
    <TerraProvider {...chainOptions}>
      <MetamaskContext>
        <BinanceContext>
          <WalletProxyProvider>{props.children}</WalletProxyProvider>
        </BinanceContext>
      </MetamaskContext>
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
