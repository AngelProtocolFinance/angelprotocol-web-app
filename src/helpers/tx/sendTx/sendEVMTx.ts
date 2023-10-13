import { EVMTx, InjectedProvider, LogProcessor, TxReceipt } from "types/evm";
import { TxResult } from "types/tx";
import { ConnectedWallet } from "types/wallet";
import { EIPMethods } from "constants/evm";
import { getProvider } from "../../evm";
import { logger } from "../../logger";

export async function sendEVMTx(
  wallet: ConnectedWallet,
  tx: EVMTx,
  log?: LogProcessor
): Promise<TxResult> {
  try {
    const provider = (await getProvider(wallet.id))!;

    const hash = await provider.request<string>({
      method: EIPMethods.eth_sendTransaction,
      params: [tx],
    });

    const receipt = await getReceipt(provider, hash, 10);

    if (!receipt) {
      return {
        error: "Timeout: failed to confirm if transaction is finalized",
        tx: { hash, chainID: wallet.chainId },
      };
    }

    return {
      hash: hash,
      chainID: wallet.chainId,
      data: log ? log(receipt.logs) : undefined,
    };
  } catch (err) {
    logger.error(err);
    return { error: "Error encountered while sending transaction" };
  }
}

async function getReceipt(
  provider: InjectedProvider,
  hash: string,
  retries: number
): Promise<TxReceipt | null> {
  if (retries === 0) return null;

  await new Promise((r) => setTimeout(r, 1000 * (10 - retries)));

  const receipt = await provider.request<TxReceipt | null>({
    method: EIPMethods.eth_getTransactionReceipt,
    params: [hash],
  });

  if (receipt !== null) {
    return receipt;
  }

  return getReceipt(provider, hash, retries - 1);
}
