import Decimal from "decimal.js";
import { EVMTx, SimulTx } from "types/evm";
import { WalletState } from "contexts/WalletContext";
import { EIPMethods } from "constants/evm";
import { condense } from "../decimal";
import { getProvider } from "./evm";

export async function estimateEVMFee(
  wallet: WalletState,
  tx: SimulTx
): Promise<{ fee: number; tx: EVMTx }> {
  const provider = (await getProvider(wallet.providerId))!;

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

  const adjusted = new Decimal(gas).mul(1.5).floor();

  const fee = condense(gasPrice, wallet.displayCoin.decimals)
    .mul(adjusted)
    .toNumber();
  /** include gas, and gasPrice - in local setup, wallet might give wrong estimation */
  return {
    fee,
    tx: { ...tx, nonce, gas: adjusted.toHex(), gasPrice },
  };
}
