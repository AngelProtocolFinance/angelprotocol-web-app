import { useEffect, useState } from "react";
import { Connection, ProviderInfo } from "../types";
import { BaseChain } from "types/aws";
import { Dwindow } from "types/ethereum";
import {
  UnsupportedChainError,
  WalletError,
  WalletNotInstalledError,
} from "errors/errors";
import { chainIDs } from "constants/chains";
import { IS_TEST } from "constants/env";
import { WALLET_METADATA } from "../constants";
import { retrieveUserAction, saveUserAction } from "../helpers";
import { juno_test_chain_info } from "./chains";

const SUPPORTED_CHAINS: BaseChain[] = IS_TEST
  ? [
      { chain_id: chainIDs.junoTest, chain_name: "Juno Testnet" },
      // { chain_id: chainIDs.terraTest, chain_name: "Terra Testnet" },
    ]
  : [
      { chain_id: chainIDs.junoMain, chain_name: "Juno Mainnet" },
      // { chain_id: chainIDs.terraMain, chain_name: "Terra Mainnet" },
    ];

const CHAIN_ID = IS_TEST ? chainIDs.junoTest : chainIDs.junoMain;
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
    (shouldReconnect && requestAccess(CHAIN_ID)) || setIsLoading(false);
    // eslint-disable-next-line
  }, []);

  const requestAccess = async (chainId: chainIDs, isNewConnection = false) => {
    try {
      if (!dwindow.keplr) return;

      if (!SUPPORTED_CHAINS.some((x) => x.chain_id === chainId)) {
        throw new UnsupportedChainError(chainId);
      }

      if (chainId === juno_test_chain_info.chainId) {
        await dwindow.keplr.experimentalSuggestChain(juno_test_chain_info);
      }

      await dwindow.keplr.enable(chainId);
      const key = await dwindow.keplr.getKey(chainId);

      setAddress(key.bech32Address);
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
    if (!dwindow.keplr) {
      throw new WalletNotInstalledError("keplr");
    }

    try {
      //connecting xdefi
      setIsLoading(true);
      await requestAccess(CHAIN_ID, true);
      saveUserAction(actionKey, "connect");
    } catch (err: any) {
      setIsLoading(false);
      throw new WalletError(err?.message, err?.code || 0);
    }
  };

  function disconnect() {
    if (!address) return;
    setAddress("");
    setChainId(undefined);
    saveUserAction(actionKey, "disconnect");
  }

  const switchChain = async (chainId: chainIDs) => {
    if (!dwindow.keplr) {
      throw new WalletNotInstalledError("keplr");
    }

    try {
      setIsLoading(true);
      await requestAccess(chainId, true);
    } catch (err: any) {
      setIsLoading(false);
      throw new WalletError(err?.message, err?.code || 0);
    }
  };

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
    switchChain,
    isLoading,
    providerInfo,
    supportedChains: SUPPORTED_CHAINS,
  };
}
