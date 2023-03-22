import { EVMTx, TxReceipt } from "types/evm";
import { TxResult } from "types/tx";
import { WalletState } from "contexts/WalletContext";
import { endowmentCreatedTopic } from "contracts/evm/Account";
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
            topics: endowmentCreatedTopic,
          },
        ],
      }),
    ]);

    //get transaction receipt: TODO: once live in testnet, poll if null
    const receipt = await provider.request<TxReceipt>({
      method: EIPMethods.eth_getTransactionReceipt,
      params: [hash],
    });

    const changes = await provider.request<any[]>({
      method: EIPMethods.eth_getFilterChanges,
      params: [filterID],
    });

    console.log({ receipt, changes });
    return { hash: hash, chainID: wallet.chain.chain_id };

    //TODO:
    //1. get transaction_receipt by polling
    //2. get id from logs/events
  } catch (err) {
    return { error: "Error encountered while sending transaction" };
  }
}
