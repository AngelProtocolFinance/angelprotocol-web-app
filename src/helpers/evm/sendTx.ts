import { EVMTx } from "types/evm";
import { WalletState } from "contexts/WalletContext";
import { EIPMethods } from "constants/evm";
import { getProvider } from "./evm";

export async function sendTx(wallet: WalletState, tx: EVMTx) {
  const provider = getProvider(wallet.providerId)!;
  return provider.request<string>({
    method: EIPMethods.eth_sendTransaction,
    params: [tx],
  });

  //TODO:
  //1. get transaction_receipt by polling
  //2. get id from logs
}
