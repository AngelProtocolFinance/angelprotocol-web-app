import {
  CreateTxOptions,
  LCDClient,
  MnemonicKey,
  Wallet,
} from "@terra-money/terra.js";
import { WalletStatus } from "@terra-money/wallet-provider";
import OpenLogin from "@toruslabs/openlogin";
import torusIcon from "assets/icons/wallets/torus.jpg";
import { entropyToMnemonic } from "bip39";
import { chainIDs } from "constants/chainIDs";
import { terra_lcds } from "constants/urls";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Connection, WalletProxy } from "../types";
import createDefaultWallet from "./createDefaultWallet";

// TODO: would be good to set this value using the environment variables
const NETWORK =
  process.env.REACT_APP_CHAIN_ID === chainIDs.testnet ? "testnet" : "mainnet";

const openLogin = new OpenLogin({
  clientId: process.env.REACT_APP_WEB_3_AUTH_CLIENT_ID || "",
  network: NETWORK,
  uxMode: "popup",
});

const TORUS_CONNECTION: Connection = {
  identifier: "torus",
  name: "Torus",
  type: "TORUS",
  icon: torusIcon,
};

const DEFAULT_WALLET = createDefaultWallet(TORUS_CONNECTION);

type Result = {
  wallet: WalletProxy;
  status: WalletStatus;
};

export default function useTorusWallet(): Result {
  const [status, setStatus] = useState(WalletStatus.WALLET_NOT_CONNECTED);
  const [walletProxy, setWalletProxy] = useState(DEFAULT_WALLET);

  useEffect(() => {
    async function initializeOpenlogin() {
      setStatus(WalletStatus.INITIALIZING);

      await openLogin.init();

      // when using 'redirect' uxMode, this field will contain the private key value after redirect
      // NOTE: to successfully read this value, it is necessary to call this hook in the component
      // that is Torus is set to redirect to, otherwise this value would be empty
      if (openLogin.privKey) {
        const newWalletProxy = createWalletProxy(openLogin.privKey);
        setWalletProxy(newWalletProxy);
        setStatus(WalletStatus.WALLET_CONNECTED);
      } else {
        setStatus(WalletStatus.WALLET_NOT_CONNECTED);
      }
    }

    initializeOpenlogin();
  }, []);

  const connect = useCallback(async () => {
    setStatus(WalletStatus.INITIALIZING);

    const loginResult = await openLogin.login();
    if (loginResult?.privKey) {
      const newWalletProxy = createWalletProxy(loginResult.privKey);
      setWalletProxy(newWalletProxy);
      setStatus(WalletStatus.WALLET_CONNECTED);
    } else {
      setStatus(WalletStatus.WALLET_NOT_CONNECTED);
    }
  }, []);

  const disconnect = useCallback(async () => {
    await openLogin.logout();
    setWalletProxy(DEFAULT_WALLET);
    setStatus(WalletStatus.WALLET_NOT_CONNECTED);
  }, []);

  return useMemo(
    () => ({
      status,
      wallet: {
        ...walletProxy,
        connect,
        disconnect,
      },
    }),
    [walletProxy, connect, disconnect, status]
  );
}

const lcdClient = new LCDClient({
  URL: terra_lcds[chainIDs[NETWORK]],
  chainID: chainIDs[NETWORK],
});

const createWalletProxy = (privateKey: string) => {
  const mnemonic = entropyToMnemonic(privateKey);
  const mnemonicKey = new MnemonicKey({ mnemonic });
  const wallet = lcdClient.wallet(mnemonicKey);
  const walletProxy = convertToWalletProxy(wallet);
  return walletProxy;
};

function convertToWalletProxy(torusWallet: Wallet): WalletProxy {
  const networkName =
    Object.entries(chainIDs).find(
      ([_, value]) => value === torusWallet.lcd.config.chainID
    )?.[0] || "";

  return {
    ...DEFAULT_WALLET,
    address: torusWallet.key.accAddress,
    connection: TORUS_CONNECTION,
    network: {
      chainID: torusWallet.lcd.config.chainID,
      lcd: torusWallet.lcd.config.URL,
      name: networkName,
    },
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
