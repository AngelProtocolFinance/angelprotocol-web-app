import Decimal from "decimal.js";
import { EVMChainID } from "types/chain";
import { SimulTx } from "types/evm";
import { EstimateResult } from "types/tx";
import { chains } from "constants/chains";
import { EIPMethods } from "constants/evm";
import { condense } from "../../decimal";
import { request } from "../../evm";

export async function estimateEVMFee(
  chainID: EVMChainID,
  sender: string,
  tx: SimulTx
): Promise<EstimateResult> {
  const { rpc, nativeToken } = chains[chainID];
  const [nonce, gas, gasPrice] = await Promise.all([
    request({
      method: EIPMethods.eth_getTransactionCount,
      params: [sender, "latest"],
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
    chainID,
    toSend: { ...tx, nonce, gas: adjusted.toHex(), gasPrice },
  };
}
