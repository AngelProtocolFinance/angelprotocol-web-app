import { EVMTx, InjectedProvider, TxReceipt } from "types/evm";
import { WalletState } from "contexts/WalletContext";
import { logger } from "helpers/logger";
import { EIPMethods } from "constants/evm";
import { getProvider } from "./evm";

export async function sendEVMTx(
  wallet: WalletState,
  tx: EVMTx
): Promise<string> {
  try {
    const provider = (await getProvider(wallet.providerId))!;

    const hash = await provider.request<string>({
      method: EIPMethods.eth_sendTransaction,
      params: [tx],
    });

    const receipt = await getReceipt(provider, hash, 10);

    if (!receipt) {
      throw new Error("Timeout: failed to confirm if transaction is finalized");
    }

    return hash;
  } catch (err) {
    logger.error(err);
    throw err;
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
