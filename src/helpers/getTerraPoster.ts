import {
  ConnectedWallet,
  WalletController,
} from "@terra-money/wallet-provider";
import { ProviderId } from "contexts/WalletContext/types";
import {
  createWalletPrivateKey,
  openLogin,
} from "contexts/WalletContext/useTorusWallet";
import { WalletDisconnectError } from "errors/errors";
import { chainOptions } from "constants/chainOptions";

/**
 *  initialize controller: usage outside component or hook
 *  note: be sure that consumer checks if wallet is connected
 *  */
const torusPost: ConnectedWallet["post"] = async (txOptions) => {
  if (!openLogin.privKey) {
    throw new WalletDisconnectError();
  }

  const wallet = createWalletPrivateKey(openLogin.privKey);
  const tx = await wallet?.createAndSignTx(txOptions);
  const res = await wallet.lcd.tx.broadcast(tx);
  return {
    ...txOptions,
    result: {
      height: res.height,
      raw_log: res.raw_log,
      txhash: res.txhash,
    },
    success: true,
  };
};

const { post: terraPost } = new WalletController({
  ...chainOptions,
});

export const getTerraPoster = (providerId: ProviderId) => {
  switch (providerId) {
    case "xdefi-wallet":
    case "station":
    case "walletconnect":
      return terraPost;
    case "torus":
      return torusPost;
    default:
      throw new Error("Connected wallet can't post terra transactions");
  }
};
