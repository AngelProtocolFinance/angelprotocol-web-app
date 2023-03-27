import { Coin, LCDClient, Msg } from "@terra-money/terra.js";
import { ConnectedWallet } from "@terra-money/wallet-provider";
import { Estimate } from "types/tx";
import { WalletState } from "contexts/WalletContext";
import { extractFeeAmount } from "../../extractFeeData";

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
    fee: { amount, symbol: wallet.displayCoin.symbol },
    tx: { type: "terra", val: { fee, msgs }, wallet: terraWallet },
  };
}
