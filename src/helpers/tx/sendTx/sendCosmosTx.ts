import { TxRaw } from "@keplr-wallet/proto-types/cosmos/tx/v1beta1/tx";
import { Keplr } from "@keplr-wallet/types";
import { chains } from "constants/chains";
import { base64FromU8a, u8aFromBase64 } from "helpers/encoding";
import { ChainID, CosmosChainID } from "types/chain";
import {
  BroadcastRes,
  BroadcastSuccess,
  SignDoc,
  TxResponse,
  isBroadcastError,
} from "types/cosmos";
import { TxError, TxResult } from "types/tx";

export async function sendCosmosTx(
  chainID: CosmosChainID,
  sender: string,
  doc: SignDoc,
  sign: Keplr["signDirect"],
): Promise<TxResult> {
  const { lcd } = chains[chainID];
  const { signature, signed } = await sign(chainID, sender, doc);

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

  const { code, txhash } = result.tx_response;
  if (code) {
    return {
      error: "Transaction failed",
      tx: { hash: txhash, chainID },
    };
  }

  const receipt = await _receipt(
    lcd + `/cosmos/tx/v1beta1/txs/${txhash}`,
    10,
    txhash,
    chainID,
  );

  if (isReceiptError(receipt)) return receipt;

  return {
    hash: txhash,
    chainID,
  };
}

async function _receipt(
  url: string,
  retries: number,
  hash: string,
  chainID: ChainID,
): Promise<TxResponse | TxError> {
  if (retries === 0) {
    return {
      error: "Timeout: Failed to confirm if transaction is finalized",
      tx: { hash, chainID },
    };
  }

  await new Promise((r) => setTimeout(r, 1000 * (10 - retries)));

  const res = await fetch(url);

  if (res.status === 200) {
    return res.json().then((res: BroadcastSuccess) => res.tx_response);
  }

  return _receipt(url, retries - 1, hash, chainID);
}

function isReceiptError(result: TxResponse | TxError): result is TxError {
  return "error" in result;
}
