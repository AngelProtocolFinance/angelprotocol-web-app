import {
  CreateTxOptions,
  LCDClient,
  MnemonicKey,
  Wallet,
} from "@terra-money/terra.js";
import { entropyToMnemonic } from "bip39";
import { chainIDs } from "constants/chainIDs";
import { terra_lcds } from "constants/urls";
import { WalletProxy } from "../types";
import { NETWORK, TORUS_CONNECTION } from "./types";

const lcdClient = new LCDClient({
  URL: terra_lcds[chainIDs[NETWORK]],
  chainID: chainIDs[NETWORK],
});

export default function createWalletProxy(
  privateKey: string,
  connect: (loginProvider: string) => Promise<void>,
  disconnect: () => Promise<void>
) {
  const mnemonic = entropyToMnemonic(privateKey);
  const mnemonicKey = new MnemonicKey({ mnemonic });
  const wallet = lcdClient.wallet(mnemonicKey);
  const walletProxy = convertToWalletProxy(wallet, connect, disconnect);
  return walletProxy;
}

function convertToWalletProxy(
  torusWallet: Wallet,
  connect: (loginProvider: string) => Promise<void>,
  disconnect: () => Promise<void>
): WalletProxy {
  const networkName =
    Object.entries(chainIDs).find(
      ([_, value]) => value === torusWallet.lcd.config.chainID
    )?.[0] || "";

  return {
    address: torusWallet.key.accAddress,
    connection: TORUS_CONNECTION,
    network: {
      chainID: torusWallet.lcd.config.chainID,
      lcd: torusWallet.lcd.config.URL,
      name: networkName,
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
