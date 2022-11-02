import { useState } from "react";
import { Connection, ProviderId, ProviderInfo } from "../types";
import { Dwindow } from "types/ethereum";
import { WalletError, WalletNotInstalledError } from "errors/errors";
import { IS_TEST } from "constants/env";
import { WALLET_METADATA } from "../constants";
import {
  removeConnectedProvider,
  storeConnectedProvider,
} from "../helpers/connectedProvider";
import { juno_test_chain_info } from "./chains";

const CHAIN_ID = IS_TEST ? "uni-5" : "juno-1";
const dwindow: Dwindow = window;
const PROVIDER_ID: ProviderId = "keplr";

export default function useKeplr() {
  //connect only if there's no active wallet
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState<string>("");
  const [chainId, setChainId] = useState<string>();

  // Errors handled in src/components/WalletSuite/WalletSelector/Connector.tsx
  const requestAccess = async (isNewConnection = false) => {
    try {
      if (!dwindow.keplr) return;

      if (IS_TEST) {
        await dwindow.keplr.experimentalSuggestChain(juno_test_chain_info);
      }

      await dwindow.keplr.enable(CHAIN_ID);
      const key = await dwindow.keplr.getKey(CHAIN_ID);

      setAddress(key.bech32Address);
      setChainId(CHAIN_ID);
      setIsLoading(false);
      storeConnectedProvider(PROVIDER_ID);
    } catch (err: any) {
      //if user cancels, set pref to disconnect
      setIsLoading(false);
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
      throw new WalletNotInstalledError(PROVIDER_ID);
    }

    try {
      //connecting xdefi
      setIsLoading(true);
      await requestAccess(true);
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
    removeConnectedProvider();
  }

  const providerInfo: ProviderInfo | undefined =
    address && chainId
      ? {
          logo: WALLET_METADATA.keplr.logo,
          providerId: PROVIDER_ID,
          chainId,
          address,
        }
      : undefined;

  //connection object to render <Connector/>
  const connection: Connection = {
    ...WALLET_METADATA.keplr,
    providerId: PROVIDER_ID,
    connect,
  };

  return {
    connection,
    disconnect,
    isLoading,
    providerInfo,
  };
}
