import { Fee, Msg } from "@terra-money/terra.js";
import Decimal from "decimal.js";
import { WalletState } from "contexts/WalletContext/WalletContext";
import getTerraClient from "helpers/getTerraClient";
import { denoms } from "constants/currency";

export default async function estimateTerraFee(
  wallet: WalletState,
  msgs: Msg[]
): Promise<{ fee: Fee; feeAmount: number }> {
  const fee = await getFee(wallet, msgs);
  const feeAmount = extractFeeAmount(fee);

  return { fee, feeAmount };
}

async function getFee(wallet: WalletState, msgs: Msg[]) {
  const client = getTerraClient(wallet.chain.chain_id, wallet.chain.lcd_url);

  const account = await client.auth.accountInfo(wallet.address);

  const fee = await client.tx.estimateFee(
    [{ sequenceNumber: account.getSequenceNumber() }],
    { msgs, feeDenoms: [denoms.uluna] }
  );
  return fee;
}

function extractFeeAmount(fee: Fee): number {
  // needed to wrap with `Decimal` because the plain terra.js` operations
  // would usually floor the fee amount to 0.0 after `.div(1e6)`
  return new Decimal(fee.amount.get(denoms.uluna)!.amount).div(1e6).toNumber();
}
