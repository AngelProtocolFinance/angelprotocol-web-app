import { Coin, LCDClient, Msg } from "@terra-money/terra.js";
import type { CreateTxOptions } from "@terra-money/terra.js";
import { TerraWallet } from "contexts/WalletContext";
import { condenseToNum } from "helpers";
import { chains } from "constants/chains";
import { denoms } from "constants/tokens";

//same as cosmos estimation in general but with the use of terra definitions
export async function estimateTerraGas(
  msgs: Msg[],
  wallet: TerraWallet
): Promise<{ feeAmount: number; tx: CreateTxOptions }> {
  const { chainId } = wallet;
  const chain = chains[chainId];

  const lcd = new LCDClient({
    chainID: chainId,
    URL: chain.lcd,
    //use gas units 60% greater than estimate
    gasAdjustment: 1.6,
    //https://fcd.terra.dev/v1/txs/gas_prices
    gasPrices: [new Coin(denoms.luna, 0.025)],
  });

  const account = await lcd.auth.accountInfo(wallet.address);

  const fee = await lcd.tx.estimateFee(
    [{ sequenceNumber: account.getSequenceNumber() }],
    { msgs, feeDenoms: [denoms.luna] }
  );

  const feeAmount = condenseToNum(fee.amount.get(denoms.luna)?.amount || 0);

  return {
    feeAmount,
    tx: { msgs, fee },
  };
}
