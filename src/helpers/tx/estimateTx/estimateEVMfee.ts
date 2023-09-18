import Decimal from "decimal.js";
import { LogProcessor, SimulTx } from "types/evm";
import { Estimate } from "types/tx";
import { WalletState } from "contexts/WalletContext";
import { EIPMethods } from "constants/evm";
import { condense } from "../../decimal";
import { request } from "../../evm";

export async function estimateEVMFee(
  wallet: WalletState,
  tx: SimulTx,
  log?: LogProcessor
): Promise<Estimate> {
  //TODO: convert request to fetch call so can also be used in general contract queries
  const [nonce, gas, gasPrice] = await Promise.all([
    request({
      method: EIPMethods.eth_getTransactionCount,
      params: [wallet.address, "latest"],
      rpcURL: wallet.chain.rpc_url,
    }),
    request({
      method: EIPMethods.eth_estimateGas,
      params: [tx],
      rpcURL: wallet.chain.rpc_url,
    }),
    request({
      method: EIPMethods.eth_gasPrice,
      rpcURL: wallet.chain.rpc_url,
    }),
  ]);

  const adjusted = new Decimal(gas).mul(1.5).floor();

  const fee = condense(gasPrice, wallet.displayCoin.decimals)
    .mul(adjusted)
    .toNumber();
  /** include gas, and gasPrice - in local setup, wallet might give wrong estimation */
  return {
    fee: {
      amount: fee,
      symbol: wallet.displayCoin.symbol,
      coinGeckoId: wallet.displayCoin.coingecko_denom,
    },
    tx: {
      val: { ...tx, nonce, gas: adjusted.toHex(), gasPrice },
      type: "evm",
      log,
    },
  };
}
