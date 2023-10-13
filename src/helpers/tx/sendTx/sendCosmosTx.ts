import { TxRaw } from "@keplr-wallet/proto-types/cosmos/tx/v1beta1/tx";
import {
  BroadcastRes,
  BroadcastSuccess,
  SignDoc,
  TxResponse,
  isBroadcastError,
} from "types/cosmos";
import { Log } from "types/cosmos";
import { TxError, TxResult } from "types/tx";
import { ConnectedWallet } from "types/wallet";
import { base64FromU8a, u8aFromBase64 } from "helpers/encoding";
import { keplr } from "helpers/keplr";
import { chains } from "constants/chains-v2";

export async function sendCosmosTx(
  wallet: ConnectedWallet,
  doc: SignDoc,
  attribute?: string
): Promise<TxResult> {
  const { chainId, address, id } = wallet;
  const { lcd } = chains[wallet.chainId];

  const client = await keplr(id);
  const { signature, signed } = await client.signDirect(chainId, address, doc);

  const tx: TxRaw = {
    authInfoBytes: signed.authInfoBytes,
    bodyBytes: signed.bodyBytes,
    signatures: [u8aFromBase64(signature.signature)],
  };

  const result = await fetch(lcd + "/cosmos/tx/v1beta1/txs", {
    method: "POST",
    body: JSON.stringify({
      tx_bytes: base64FromU8a(TxRaw.encode(tx).finish()),
      mode: "BROADCAST_MODE_SYNC",
    }),
  }).then<BroadcastRes>((res) => res.json());

  if (isBroadcastError(result)) {
    return { error: "Failed to broadcast transaction" };
  }

  const { code, txhash, logs } = result.tx_response;
  if (code) {
    return {
      error: "Transaction failed",
      tx: { hash: txhash, chainID: chainId },
    };
  }

  const receipt = await _receipt(
    lcd + `/cosmos/tx/v1beta1/txs/${txhash}`,
    10,
    txhash,
    chainId
  );

  if (isReceiptError(receipt)) return receipt;

  return {
    hash: txhash,
    chainID: chainId,
    data: attribute && _attribute(attribute, logs),
  };
}

async function _receipt(
  url: string,
  retries: number,
  hash: string,
  chainId: string
): Promise<TxResponse | TxError> {
  if (retries === 0) {
    return {
      error: "Timeout: Failed to confirm if transaction is finalized",
      tx: { hash, chainID: chainId },
    };
  }

  await new Promise((r) => setTimeout(r, 1000 * (10 - retries)));

  const res = await fetch(url);

  if (res.status === 200) {
    return res.json().then((res: BroadcastSuccess) => res.tx_response);
  }

  return _receipt(url, retries - 1, hash, chainId);
}

export function _attribute(attribute: string, logs: Log[]) {
  return logs[0].events
    .find((e) => e.type === "wasm")
    ?.attributes.find((a) => a.key === attribute)?.value;
}

export function isReceiptError(
  result: TxResponse | TxError
): result is TxError {
  return "error" in result;
}
