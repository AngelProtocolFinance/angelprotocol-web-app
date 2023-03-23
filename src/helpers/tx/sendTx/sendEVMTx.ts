import { EVMTx, InjectedProvider, TxReceipt } from "types/evm";
import { TxResult } from "types/tx";
import { WalletState } from "contexts/WalletContext";
import { EIPMethods } from "constants/evm";
import { getProvider } from "../../evm";

export async function sendEVMTx(
  wallet: WalletState,
  tx: EVMTx,
  attribute?: string //eslint-disable-line
): Promise<TxResult> {
  try {
    const provider = getProvider(wallet.providerId)!;

    const [hash, filterID] = await Promise.all([
      provider.request<string>({
        method: EIPMethods.eth_sendTransaction,
        params: [tx],
      }),
      provider.request<string>({
        method: EIPMethods.eth_newFilter,
        params: [
          {
            fromBlock: "latest",
            toBlock: "pending",
            address: tx.to,
          },
        ],
      }),
    ]);

    const receipt = await getReceipt(provider, hash, 10);
    if (!receipt) {
      return {
        error: "Timeout: failed to confirm if transaction is finalized",
      };
    }

    const changes = await provider.request<any[]>({
      method: EIPMethods.eth_getFilterChanges,
      params: [filterID],
    });

    console.log({ changes, receipt, filterID });

    return { hash: hash, chainID: wallet.chain.chain_id };
  } catch (err) {
    console.log(err);
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
