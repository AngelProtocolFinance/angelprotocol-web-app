import { StdTx } from "@cosmjs/amino";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { fromHex } from "@cosmjs/encoding";
import { KeplrWalletConnectV1 } from "@keplr-wallet/wc-client";
import WalletConnect from "@walletconnect/client/";
import { Keplr } from "@keplr-wallet/types";
import { ProviderId } from "contexts/WalletContext/types";
import { Dwindow } from "types/ethereum";
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
  return SigningCosmWasmClient.connectWithSigner(
    rpcUrl,
    getKeplr(providerId).getOfflineSigner(chain_id)
  );
}

type Mode = Parameters<Keplr["sendTx"]>[2];
/** matching sender for amino signed tx */
export async function sendTx(
  chainId: string,
  /** keplr-wc can only process amino
   * | Uint8Array, so can be assignable to constructor
   */
  tx: StdTx | Uint8Array,
  mode: Mode
): Promise<Uint8Array> {
  const _tx = tx as StdTx;

  const result = await fetch(
    /**TODO: if keplr needs to be used on other cosmos chains as well, LCD_url should be
     * determined via chainId
     */

    /** endpoint definition: https://docs.figment.io/api-reference/node-api/cosmos-lcd/#/txs */
    (process.env.REACT_APP_JUNO_LCD_NODE || "") + "/txs",
    {
      method: "POST",
      body: JSON.stringify({ tx: _tx, mode: getModePayload(mode) }),
    }
  ).then((res) => res.json());

  const txRes = result.data;

  if (txRes.code != null && txRes.code !== 0) {
    throw new Error(txRes["raw_log"]);
  }
  return fromHex(txRes.txhash);
}

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
