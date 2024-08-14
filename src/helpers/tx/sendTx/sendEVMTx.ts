import { ErrorCode as errors } from "@ethersproject/logger";
import { EIPMethods } from "constants/evm";
import type { Chain } from "types/chain";
import type { EVMTx, Requester, TxReceipt } from "types/evm";
import type { TxResult } from "types/tx";
import { logger } from "../../logger";

export async function sendEVMTx(
  tx: EVMTx,
  request: Requester,
  chainID: Chain.Id.EVM
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
    return {
      error: EvmError(err) || "Error encountered while sending transaction",
    };
  }
}

function EvmError(error: any): string | undefined {
  switch (error?.code) {
    //https://eips.ethereum.org/EIPS/eip-1193#provider-errors
    case 4001:
      return "Transaction cancelled";
    case 4900:
    case 4901:
      return "Wallet is disconnected";
    //https://eips.ethereum.org/EIPS/eip-1474#error-codes
    case 32603:
    case errors.SERVER_ERROR:
      return "Error connecting to server. Please try again later.";
    case errors.TIMEOUT:
      return "Transaction timed out.";
    case errors.ACTION_REJECTED:
      return "Transaction cancelled.";
  }
}

async function getReceipt(
  request: Requester,
  hash: string,
  retries: number
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
