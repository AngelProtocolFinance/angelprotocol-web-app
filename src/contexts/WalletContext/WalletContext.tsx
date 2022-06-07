import { PropsWithChildren, createContext, useContext } from "react";
import unknownWalletIcon from "assets/icons/wallets/unknown.svg";
import { useBalancesQuery } from "services/apes/tokens/tokens";
import { WithBalance } from "services/types";
import { chainIDs } from "constants/chainIDs";
import { placeHolderDisplayToken } from "./constants";
import { Connection, ProviderId, ProviderStatuses } from "./types";
import useInjectedProvider from "./useInjectedProvider";

type IWalletState = {
  walletIcon: string;
  displayCoin: WithBalance;
  coins: WithBalance[];
  walletAddr: string;
  chainId: string;
  providerId: ProviderId;
};

type IState = IWalletState & {
  isWalletLoading: boolean;
  isProviderLoading: boolean;
};

type Setters = {
  disconnect(): void;
  connections: Connection[];
};

const initialWalletState: IWalletState = {
  walletIcon: unknownWalletIcon,
  displayCoin: placeHolderDisplayToken["unknown"],
  coins: [],
  walletAddr: "",
  chainId: chainIDs.eth_main,
  providerId: "unknown",
};

const initialState: IState = {
  ...initialWalletState,
  isWalletLoading: true,
  isProviderLoading: true,
};

export default function WalletContext(props: PropsWithChildren<{}>) {
  const {
    isLoading: isMetamaskLoading, //requesting permission, attaching event listeners
    connection: metamaskConnection,
    disconnect: disconnectMetamask,
    providerInfo: metamaskInfo,
  } = useInjectedProvider("metamask");

  const {
    isLoading: isBinanceWalletLoading,
    connection: binanceWalletConnection,
    disconnect: disconnectBinanceWallet,
    providerInfo: binanceWalletInfo,
  } = useInjectedProvider("binance-wallet");

  const {
    isLoading: isxdefiEVMLoading,
    connection: xdefiEVMConnection,
    disconnect: disconnectEVMxdefi,
    providerInfo: xdefiEVMinfo,
  } = useInjectedProvider("xdefi");

  const providerStatuses: ProviderStatuses = [
    {
      providerInfo: binanceWalletInfo,
      isLoading: isBinanceWalletLoading,
    },
    {
      providerInfo: metamaskInfo,
      isLoading: isMetamaskLoading,
    },
    {
      providerInfo: xdefiEVMinfo,
      isLoading: isxdefiEVMLoading,
    },
  ];

  const isProviderLoading =
    isBinanceWalletLoading || isMetamaskLoading || isxdefiEVMLoading;

  const activeProviderInfo = providerStatuses.find(
    ({ providerInfo, isLoading }) => !isLoading && providerInfo !== undefined
  )?.providerInfo;

  const {
    address = "",
    chainId = "",
    providerId = "unknown",
    logo = "",
  } = activeProviderInfo || {};

  const {
    data: coinWithBalances = [],
    isLoading,
    isFetching,
  } = useBalancesQuery(
    { address, chainId, providerId },
    { skip: !address || !chainId || providerId === "unknown" }
  );

  const walletState: IWalletState = {
    walletIcon: logo,
    displayCoin: coinWithBalances[0] ?? placeHolderDisplayToken[providerId],
    coins:
      coinWithBalances.length <= 0
        ? [placeHolderDisplayToken[providerId]]
        : coinWithBalances,
    walletAddr: address,
    chainId,
    providerId,
  };

  const disconnect = () => {
    switch (providerId) {
      case "metamask":
        disconnectMetamask();
        break;
      case "binance-wallet":
        disconnectBinanceWallet();
        break;
      case "xdefi":
        disconnectEVMxdefi();
        break;
      default:
        throw new Error("no wallet is connected");
    }
  };

  return (
    <getContext.Provider
      value={{
        ...walletState,
        isWalletLoading: isFetching || isLoading,
        isProviderLoading,
      }}
    >
      <setContext.Provider
        value={{
          connections: [
            xdefiEVMConnection,
            metamaskConnection,
            binanceWalletConnection,
          ],
          disconnect,
        }}
      >
        {props.children}
      </setContext.Provider>
    </getContext.Provider>
  );
}

const getContext = createContext<IState>(initialState);
const setContext = createContext<Setters>({
  connections: [],
  disconnect: async () => {},
});

export const useSetWallet = () => useContext(setContext);
export const useGetWallet = () => useContext(getContext);
