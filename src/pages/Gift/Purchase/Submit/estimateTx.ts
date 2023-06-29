import { ConnectedWallet } from "@terra-money/wallet-provider";
import { Estimate } from "./types";
import type { Any } from "@keplr-wallet/proto-types/google/protobuf/any";
import { WalletState } from "contexts/WalletContext";
import { SubmitStep } from "slices/gift";
import CW20 from "contracts/CW20";
import GiftCard from "contracts/GiftCard";
import { logger, scaleToStr } from "helpers";
import { contracts } from "constants/contracts";

export async function estimateTx({
  details: { token, recipient },
  wallet,
}: SubmitStep & {
  wallet: WalletState;
  terraWallet?: ConnectedWallet;
}): Promise<Estimate | null> {
  const { chain } = wallet;
  const { native_currency } = chain;
  try {
    const gcContract = new GiftCard(wallet);
    let msg: Any;
    if (token.type === "juno-native" || token.type === "ibc") {
      msg = gcContract.createDepositMsg(recipient, [
        { amount: scaleToStr(token.amount), denom: token.token_id },
      ]);
      /** cw20: this estimate should not run when chain is not juno */
    } else {
      const contract = new CW20(wallet, token.token_id);
      msg = contract.createSendMsg(
        token.amount,
        contracts.gift_cards,
        gcContract.createDepositObject(recipient)
      );
    }
    const { feeAmount, doc } = await gcContract.estimateFee([msg]);

    return {
      fee: { amount: feeAmount, symbol: native_currency.symbol },
      doc,
    };
  } catch (err) {
    logger.error(err);
    return null;
  }
}
