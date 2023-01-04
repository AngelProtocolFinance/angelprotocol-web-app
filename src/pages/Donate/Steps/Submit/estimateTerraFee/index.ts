import { Msg, TerraFee } from "types/terra";
import { ConnectedWallet } from "contexts/WalletContext";
import { chains } from "constants/chains";
import { denoms } from "constants/tokens";
import getTerraClient from "./getTerraClient";

export default async function estimateTerraFee(
  wallet: ConnectedWallet,
  msgs: Msg[]
): Promise<TerraFee> {
  const chain = chains[wallet.chainId];
  const client = getTerraClient(wallet.chainId, chain.lcd);

  const account = await client.auth.accountInfo(wallet.address);

  return await client.tx.estimateFee(
    [{ sequenceNumber: account.getSequenceNumber() }],
    { msgs, feeDenoms: [denoms.luna] }
  );
}
