import { MsgExecuteContractEncodeObject } from "@cosmjs/cosmwasm-stargate";
import { ConnectedWallet } from "@terra-money/wallet-provider";
import { Estimate } from "./types";
import { WalletState } from "contexts/WalletContext";
import { SubmitStep } from "slices/gift";
import CW20 from "contracts/CW20";
import GiftCard from "contracts/GiftCard";
import { extractFeeAmount, logger, scaleToStr } from "helpers";
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
    let msg: MsgExecuteContractEncodeObject;
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
    const fee = await gcContract.estimateFee([msg]);
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
