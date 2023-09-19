import { EVMTx, InjectedProvider, LogProcessor, TxReceipt } from "types/evm";
import { TxResult } from "types/tx";
import { WalletState } from "contexts/WalletContext";
import { EIPMethods } from "constant/evm";
import { getProvider } from "../../evm";
import { logger } from "../../logger";

export async function sendEVMTx(
  wallet: WalletState,
  tx: EVMTx,
  log?: LogProcessor
): Promise<TxResult> {
  try {
    const provider = (await getProvider(wallet.providerId))!;

    const hash = await provider.request<string>({
      method: EIPMethods.eth_sendTransaction,
      params: [tx],
    });

    const receipt = await getReceipt(provider, hash, 10);

    if (!receipt) {
      return {
        error: "Timeout: failed to confirm if transaction is finalized",
        tx: { hash, chainID: wallet.chain.chain_id },
      };
    }

    return {
      hash: hash,
      chainID: wallet.chain.chain_id,
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
