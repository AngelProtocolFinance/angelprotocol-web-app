import { MsgExecuteContractEncodeObject } from "@cosmjs/cosmwasm-stargate";
import { Estimate } from "types/tx";
import { WalletState } from "contexts/WalletContext";
import { SubmitStep } from "slices/gift";
import CW20 from "contracts/CW20";
import GiftCard from "contracts/GiftCard";
import { logger, scaleToStr } from "helpers";
import { estimateTx as estimateGas } from "helpers/tx";
import { contracts } from "constants/contracts";

export async function estimateTx({
  details: { token, recipient },
  wallet,
}: SubmitStep & {
  wallet: WalletState;
}): Promise<Estimate | null> {
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
    return estimateGas({ type: "cosmos", val: [msg] }, wallet);
  } catch (err) {
    logger.error(err);
    return null;
  }
}
