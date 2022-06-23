import { PropsWithChildren, createContext, useContext, useMemo } from "react";
import { Connection, Provider, ProviderId, ProviderStatuses } from "./types";
import { WithBalance } from "services/types";
import { useBalancesQuery } from "services/apes/tokens/tokens";
import { placeHolderDisplayToken } from "./constants";
import useInjectedWallet from "./useInjectedProvider";
import useKeplr from "./useKeplr";
import useTerra from "./useTerra";
import useXdefi from "./useXdefi";

export type WalletState = {
  walletIcon: string;
  displayCoin: WithBalance;
  coins: WithBalance[];
  address: string;
  chainId: string;
  providerId: ProviderId;
  provider?: Provider;
};

type State = {
  wallet?: WalletState;
  isWalletLoading: boolean;
  isProviderLoading: boolean;
};

type Setters = {
  disconnect(): void;
  connections: Connection[];
};

const initialState: State = {
  wallet: undefined,
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

  const {
    isLoading: isKeplrLoading,
    connection: keplrConnection,
    disconnect: disconnectKeplr,
    providerInfo: keplrWalletInfo,
  } = useKeplr();

  const { isTerraLoading, terraConnections, disconnectTerra, terraInfo } =
    useTerra();

  const {
    isxdefiEVMLoading,
    xdefiConnection,
    disconnectEVMxdefi,
    xdefiEVMinfo,
  } = useXdefi();

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
      providerInfo: keplrWalletInfo,
      isLoading: isKeplrLoading,
    },
  ];

  const isProviderLoading = providerStatuses.reduce(
    (status, curr) => status || curr.isLoading,
    false
  );
  const activeProviderInfo = providerStatuses.find(
    ({ providerInfo, isLoading }) => !isLoading && providerInfo !== undefined
  )?.providerInfo;

  const {
    data: coinWithBalances = [],
    isLoading,
    isFetching,
  } = useBalancesQuery(
    { providerInfo: activeProviderInfo! },
    { skip: !activeProviderInfo }
  );

  const walletState: WalletState | undefined = useMemo(() => {
    if (activeProviderInfo) {
      const { logo, providerId, address, chainId, provider } =
        activeProviderInfo;
      return {
        walletIcon: logo,
        displayCoin: coinWithBalances[0] ?? placeHolderDisplayToken[providerId],
        coins:
          coinWithBalances.length <= 0
            ? [placeHolderDisplayToken[providerId]]
            : coinWithBalances,
        address,
        chainId,
        providerId,
        provider,
      };
    }
  }, [activeProviderInfo, coinWithBalances]);

  const disconnect = () => {
    switch (activeProviderInfo?.providerId) {
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
      case "falcon-wallet":
      case "leap-wallet":
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
        wallet: walletState,
        isWalletLoading: isFetching || isLoading,
        isProviderLoading,
      }}
    >
      <setContext.Provider
        value={{
          connections: [
            keplrConnection,
            xdefiConnection,
            metamaskConnection,
            ...terraConnections,
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
