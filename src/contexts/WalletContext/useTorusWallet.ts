import { LCDClient, MnemonicKey, Wallet } from "@terra-money/terra.js";
import OpenLogin from "@toruslabs/openlogin";
import { entropyToMnemonic } from "bip39";
import { useCallback, useEffect, useState } from "react";
import { Connection, ProviderInfo } from "./types";
import { IS_DEV, terraChainId } from "constants/env";
import { terra_lcds } from "constants/urls";
import { providerIcons } from "./constants";
import { retrieveUserAction } from "./helpers/prefActions";

const openLogin = new OpenLogin({
  clientId: process.env.REACT_APP_WEB_3_AUTH_CLIENT_ID || "",
  network: IS_DEV ? "testnet" : "mainnet",
  uxMode: "popup",
});

const lcdClient = new LCDClient({
  URL: terra_lcds[terraChainId],
  chainID: terraChainId,
});

const actionKey = `torus__pref`;
export default function useTorusWallet() {
  const [isLoading, setIsLoading] = useState(true);
  //connect only if there's no active wallet
  const lastAction = retrieveUserAction(actionKey);
  const shouldReconnect = lastAction === "connect";
  const [wallet, setWallet] = useState<Wallet>();

  useEffect(() => {
    (async () => {
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
          setWallet(createWalletPrivateKey(openLogin.privKey));
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [shouldReconnect]);

  const connect = useCallback(async (loginProvider?: string) => {
    setIsLoading(true);

    try {
      const loginResult = loginProvider
        ? await openLogin.login({ loginProvider })
        : await openLogin.login();

      if (loginResult?.privKey) {
        setWallet(createWalletPrivateKey(loginResult.privKey));
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
      setWallet(undefined);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // async function post(txOptions: CreateTxOptions): Promise<TxResult> {
  //   if (!wallet) throw new WalletDisconnectError();
  //   const tx = await wallet?.createAndSignTx(txOptions);
  //   const res = await wallet.lcd.tx.broadcast(tx);
  //   return {
  //     ...txOptions,
  //     result: {
  //       height: res.height,
  //       raw_log: res.raw_log,
  //       txhash: res.txhash,
  //     },
  //     success: true,
  //   };
  // }

  const providerInfo: ProviderInfo = {
    logo: providerIcons.torus,
    providerId: "torus",
    chainId: wallet?.lcd.config.chainID || "",
    address: wallet?.key.accAddress || "",
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
    torusInfo: wallet ? providerInfo : undefined,
  };
}

function createWalletPrivateKey(privKey: string): Wallet {
  const mnemonic = entropyToMnemonic(privKey);
  const mnemonicKey = new MnemonicKey({ mnemonic });
  return lcdClient.wallet(mnemonicKey);
}
