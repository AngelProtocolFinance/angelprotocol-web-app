import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
} from "react";
import { Connection, TWallet } from "./types";
import { WalletDisconnectedError } from "errors/errors";
import useInjectedWallet from "./providers/useInjectedProvider";
import useKeplr from "./providers/useKeplr";
import useTerra from "./providers/useTerra";
import useXdefi from "./providers/useXdefi";

type State = TWallet & {
  disconnect(): void;
  connections: Connection[];
};

export default function WalletContext(props: PropsWithChildren<{}>) {
  const {
    isLoading: isMetamaskLoading, //requesting permission, attaching event listeners
    connection: metamaskConnection,
    disconnect: disconnectMetamask,
    info: metamaskInfo,
  } = useInjectedWallet("metamask");

  const {
    isLoading: isBinanceWalletLoading,
    connection: binanceWalletConnection,
    disconnect: disconnectBinanceWallet,
    info: binanceWalletInfo,
  } = useInjectedWallet("binance-wallet");

  const {
    isLoading: isKeplrLoading,
    connection: keplrConnection,
    disconnect: disconnectKeplr,
    info: keplrWalletInfo,
  } = useKeplr();

  const { isTerraLoading, terraConnections, disconnectTerra, terraInfo } =
    useTerra();

  const {
    isxdefiEVMLoading,
    xdefiConnection,
    disconnectEVMxdefi,
    xdefiEVMInfo,
  } = useXdefi();

  const wallets: TWallet[] = [
    {
      info: binanceWalletInfo,
      isLoading: isBinanceWalletLoading,
    },
    {
      info: metamaskInfo,
      isLoading: isMetamaskLoading,
    },
    {
      info: xdefiEVMInfo,
      isLoading: isxdefiEVMLoading,
    },
    {
      info: terraInfo,
      isLoading: isTerraLoading,
    },
    {
      info: keplrWalletInfo,
      isLoading: isKeplrLoading,
    },
  ];
  const activeWalletInfo = wallets.find(
    ({ info, isLoading }) => !isLoading && info !== undefined
  )?.info;

  const disconnect = useCallback(() => {
    switch (activeWalletInfo?.id) {
      case "metamask":
        disconnectMetamask();
        break;
      case "binance-wallet":
        disconnectBinanceWallet();
        break;
      case "xdefi-evm":
        disconnectEVMxdefi();
        break;
      case "keplr":
        disconnectKeplr();
        break;
      case "xdefi-wallet":
      case "station":
      case "walletconnect":
        disconnectTerra();
        break;
      default:
        throw new WalletDisconnectedError();
    }
  }, [
    activeWalletInfo?.id,
    disconnectMetamask,
    disconnectBinanceWallet,
    disconnectEVMxdefi,
    disconnectKeplr,
    disconnectTerra,
  ]);

  return (
    <context.Provider
      value={{
        info: activeWalletInfo,
        isLoading: wallets.some((wallet) => wallet.isLoading),
        disconnect,
        connections: [
          keplrConnection,
          xdefiConnection,
          metamaskConnection,
          ...terraConnections,
          binanceWalletConnection,
        ],
      }}
    >
      {props.children}
    </context.Provider>
  );
}

const context = createContext<State>({} as State);

export const useWalletContext = () => {
  const val = useContext(context);
  if (Object.entries(val).length <= 0) {
    throw new Error(
      "useWalletContext should only be used inside WalletContext"
    );
  }
  return val;
};
