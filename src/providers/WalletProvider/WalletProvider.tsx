import {
  NetworkInfo,
  WalletProvider as TerraProvider,
  WalletStatus,
} from "@terra-money/wallet-provider";
import { PropsWithChildren, createContext } from "react";
import BinanceWalletContext from "contexts/BinanceWalletContext/BinanceWalletContext";
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

type Props = PropsWithChildren<{ defaultNetwork?: NetworkInfo }>;

export function WalletProvider(props: Props) {
  const options = {
    ...chainOptions,
    defaultNetwork: props.defaultNetwork || chainOptions.defaultNetwork,
  };

  return (
    <TerraProvider {...options}>
      <MetamaskContext>
        <BinanceWalletContext>
          <WalletProxyProvider>{props.children}</WalletProxyProvider>
        </BinanceWalletContext>
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
