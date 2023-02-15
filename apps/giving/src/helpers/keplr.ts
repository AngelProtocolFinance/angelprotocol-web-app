import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { fromHex, toBase64 } from "@cosmjs/encoding";
import { KeplrWalletConnectV1 } from "@keplr-wallet/wc-client";
import WalletConnect from "@walletconnect/client/";
import { ProviderId } from "contexts/WalletContext/types";
import { Dwindow } from "types/ethereum";
import { JUNO_LCD } from "constants/env";
import { WC_BRIDGE } from "constants/urls";

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

export function getKeplr(providerId: ProviderId) {
  return providerId === "keplr-wc"
    ? getKeplrWCClient()
    : (window as Dwindow).keplr!;
}

export async function getKeplrClient(
  providerId: ProviderId,
  chain_id: string,
  rpcUrl: string
): Promise<SigningCosmWasmClient> {
  const keplr = getKeplr(providerId);
  return await SigningCosmWasmClient.connectWithSigner(
    rpcUrl,
    keplr[
      keplr instanceof KeplrWalletConnectV1
        ? "getOfflineSignerOnlyAmino" // TODO: change sendTx to signDirect
        : "getOfflineSigner"
    ](chain_id)
  );
}

type CustomSendTx = KeplrWalletConnectV1["sendTx"];

/**
 * reason why need to pass sendTx on keplr-wc
 * https://github.com/chainapsis/keplr-wallet/blob/master/packages/wc-client/src/index.ts#L441
 */

const sendTx: CustomSendTx = async (chainId, tx, mode) => {
  /**TODO: if keplr needs to be used on other cosmos chains as well, LCD_url should be
   * determined via chainId
   */

  const { tx_response: res } = await fetch(
    /** see swagger definition by visiting lcd endpoint */
    JUNO_LCD + "/cosmos/tx/v1beta1/txs",
    {
      method: "POST",
      body: JSON.stringify({
        tx_bytes: toBase64(tx),
        mode: getModePayload(mode),
      }),
    }
  ).then((res) => res.json());

  if (res.code) {
    throw new Error(res["raw_log"]);
  }

  return fromHex(res.txhash);
};

type Mode = Parameters<CustomSendTx>[2];

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
