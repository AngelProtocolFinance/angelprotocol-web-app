import { EVMTx, SimulContractTx, SimulSendNativeTx } from "types/evm";
import { WalletState } from "contexts/WalletContext";
import { EIPMethods } from "constants/evm";
import { condense } from "../decimal";
import { getProvider } from "./evm";

export async function estimateFee(
  wallet: WalletState,
  tx: SimulSendNativeTx | SimulContractTx
): Promise<{ fee: number; tx: EVMTx }> {
  const provider = getProvider(wallet.providerId)!;
  const [nonce, gas, gasPrice] = await Promise.all([
    provider.request<string>({
      method: EIPMethods.eth_getTransactionCount,
      params: [wallet.address, "latest"],
    }),

    provider.request<string>({
      method: EIPMethods.eth_estimateGas,
      params: [tx],
    }),
    provider.request<string>({
      method: EIPMethods.eth_gasPrice,
    }),
  ]);
  const fee = condense(gasPrice, wallet.displayCoin.decimals)
    .mul(gas)
    .toNumber();
  /** include gas, and gasPrice - in local setup, wallet might give wrong estimatio */
  return { fee, tx: { ...tx, nonce, gas, gasPrice } };
}
