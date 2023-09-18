import { TxRaw } from "@keplr-wallet/proto-types/cosmos/tx/v1beta1/tx";
import {
  BroadcastRes,
  BroadcastSuccess,
  SignDoc,
  TxResponse,
  isBroadcastError,
} from "types/cosmos";
import { Log } from "types/cosmos";
import { Chain, TxError, TxResult } from "types/tx";
import { WalletState } from "contexts/WalletContext";
import { base64FromU8a, u8aFromBase64 } from "helpers/encoding";
import { keplr } from "helpers/keplr";

export async function sendCosmosTx(
  wallet: WalletState,
  doc: SignDoc,
  attribute?: string
): Promise<TxResult> {
  const { chain, address, providerId } = wallet;
  const { lcd_url, chain_id } = chain;

  const client = await keplr(providerId);
  const { signature, signed } = await client.signDirect(chain_id, address, doc);

  const tx: TxRaw = {
    authInfoBytes: signed.authInfoBytes,
    bodyBytes: signed.bodyBytes,
    signatures: [u8aFromBase64(signature.signature)],
  };

  const result = await fetch(lcd_url + "/cosmos/tx/v1beta1/txs", {
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
      tx: { hash: txhash, chainID: chain_id },
    };
  }

  const receipt = await _receipt(
    lcd_url + `/cosmos/tx/v1beta1/txs/${txhash}`,
    10,
    txhash,
    chain
  );

  if (isReceiptError(receipt)) return receipt;

  return {
    hash: txhash,
    chainID: wallet.chain.chain_id,
    data: attribute && _attribute(attribute, logs),
  };
}

async function _receipt(
  url: string,
  retries: number,
  hash: string,
  chain: Chain
): Promise<TxResponse | TxError> {
  if (retries === 0) {
    return {
      error: "Timeout: Failed to confirm if transaction is finalized",
      tx: { hash, chainID: chain.chain_id },
    };
  }

  await new Promise((r) => setTimeout(r, 1000 * (10 - retries)));

  const res = await fetch(url);

  if (res.status === 200) {
    return res.json().then((res: BroadcastSuccess) => res.tx_response);
  }

  return _receipt(url, retries - 1, hash, chain);
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
