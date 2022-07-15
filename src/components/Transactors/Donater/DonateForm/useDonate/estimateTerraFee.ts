import { Fee, Msg } from "@terra-money/terra.js";
import { WalletState } from "contexts/WalletContext/WalletContext";
import getTerraClient from "helpers/getTerraClient";
import { denoms } from "constants/currency";

export default async function estimateTerraFee(
  wallet: WalletState,
  msgs: Msg[]
): Promise<{ fee: Fee; feeNum: number }> {
  const client = getTerraClient(wallet);

  const account = await client.auth.accountInfo(wallet.address);

  const fee = await client.tx.estimateFee(
    [{ sequenceNumber: account.getSequenceNumber() }],
    { msgs, feeDenoms: [denoms.uluna] }
  );

  const feeNum = extractFeeNum(fee);

  return { fee, feeNum };
}

function extractFeeNum(fee: Fee): number {
  return fee.amount.get(denoms.uluna)!.div(1e6).amount.toNumber();
}
