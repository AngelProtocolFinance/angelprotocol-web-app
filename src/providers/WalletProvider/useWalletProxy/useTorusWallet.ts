import { LCDClient, MnemonicKey, Wallet } from "@terra-money/terra.js";
import { WalletStatus } from "@terra-money/wallet-provider";
import OpenLogin from "@toruslabs/openlogin";
import { entropyToMnemonic } from "bip39";
import { chainIDs } from "constants/chainIDs";
import { terra_lcds } from "constants/urls";
import { useCallback, useEffect, useState } from "react";
import { useGetter } from "store/accessors";

// TODO: would be good to set this value using the environment variables
const NETWORK = "testnet";

const openLogin = new OpenLogin({
  clientId: process.env.REACT_APP_WEB_3_AUTH_CLIENT_ID || "",
  network: NETWORK,
  uxMode: "popup",
});

const lcdClient = new LCDClient({
  URL: terra_lcds[chainIDs[NETWORK]],
  chainID: chainIDs[NETWORK],
});

export default function useTorusWallet() {
  const user = useGetter((state) => state.user);
  const [status, setStatus] = useState<WalletStatus>(
    WalletStatus.WALLET_NOT_CONNECTED
  );
  const [wallet, setWallet] = useState<Wallet>();

  const handleCreateWallet = useCallback((entropy: string) => {
    const mnemonic = entropyToMnemonic(entropy);
    const mnemonicKey = new MnemonicKey({ mnemonic });
    const newWallet = lcdClient.wallet(mnemonicKey);
    setWallet(newWallet);
  }, []);

  useEffect(() => {
    async function initializeOpenlogin() {
      setStatus(WalletStatus.INITIALIZING);

      await openLogin.init();

      // when using 'redirect' uxMode, this field will contain the private key value after redirect
      // NOTE: to successfully read this value, it is necessary to call this hook in the component
      // that is Torus is set to redirect to, otherwise this value would be empty
      if (openLogin.privKey) {
        handleCreateWallet(openLogin.privKey);
        setStatus(WalletStatus.WALLET_CONNECTED);
      } else {
        setStatus(WalletStatus.WALLET_NOT_CONNECTED);
      }
    }

    initializeOpenlogin();
    // eslint-disable-next-line
  }, []);

  const connect = useCallback(async () => {
    setStatus(WalletStatus.INITIALIZING);

    const loginResult = await openLogin.login({
      extraLoginOptions: {
        login_hint: user.Email,
      },
    });
    if (loginResult?.privKey) {
      handleCreateWallet(loginResult.privKey);
      setStatus(WalletStatus.WALLET_CONNECTED);
    } else {
      setStatus(WalletStatus.WALLET_NOT_CONNECTED);
    }
  }, [user.Email, handleCreateWallet]);

  const disconnect = useCallback(async () => {
    await openLogin.logout();
    setWallet(undefined);
    setStatus(WalletStatus.WALLET_NOT_CONNECTED);
  }, []);

  return {
    wallet,
    status,
    connect,
    disconnect,
  };
}
