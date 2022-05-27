import { useEffect, useState } from "react";
import {
  AccountChangeHandler,
  ChainChangeHandler,
  Dwindow,
  InjectedProvider,
} from "types/ethereum";
import { EIP1193Error } from "errors/errors";
import { EIPMethods } from "constants/ethereum";
import { getProvider } from "../../helpers/getProvider";
import { providerIcons } from "./constants";
import { Connection, ProviderId, ProviderInfo } from "./types";

export default function useInjectedProvider(providerId: ProviderId) {
  const actionKey = `${providerId}__pref`;
  //connect only if there's no active wallet
  const lastAction = retrieveUserAction(actionKey);
  const shouldReconnect = lastAction === "connect";
  const [isLoading, setIsLoading] = useState(true);
  const [address, setAddress] = useState<string>();
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
      setAddress(undefined);
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
      console.error(err);
      setIsLoading(false);
      saveUserAction(actionKey, "disconnect");
    }
  };

  function disconnect() {
    if (!address) return;
    const injectedProvider = getProvider(providerId);
    if (!injectedProvider) return;
    setAddress(undefined);
    setChainId(undefined);
    saveUserAction(actionKey, "disconnect");
    removeAllListeners(providerId);
  }

  const connect = async () => {
    try {
      const dwindow = window as Dwindow;
      //connecting xdefi
      if (providerId === "xdefi") {
        if (!dwindow?.xfi) {
          throw new EIP1193Error("Xdefi is not installed", 0);
        }
        if (!dwindow?.xfi?.ethereum?.isMetaMask) {
          throw new EIP1193Error(
            "Kindly prioritize Xdefi and reload the page",
            0
          );
        }
        //connecting other wallet
      } else {
        if (dwindow?.xfi?.ethereum?.isMetaMask) {
          throw new EIP1193Error(
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
      throw new EIP1193Error(
        err?.message || "Unknown error occured",
        err?.code || 0
      );
    }
  };

  //consolidate to one object for diff
  const providerInfo: ProviderInfo = {
    logo: providerIcons[providerId],
    providerId,
    chainId: chainId || "",
    address: address || "",
  };

  //connection object to render <Connector/>
  const connection: Connection = {
    name: providerId.replace("-", " "),
    logo: providerIcons[providerId],
    connect,
  };

  return {
    connection,
    disconnect,
    isLoading,
    providerInfo: (address && providerInfo) || undefined,
  };
}

/***** */

type Action = "connect" | "disconnect";
function saveUserAction(key: string, action: Action) {
  localStorage.setItem(key, action);
}

function retrieveUserAction(key: string): Action {
  return (localStorage.getItem(key) as Action) || "disconnect";
}

function removeAllListeners(providerId: ProviderId) {
  const provider = getProvider(providerId);
  provider?.removeAllListeners && provider.removeAllListeners();
}

//notes: 1 accountChange handler run only on first connect [] --> [something]
//and revocation of permission [something] --> []
