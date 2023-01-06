import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { Connection, ProviderId, ProviderStatus } from "./types";
import { BaseChain, Chain, TokenWithBalance } from "types/aws";
import { useChainQuery } from "services/apes";
import { WalletDisconnectedError } from "errors/errors";
import { chainIDs } from "constants/chains";
import { IS_TEST } from "constants/env";
import { placeholderChain } from "./constants";
import { useVerifyChain } from "./hooks";
import useInjectedProvider from "./useInjectedProvider";
import useKeplr from "./useKeplr";
import useTerra from "./useTerra";

export type WalletState = {
  walletIcon: string;
  displayCoin: TokenWithBalance;
  coins: TokenWithBalance[];
  address: string;
  chain: Chain;
  providerId: ProviderId;
  supportedChains: BaseChain[];
};

type State = {
  wallet?: WalletState;
  isLoading: boolean;
};

type Setters = {
  switchChain: (chainId: chainIDs) => Promise<void>;
  disconnect(): void;
  connections: Connection[];
};

const initialState: State = {
  wallet: undefined,
  isLoading: true,
};

const BNB_WALLET_SUPPORTED_CHAINS: BaseChain[] = IS_TEST
  ? [{ chain_id: chainIDs.binanceTest, chain_name: "BNB Smart Chain Testnet" }]
  : [{ chain_id: chainIDs.binanceMain, chain_name: "BNB Smart Chain Mainnet" }];

const EVM_SUPPORTED_CHAINS: BaseChain[] = IS_TEST
  ? [
      { chain_id: chainIDs.ethTest, chain_name: "Ethereum Testnet" },
      { chain_id: chainIDs.binanceTest, chain_name: "BNB Smart Chain Testnet" },
    ]
  : [
      { chain_id: chainIDs.ethMain, chain_name: "Ethereum Mainnet" },
      // {chain_id: chainIDs.binanceMain, chain_name: "BNB Smart Chain Mainnet"},
    ];

export default function WalletContext(props: PropsWithChildren<{}>) {
  const {
    isLoading: isMetamaskLoading, //requesting permission, attaching event listeners
    connection: metamaskConnection,
    disconnect: disconnectMetamask,
    providerInfo: metamaskInfo,
    supportedChains: metamaskSupportedChains,
    switchChain: switchMetamaskChain,
  } = useInjectedProvider("metamask", EVM_SUPPORTED_CHAINS);

  const {
    isLoading: isBinanceWalletLoading,
    connection: binanceWalletConnection,
    disconnect: disconnectBinanceWallet,
    providerInfo: binanceWalletInfo,
    supportedChains: binanceSupportedChains,
    switchChain: switchBinanceChain,
  } = useInjectedProvider("binance-wallet", BNB_WALLET_SUPPORTED_CHAINS);

  const {
    isLoading: isKeplrLoading,
    connection: keplrConnection,
    disconnect: disconnectKeplr,
    providerInfo: keplrWalletInfo,
    supportedChains: keplrSupportedChains,
    switchChain: switchKeplrChain,
  } = useKeplr();

  const {
    isTerraLoading,
    terraConnections,
    disconnectTerra,
    terraInfo,
    supportedChains: terraSupportedChains,
    switchChain: switchTerraChain,
  } = useTerra();

  const {
    isLoading: isXdefiLoading, //requesting permission, attaching event listeners
    connection: xdefiConnection,
    disconnect: disconnectXdefi,
    providerInfo: xdefiInfo,
    supportedChains: xdefiSupportedChains,
    switchChain: switchXdefiChain,
  } = useInjectedProvider("xdefi-evm", EVM_SUPPORTED_CHAINS, "Xdefi EVM");

  const providerStatuses: ProviderStatus[] = [
    {
      providerInfo: binanceWalletInfo,
      isLoading: isBinanceWalletLoading,
      supportedChains: binanceSupportedChains,
      switchChain: switchBinanceChain,
    },
    {
      providerInfo: metamaskInfo,
      isLoading: isMetamaskLoading,
      supportedChains: metamaskSupportedChains,
      switchChain: switchMetamaskChain,
    },

    {
      providerInfo: terraInfo,
      isLoading: isTerraLoading,
      supportedChains: terraSupportedChains,
      switchChain: switchTerraChain,
    },
    {
      providerInfo: keplrWalletInfo,
      isLoading: isKeplrLoading,
      supportedChains: keplrSupportedChains,
      switchChain: switchKeplrChain,
    },
    {
      providerInfo: xdefiInfo,
      isLoading: isXdefiLoading,
      supportedChains: xdefiSupportedChains,
      switchChain: switchXdefiChain,
    },
  ];

  const activeProvider = providerStatuses.find(
    ({ providerInfo, isLoading }) => !isLoading && providerInfo !== undefined
  );

  const disconnect = useCallback(() => {
    switch (activeProvider?.providerInfo!.providerId) {
      case "metamask":
        disconnectMetamask();
        break;
      case "binance-wallet":
        disconnectBinanceWallet();
        break;
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
    activeProvider?.providerInfo,
    disconnectMetamask,
    disconnectBinanceWallet,
    disconnectXdefi,
    disconnectKeplr,
    disconnectTerra,
  ]);

  const switchChain = useCallback(
    async (chainId: chainIDs) => {
      if (!activeProvider) {
        throw new WalletDisconnectedError();
      }

      await activeProvider.switchChain(chainId);
    },
    [activeProvider]
  );

  const {
    data: chain = placeholderChain,
    isLoading: isChainLoading,
    isFetching: isChainFetching,
    error,
  } = useChainQuery(
    {
      chainId: activeProvider?.providerInfo?.chainId,
      address: activeProvider?.providerInfo?.address,
    },
    { skip: !activeProvider }
  );

  useVerifyChain(chain, error, disconnect);

  const walletState: WalletState | undefined = useMemo(() => {
    if (activeProvider) {
      const { logo, providerId, address } = activeProvider.providerInfo!;
      const walletState: WalletState = {
        walletIcon: logo,
        displayCoin: chain.native_currency,
        coins: [chain.native_currency, ...chain.tokens],
        address,
        chain,
        providerId,
        supportedChains: activeProvider.supportedChains,
      };

      return walletState;
    }
  }, [activeProvider, chain]);

  return (
    <getContext.Provider
      value={{
        wallet: walletState,
        isLoading:
          providerStatuses.some((x) => x.isLoading) ||
          isChainLoading ||
          isChainFetching,
      }}
    >
      <setContext.Provider
        value={{
          connections: [
            keplrConnection,
            metamaskConnection,
            xdefiConnection,
            ...terraConnections,
            binanceWalletConnection,
          ],
          disconnect,
          switchChain,
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
  switchChain: async (_) => {},
});

export const useSetWallet = () => useContext(setContext);
export const useGetWallet = () => useContext(getContext);
