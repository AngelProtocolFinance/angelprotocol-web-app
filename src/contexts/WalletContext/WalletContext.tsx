import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { Connection, ProviderId, ProviderStatuses } from "./types";
import { Chain, Token } from "types/aws";
import { WalletDisconnectedError } from "errors/errors";
import useChainWithBalancesQuery from "./useChainWithBalancesQuery";
import useInjectedProvider from "./useInjectedProvider";
import useKeplr from "./useKeplr";
import useTerra from "./useTerra";

export type WalletState = {
  walletIcon: string;
  displayCoin: Token;
  coins: Token[];
  address: string;
  chain: Chain;
  providerId: ProviderId;
  getBalance: (token_id: string) => number;
};

type State = {
  wallet?: WalletState;
  isLoading: boolean;
};

type Setters = {
  disconnect(): void;
  connections: Connection[];
};

const initialState: State = {
  wallet: undefined,
  isLoading: true,
};

export default function WalletContext(props: PropsWithChildren<{}>) {
  const {
    isLoading: isMetamaskLoading, //requesting permission, attaching event listeners
    connection: metamaskConnection,
    disconnect: disconnectMetamask,
    providerInfo: metamaskInfo,
  } = useInjectedProvider("metamask");

  // const {
  //   isLoading: isBinanceWalletLoading,
  //   connection: binanceWalletConnection,
  //   disconnect: disconnectBinanceWallet,
  //   providerInfo: binanceWalletInfo,
  // } = useInjectedProvider("binance-wallet");

  const {
    isLoading: isKeplrLoading,
    connection: keplrConnection,
    disconnect: disconnectKeplr,
    providerInfo: keplrWalletInfo,
  } = useKeplr();

  const { isTerraLoading, terraConnections, disconnectTerra, terraInfo } =
    useTerra();

  const {
    isLoading: isXdefiLoading, //requesting permission, attaching event listeners
    connection: xdefiConnection,
    disconnect: disconnectXdefi,
    providerInfo: xdefiInfo,
  } = useInjectedProvider("xdefi-evm");

  const providerStatuses: ProviderStatuses = [
    // {
    //   providerInfo: binanceWalletInfo,
    //   isLoading: isBinanceWalletLoading,
    // },
    {
      providerInfo: metamaskInfo,
      isLoading: isMetamaskLoading,
    },

    {
      providerInfo: terraInfo,
      isLoading: isTerraLoading,
    },
    {
      providerInfo: keplrWalletInfo,
      isLoading: isKeplrLoading,
    },
    {
      providerInfo: xdefiInfo,
      isLoading: isXdefiLoading,
    },
  ];

  const activeProviderInfo = providerStatuses.find(
    ({ providerInfo, isLoading }) => !isLoading && providerInfo !== undefined
  )?.providerInfo;

  const disconnect = useCallback(() => {
    switch (activeProviderInfo?.providerId) {
      case "metamask":
        disconnectMetamask();
        break;
      // case "binance-wallet":
      //   disconnectBinanceWallet();
      //   break;
      case "xdefi-evm":
        disconnectXdefi();
        break;
      case "keplr":
        disconnectKeplr();
        break;
      case "xdefi-wallet":
      case "station":
      case "leap-wallet":
      case "walletconnect":
        disconnectTerra();
        break;
      default:
        throw new WalletDisconnectedError();
    }
  }, [
    activeProviderInfo?.providerId,
    disconnectMetamask,
    // disconnectBinanceWallet,
    disconnectXdefi,
    disconnectKeplr,
    disconnectTerra,
  ]);

  const { chain, isLoading: isChainLoading } = useChainWithBalancesQuery(
    activeProviderInfo,
    disconnect
  );

  const walletState: WalletState | undefined = useMemo(() => {
    if (activeProviderInfo) {
      const { logo, providerId, address } = activeProviderInfo;
      return {
        walletIcon: logo,
        displayCoin: chain.native_currency,
        coins: [chain.native_currency, ...chain.tokens],
        address,
        chain,
        providerId,
        getBalance: (token_id: string) =>
          [chain.native_currency, ...chain.tokens].find(
            (x) => x.token_id === token_id
          )?.balance || 0,
      };
    }
  }, [activeProviderInfo, chain]);

  return (
    <getContext.Provider
      value={{
        wallet: walletState,
        isLoading: providerStatuses.some((x) => x.isLoading) || isChainLoading,
      }}
    >
      <setContext.Provider
        value={{
          connections: [
            keplrConnection,
            metamaskConnection,
            xdefiConnection,
            ...terraConnections,
            // binanceWalletConnection,
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
