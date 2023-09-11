import { Coin, Fee, LCDClient, Msg } from "@terra-money/terra.js";
import { ConnectedWallet } from "@terra-money/wallet-provider";
import { Estimate } from "types/tx";
import { WalletState } from "contexts/WalletContext";
import { condenseToNum } from "../../decimal";

export default async function estimateTerraFee(
  wallet: WalletState,
  terraWallet: ConnectedWallet,
  msgs: Msg[]
): Promise<Estimate> {
  const client = new LCDClient({
    chainID: wallet.chain.chain_id,
    URL: wallet.chain.lcd_url,
    gasAdjustment: 1.6,
    //https://station-assets.terra.money/chains.json
    gasPrices: [new Coin("uluna", 0.015)],
  });

  const account = await client.auth.accountInfo(wallet.address);
  const fee = await client.tx.estimateFee(
    [{ sequenceNumber: account.getSequenceNumber() }],
    { msgs, feeDenoms: [wallet.chain.native_currency.token_id] }
  );
  const amount = extractFeeAmount(fee, wallet.displayCoin.token_id);

  return {
    fee: {
      amount,
      symbol: wallet.displayCoin.symbol,
      coinGeckoId: wallet.displayCoin.coingecko_denom,
    },
    tx: { type: "terra", val: { fee, msgs }, wallet: terraWallet },
  };
}

export function extractFeeAmount(stdFee: Fee, denom: string): number {
  const stdFeeAmount = stdFee.amount.get(denom)!.amount.toString();
  return condenseToNum(stdFeeAmount);
}
