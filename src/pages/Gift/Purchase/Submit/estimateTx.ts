import { ConnectedWallet } from "@terra-money/wallet-provider";
import { Estimate } from "./types";
import { WalletState } from "contexts/WalletContext";
import { SubmitStep } from "slices/gift";
import CW20 from "contracts/CW20";
import { extractFeeAmount, logger } from "helpers";
import { ap_wallets } from "constants/ap_wallets";

export async function estimateTx({
  details: { token },
  wallet,
}: SubmitStep & {
  wallet: WalletState;
  terraWallet?: ConnectedWallet;
}): Promise<Estimate | null> {
  const { chain } = wallet;
  const { native_currency } = chain;
  try {
    const contract = new CW20(wallet, token.token_id);
    const msg = contract.createTransferMsg(
      token.amount,
      ap_wallets.juno_deposit
    );
    const fee = await contract.estimateFee([msg]);
    const feeAmount = extractFeeAmount(fee, native_currency.token_id);

    return {
      fee: { amount: feeAmount, symbol: native_currency.symbol },
      tx: { fee, msgs: [msg] },
    };
  } catch (err) {
    logger.error(err);
    return null;
  }
}
