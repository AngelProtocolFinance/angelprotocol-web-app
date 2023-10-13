import Decimal from "decimal.js";
import { LogProcessor, SimulTx } from "types/evm";
import { Estimate } from "types/tx";
import { ConnectedWallet } from "types/wallet";
import { chains } from "constants/chains-v2";
import { EIPMethods } from "constants/evm";
import { condense } from "../../decimal";
import { request } from "../../evm";

export async function estimateEVMFee(
  wallet: ConnectedWallet,
  tx: SimulTx,
  log?: LogProcessor
): Promise<Estimate> {
  const { rpc, nativeToken } = chains[wallet.chainId];
  const [nonce, gas, gasPrice] = await Promise.all([
    request({
      method: EIPMethods.eth_getTransactionCount,
      params: [wallet.address, "latest"],
      rpcURL: rpc,
    }),
    request({
      method: EIPMethods.eth_estimateGas,
      params: [tx],
      rpcURL: rpc,
    }),
    request({
      method: EIPMethods.eth_gasPrice,
      rpcURL: rpc,
    }),
  ]);

  const adjusted = new Decimal(gas).mul(1.5).floor();

  const fee = condense(gasPrice, nativeToken.decimals).mul(adjusted).toNumber();
  /** include gas, and gasPrice - in local setup, wallet might give wrong estimation */
  return {
    fee: {
      amount: fee,
      symbol: nativeToken.symbol,
      coinGeckoId: nativeToken.coinGeckoId,
    },
    tx: {
      val: { ...tx, nonce, gas: adjusted.toHex(), gasPrice },
      type: "evm",
      log,
    },
  };
}
