import { useEffect, useState } from "react";
import { Connection, ProviderId, ProviderInfo } from "./types";
import {
  AccountChangeHandler,
  ChainChangeHandler,
  Dwindow,
  InjectedProvider,
} from "types/ethereum";
import checkXdefiPriority from "helpers/checkXdefiPriority";
import { getProvider } from "helpers/getProvider";
import logger from "helpers/logger";
import { WalletError } from "errors/errors";
import { EIPMethods } from "constants/ethereum";
import { providerIcons } from "./constants";
import { retrieveUserAction, saveUserAction } from "./helpers/prefActions";

export default function useInjectedProvider(
  providerId: Extract<ProviderId, "metamask" | "binance-wallet" | "xdefi-evm">,
  connectorLogo?: string,
  connectorName?: string
) {
  const actionKey = `${providerId}__pref`;
  //connect only if there's no active wallet
  const lastAction = retrieveUserAction(actionKey);
  const shouldReconnect = lastAction === "connect";
  const [isLoading, setIsLoading] = useState(true);
  const [address, setAddress] = useState<string>("");
  const [chainId, setChainId] = useState<string>();

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
      saveUserAction(actionKey, "disconnect");
      removeAllListeners(providerId);
    }
  };

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

        setAddress(accounts[0]);
        setChainId(`${parseInt(hexChainId, 16)}`);
      }
      setIsLoading(false);
    } catch (err) {
      //if user cancels, set pref to disconnect
      logger.error(err);
      setIsLoading(false);
      saveUserAction(actionKey, "disconnect");
      if (isNewConnection) {
        //if connection is made via "connect-button"
        throw err;
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
    try {
      const dwindow = window as Dwindow;

      if (!getProvider(providerId)) {
        throw new WalletError(`${prettifyId(providerId)} is not installed`, 0);
      }
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
      await requestAccess(true);
      saveUserAction(actionKey, "connect");
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
          logo: providerIcons[providerId],
          providerId,
          chainId,
          address,
        }
      : undefined;

  //connection object to render <Connector/>
  const connection: Connection = {
    name: connectorName ?? prettifyId(providerId),
    logo: connectorLogo ?? providerIcons[providerId],
    connect,
  };

  return {
    connection,
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
  //e.g xdefi-wallet,
  return providerId.replace("-", " ");
}
