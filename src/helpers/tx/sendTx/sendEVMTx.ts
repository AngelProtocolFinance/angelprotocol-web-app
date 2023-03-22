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

    const receipt = await provider.request({
      method: EIPMethods.eth_getTransactionReceipt,
      params: [
        "0xb65f75ae2b4dec64c2168dd69b1c02064488cd47917cd26e12a93bf088f84f24",
      ],
    });

    console.log(receipt);

    return { hash, chainID: wallet.chain.chain_id };

    //TODO:
    //1. get transaction_receipt by polling
    //2. get id from logs
  } catch (err) {
    return { error: "Error encountered while sending transaction" };
  }
}
