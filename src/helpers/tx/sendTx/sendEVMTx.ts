import { EVMChainID } from "types/chain";
import { EVMTx, Requester, TxReceipt } from "types/evm";
import { TxResult } from "types/tx";
import { EIPMethods } from "constants/evm";
import { logger } from "../../logger";

export async function sendEVMTx(
  tx: EVMTx,
  request: Requester,
  chainID: EVMChainID,
): Promise<TxResult> {
  try {
    const hash = await request<string>({
      method: EIPMethods.eth_sendTransaction,
      params: [tx],
    });

    const receipt = await getReceipt(request, hash, 10);

    if (!receipt) {
      return {
        error: "Timeout: failed to confirm if transaction is finalized",
        tx: { hash, chainID },
      };
    }

    return {
      hash: hash,
      chainID,
    };
  } catch (err) {
    logger.error(err);
    return { error: "Error encountered while sending transaction" };
  }
}

async function getReceipt(
  request: Requester,
  hash: string,
  retries: number,
): Promise<TxReceipt | null> {
  if (retries === 0) return null;

  await new Promise((r) => setTimeout(r, 1000 * (10 - retries)));

  const receipt = await request<TxReceipt | null>({
    method: EIPMethods.eth_getTransactionReceipt,
    params: [hash],
  });

  if (receipt !== null) {
    return receipt;
  }

  return getReceipt(request, hash, retries - 1);
}
