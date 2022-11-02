import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { Connection, ProviderId, ProviderInfo, WalletData } from "./types";
import { Chain, Token } from "types/aws";
import { useChainQuery } from "services/apes";
import { WalletDisconnectedError, WrongNetworkError } from "errors/errors";
import { EXPECTED_NETWORK_TYPE } from "constants/env";
import { useErrorContext } from "../ErrorContext";
import { placeholderChain } from "./constants";
import useAutoConnect from "./useAutoConnect";
import useInjectedProvider from "./useInjectedProvider";
import useKeplr from "./useKeplr";
import useTerra from "./useTerra";
import useXdefi from "./useXdefi";

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
  const metamask = useInjectedProvider("metamask");
  const keplr = useKeplr();
  const terra = useTerra();
  const xdefi = useXdefi();

  // const {
  //   isLoading: isBinanceWalletLoading,
  //   connection: binanceWalletConnection,
  //   disconnect: disconnectBinanceWallet,
  //   providerInfo: binanceWalletInfo,
  // } = useInjectedProvider("binance-wallet");

  const wallets: WalletData[] = [metamask, keplr, terra, xdefi];

  useAutoConnect(wallets);

  const activeProviderInfo = wallets.find(
    ({ providerInfo, isLoading }) => !isLoading && providerInfo !== undefined
  )?.providerInfo;

  const disconnect = useCallback(() => {
    switch (activeProviderInfo?.providerId) {
      case "metamask":
        metamask.disconnect();
        break;
      // case "binance-wallet":
      //   disconnectBinanceWallet();
      //   break;
      case "xdefi-evm":
        xdefi.disconnect();
        break;
      case "keplr":
        keplr.disconnect();
        break;
      case "xdefi-wallet":
      case "station":
      case "falcon-wallet":
      case "leap-wallet":
      case "walletconnect":
        terra.disconnect();
        break;
      default:
        throw new WalletDisconnectedError();
    }
  }, [
    activeProviderInfo?.providerId,
    metamask,
    // BinanceWallet,
    xdefi,
    keplr,
    terra,
  ]);

  const {
    data: chain = placeholderChain,
    isLoading: isChainLoading,
    error,
  } = useChainQuery(
    { providerInfo: activeProviderInfo! },
    { skip: !activeProviderInfo }
  );

  useVerifyChain(activeProviderInfo, chain, error, disconnect);

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
        isLoading: wallets.some((x) => x.isLoading) || isChainLoading,
      }}
    >
      <setContext.Provider
        value={{
          connections: [
            ...keplr.connections,
            ...xdefi.connections,
            ...metamask.connections,
            ...terra.connections,
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

function useVerifyChain(
  activeProviderInfo: ProviderInfo | undefined,
  chain: Chain,
  chainError: any,
  disconnect: () => void
) {
  const { handleError } = useErrorContext();

  const handle = useCallback(
    (error: any) => {
      handleError(error);
      try {
        disconnect();
      } catch (err) {
        // when wallet is disconnected, the `disconnect` func is recreated,
        // causing this hook to rerun and throwing the error below.
        // We ignore this error and rethrow others
        if (!(err instanceof WalletDisconnectedError)) {
          handleError(err);
        }
      }
    },
    [handleError, disconnect]
  );

  useEffect(() => {
    // no active provider === no connected wallet so no need to run hook
    if (!activeProviderInfo) {
      return;
    }
    if (chainError) {
      handle(chainError);
    } else if (chain.network_type !== EXPECTED_NETWORK_TYPE) {
      handle(new WrongNetworkError());
    }
  }, [activeProviderInfo, chain, chainError, handle]);
}

const getContext = createContext<State>(initialState);
const setContext = createContext<Setters>({
  connections: [],
  disconnect: async () => {},
});

export const useSetWallet = () => useContext(setContext);
export const useGetWallet = () => useContext(getContext);
