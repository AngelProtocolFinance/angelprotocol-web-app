import { useState } from "react";
import { Connection, ProviderId, ProviderInfo, WalletData } from "./types";
import {
  AccountChangeHandler,
  ChainChangeHandler,
  Dwindow,
  InjectedProvider,
} from "types/ethereum";
import { getProvider, logger } from "helpers";
import { WalletError, WalletNotInstalledError } from "errors/errors";
import { EIPMethods } from "constants/ethereum";
import { WALLET_METADATA } from "./constants";
import checkXdefiPriority from "./helpers/checkXdefiPriority";
import {
  removeConnectedProvider,
  storeConnectedProvider,
} from "./helpers/connectedProvider";

export default function useInjectedProvider(
  providerId: Extract<ProviderId, "metamask" | "xdefi-evm">, // "binance-wallet" |
  connectorName = prettifyId(providerId),
  connectorLogo?: string
): WalletData {
  //connect only if there's no active wallet
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState<string>("");
  const [chainId, setChainId] = useState<string>();

  /** attachers/detachers */
  const attachChainChangedHandler = (provider: InjectedProvider) => {
    provider.on("chainChanged", handleChainChange);
  };

  const attachAccountChangeHandler = (provider: InjectedProvider) => {
    provider.on("accountsChanged", handleAccountsChange);
  };

  /** event handlers */
  const handleChainChange: ChainChangeHandler = (hexChainId) => {
    setChainId(`${parseInt(hexChainId, 16)}`);
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
      removeAllListeners(providerId);
    }
  };

  const requestAccess = async () => {
    try {
      const injectedProvider = getProvider(providerId);
      if (injectedProvider && !address) {
        attachAccountChangeHandler(injectedProvider);
        attachChainChangedHandler(injectedProvider);

        const accounts = await injectedProvider.request<string[]>({
          method: EIPMethods.eth_requestAccounts,
        });
        const hexChainId = await injectedProvider.request<string>({
          method: EIPMethods.eth_chainId,
        });

        setAddress(accounts[0]);
        setChainId(`${parseInt(hexChainId, 16)}`);
        storeConnectedProvider(providerId);
      }
      setIsLoading(false);
    } catch (err: any) {
      //if user cancels, set pref to disconnect
      logger.error(err);
      setIsLoading(false);
      //if connection is made via "connect-button"
      // Error handled in src/components/WalletSuite/WalletSelector/Connector.tsx
      throw new WalletError(
        err.message || "Unknown error occured",
        err.code || 0
      );
    }
  };

  function disconnect() {
    if (!address) return;
    const injectedProvider = getProvider(providerId);
    if (!injectedProvider) return;
    setAddress("");
    setChainId(undefined);
    removeAllListeners(providerId);
    removeConnectedProvider();
  }

  // Errors handled in src/components/WalletSuite/WalletSelector/Connector.tsx
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
            "Kindly remove priority to xdefi and reload the page",
            0
          );
        }
      }

      setIsLoading(true);
      await requestAccess();
    } catch (err: any) {
      setIsLoading(false);
      throw new WalletError(
        err?.message || "Unknown error occured",
        err?.code || 0
      );
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
  const connections: Connection[] = [
    {
      name: connectorName,
      logo: connectorLogo ?? WALLET_METADATA[providerId].logo,
      installUrl: WALLET_METADATA[providerId].installUrl,
      providerId,
      connect,
    },
  ];

  return {
    connections,
    disconnect,
    isLoading,
    providerInfo,
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
