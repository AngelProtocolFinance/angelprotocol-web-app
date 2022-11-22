import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Connection, ProviderId, ProviderInfo } from "./types";
import { BaseChain } from "types/aws";
import {
  AccountChangeHandler,
  ChainChangeHandler,
  Dwindow,
  InjectedProvider,
} from "types/ethereum";
import { getProvider, logger } from "helpers";
import {
  UnexpectedStateError,
  UnsupportedNetworkError,
  WalletDisconnectedError,
  WalletError,
  WalletNotInstalledError,
} from "errors/errors";
import { chainIDs } from "constants/chains";
import { EIPMethods } from "constants/ethereum";
import { WALLET_METADATA } from "./constants";
import checkXdefiPriority from "./helpers/checkXdefiPriority";
import { retrieveUserAction, saveUserAction } from "./helpers/prefActions";
import { useAddEthereumChain, useSetSupportedChains } from "./hooks";

const SUPPORTED_CHAIN_IDS = [chainIDs.ethMain, chainIDs.ethTest];

const SUPPORTED_CHAINS: BaseChain[] = SUPPORTED_CHAIN_IDS.map((chain_id) => ({
  chain_id,
  chain_name: chain_id,
}));

export default function useInjectedProvider(
  providerId: Extract<ProviderId, "metamask" | "xdefi-evm">, // "binance-wallet" |
  connectorName = prettifyId(providerId),
  connectorLogo?: string
) {
  const actionKey = `${providerId}__pref`;
  //connect only if there's no active wallet
  const lastAction = retrieveUserAction(actionKey);
  const shouldReconnect = lastAction === "connect";
  const [isLoading, setIsLoading] = useState(true);
  const [address, setAddress] = useState<string>("");
  const [chainId, setChainId] = useState<string>();
  const [supportedChains, setSupportedChains] = useState(SUPPORTED_CHAINS);

  const addEthereumChain = useAddEthereumChain();

  useEffect(() => {
    SUPPORTED_CHAIN_IDS.forEach((suppChainId) => {
      if (!ethers.providers.getNetwork(Number(suppChainId))) {
        throw new UnexpectedStateError(
          `${suppChainId} not supported by ethers providers`
        );
      }
    });
  }, []);

  useEffect(() => {
    requestAccess();
    return () => {
      removeAllListeners(providerId);
    };
    //eslint-disable-next-line
  }, []);

  useSetSupportedChains(SUPPORTED_CHAIN_IDS, setSupportedChains);

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

        const parsedChainId = `${parseInt(hexChainId, 16)}`;
        if (
          !SUPPORTED_CHAIN_IDS.includes(parsedChainId as unknown as chainIDs)
        ) {
          throw new UnsupportedNetworkError(parsedChainId);
        }
        setAddress(accounts[0]);
        setChainId(parsedChainId);
      }
      setIsLoading(false);
    } catch (err: any) {
      //if user cancels, set pref to disconnect
      logger.error(err);
      setIsLoading(false);
      saveUserAction(actionKey, "disconnect");
      removeAllListeners(providerId);

      if (err instanceof UnsupportedNetworkError) {
        throw err;
      }
      if (isNewConnection) {
        //if connection is made via "connect-button"
        throw new WalletError(
          err.message || "Unknown error occured",
          err.code || 0
        );
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
    if (!SUPPORTED_CHAIN_IDS.includes(chainId)) {
      throw new UnsupportedNetworkError(chainId);
    }

    try {
      setIsLoading(true);
      await injectedProvider.request({
        method: EIPMethods.wallet_switchEthereumChain,
        params: [{ chainId }],
      });
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError?.code !== 4902) {
        throw new WalletError(
          switchError?.message || "Unknown error occured",
          switchError?.code || 0
        );
      }

      await addEthereumChain(injectedProvider, chainId);
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
    logo: connectorLogo ?? WALLET_METADATA[providerId].logo,
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
