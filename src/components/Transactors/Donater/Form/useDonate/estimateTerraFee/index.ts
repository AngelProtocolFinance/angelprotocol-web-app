import { Fee, Msg } from "@terra-money/terra.js";
import { ChainWallet } from "contexts/ChainGuard";
import getTerraClient from "./getTerraClient";

export default async function estimateTerraFee(
  wallet: ChainWallet,
  msgs: Msg[]
): Promise<Fee> {
  const client = getTerraClient(wallet.chain_id, wallet.lcd_url);

  const account = await client.auth.accountInfo(wallet.address);

  return await client.tx.estimateFee(
    [{ sequenceNumber: account.getSequenceNumber() }],
    { msgs, feeDenoms: [wallet.native_currency.token_id] }
  );
}
