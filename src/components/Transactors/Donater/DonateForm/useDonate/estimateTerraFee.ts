import { Fee, Msg } from "@terra-money/terra.js";
import Decimal from "decimal.js";
import { WalletState } from "contexts/WalletContext/WalletContext";
import getTerraClient from "helpers/getTerraClient";
import { WalletDisconnectError } from "errors/errors";
import { denoms } from "constants/currency";

export default async function estimateTerraFee(
  wallet: WalletState | undefined,
  msgs: Msg[]
): Promise<{ fee: Fee; feeNum: number }> {
  if (!wallet) {
    throw new WalletDisconnectError();
  }

  const client = getTerraClient(wallet.chain.chain_id, wallet.chain.rpc_url);

  const account = await client.auth.accountInfo(wallet.address);

  const fee = await client.tx.estimateFee(
    [{ sequenceNumber: account.getSequenceNumber() }],
    { msgs, feeDenoms: [denoms.uluna] }
  );

  const feeNum = extractFeeNum(fee);

  return { fee, feeNum };
}

function extractFeeNum(fee: Fee): number {
  // needed to wrap with `Decimal` because the plain terra.js` operations
  // would usually floor the fee amount to 0.0 after `.div(1e6)`
  return new Decimal(fee.amount.get(denoms.uluna)!.amount).div(1e6).toNumber();
}
