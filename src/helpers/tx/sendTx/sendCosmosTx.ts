import { TimeoutError, isDeliverTxFailure } from "@cosmjs/stargate";
import { parseRawLog } from "@cosmjs/stargate/build/logs";
import { CosmosTx, TxResult } from "types/tx";
import { WalletState } from "contexts/WalletContext";
import Contract from "contracts/Contract";
import { logger } from "../../logger";

export async function sendCosmosTx(
  wallet: WalletState,
  tx: CosmosTx,
  attribute?: string
): Promise<TxResult> {
  try {
    const contract = new Contract(wallet);
    const response = await contract.signAndBroadcast(tx);

    if (isDeliverTxFailure(response)) {
      return {
        error: "Transaction failed",
        tx: { hash: response.transactionHash, chainID: wallet.chain.chain_id },
      };
    }
    return {
      hash: response.transactionHash,
      chainID: wallet.chain.chain_id,
      attrValue: attribute && getWasmAttribute(attribute, response.rawLog),
    };
  } catch (err) {
    logger.error(err);
    if (err instanceof Error) {
      if (/request rejected/i.test(err.message)) {
        return { error: "Transaction not signed" };
      }
    } else if (err instanceof TimeoutError) {
      return {
        error: "Timeout: Failed to confirm if transaction is finalized",
        tx: { hash: err.txId, chainID: wallet.chain.chain_id },
      };
    }
    return { error: "Error encountered while sending transaction" };
  }
}

function getWasmAttribute(attribute: string, rawLog?: string) {
  const logs = parseRawLog(rawLog);
  return logs[0].events
    .find((e) => e.type === "wasm")
    ?.attributes.find((a) => a.key === attribute)?.value;
}
