import { formatUnits } from "@ethersproject/units";
import { useCallback, useEffect, useState } from "react";
import { Connection, ProviderId, ProviderInfo } from "./types";
import { BaseChain } from "types/aws";
import {
  AccountChangeHandler,
  ChainChangeHandler,
  Dwindow,
  InjectedProvider,
} from "types/ethereum";
import { getProvider } from "helpers";
import {
  UnexpectedStateError,
  UnsupportedChainError,
  WalletDisconnectedError,
  WalletError,
  WalletNotInstalledError,
} from "errors/errors";
import { chainIDs } from "constants/chains";
import { EIPMethods } from "constants/ethereum";
import { WALLET_METADATA } from "./constants";
import {
  checkXdefiPriority,
  retrieveUserAction,
  saveUserAction,
  toPrefixedHex,
} from "./helpers";
import { useAddEthereumChain } from "./hooks";

const CHAIN_NOT_ADDED_CODE = 4902;

export default function useInjectedProvider(
  providerId: Extract<ProviderId, "metamask" | "xdefi-evm" | "binance-wallet">,
  supportedChains: BaseChain[],
  connectorName = prettifyId(providerId)
) {
  const actionKey = `${providerId}__pref`;
  //connect only if there's no active wallet
  const lastAction = retrieveUserAction(actionKey);
  const shouldReconnect = lastAction === "connect";
  const [isLoading, setIsLoading] = useState(true);
  const [address, setAddress] = useState<string>("");
  const [chainId, setChainId] = useState<string>();

  const addEthereumChain = useAddEthereumChain();

  useEffect(() => {
    requestAccess();
    return () => {
      removeAllListeners(providerId);
    };
    //eslint-disable-next-line
  }, []);

  /** attachers/detachers */
  const attachChainChangedHandler = (provider: InjectedProvider) => {
    provider.on("chainChanged", handleChainChange);
  };

  const attachAccountChangeHandler = (provider: InjectedProvider) => {
    provider.on("accountsChanged", handleAccountsChange);
  };

  /** event handlers */
  const handleChainChange: ChainChangeHandler = (hexChainId) => {
    setChainId(formatUnits(hexChainId, 0));
  };

  //useful when user changes account internally via metamask
  const handleAccountsChange: AccountChangeHandler = (accounts) => {
    //requestAccounts(new connection) will set the address so no need to set again
    if (accounts.length > 0) {
      setAddress(accounts[0]);
      //if no account is found, means user disconnected
    } else {
      setAddress("");
      setChainId(undefined);
      saveUserAction(actionKey, "disconnect");
      removeAllListeners(providerId);
    }
  };

  const verifyChainSupported = useCallback(
    (chainId: string) => {
      if (!supportedChains.some((x) => x.chain_id === chainId)) {
        throw new UnsupportedChainError(chainId);
      }
    },
    [supportedChains]
  );

  const requestAccess = async (isNewConnection = false) => {
    try {
      const injectedProvider = getProvider(providerId);
      if (
        injectedProvider &&
        (isNewConnection || shouldReconnect) &&
        !address
      ) {
        attachAccountChangeHandler(injectedProvider);
        attachChainChangedHandler(injectedProvider);

        const accounts = await injectedProvider.request<string[]>({
          method: EIPMethods.eth_requestAccounts,
        });

        const hexChainId = await injectedProvider.request<string>({
          method: EIPMethods.eth_chainId,
        });

        const parsedChainId = formatUnits(hexChainId, 0);
        verifyChainSupported(parsedChainId);
        setAddress(accounts[0]);
        setChainId(parsedChainId);
      }
      setIsLoading(false);
    } catch (err: any) {
      //if user cancels, set pref to disconnect
      setIsLoading(false);
      saveUserAction(actionKey, "disconnect");
      removeAllListeners(providerId);

      if (err instanceof UnsupportedChainError) {
        throw err;
      }
      if (isNewConnection) {
        //if connection is made via "connect-button"
        throw new WalletError(err.message, err.code);
      }
    }
  };

  function disconnect() {
    if (!address) return;
    const injectedProvider = getProvider(providerId);
    if (!injectedProvider) return;
    setAddress("");
    setChainId(undefined);
    saveUserAction(actionKey, "disconnect");
    removeAllListeners(providerId);
  }

  const connect = async () => {
    const dwindow = window as Dwindow;

    if (!getProvider(providerId)) {
      throw new WalletNotInstalledError(providerId);
    }

    try {
      //connecting xdefi
      if (providerId === "xdefi-evm") {
        checkXdefiPriority();
        //connecting other wallet
      } else {
        if (dwindow?.xfi?.ethereum?.isMetaMask) {
          throw new WalletError(
            "Kindly remove priority to xdefi and reload the page"
          );
        }
      }

      setIsLoading(true);
      await requestAccess(true);
      saveUserAction(actionKey, "connect");
    } catch (err: any) {
      setIsLoading(false);
      throw new WalletError(err?.message, err?.code);
    }
  };

  const switchChain = async (chainId: chainIDs) => {
    const injectedProvider = getProvider(providerId);

    if (!injectedProvider) {
      throw new UnexpectedStateError(
        `Provider ID was never passed, current value: ${providerId}`
      );
    }
    if (!address) {
      throw new WalletDisconnectedError();
    }

    verifyChainSupported(chainId);

    try {
      // Setting `isLoading` to `true` only so that the appropriate loading indicator is shown when switching chains
      // No need to set it to `false` in the end, as the page should be reloaded anyway after a successful switch
      // (see comment above "chainChanged" handler)
      setIsLoading(true);
      await injectedProvider.request({
        method: EIPMethods.wallet_switchEthereumChain,
        params: [{ chainId: toPrefixedHex(chainId) }],
      });
    } catch (switchError: any) {
      if (switchError?.code !== CHAIN_NOT_ADDED_CODE) {
        throw new WalletError(switchError?.message, switchError?.code);
      }

      const accounts = await injectedProvider.request<string[]>({
        method: EIPMethods.eth_requestAccounts,
      });
      await addEthereumChain(injectedProvider, accounts[0], chainId);
    } finally {
      setIsLoading(false);
    }
  };

  //consolidate to one object for diff
  const providerInfo: ProviderInfo | undefined =
    chainId && address
      ? {
          logo: WALLET_METADATA[providerId].logo,
          providerId,
          chainId,
          address,
        }
      : undefined;

  //connection object to render <Connector/>
  const connection: Connection = {
    name: connectorName,
    logo: WALLET_METADATA[providerId].logo,
    installUrl: WALLET_METADATA[providerId].installUrl,
    connect,
  };

  return {
    connection,
    disconnect,
    switchChain,
    isLoading,
    providerInfo,
    supportedChains,
  };
}

function removeAllListeners(providerId: ProviderId) {
  const provider = getProvider(providerId);
  provider?.removeAllListeners && provider.removeAllListeners();
}

function prettifyId(providerId: ProviderId) {
  //e.g 'xdefi-wallet' --> 'xdefi wallet',
  const strSpaced = providerId.replace("-", " ");
  return strSpaced[0].toUpperCase() + strSpaced.slice(1);
}
