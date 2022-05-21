import { CreateTxOptions } from "@terra-money/terra.js";
import { WalletStatus } from "@terra-money/wallet-provider";
import OpenLogin from "@toruslabs/openlogin";
import { useCallback, useEffect, useMemo, useState } from "react";
import { WalletProxy } from "../types";
import { NETWORK, TORUS_CONNECTION } from "./types";
import { mainnet } from "../chainOptions";
import createWalletProxy from "./createWalletProxy";

const openLogin = new OpenLogin({
  clientId: process.env.REACT_APP_WEB_3_AUTH_CLIENT_ID || "",
  network: NETWORK,
  uxMode: "popup",
});

type Result = {
  availableWallets: WalletProxy[];
  wallet: WalletProxy | undefined;
  status: WalletStatus;
};

export default function useTorusWallet(): Result {
  const [status, setStatus] = useState(WalletStatus.WALLET_NOT_CONNECTED);
  const [walletProxy, setWalletProxy] = useState<WalletProxy | undefined>();

  const disconnect = useCallback(async () => {
    setStatus(WalletStatus.INITIALIZING);

    try {
      await openLogin.logout();
      setWalletProxy(undefined);
    } catch (err) {
      console.log(err);
    } finally {
      setStatus(WalletStatus.WALLET_NOT_CONNECTED);
    }
  }, []);

  const connect = useCallback(
    async (loginProvider: string) => {
      setStatus(WalletStatus.INITIALIZING);

      let finalStatus = WalletStatus.WALLET_NOT_CONNECTED;

      try {
        const loginResult = !!loginProvider
          ? await openLogin.login({ loginProvider })
          : await openLogin.login();

        if (loginResult?.privKey) {
          const newWalletProxy = createWalletProxy(
            loginResult.privKey,
            connect,
            disconnect
          );
          setWalletProxy(newWalletProxy);
          finalStatus = WalletStatus.WALLET_CONNECTED;
        }
      } catch (err) {
        console.log(err);
      } finally {
        setStatus(finalStatus);
      }
    },
    [disconnect]
  );

  useEffect(() => {
    async function initializeOpenlogin() {
      setStatus(WalletStatus.INITIALIZING);

      let finalStatus = WalletStatus.WALLET_NOT_CONNECTED;

      try {
        await openLogin.init();

        // when using 'redirect' uxMode, this field will contain the private key value after redirect
        // NOTE: to successfully read this value, it is necessary to call this hook in the component
        // that is Torus is set to redirect to, otherwise this value would be empty
        if (openLogin.privKey) {
          const newWalletProxy = createWalletProxy(
            openLogin.privKey,
            connect,
            disconnect
          );
          setWalletProxy(newWalletProxy);
          finalStatus = WalletStatus.WALLET_CONNECTED;
        }
      } catch (err) {
        console.log(err);
      } finally {
        setStatus(finalStatus);
      }
    }

    initializeOpenlogin();
  }, [connect, disconnect]);

  return useMemo(() => {
    const availableWallets = getAvailableWallets(
      walletProxy,
      connect,
      disconnect
    );
    return {
      status,
      availableWallets,
      wallet: walletProxy,
    };
  }, [walletProxy, connect, disconnect, status]);
}

function getAvailableWallets(
  wallet: WalletProxy | undefined,
  connect: (loginProvider: string) => Promise<void>,
  disconnect: () => Promise<void>
) {
  return wallet
    ? [wallet]
    : [
        {
          address: "",
          connection: TORUS_CONNECTION,
          network: mainnet,
          post: (_: CreateTxOptions) => {
            throw Error("Not initialized");
          },
          connect,
          disconnect,
        },
      ];
}
