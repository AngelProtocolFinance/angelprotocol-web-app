import Long from "long";
import { TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { Dwindow } from "types/window";
import { CosmosWallet } from "contexts/WalletContext";
import { base64FromU8a, u8aFromBase64 } from "helpers/toBase64";
import { chainIds, chains } from "constants/chains";

export async function broadcastTx(
  txWithFee: TxRaw,
  wallet: CosmosWallet,
  accountNumber: string
) {
  //replace with wallet
  const { chainId, address } = wallet;
  const keplr = (window as Dwindow).keplr!;

  const chain = chains[chainIds.juno];
  const { signature, signed } = await keplr.signDirect(chainId, address, {
    bodyBytes: txWithFee.bodyBytes,
    authInfoBytes: txWithFee.authInfoBytes,
    chainId: chainIds.juno,
    accountNumber: Long.fromString(accountNumber),
  });

  const tx: TxRaw = {
    authInfoBytes: signed.authInfoBytes,
    bodyBytes: signed.bodyBytes,
    signatures: [u8aFromBase64(signature.signature)],
  };

  const result = await fetch(chain.lcd + "/cosmos/tx/v1beta1/txs", {
    method: "POST",
    body: JSON.stringify({
      tx_bytes: base64FromU8a(TxRaw.encode(tx).finish()),
      mode: "BROADCAST_MODE_BLOCK",
    }),
  }).then<any>((res) => res.json());
}
