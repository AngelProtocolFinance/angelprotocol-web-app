import { Coin, type Fee, LCDClient, type Msg } from "@terra-money/terra.js";
import type { TerraChainID } from "types/chain";
import type { EstimateResult } from "types/tx";
import { condenseToNum } from "../../decimal";
import { getChain } from "../get-chain";

export default async function estimateTerraFee(
  chainID: TerraChainID,
  sender: string,
  msgs: Msg[]
): Promise<EstimateResult> {
  const { nodeUrl, nativeToken } = await getChain(chainID);
  const client = new LCDClient({
    chainID,
    URL: nodeUrl,
    gasAdjustment: 1.6,
    //https://station-assets.terra.money/chains.json
    gasPrices: [new Coin("uluna", 0.015)],
  });

  const account = await client.auth.accountInfo(sender);
  const fee = await client.tx.estimateFee(
    [{ sequenceNumber: account.getSequenceNumber() }],
    { msgs, feeDenoms: [nativeToken.id] }
  );
  const amount = extractFeeAmount(fee, nativeToken.id);

  return {
    fee: {
      amount,
      symbol: nativeToken.symbol,
      coinGeckoId: nativeToken.coinGeckoId,
    },
    chainID,
    toSend: { fee, msgs },
  };
}

function extractFeeAmount(stdFee: Fee, denom: string): number {
  const stdFeeAmount = stdFee.amount.get(denom)!.amount;
  return condenseToNum(stdFeeAmount);
}
