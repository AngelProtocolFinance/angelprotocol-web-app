import { PropsWithChildren, createContext, useContext } from "react";
import { Connection, ProviderId, ProviderStatuses } from "./types";
import { WithBalance } from "services/types";
import unknownWalletIcon from "assets/icons/wallets/unknown.svg";
import { useBalancesQuery } from "services/apes/tokens/tokens";
import { chainIDs } from "constants/chainIDs";
import { placeHolderDisplayToken } from "./constants";
import useInjectedWallet from "./useInjectedProvider";
import useTerra from "./useTerrra";
import useTorusWallet from "./useTorusWallet";
import useXdefi from "./useXdefi";

export type WalletState = {
  walletIcon: string;
  displayCoin: WithBalance;
  coins: WithBalance[];
  walletAddr: string;
  chainId: string;
  providerId: ProviderId;
};

type State = WalletState & {
  isWalletLoading: boolean;
  isProviderLoading: boolean;
};

type Setters = {
  disconnect(): void;
  connections: Connection[];
};

export const initialWalletState: WalletState = {
  walletIcon: unknownWalletIcon,
  displayCoin: placeHolderDisplayToken["unknown"],
  coins: [],
  walletAddr: "",
  chainId: chainIDs.eth_main,
  providerId: "unknown",
};

const initialState: State = {
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
  } = useInjectedWallet("metamask");

  const {
    isLoading: isBinanceWalletLoading,
    connection: binanceWalletConnection,
    disconnect: disconnectBinanceWallet,
    providerInfo: binanceWalletInfo,
  } = useInjectedWallet("binance-wallet");

  const { isTerraLoading, terraConnections, disconnectTerra, terraInfo } =
    useTerra();

  const {
    isxdefiEVMLoading,
    xdefiConnection,
    disconnectEVMxdefi,
    xdefiEVMinfo,
  } = useXdefi();

  const { isTorusLoading, torusInfo, torusConnection, disconnectTorus } =
    useTorusWallet();

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
    {
      providerInfo: terraInfo,
      isLoading: isTerraLoading,
    },
    {
      providerInfo: torusInfo,
      isLoading: isTorusLoading,
    },
  ];

  const isProviderLoading =
    isBinanceWalletLoading ||
    isMetamaskLoading ||
    isxdefiEVMLoading ||
    isTerraLoading ||
    isTorusLoading;

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

  const walletState: WalletState = {
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
      case "xdefi-evm":
        disconnectEVMxdefi();
        break;
      case "torus":
        disconnectTorus();
        break;
      case "xdefi-wallet":
      case "station":
      case "walletconnect":
        disconnectTerra();
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
            ...terraConnections,
            xdefiConnection,
            torusConnection,
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

const getContext = createContext<State>(initialState);
const setContext = createContext<Setters>({
  connections: [],
  disconnect: async () => {},
});

export const useSetWallet = () => useContext(setContext);
export const useGetWallet = () => useContext(getContext);
