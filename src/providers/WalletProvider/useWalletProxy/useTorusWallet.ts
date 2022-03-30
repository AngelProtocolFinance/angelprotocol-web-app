import { MnemonicKey, Wallet } from "@terra-money/terra.js";
import { useLCDClient, WalletStatus } from "@terra-money/wallet-provider";
import OpenLogin from "@toruslabs/openlogin";
import { entropyToMnemonic } from "bip39";
import { useCallback, useEffect, useState } from "react";
import { useGetter } from "store/accessors";

const openLogin = new OpenLogin({
  clientId: process.env.REACT_APP_WEB_3_AUTH_CLIENT_ID || "",
  network: "testnet",
});

export default function useTorusWallet() {
  const user = useGetter((state) => state.user);
  const [status, setStatus] = useState<WalletStatus>(
    WalletStatus.WALLET_NOT_CONNECTED
  );
  const [wallet, setWallet] = useState<Wallet>();
  const lcd = useLCDClient();

  const handleCreateWallet = useCallback(
    (entropy: string) => {
      const mnemonic = entropyToMnemonic(entropy);
      const mnemonicKey = new MnemonicKey({ mnemonic });
      const newWallet = lcd.wallet(mnemonicKey);

      setWallet(newWallet);
    },
    [lcd]
  );

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

    const loginParams = {
      relogin: true,
      extraLoginOptions: {
        login_hint: user.Email,
      },
    };

    const loginResult = await openLogin.login(loginParams);
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
