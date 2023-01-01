import { Msg, TerraFee } from "types/terra";
import { WalletState } from "contexts/WalletContext";
import getTerraClient from "./getTerraClient";

export default async function estimateTerraFee(
  wallet: WalletState,
  msgs: Msg[]
): Promise<TerraFee> {
  const client = getTerraClient(wallet.chain.chain_id, wallet.chain.lcd_url);

  const account = await client.auth.accountInfo(wallet.address);

  return await client.tx.estimateFee(
    [{ sequenceNumber: account.getSequenceNumber() }],
    { msgs, feeDenoms: [wallet.chain.native_currency.token_id] }
  );
}
