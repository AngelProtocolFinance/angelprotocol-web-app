import { Coin } from "@cosmjs/proto-signing";
import { ethers, utils } from "ethers";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import {
  Connection,
  ProviderId,
  ProviderInfo,
  ProviderStatuses,
} from "./types";
import { Chain, Token } from "types/aws";
import { useChainQuery } from "services/apes";
import { queryContract } from "services/juno/queryContract";
import { WalletDisconnectedError, WrongNetworkError } from "errors/errors";
import { EXPECTED_NETWORK_TYPE } from "constants/env";
import { useErrorContext } from "../ErrorContext";
import { placeholderChain } from "./constants";
import { getERC20Holdings } from "./helpers/getERC20Holdings";
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

  const {
    data: chain = placeholderChain,
    isLoading: isChainLoading,
    isFetching: isChainFetching,
    error,
  } = useChainQuery(
    { chainId: activeProviderInfo?.chainId ?? "" },
    { skip: !activeProviderInfo }
  );

  useVerifyChain(activeProviderInfo, chain, error, disconnect);

  useEffect(() => {
    if (!activeProviderInfo) {
      return;
    }

    (async function () {
      const { address, chainId } = activeProviderInfo;

      // fetch balances for juno or terra
      if (chain.type === "juno-native" || chain.type === "terra-native") {
        const balancesRes = await fetch(
          chain.lcd_url + `/cosmos/bank/v1beta1/balances/${address}`
        );

        // returns only positive balances
        const { balances: nativeBalances }: { balances: Coin[] } =
          await balancesRes.json();

        // checking providerId to know which specific wallet is connected
        // this way once Terra v2 is enabled on Keplr again, the users will be able to
        // fetch their balances even when using Keplr
        const cw20Balances = await getCW20Balance(chain, address);

        const allBalances = nativeBalances.concat(cw20Balances);

        [chain.native_currency, ...chain.tokens].forEach((token) => {
          const balance = allBalances.find((x) => x.denom === token.token_id);
          token.balance = +utils.formatUnits(
            balance?.amount ?? 0,
            token.decimals
          );
        });

        return { data: chain };
      }

      /**fetch balances for ethereum */
      const jsonProvider = new ethers.providers.JsonRpcProvider(chain.rpc_url, {
        chainId: +chainId,
        name: chain.chain_name,
      });
      const queryResults = await jsonProvider.getBalance(address);

      chain.native_currency.balance = +utils.formatUnits(
        queryResults,
        chain.native_currency.decimals
      );

      const erc20Holdings = await getERC20Holdings(
        chain.rpc_url,
        address,
        chain.tokens.map((token) => token.token_id)
      );

      chain.tokens.forEach((token) => {
        const erc20 = erc20Holdings.find(
          (x) => x.contractAddress === token.token_id
        );
        token.balance = +(erc20?.balance ?? 0); // erc20 balance is already in decimal format
      });

      return { data: chain };
    });
  }, [activeProviderInfo, chain]);

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

async function getCW20Balance(chain: Chain, walletAddress: string) {
  const cw20BalancePromises = chain.tokens
    .filter((x) => x.type === "cw20")
    .map((x) =>
      queryContract(
        "cw20Balance",
        x.token_id,
        { addr: walletAddress },
        chain.lcd_url
      ).then((data) => ({
        denom: x.token_id,
        amount: data.balance,
      }))
    );

  const cw20Balances = await Promise.all(cw20BalancePromises);
  return cw20Balances;
}

const getContext = createContext<State>(initialState);
const setContext = createContext<Setters>({
  connections: [],
  disconnect: async () => {},
});

export const useSetWallet = () => useContext(setContext);
export const useGetWallet = () => useContext(getContext);
