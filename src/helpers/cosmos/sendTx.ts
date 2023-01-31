import { TxRaw } from "@keplr-wallet/proto-types/cosmos/tx/v1beta1/tx";
import { BroadcastResponse, SignDoc, TxResponse } from "types/cosmos";
import { CosmosWallet } from "contexts/WalletContext";
import { base64FromU8a, u8aFromBase64 } from "helpers/encoding";
import { chainIds, chains } from "constants/chains";

export async function sendTx(
  wallet: CosmosWallet,
  doc: SignDoc
): Promise<TxResponse> {
  try {
    const { chainId, address, client } = wallet;

    const chain = chains[chainIds.juno];
    const { signature, signed } = await client.signDirect(
      chainId,
      address,
      doc
    );

    const tx: TxRaw = {
      authInfoBytes: signed.authInfoBytes,
      bodyBytes: signed.bodyBytes,
      signatures: [u8aFromBase64(signature.signature)],
    };

    return fetch(chain.lcd + "/cosmos/tx/v1beta1/txs", {
      method: "POST",
      body: JSON.stringify({
        tx_bytes: base64FromU8a(TxRaw.encode(tx).finish()),
        mode: "BROADCAST_MODE_BLOCK",
      }),
    })
      .then<BroadcastResponse>((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((res) => res.tx_response);
  } catch (err) {
    throw new Error("Error encountered while sending transaction.");
  }
}
