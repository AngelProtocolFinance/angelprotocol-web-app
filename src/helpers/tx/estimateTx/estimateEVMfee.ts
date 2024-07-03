import { EIPMethods } from "constants/evm";
import Decimal from "decimal.js";
import type { EVMChainID } from "types/chain";
import type { SimulTx } from "types/evm";
import type { EstimateResult } from "types/tx";
import { condense } from "../../decimal";
import { request } from "../../evm";
import { getChain } from "../get-chain";

export async function estimateEVMFee(
  chainID: EVMChainID,
  sender: string,
  tx: SimulTx
): Promise<EstimateResult> {
  const { nodeUrl, nativeToken } = await getChain(chainID);
  const [nonce, gas, gasPrice] = await Promise.all([
    request({
      method: EIPMethods.eth_getTransactionCount,
      params: [sender, "latest"],
      rpcURL: nodeUrl,
    }),
    request({
      method: EIPMethods.eth_estimateGas,
      params: [tx],
      rpcURL: nodeUrl,
    }),
    request({
      method: EIPMethods.eth_gasPrice,
      rpcURL: nodeUrl,
    }),
  ]);

  const adjusted = new Decimal(gas).mul(1.5).floor();

  const fee = condense(gasPrice, nativeToken.decimals).mul(adjusted).toNumber();
  /** include gas, and gasPrice - in local setup, wallet might give wrong estimation */
  return {
    fee: {
      amount: fee,
      symbol: nativeToken.symbol,
      coinGeckoId: nativeToken.coingecko_denom,
    },
    chainID,
    toSend: { ...tx, nonce, gas: adjusted.toHex(), gasPrice },
  };
}
