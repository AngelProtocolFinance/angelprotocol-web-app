import { Fee, Msg } from "@terra-money/terra.js";
import { WalletState } from "contexts/WalletContext/WalletContext";
import getTerraClient from "helpers/getTerraClient";

export default async function estimateTerraFee(
  wallet: WalletState,
  msgs: Msg[]
): Promise<Fee> {
  const client = getTerraClient(wallet.chain.chain_id, wallet.chain.rpc_url);

  const account = await client.auth.accountInfo(wallet.address);

  return await client.tx.estimateFee(
    [{ sequenceNumber: account.getSequenceNumber() }],
    { msgs, feeDenoms: [wallet.chain.native_currency.token_id] }
  );
}
