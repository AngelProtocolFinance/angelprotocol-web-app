import { Fee, Msg } from "@terra-money/terra.js";
import { VerifiedChain } from "contexts/ChainGuard";
import getTerraClient from "./getTerraClient";

export default async function estimateTerraFee(
  chain: VerifiedChain,
  msgs: Msg[]
): Promise<Fee> {
  const client = getTerraClient(chain.chain_id, chain.lcd_url);

  const account = await client.auth.accountInfo(chain.wallet.address);

  return await client.tx.estimateFee(
    [{ sequenceNumber: account.getSequenceNumber() }],
    { msgs, feeDenoms: [chain.native_currency.token_id] }
  );
}
