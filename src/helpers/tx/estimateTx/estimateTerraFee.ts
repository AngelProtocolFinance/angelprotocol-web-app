import { Coin, Fee, LCDClient, Msg } from "@terra-money/terra.js";
import { chains } from "constants/chains";
import { TerraChainID } from "types/chain";
import { EstimateResult } from "types/tx";
import { condenseToNum } from "../../decimal";

export default async function estimateTerraFee(
  chainID: TerraChainID,
  sender: string,
  msgs: Msg[],
): Promise<EstimateResult> {
  const { lcd, nativeToken } = chains[chainID];
  const client = new LCDClient({
    chainID,
    URL: lcd,
    gasAdjustment: 1.6,
    //https://station-assets.terra.money/chains.json
    gasPrices: [new Coin("uluna", 0.015)],
  });

  const account = await client.auth.accountInfo(sender);
  const fee = await client.tx.estimateFee(
    [{ sequenceNumber: account.getSequenceNumber() }],
    { msgs, feeDenoms: [nativeToken.id] },
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
