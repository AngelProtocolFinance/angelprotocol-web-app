import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { fromHex } from "@cosmjs/encoding";
import { KeplrWalletConnectV1 } from "@keplr-wallet/wc-client";
import WalletConnect from "@walletconnect/client/";
import { Keplr } from "@keplr-wallet/types";
import { ProviderId } from "contexts/WalletContext/types";
import { Dwindow } from "types/ethereum";

export const connector = new WalletConnect({
  bridge: "https://bridge.walletconnect.org", // Required
  signingMethods: [
    "keplr_enable_wallet_connect_v1",
    "keplr_sign_amino_wallet_connect_v1",
  ],
});

export function getKeplrWCClient() {
  return new KeplrWalletConnectV1(connector, { sendTx });
}

export async function getKeplrClient(
  providerId: ProviderId,
  chain_id: string,
  rpc_url: string
): Promise<SigningCosmWasmClient> {
  const signer =
    providerId ===
    ("keplr-mobile" as ProviderId) /** TODO: add keplr-mobile in ProviderId */
      ? getKeplrWCClient().getOfflineSigner(chain_id)
      : (window as Dwindow).keplr!.getOfflineSigner(chain_id);
  return await SigningCosmWasmClient.connectWithSigner(rpc_url, signer);
}

const sendTx: Keplr["sendTx"] = async (_, tx, mode) => {
  const result = await fetch(
    /**TODO: should have access to variable rpc_url via chainId currently __*/
    process.env.REACT_APP_JUNO_LCD_NODE + "/cosmos/tx/v1beta1/txs",
    {
      method: "POST",
      body: JSON.stringify({
        tx_bytes: window.btoa(String.fromCharCode(...Array.from(tx))),
        mode: (() => {
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
        })(),
      }),
    }
  ).then((res) => res.json());

  const txRes = result["tx_response"];
  if (txRes.code != null && txRes.code !== 0) {
    throw new Error(txRes["raw_log"]);
  }
  /** same as node Buffer.from(txhash, 'hex') */
  return fromHex(txRes.txhash);
};

// export async function sendTxWC(
//   chainId: string,
//   tx: StdTx | Uint8Array,
//   mode: BroadcastMode
// ): Promise<Uint8Array> {
//   const restInstance = Axios.create({
//     baseURL: ChainInfos.find((chainInfo) => chainInfo.chainId === chainId)!
//       .rest,
//   });

//   const isProtoTx = Buffer.isBuffer(tx) || tx instanceof Uint8Array;

//   const params = isProtoTx
//     ? {
//         tx_bytes: Buffer.from(tx as any).toString("base64"),
// mode: (() => {
//   switch (mode) {
//     case "async":
//       return "BROADCAST_MODE_ASYNC";
//     case "block":
//       return "BROADCAST_MODE_BLOCK";
//     case "sync":
//       return "BROADCAST_MODE_SYNC";
//     default:
//       return "BROADCAST_MODE_UNSPECIFIED";
//   }
// })(),
//       }
//     : {
//         tx,
//         mode: mode,
//       };

//   const result = await restInstance.post(
//     isProtoTx ? "/cosmos/tx/v1beta1/txs" : "/txs",
//     params
//   );

//   const txResponse = isProtoTx ? result.data["tx_response"] : result.data;

// if (txResponse.code != null && txResponse.code !== 0) {
//   throw new Error(txResponse["raw_log"]);
// }

//   return Buffer.from(txResponse.txhash, "hex");
// }
