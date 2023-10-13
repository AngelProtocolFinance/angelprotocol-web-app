import { Coin, Fee, LCDClient, Msg } from "@terra-money/terra.js";
import { ConnectedWallet as TerraConnectedWallet } from "@terra-money/wallet-provider";
import { Estimate } from "types/tx";
import { ConnectedWallet } from "types/wallet";
import { chains } from "constants/chains-v2";
import { condenseToNum } from "../../decimal";

export default async function estimateTerraFee(
  wallet: ConnectedWallet,
  terraWallet: TerraConnectedWallet,
  msgs: Msg[]
): Promise<Estimate> {
  const { lcd, nativeToken } = chains[wallet.chainId];
  const client = new LCDClient({
    chainID: wallet.chainId,
    URL: lcd,
    gasAdjustment: 1.6,
    //https://station-assets.terra.money/chains.json
    gasPrices: [new Coin("uluna", 0.015)],
  });

  const account = await client.auth.accountInfo(wallet.address);
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
    tx: { type: "terra", val: { fee, msgs }, wallet: terraWallet },
  };
}

export function extractFeeAmount(stdFee: Fee, denom: string): number {
  const stdFeeAmount = stdFee.amount.get(denom)!.amount;
  return condenseToNum(stdFeeAmount);
}
