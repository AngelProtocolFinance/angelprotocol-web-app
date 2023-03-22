import { EVMTx } from "types/evm";
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
    const hash = await provider.request<string>({
      method: EIPMethods.eth_sendTransaction,
      params: [tx],
    });

    return { hash, chainID: wallet.chain.chain_id };

    //TODO:
    //1. get transaction_receipt by polling
    //2. get id from logs
  } catch (err) {
    return { error: "Error encountered while sending transaction" };
  }
}
