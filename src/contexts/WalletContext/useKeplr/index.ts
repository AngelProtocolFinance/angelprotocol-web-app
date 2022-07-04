import { useEffect, useState } from "react";
import { Connection, ProviderInfo } from "../types";
import { Dwindow } from "types/ethereum";
import { WalletError } from "errors/errors";
import { chainIDs } from "constants/chainIDs";
import { IS_TEST } from "constants/env";
import { providerIcons } from "../constants";
import { retrieveUserAction, saveUserAction } from "../helpers/prefActions";
import { juno_test } from "./chains";

const actionKey = `keplr__pref`;
const dwindow: Dwindow = window;
export default function useKeplr() {
  //connect only if there's no active wallet
  const lastAction = retrieveUserAction(actionKey);
  const shouldReconnect = lastAction === "connect";
  const [isLoading, setIsLoading] = useState(true);
  const [address, setAddress] = useState<string>();
  const [chainId, setChainId] = useState<string>();

  useEffect(() => {
    (shouldReconnect && requestAccess()) || setIsLoading(false);
    //eslint-disable-next-line
  }, []);

  const requestAccess = async (isNewConnection = false) => {
    try {
      if (!dwindow.keplr) return;

      let address: string;
      let chainId: string;

      if (IS_TEST) {
        chainId = juno_test.chainId;
        await dwindow.keplr.experimentalSuggestChain(juno_test);
      } else {
        chainId = chainIDs.juno_main;
      }

      await dwindow.keplr.enable(chainId);
      const key = await dwindow.keplr.getKey(chainId);
      address = key.bech32Address;

      setAddress(address);
      setChainId(chainId);
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
    try {
      const dwindow = window as Dwindow;
      if (!dwindow.keplr) {
        throw new WalletError("Keplr is not installed", 0);
      }
      //connecting xdefi
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

  function disconnect() {
    if (!address) return;
    setAddress(undefined);
    setChainId(undefined);
    saveUserAction(actionKey, "disconnect");
  }

  const providerInfo: ProviderInfo = {
    logo: providerIcons.keplr,
    providerId: "keplr",
    chainId: chainId || chainIDs.juno_main,
    address: address || "",
  };

  //connection object to render <Connector/>
  const connection: Connection = {
    name: "Keplr",
    logo: providerIcons.keplr,
    connect,
  };

  return {
    connection,
    disconnect,
    isLoading,
    providerInfo: (address && providerInfo) || undefined,
  };
}
