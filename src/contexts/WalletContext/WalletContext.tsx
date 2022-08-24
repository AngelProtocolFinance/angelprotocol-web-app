import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
} from "react";
import { Connection, Wallet, WalletStatus } from "./types";
import { WalletDisconnectedError } from "errors/errors";
import useInjectedWallet from "./providers/useInjectedProvider";
import useKeplr from "./providers/useKeplr";
import useTerra from "./providers/useTerra";
import useXdefi from "./providers/useXdefi";

type State = {
  wallet: Wallet | undefined;
  isLoading: boolean;
  disconnect(): void;
  connections: Connection[];
};

export default function WalletContext(props: PropsWithChildren<{}>) {
  const {
    isLoading: isMetamaskLoading, //requesting permission, attaching event listeners
    connection: metamaskConnection,
    disconnect: disconnectMetamask,
    wallet: metamask,
  } = useInjectedWallet("metamask");

  const {
    isLoading: isBinanceWalletLoading,
    connection: binanceWalletConnection,
    disconnect: disconnectBinanceWallet,
    wallet: binanceWallet,
  } = useInjectedWallet("binance-wallet");

  const {
    isLoading: isKeplrLoading,
    connection: keplrConnection,
    disconnect: disconnectKeplr,
    wallet: keplr,
  } = useKeplr();

  const {
    isTerraLoading,
    terraConnections,
    disconnectTerra,
    wallet: terraWallet,
  } = useTerra();

  const {
    isxdefiEVMLoading,
    xdefiConnection,
    disconnectEVMxdefi,
    xdefiEVMWallet,
  } = useXdefi();

  const wallets: WalletStatus[] = [
    {
      wallet: binanceWallet,
      isLoading: isBinanceWalletLoading,
    },
    {
      wallet: metamask,
      isLoading: isMetamaskLoading,
    },
    {
      wallet: xdefiEVMWallet,
      isLoading: isxdefiEVMLoading,
    },
    {
      wallet: terraWallet,
      isLoading: isTerraLoading,
    },
    {
      wallet: keplr,
      isLoading: isKeplrLoading,
    },
  ];
  const activeWallet = wallets.find(
    ({ wallet, isLoading }) => !isLoading && wallet !== undefined
  )?.wallet;

  const disconnect = useCallback(() => {
    switch (activeWallet?.id) {
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
    activeWallet?.id,
    disconnectMetamask,
    disconnectBinanceWallet,
    disconnectEVMxdefi,
    disconnectKeplr,
    disconnectTerra,
  ]);

  return (
    <context.Provider
      value={{
        wallet: activeWallet,
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
