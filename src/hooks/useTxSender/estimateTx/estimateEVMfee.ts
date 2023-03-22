import { SimulContractTx, SimulSendNativeTx } from "types/evm";
import { Estimate } from "types/tx";
import { WalletState } from "contexts/WalletContext";
import { condense } from "helpers/decimal";
import { getProvider } from "helpers/evm";
import { EIPMethods } from "constants/evm";

export async function estimateEVMFee(
  wallet: WalletState,
  tx: SimulSendNativeTx | SimulContractTx
): Promise<Estimate> {
  const provider = getProvider(wallet.providerId)!;

  //TODO: convert request to fetch call so can also be used in general contract queries
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
  return {
    fee: { amount: fee, symbol: wallet.displayCoin.symbol },
    tx: { val: { ...tx, nonce, gas, gasPrice }, type: "evm" },
  };
}
