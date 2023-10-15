import { Coin, Fee, LCDClient, Msg } from "@terra-money/terra.js";
import { TerraChainID } from "types/chain";
import { Estimate, Sender } from "types/tx";
import { chains } from "constants/chains-v2";
import { condenseToNum } from "../../decimal";

export default async function estimateTerraFee(
  chainID: TerraChainID,
  sender: Sender,
  msgs: Msg[]
): Promise<Estimate> {
  const { lcd, nativeToken } = chains[chainID];
  const client = new LCDClient({
    chainID,
    URL: lcd,
    gasAdjustment: 1.6,
    //https://station-assets.terra.money/chains.json
    gasPrices: [new Coin("uluna", 0.015)],
  });

  const account = await client.auth.accountInfo(sender.address);
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
    tx: { sender, val: { fee, msgs } },
  };
}

export function extractFeeAmount(stdFee: Fee, denom: string): number {
  const stdFeeAmount = stdFee.amount.get(denom)!.amount;
  return condenseToNum(stdFeeAmount);
}
