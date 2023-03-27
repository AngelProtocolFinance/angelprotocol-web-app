import { EncodeObject } from "@cosmjs/proto-signing";
import { Estimate } from "types/tx";
import { WalletState } from "contexts/WalletContext";
import Contract from "contracts/Contract";
import { extractFeeAmount } from "../../extractFeeData";

export default async function estimateCosmosFee(
  wallet: WalletState,
  msgs: EncodeObject[],
  attribute?: string
): Promise<Estimate> {
  const contract = new Contract(wallet);
  const fee = await contract.estimateFee(msgs);
  const feeAmount = extractFeeAmount(fee, wallet.displayCoin.token_id);
  return {
    fee: { amount: feeAmount, symbol: wallet.displayCoin.symbol },
    tx: { type: "cosmos", val: { fee, msgs }, attribute },
  };
}
