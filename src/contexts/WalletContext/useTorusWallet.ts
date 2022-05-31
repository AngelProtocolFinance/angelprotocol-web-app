import { LCDClient, MnemonicKey, Wallet } from "@terra-money/terra.js";
import OpenLogin from "@toruslabs/openlogin";
import { entropyToMnemonic } from "bip39";
import { useCallback, useEffect, useState } from "react";
import { Connection, ProviderInfo } from "./types";
import { chainIDs } from "constants/chainIDs";
import { terra_lcds } from "constants/urls";
import { providerIcons } from "./constants";
import { retrieveUserAction } from "./helpers/prefActions";

const isDevelopment = process.env.NODE_ENV === "development";
const openLogin = new OpenLogin({
  clientId: process.env.REACT_APP_WEB_3_AUTH_CLIENT_ID || "",
  network: isDevelopment ? "testnet" : "mainnet",
  uxMode: "popup",
});

const chainId = isDevelopment ? chainIDs.terra_test : chainIDs.terra_main;
const lcdClient = new LCDClient({
  URL: terra_lcds[chainId],
  chainID: chainId,
});

export default function useTorusWallet() {
  const [isLoading, setIsLoading] = useState(true);
  const actionKey = `torus__pref`;
  //connect only if there's no active wallet
  const lastAction = retrieveUserAction(actionKey);
  const shouldReconnect = lastAction === "connect";
  const [address, setAddress] = useState<string>();
  const [chainId, setChainId] = useState<string>();

  useEffect(() => {
    async () => {
      if (!shouldReconnect) {
        setIsLoading(false);
        return;
      }
      try {
        await openLogin.init();

        // when using 'redirect' uxMode, this field will contain the private key value after redirect
        // NOTE: to successfully read this value, it is necessary to call this hook in the component
        // that is Torus is set to redirect to, otherwise this value would be empty
        if (openLogin.privKey) {
          const wallet = createWalletPrivateKey(openLogin.privKey);
          setAddress(wallet.key.accAddress);
          setChainId(wallet.lcd.config.chainID);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
  }, []);

  const connect = useCallback(async (loginProvider?: string) => {
    setIsLoading(true);

    try {
      const loginResult = loginProvider
        ? await openLogin.login({ loginProvider })
        : await openLogin.login();

      if (loginResult?.privKey) {
        const wallet = createWalletPrivateKey(loginResult.privKey);
        setAddress(wallet.key.accAddress);
        setChainId(wallet.lcd.config.chainID);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const disconnect = useCallback(async () => {
    setIsLoading(true);
    try {
      await openLogin.logout();
      setAddress(undefined);
      setChainId(undefined);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const providerInfo: ProviderInfo = {
    logo: providerIcons.torus,
    providerId: "torus",
    chainId: chainId || "",
    address: address || "",
  };

  //connection object to render <Connector/>
  const connection: Connection = {
    name: "Torus",
    logo: providerIcons.torus,
    connect,
  };

  return {
    torusConnection: connection,
    disconnectTorus: disconnect,
    isTorusLoading: isLoading,
    torusInfo: (address && providerInfo) || undefined,
  };
}

function createWalletPrivateKey(privKey: string): Wallet {
  const mnemonic = entropyToMnemonic(privKey);
  const mnemonicKey = new MnemonicKey({ mnemonic });
  return lcdClient.wallet(mnemonicKey);
}
