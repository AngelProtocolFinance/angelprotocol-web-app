import {
  CreateTxOptions,
  LCDClient,
  MnemonicKey,
  Wallet,
} from "@terra-money/terra.js";
import { WalletStatus } from "@terra-money/wallet-provider";
import OpenLogin from "@toruslabs/openlogin";
import { entropyToMnemonic } from "bip39";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TerraChainIDs } from "@types-lists";
import torusIcon from "assets/icons/wallets/torus.jpg";
import { terra_lcds } from "constants/urls";
import { mainnet } from "../chainOptions";
import { ConnectionProxy, WalletProxy } from "../types";

const NETWORK =
  process.env.REACT_APP_CHAIN_ID === "testnet" ? "testnet" : "mainnet";

const CHAIN_ID: TerraChainIDs =
  NETWORK === "mainnet" ? "columbus-5" : "bombay-12";

const openLogin = new OpenLogin({
  clientId: process.env.REACT_APP_WEB_3_AUTH_CLIENT_ID || "",
  network: NETWORK,
  uxMode: "popup",
});

const lcdClient = new LCDClient({
  URL: terra_lcds[CHAIN_ID],
  chainID: CHAIN_ID,
});

const TORUS_CONNECTION: ConnectionProxy = {
  identifier: "torus",
  name: "Torus",
  type: "TORUS",
  icon: torusIcon,
};

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

  const connect = useCallback(async () => {
    setStatus(WalletStatus.INITIALIZING);

    let finalStatus = WalletStatus.WALLET_NOT_CONNECTED;

    try {
      const loginResult = await openLogin.login();

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
  }, [disconnect]);

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

const createWalletProxy = (
  privateKey: string,
  connect: () => Promise<void>,
  disconnect: () => Promise<void>
) => {
  const mnemonic = entropyToMnemonic(privateKey);
  const mnemonicKey = new MnemonicKey({ mnemonic });
  const wallet = lcdClient.wallet(mnemonicKey);
  const walletProxy = convertToWalletProxy(wallet, connect, disconnect);
  return walletProxy;
};

function convertToWalletProxy(
  torusWallet: Wallet,
  connect: () => Promise<void>,
  disconnect: () => Promise<void>
): WalletProxy {
  return {
    address: torusWallet.key.accAddress,
    connection: TORUS_CONNECTION,
    network: {
      chainID: torusWallet.lcd.config.chainID,
      lcd: torusWallet.lcd.config.URL,
      name: CHAIN_ID,
    },
    connect,
    disconnect,
    post: async (txOptions: CreateTxOptions) => {
      const tx = await torusWallet.createAndSignTx(txOptions);
      const res = await torusWallet.lcd.tx.broadcast(tx);
      return {
        ...txOptions,
        result: {
          height: res.height,
          raw_log: res.raw_log,
          txhash: res.txhash,
        },
        success: true,
      };
    },
  };
}
function getAvailableWallets(
  wallet: WalletProxy | undefined,
  connect: () => Promise<void>,
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
