import { useEffect, useState } from "react";
import { Connection, ProviderInfo } from "../types";
import { Dwindow } from "types/ethereum";
import { WalletError, WalletNotInstalledError } from "errors/errors";
import { chainIds } from "constants/chainIds";
import { IS_TEST } from "constants/env";
import { WALLET_METADATA } from "../constants";
import { retrieveUserAction, saveUserAction } from "../helpers/prefActions";
import { juno_test_chain_info } from "./chains";

const CHAIN_ID = IS_TEST ? "uni-5" : "juno-1";
const actionKey = `keplr__pref`;
const dwindow: Dwindow = window;

export default function useKeplr() {
  //connect only if there's no active wallet
  const lastAction = retrieveUserAction(actionKey);
  const shouldReconnect = lastAction === "connect";
  const [isLoading, setIsLoading] = useState(true);
  const [address, setAddress] = useState<string>("");
  const [chainId, setChainId] = useState<string>();

  useEffect(() => {
    (shouldReconnect && requestAccess()) || setIsLoading(false);
    //eslint-disable-next-line
  }, []);

  // Errors handled in src/components/WalletSuite/WalletSelector/Connector.tsx
  const requestAccess = async (isNewConnection = false) => {
    try {
      if (!dwindow.keplr) return;

      if (IS_TEST) {
        await dwindow.keplr.experimentalSuggestChain(juno_test_chain_info);
      }

      await dwindow.keplr.enable(chainIds.juno);
      const key = await dwindow.keplr.getKey(chainIds.juno);

      setAddress(key.bech32Address);
      setChainId(chainIds.juno);
      setIsLoading(false);
    } catch (err: any) {
      //if user cancels, set pref to disconnect
      setIsLoading(false);
      saveUserAction(actionKey, "disconnect");
      if (isNewConnection) {
        if (/key/.test(err?.message)) {
          throw new WalletError("Your Keplr account is not logged in", 0);
        }
        //if connection is made via "connect-button"
        throw err;
      }
    }
  };

  const connect = async () => {
    if (!dwindow.keplr) {
      throw new WalletNotInstalledError("keplr");
    }

    try {
      //connecting xdefi
      setIsLoading(true);
      await requestAccess(true);
      saveUserAction(actionKey, "connect");
    } catch (err: any) {
      setIsLoading(false);
      // Error handled in src/components/WalletSuite/WalletSelector/Connector.tsx
      throw new WalletError(
        err?.message || "Unknown error occured",
        err?.code || 0
      );
    }
  };

  function disconnect() {
    if (!address) return;
    setAddress("");
    setChainId(undefined);
    saveUserAction(actionKey, "disconnect");
  }

  const providerInfo: ProviderInfo | undefined =
    address && chainId
      ? {
          logo: WALLET_METADATA.keplr.logo,
          providerId: "keplr",
          chainId,
          address,
        }
      : undefined;

  //connection object to render <Connector/>
  const connection: Connection = { ...WALLET_METADATA.keplr, connect };

  return {
    connection,
    disconnect,
    isLoading,
    providerInfo,
  };
}
