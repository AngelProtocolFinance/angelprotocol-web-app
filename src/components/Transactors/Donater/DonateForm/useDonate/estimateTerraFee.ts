import { Coin, Fee, LCDClient, Msg } from "@terra-money/terra.js";
import { terraChainId } from "constants/chainIDs";
import { denoms } from "constants/currency";
import { terraLcdUrl } from "constants/urls";

const GAS_ADJUSTMENT = 1.6; //use gas units 60% greater than estimate

// https://fcd.terra.dev/v1/txs/gas_prices - doesn't change too often
const GAS_PRICES = [
  new Coin(denoms.uusd, 0.15),
  //for classic, pisco is 0.15
  new Coin(denoms.uluna, 5.665),
];

export default async function estimateTerraFee(
  walletAddress: string,
  msgs: Msg[]
): Promise<{ fee: Fee; feeNum: number }> {
  const client = new LCDClient({
    chainID: terraChainId,
    URL: terraLcdUrl,
    gasAdjustment: GAS_ADJUSTMENT, //use gas units 20% greater than estimate
    gasPrices: GAS_PRICES,
  });

  const account = await client.auth.accountInfo(walletAddress);

  const fee = await client.tx.estimateFee(
    [{ sequenceNumber: account.getSequenceNumber() }],
    { msgs, feeDenoms: [denoms.uluna] }
  );

  const feeNum = extractFeeNum(fee);

  return { fee, feeNum };
}

function extractFeeNum(fee: Fee): number {
  return fee.amount.get(denoms.uluna)!.div(1e6).amount.toNumber();
}
