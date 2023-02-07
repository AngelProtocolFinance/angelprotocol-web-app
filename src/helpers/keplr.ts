import { KeplrWalletConnectV1 } from "@keplr-wallet/wc-client";
import WalletConnect from "@walletconnect/client/";
import { TxResponse } from "types/cosmos";
import { chains } from "constants/chains";
import { WC_BRIDGE } from "constants/urls";
import { base64FromU8a, u8aFromHex } from "./encoding";

export const connector = new WalletConnect({
  bridge: WC_BRIDGE,
  signingMethods: [
    /**https://github.com/chainapsis/keplr-wallet/blob/master/packages/wc-client/src/index.ts
     * see sendCustomRequest methods
     */
    "keplr_enable_wallet_connect_v1",
    "keplr_sign_amino_wallet_connect_v1",
  ],
  storageId: "wc_keplr",
});

export function getKeplrWCClient() {
  return new KeplrWalletConnectV1(connector, { sendTx });
}

type CustomSendTx = KeplrWalletConnectV1["sendTx"];
const sendTx: CustomSendTx = async (chainId, tx, mode) => {
  const chain = chains[chainId];
  const { tx_response: res } = await fetch(
    chain.lcd + "/cosmos/tx/v1beta1/txs",
    {
      method: "POST",
      body: JSON.stringify({
        tx_bytes: base64FromU8a(tx),
        mode: getModePayload(mode),
      }),
    }
  ).then<{ tx_response: TxResponse }>((res) => res.json());

  if (!!res.code) {
    throw new Error(res["raw_log"]);
  }

  return u8aFromHex(res.txhash);
};

type Mode = Parameters<CustomSendTx>[2];
/** matching sender for amino signed tx */

function getModePayload(mode: Mode): string {
  switch (mode) {
    case "async":
      return "BROADCAST_MODE_ASYNC";
    case "block":
      return "BROADCAST_MODE_BLOCK";
    case "sync":
      return "BROADCAST_MODE_SYNC";
    default:
      return "BROADCAST_MODE_UNSPECIFIED";
  }
}
