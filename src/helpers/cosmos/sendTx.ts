import { TxRaw } from "@keplr-wallet/proto-types/cosmos/tx/v1beta1/tx";
import {
  BroadcastRes,
  SignDoc,
  TxResponse,
  isBroadcastError,
} from "types/cosmos";
import { CosmosWallet } from "contexts/WalletContext";
import { base64FromU8a, u8aFromBase64 } from "helpers/encoding";
import { BroadcastFail, TxFail } from "errors/errors";
import { chainIds, chains } from "constants/chains";

export async function sendTx(
  wallet: CosmosWallet,
  doc: SignDoc
): Promise<TxResponse> {
  const { chainId, address, client } = wallet;

  const chain = chains[chainIds.juno];
  const { signature, signed } = await client.signDirect(chainId, address, doc);

  const tx: TxRaw = {
    authInfoBytes: signed.authInfoBytes,
    bodyBytes: signed.bodyBytes,
    signatures: [u8aFromBase64(signature.signature)],
  };

  const result = await fetch(chain.lcd + "/cosmos/tx/v1beta1/txs", {
    method: "POST",
    body: JSON.stringify({
      tx_bytes: base64FromU8a(TxRaw.encode(tx).finish()),
      mode: "BROADCAST_MODE_SYNC",
    }),
  }).then<BroadcastRes>((res) => res.json());

  if (isBroadcastError(result)) {
    throw new BroadcastFail(result.message);
  }

  const { code, txhash, raw_log } = result.tx_response;
  if (code) {
    throw new TxFail(raw_log, chainId, txhash);
  }

  return result.tx_response;
}
