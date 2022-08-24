import { useEffect, useState } from "react";
import { Connection, Wallet, WalletId } from "../types";
import {
  AccountChangeHandler,
  ChainChangeHandler,
  Dwindow,
  InjectedProvider,
} from "types/ethereum";
import { getProvider, logger } from "helpers";
import { WalletError } from "errors/errors";
import { EIPMethods } from "constants/ethereum";
import { providerIcons } from "../constants";
import checkXdefiPriority from "./helpers/checkXdefiPriority";
import { retrieveUserAction, saveUserAction } from "./helpers/prefActions";

export default function useInjectedProvider(
  id: Extract<WalletId, "metamask" | "binance-wallet" | "xdefi-evm">,
  connectorLogo?: string,
  connectorName?: string
) {
  const actionKey = `${id}__pref`;
  //connect only if there's no active wallet
  const lastAction = retrieveUserAction(actionKey);
  const shouldReconnect = lastAction === "connect";
  const [isLoading, setIsLoading] = useState(true);
  const [address, setAddress] = useState<string>("");
  const [chainId, setChainId] = useState<string>();

  useEffect(() => {
    requestAccess();
    return () => {
      removeAllListeners(id);
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
      removeAllListeners(id);
    }
  };

  const requestAccess = async (isNewConnection = false) => {
    try {
      const injectedProvider = getProvider(id);
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
    } catch (err: any) {
      //if user cancels, set pref to disconnect
      logger.error(err);
      setIsLoading(false);
      saveUserAction(actionKey, "disconnect");
      if (isNewConnection) {
        //if connection is made via "connect-button"
        // Error handled in src/components/WalletSuite/WalletSelector/Connector.tsx
        throw new WalletError(
          err.message || "Unknown error occured",
          err.code || 0
        );
      }
    }
  };

  function disconnect() {
    if (!address) return;
    const injectedProvider = getProvider(id);
    if (!injectedProvider) return;
    setAddress("");
    setChainId(undefined);
    saveUserAction(actionKey, "disconnect");
    removeAllListeners(id);
  }

  // Errors handled in src/components/WalletSuite/WalletSelector/Connector.tsx
  const connect = async () => {
    try {
      const dwindow = window as Dwindow;

      if (!getProvider(id)) {
        throw new WalletError(`${prettifyId(id)} is not installed`, 0);
      }
      //connecting xdefi
      if (id === "xdefi-evm") {
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
  const wallet: Wallet | undefined =
    chainId && address
      ? {
          logo: providerIcons[id],
          id,
          chainId,
          address,
        }
      : undefined;

  //connection object to render <Connector/>
  const connection: Connection = {
    name: connectorName ?? prettifyId(id),
    logo: connectorLogo ?? providerIcons[id],
    connect,
  };

  return {
    connection,
    disconnect,
    isLoading,
    wallet,
  };
}

function removeAllListeners(id: WalletId) {
  const provider = getProvider(id);
  provider?.removeAllListeners && provider.removeAllListeners();
}

function prettifyId(id: WalletId) {
  //e.g xdefi-wallet,
  return id.replace("-", " ");
}
