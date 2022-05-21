import {
  CreateTxOptions,
  LCDClient,
  MnemonicKey,
  Wallet,
} from "@terra-money/terra.js";
import { entropyToMnemonic } from "bip39";
import { WalletProxy } from "../types";
import { NETWORK, TORUS_CONNECTION } from "./types";
import { chainIDs } from "constants/chainIDs";
import { terra_lcds } from "constants/urls";

const CHAIN_ID =
  NETWORK === "testnet" ? chainIDs.terra_test : chainIDs.terra_main;
const lcdClient = new LCDClient({
  URL: terra_lcds[CHAIN_ID],
  chainID: CHAIN_ID,
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
  console.log(torusWallet);
  const network =
    torusWallet.lcd.config.chainID === chainIDs.testnet
      ? //"testnet" --> "bombay-12" : "columbus-5"
        chainIDs.terra_test
      : chainIDs.terra_main;

  return {
    address: torusWallet.key.accAddress,
    connection: TORUS_CONNECTION,
    network: {
      chainID: network,
      lcd: torusWallet.lcd.config.URL,
      name: network,
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
